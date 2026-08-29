"use client";

import { useState } from "react";

type State = "idle" | "sending" | "ok" | "error";

export function NewsletterForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), company: fd.get("company") }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Couldn't sign you up.");
      setState("ok");
      e.currentTarget.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Couldn't sign you up.");
    }
  }

  if (state === "ok") {
    return <p className="formnote formnote--ok" role="status"><b>You're on the list.</b> We'll send route updates and community news — no spam.</p>;
  }

  return (
    <form className="nlform" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />
      <div className="nlform__row">
        <input className="input" name="email" type="email" placeholder="you@email.com" required aria-label="Email address" />
        <button type="submit" className="btn btn--primary btn--lg" disabled={state === "sending"}>
          {state === "sending" ? "…" : "Subscribe"}
        </button>
      </div>
      {state === "error" && <p className="formnote formnote--err" role="alert">{error}</p>}
    </form>
  );
}
