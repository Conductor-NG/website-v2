import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TO = process.env.CONTACT_TO_EMAIL || "support@conductor.ng";
const FROM = process.env.CONTACT_FROM_EMAIL || "Conductor site <noreply@conductor.ng>";

async function sendViaResend(key: string, subject: string, replyTo: string, text: string) {
  const resend = new Resend(key);
  const result = await resend.emails.send({ from: FROM, to: TO, replyTo, subject, text });
  if (result.error) throw new Error(result.error.message);
}

// POST the submission as JSON to any webhook — Google Apps Script (Sheet),
// Zapier / Make / n8n, a Slack incoming webhook, etc.
async function postToWebhook(url: string, payload: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field; drop them silently.
  if (data.company) return NextResponse.json({ ok: true });

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please add your name, email and a message." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  // Neither delivery channel configured — nothing we can do with the message.
  if (!resendKey && !webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Messaging isn't configured yet — please email us directly." },
      { status: 503 },
    );
  }

  const fields: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", data.phone || "—"],
    ["Inquiry", data.inquiry || "—"],
    ["Role", data.role || "—"],
    ["Preferred contact", data.preferred || "—"],
    ["Subject", data.subject || "—"],
  ];
  const subject = `[Website] ${data.subject || data.inquiry || "New message"} — ${name}`;
  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}`;

  // Try every configured channel; success if at least one delivers.
  const attempts: Promise<void>[] = [];
  if (resendKey) attempts.push(sendViaResend(resendKey, subject, email, text));
  if (webhookUrl) {
    attempts.push(
      postToWebhook(webhookUrl, {
        type: "contact",
        name,
        email,
        phone: data.phone || "",
        inquiry: data.inquiry || "",
        role: data.role || "",
        preferred: data.preferred || "",
        subject: data.subject || "",
        message,
        submittedAt: new Date().toISOString(),
      }),
    );
  }

  const settled = await Promise.allSettled(attempts);
  const delivered = settled.some((s) => s.status === "fulfilled");
  if (!delivered) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending that. Please email us directly." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
