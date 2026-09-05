import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TO = process.env.CONTACT_TO_EMAIL || "support@conductor.ng";
const FROM = process.env.CONTACT_FROM_EMAIL || "Conductor site <noreply@conductor.ng>";

async function viaResend(key: string, email: string) {
  const resend = new Resend(key);
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    // Add to a real Resend audience (the mailing list).
    const r = await resend.contacts.create({ email, audienceId, unsubscribed: false });
    if (r.error) throw new Error(r.error.message);
  } else {
    // No audience configured yet — notify the team so no signup is lost.
    const r = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: "New newsletter signup",
      text: `New subscriber: ${email}`,
    });
    if (r.error) throw new Error(r.error.message);
  }
}

async function viaWebhook(url: string, email: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "subscribe", email, submittedAt: new Date().toISOString() }),
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

  if (data.company) return NextResponse.json({ ok: true }); // honeypot

  const email = (data.email || "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!resendKey && !webhookUrl) {
    return NextResponse.json({ ok: false, error: "The newsletter isn't wired up yet." }, { status: 503 });
  }

  const attempts: Promise<void>[] = [];
  if (resendKey) attempts.push(viaResend(resendKey, email));
  if (webhookUrl) attempts.push(viaWebhook(webhookUrl, email));

  const settled = await Promise.allSettled(attempts);
  if (!settled.some((s) => s.status === "fulfilled")) {
    return NextResponse.json(
      { ok: false, error: "Couldn't sign you up right now — try again shortly." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
