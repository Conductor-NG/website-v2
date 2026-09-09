import { createHmac, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * tawk.to → ClickUp bridge (self-contained, removable as one unit).
 *
 * tawk.to POSTs here on chat/ticket events (Administration → Settings →
 * Webhooks). Every visitor question becomes a task in the Support Inbox list,
 * assigned to whoever CLICKUP_ASSIGNEE_IDS names. When the chat ends, the full
 * transcript is appended to that same task as a comment.
 *
 * Nothing here 500s loudly: tawk retries failed deliveries, so we only return
 * a non-2xx when a retry could actually help (a ClickUp outage). Bad
 * signatures get 401, everything else gets 200 and is dropped.
 */

const SECRET = process.env.TAWK_WEBHOOK_SECRET;
const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN;
const LIST_ID = process.env.CLICKUP_SUPPORT_LIST_ID;

// Comma-separated numeric ClickUp user IDs, e.g. "100000001,100000002".
const ASSIGNEES = (process.env.CLICKUP_ASSIGNEE_IDS || "")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => Number.isFinite(n) && n > 0);

// Optional. Used only to tie a chat's transcript back to the task the opening
// message created; without it, transcripts are dropped and the task keeps just
// the first message. Same credentials as the deck tracker.
const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis: Redis | null =
  kvUrl && kvToken ? new Redis({ url: kvUrl, token: kvToken }) : null;

const CHAT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days — chats close long before this.
const chatKey = (chatId: string) => `tawk:chat:${chatId}`;

/**
 * Redis here is a nice-to-have, never a dependency: it buys transcript
 * stitching and de-duplication. If the store is down, archived for inactivity,
 * or simply unconfigured, we lose those two things — we must NOT lose the
 * ticket. So every call is swallowed rather than allowed to reach the handler.
 */
async function recallTaskId(chatId: string): Promise<string | null> {
  if (!(chatId && redis)) return null;
  try {
    return await redis.get<string>(chatKey(chatId));
  } catch (err) {
    console.error("[tawk] redis read failed — continuing without it", err);
    return null;
  }
}

async function rememberTaskId(chatId: string, taskId: string): Promise<void> {
  if (!(chatId && redis)) return;
  try {
    await redis.set(chatKey(chatId), taskId, { ex: CHAT_TTL_SECONDS });
  } catch (err) {
    console.error("[tawk] redis write failed — transcript won't be stitched", err);
  }
}

// ---- tawk payloads -----------------------------------------------------
// Only the fields we use. Everything is optional: tawk varies the shape by
// event and we would rather file a thin ticket than drop a customer.
type Visitor = {
  name?: string;
  email?: string;
  city?: string;
  country?: string;
};

type TawkMessage = {
  text?: string;
  message?: string;
  time?: string;
  sender?: { t?: string; n?: string; name?: string };
};

type TawkPayload = {
  event?: string;
  chatId?: string;
  time?: string;
  domain?: string;
  referrer?: string;
  message?: TawkMessage;
  visitor?: Visitor;
  property?: { id?: string; name?: string };
  requester?: { name?: string; email?: string };
  ticket?: { id?: string; humanId?: number; subject?: string; message?: string };
  chat?: { visitor?: Visitor; messages?: TawkMessage[] };
};

// ---- Helpers -----------------------------------------------------------

