import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  COMMUTE_MODES,
  DRIVE_INTEREST,
  INTEREST,
  LEAVE_TIMES,
  saveResponse,
  storeEnabled,
  type SurveyResponse,
  WEEKLY_COSTS,
} from "./_store";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TO = process.env.SURVEY_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "support@conductor.ng";
const FROM = process.env.CONTACT_FROM_EMAIL || "Conductor site <noreply@conductor.ng>";

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}
function oneOf<T extends readonly string[]>(list: T, v: unknown): v is T[number] {
  return typeof v === "string" && (list as readonly string[]).includes(v);
}
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * POST /api/london-survey — the London commuter research form.
 *
 * Delivery, in order of preference: Upstash store (the source of truth the
 * CSV export reads), then a notification email via Resend, then the generic
 * CONTACT_WEBHOOK_URL (Sheet / Slack). Any one channel succeeding counts as
 * saved; the response only fails when nothing at all is configured.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return bad("Bad request.");
  }
  // Honeypot — bots fill this hidden field; drop them silently.
  if (data.company) return NextResponse.json({ ok: true });

  const homeArea = str(data.homeArea, 120);
  const workArea = str(data.workArea, 120);
  const days = Array.isArray(data.days)
    ? [...new Set(data.days.map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= 7))].sort()
    : [];
  if (!homeArea || !workArea) return bad("Tell us roughly where you live and where you work.");
  if (days.length === 0) return bad("Pick at least one day you commute.");
  if (!oneOf(LEAVE_TIMES, data.leaveTime)) return bad("Pick when you usually leave in the morning.");
  if (!oneOf(COMMUTE_MODES, data.commuteModeMorning)) return bad("Tell us how you get to work in the morning.");
  if (!oneOf(COMMUTE_MODES, data.commuteModeReturn)) return bad("Tell us how you get home.");
  if (!oneOf(WEEKLY_COSTS, data.weeklyCost)) return bad("Pick roughly what your commute costs per week.");
  if (!oneOf(INTEREST, data.interest)) return bad("Tell us whether you'd book a seat.");
  if (!oneOf(DRIVE_INTEREST, data.driveInterest)) return bad("Tell us whether you'd drive others.");
  if (data.consent !== true) return bad("Please agree to us using your answers for research.");

  const email = str(data.email, 254);
  const launchUpdates = data.launchUpdates === true;
  if (email && !EMAIL_RE.test(email)) return bad("That email doesn't look right.");
  if (launchUpdates && !email) return bad("Add an email so we can tell you when we launch.");

  const r: SurveyResponse = {
    id: randomBytes(8).toString("hex"),
    submittedAt: new Date().toISOString(),
    homeArea,
    workArea,
    days,
    leaveTime: data.leaveTime,
    commuteModeMorning: data.commuteModeMorning,
    commuteModeReturn: data.commuteModeReturn,
    weeklyCost: data.weeklyCost,
    interest: data.interest,
    driveInterest: data.driveInterest,
    comment: str(data.comment, 1500),
    name: str(data.name, 120),
    email,
    launchUpdates,
    consent: true,
    source: str(data.source, 80) || "london-page",
  };

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!storeEnabled() && !resendKey && !webhookUrl) {
    return bad("The survey isn't wired up yet — please try again later.", 503);
  }

  const attempts: Promise<unknown>[] = [];
  if (storeEnabled()) attempts.push(saveResponse(r));
  if (resendKey) attempts.push(notify(resendKey, r));
  if (resendKey && launchUpdates && email && process.env.RESEND_AUDIENCE_ID) {
    attempts.push(
      new Resend(resendKey).contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
        firstName: r.name || undefined,
      }),
    );
  }
  if (webhookUrl) {
    attempts.push(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "london-survey", ...r }),
      }).then((res) => {
        if (!res.ok) throw new Error(`webhook ${res.status}`);
      }),
    );
  }
  const results = await Promise.allSettled(attempts);
  const anyOk = results.some((x) => x.status === "fulfilled");
  if (!anyOk) {
    console.error("[london-survey] all channels failed", results);
    return bad("We couldn't save your answers just now — please try again.", 502);
  }
  return NextResponse.json({ ok: true });
}

async function notify(key: string, r: SurveyResponse) {
  const lines = [
    `Home: ${r.homeArea}`,
    `Work: ${r.workArea}`,
    `Days: ${r.days.map((d) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d - 1]).join(", ")}`,
    `Leaves: ${r.leaveTime}`,
    `Morning: ${r.commuteModeMorning}`,
    `Return: ${r.commuteModeReturn}`,
    `Weekly spend: ${r.weeklyCost}`,
    `Would book a seat: ${r.interest}`,
    `Would drive others: ${r.driveInterest}`,
    `Name: ${r.name || "—"}`,
    `Email: ${r.email || "—"}${r.launchUpdates ? " (wants launch updates)" : ""}`,
    "",
    r.comment ? `Comment:\n${r.comment}` : "(no comment)",
    "",
    `id ${r.id} · ${r.submittedAt}`,
  ];
  const result = await new Resend(key).emails.send({
    from: FROM,
    to: TO,
    replyTo: r.email || undefined,
    subject: `[London survey] ${r.homeArea} → ${r.workArea} · ${r.interest}`,
    text: lines.join("\n"),
  });
  if (result.error) throw new Error(result.error.message);
}
