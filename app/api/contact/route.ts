import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TO = process.env.CONTACT_TO_EMAIL || "support@conductor.ng";
const FROM = process.env.CONTACT_FROM_EMAIL || "Conductor site <noreply@conductor.ng>";

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

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "Messaging isn't configured yet — please email us directly." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", data.phone || "—"],
    ["Inquiry", data.inquiry || "—"],
    ["Role", data.role || "—"],
    ["Preferred contact", data.preferred || "—"],
    ["Subject", data.subject || "—"],
  ];

  try {
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `[Website] ${data.subject || data.inquiry || "New message"} — ${name}`,
      text:
        rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
        `\n\nMessage:\n${message}`,
    });
    if (result.error) throw new Error(result.error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending that. Please email us directly." },
      { status: 502 },
    );
  }
}