/** HMAC-SHA1 of the raw body, hex, compared without leaking timing. */
function signatureValid(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected = createHmac("sha1", secret).update(raw, "utf8").digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(header.trim(), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function truncate(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

function messageText(m?: TawkMessage): string {
  return (m?.text || m?.message || "").trim();
}

function senderLabel(m?: TawkMessage): string {
  const n = m?.sender?.n || m?.sender?.name;
  if (n) return n;
  return m?.sender?.t === "a" ? "Agent" : "Visitor";
}

/** "Ada Obi <ada@x.com> · Lagos, Nigeria", skipping whatever tawk didn't send. */
function describeVisitor(v?: Visitor): string {
  const who = [v?.name?.trim(), v?.email?.trim() ? `<${v.email.trim()}>` : ""]
    .filter(Boolean)
    .join(" ");
  const where = [v?.city?.trim(), v?.country?.trim()].filter(Boolean).join(", ");
  return [who || "Anonymous visitor", where].filter(Boolean).join(" · ");
}

async function clickup(path: string, body: unknown): Promise<Response> {
  return fetch(`https://api.clickup.com/api/v2${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: CLICKUP_TOKEN as string,
    },
    body: JSON.stringify(body),
  });
}

/** Creates the ticket. Returns the new task id, or null if ClickUp refused. */
async function createTask(name: string, markdown: string): Promise<string | null> {
  const res = await clickup(`/list/${LIST_ID}/task`, {
    name,
    markdown_content: markdown,
    assignees: ASSIGNEES,
    tags: ["website-chat"],
  });
  if (!res.ok) {
    console.error("[tawk] ClickUp createTask failed", res.status, await res.text());
    return null;
  }
  const task = (await res.json()) as { id?: string };
  return task.id ?? null;
}

async function addComment(taskId: string, text: string): Promise<boolean> {
  const res = await clickup(`/task/${taskId}/comment`, {
    comment_text: text,
    notify_all: false,
  });
  if (!res.ok) {
    console.error("[tawk] ClickUp addComment failed", res.status, await res.text());
  }
  return res.ok;
}

// ---- Event handlers ----------------------------------------------------

/** First message of a live chat — the question we want a human on. */
async function handleChatStart(p: TawkPayload): Promise<boolean> {
  const chatId = p.chatId || "";
  // tawk retries deliveries it thinks failed; without this a retry files a
  // duplicate ticket. Only possible when Redis is reachable.
  if (await recallTaskId(chatId)) return true;

  const question = messageText(p.message) || "(no message text)";
  const visitor = p.visitor;
  const name = truncate(`Chat: ${question}`, 100);
  const markdown = [
    `**From:** ${describeVisitor(visitor)}`,
    `**Page:** ${p.referrer || p.domain || "—"}`,
    `**Started:** ${p.time || new Date().toISOString()}`,
    chatId ? `**Chat ID:** \`${chatId}\`` : null,
    "",
    "---",
    "",
    question,
    "",
    "_Reply in the tawk.to dashboard — this ticket is the record, not the conversation._",
  ]
    // Only the conditional entries drop out — "" is a real blank line, and
    // Markdown needs those to separate paragraphs from the rule below.
    .filter((line) => line !== null)
    .join("\n");

  const taskId = await createTask(name, markdown);
  if (!taskId) return false;
  await rememberTaskId(chatId, taskId);
  return true;
}

/** Offline message / ticket raised through the widget. */
async function handleTicketCreate(p: TawkPayload): Promise<boolean> {
  const subject = p.ticket?.subject?.trim() || "Offline message";
  const requester: Visitor = {
    name: p.requester?.name,
    email: p.requester?.email,
  };
  const markdown = [
    `**From:** ${describeVisitor(requester)}`,
    `**Received:** ${p.time || new Date().toISOString()}`,
    p.ticket?.humanId ? `**tawk.to ticket:** #${p.ticket.humanId}` : null,
    "",
    "---",
    "",
    p.ticket?.message?.trim() || "(no message body)",
  ]
    // Only the conditional entries drop out — "" is a real blank line, and
    // Markdown needs those to separate paragraphs from the rule below.
    .filter((line) => line !== null)
    .join("\n");

  return (await createTask(truncate(`Ticket: ${subject}`, 100), markdown)) !== null;
}

/** Chat ended — append what was actually said to the ticket it opened. */
async function handleTranscript(p: TawkPayload): Promise<boolean> {
  const taskId = await recallTaskId(p.chatId || "");
  // No mapping: Redis is off/unreachable, or the chat started before this was
  // wired up. The ticket already has the opening question — drop quietly.
  if (!taskId) return true;

  const messages = p.chat?.messages ?? [];
  const body = messages
    .map((m) => `${senderLabel(m)}: ${messageText(m) || "(attachment)"}`)
    .join("\n");

  return addComment(taskId, `Full transcript\n\n${body || "(no messages recorded)"}`);
}

// ---- Route -------------------------------------------------------------

export async function POST(req: Request) {
  // Unconfigured: accept and drop, so a half-set-up environment doesn't make
  // tawk retry forever against it.
  if (!(SECRET && CLICKUP_TOKEN && LIST_ID)) {
    console.warn("[tawk] webhook hit but TAWK/CLICKUP env vars are not set");
    return NextResponse.json({ ok: true, skipped: "not configured" });
  }

  // Must read the RAW body — the signature covers the exact bytes tawk sent,
  // so req.json() would verify a re-serialised copy and fail.
  const raw = await req.text();
  if (!signatureValid(raw, req.headers.get("x-tawk-signature"), SECRET)) {
    return NextResponse.json({ ok: false, error: "bad signature" }, { status: 401 });
  }

  let payload: TawkPayload;
  try {
    payload = JSON.parse(raw) as TawkPayload;
  } catch {
    return NextResponse.json({ ok: true, skipped: "unparseable" });
  }

  let handled: boolean;
  try {
    switch (payload.event) {
      case "chat:start":
        handled = await handleChatStart(payload);
        break;
      case "ticket:create":
        handled = await handleTicketCreate(payload);
        break;
      case "chat:transcript_created":
        handled = await handleTranscript(payload);
        break;
      default:
        // chat:end and anything tawk adds later — nothing to file.
        return NextResponse.json({ ok: true, skipped: payload.event ?? "unknown" });
    }
  } catch (err) {
    console.error("[tawk] handler threw", err);
    handled = false;
  }

  // 502 tells tawk to retry — worth it, since the alternative is a lost lead.
  return handled
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ ok: false, error: "downstream failed" }, { status: 502 });
}
