"use client";

import { useState } from "react";

const INQUIRY = ["Support", "Partnership", "Press", "Feedback", "Something else"];
const ROLE = ["Passenger", "Car owner", "Partner", "Press", "Other"];
const PREFERRED = ["Email", "Phone call", "WhatsApp"];

type State = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setState("ok");
      e.currentTarget.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "ok") {
    return (
      <div className="formnote formnote--ok" role="status">
        <b>Thanks — your message is on its way.</b>
        <p>A person on the team will reply within a working day.</p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />
      <div className="cform__grid">
        <label className="field">
          <span>Full name</span>
          <input className="input" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input className="input" name="email" type="email" required autoComplete="email" />
        </label>
        <label className="field">
          <span>Phone (optional)</span>
          <input className="input" name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="field">
          <span>I am a…</span>
          <select name="role" defaultValue="">
            <option value="" disabled>Choose one</option>
            {ROLE.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label className="field">
          <span>What's this about?</span>
          <select name="inquiry" defaultValue="">
            <option value="" disabled>Choose one</option>
            {INQUIRY.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Preferred reply</span>
          <select name="preferred" defaultValue="Email">
            {PREFERRED.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label className="field cform__wide">
          <span>Subject</span>
          <input className="input" name="subject" />
        </label>
        <label className="field cform__wide">
          <span>Message</span>
          <textarea name="message" rows={5} required />
        </label>
      </div>

      {state === "error" && (
        <p className="formnote formnote--err" role="alert">{error}</p>
      )}

      <button type="submit" className="btn btn--primary btn--lg" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
