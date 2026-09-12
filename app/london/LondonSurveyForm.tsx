"use client";

import { useState } from "react";

/**
 * London commuter survey. Mirrors the questions the passenger app asks at
 * onboarding (home / work / days / how you commute each way) plus the two
 * London-specific ones (weekly spend, would you book / drive). Values are
 * the same enum codes the app stores, so answers can be compared later.
 */
const DAYS: [number, string][] = [
  [1, "Mon"], [2, "Tue"], [3, "Wed"], [4, "Thu"], [5, "Fri"], [6, "Sat"], [7, "Sun"],
];
const LEAVE: [string, string][] = [
  ["BEFORE_0630", "Before 6:30am"],
  ["0630_0730", "6:30 – 7:30am"],
  ["0730_0830", "7:30 – 8:30am"],
  ["0830_0930", "8:30 – 9:30am"],
  ["AFTER_0930", "After 9:30am"],
  ["VARIES", "It varies"],
];
const MODES: [string, string][] = [
  ["OWN_OR_FAMILY_VEHICLE", "My own or a family car"],
  ["COLLEAGUE_OR_NEIGHBOUR", "A lift with a colleague or neighbour"],
  ["COMPANY_STAFF_BUS", "Company shuttle or staff bus"],
  ["PUBLIC_TRANSPORT", "Public transport (Tube, bus, rail)"],
  ["RIDE_HAILING_TAXI", "Taxi, Uber or Bolt"],
  ["WALK_OR_CYCLE", "Walk or cycle"],
  ["OTHER", "Something else"],
];
const COST: [string, string][] = [
  ["UNDER_20", "Under £20"],
  ["20_40", "£20 – £40"],
  ["40_60", "£40 – £60"],
  ["60_100", "£60 – £100"],
  ["OVER_100", "Over £100"],
  ["NOT_SURE", "Not sure"],
];
const INTEREST: [string, string][] = [
  ["YES", "Yes, definitely"],
  ["PROBABLY", "Probably"],
  ["MAYBE", "Maybe — depends on the price"],
  ["PROBABLY_NOT", "Probably not"],
  ["NO", "No"],
];
const DRIVE: [string, string][] = [
  ["YES", "Yes — I drive to work and have spare seats"],
  ["MAYBE", "Maybe, if the money was worth it"],
  ["NO", "No"],
  ["NO_CAR", "I don't have a car"],
];

type State = "idle" | "sending" | "ok" | "error";

function Select({ name, label, options, hint }: { name: string; label: string; options: [string, string][]; hint?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} defaultValue="" required aria-describedby={hint ? `${name}-hint` : undefined}>
        <option value="" disabled>Choose one</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      {hint && <small id={`${name}-hint`} style={{ font: "var(--type-body-sm)", color: "var(--fg-3)" }}>{hint}</small>}
    </label>
  );
}

export function LondonSurveyForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [days, setDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [wantsUpdates, setWantsUpdates] = useState(false);

  function toggleDay(d: number) {
    setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d].sort()));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.days = days;
    payload.consent = fd.get("consent") === "on";
    payload.launchUpdates = fd.get("launchUpdates") === "on";
    payload.source = "london-page";
    if (days.length === 0) {
      setState("error");
      setError("Pick at least one day you commute.");
      return;
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/london-survey", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setState("ok");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "ok") {
    return (
      <div className="ldn-done" role="status">
        <h3>Thank you — that's exactly what we needed.</h3>
        <p>
          Your answers help us decide which London corridors to open first.
          {wantsUpdates ? " We'll email you when Conductor is ready to try in London." : ""}
        </p>
        <p>
          Know someone with the same commute? Send them this page — every extra
          answer sharpens the picture.
        </p>
      </div>
    );
  }

  return (
    <form className="ldn-form" onSubmit={onSubmit} noValidate={false}>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />

      <fieldset>
        <legend>Your commute<small>Roughly is fine — a postcode area or a neighbourhood.</small></legend>
        <div className="row2">
          <label className="field">
            <span>Where do you live?</span>
            <input className="input" name="homeArea" required maxLength={120} placeholder="e.g. Clapham, SW4" autoComplete="off" />
          </label>
          <label className="field">
            <span>Where do you work or study?</span>
            <input className="input" name="workArea" required maxLength={120} placeholder="e.g. Canary Wharf, E14" autoComplete="off" />
          </label>
        </div>
        <div className="field">
          <span>Which days do you travel in?</span>
          <div className="ldn-days" role="group" aria-label="Days you commute">
            {DAYS.map(([n, l]) => (
              <button key={n} type="button" className="chip" aria-pressed={days.includes(n)} onClick={() => toggleDay(n)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <Select name="leaveTime" label="When do you usually leave in the morning?" options={LEAVE} />
      </fieldset>

      <fieldset>
        <legend>How you get there today<small>The same two questions the app asks — one for each direction.</small></legend>
        <div className="row2">
          <Select name="commuteModeMorning" label="In the morning, I go to work by…" options={MODES} />
          <Select name="commuteModeReturn" label="On the way home, I travel by…" options={MODES} />
        </div>
        <Select name="weeklyCost" label="Roughly what does your commute cost per week?" options={COST} hint="Fares, fuel, parking — whatever you actually spend." />
      </fieldset>

      <fieldset>
        <legend>Would this work for you?</legend>
        <div className="row2">
          <Select name="interest" label="Would you book a seat with a verified car owner on your route?" options={INTEREST} />
          <Select name="driveInterest" label="Would you offer seats in your own car?" options={DRIVE} />
        </div>
        <label className="field">
          <span>What would make you say yes — or what worries you? (optional)</span>
          <textarea name="comment" rows={4} maxLength={1500} placeholder="Price, safety, timing, who else is in the car…" />
        </label>
      </fieldset>

      <fieldset>
        <legend>About you<small>Optional — only needed if you'd like to hear from us.</small></legend>
        <div className="row2">
          <label className="field">
            <span>Name</span>
            <input className="input" name="name" maxLength={120} autoComplete="name" />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" name="email" type="email" maxLength={254} autoComplete="email" required={wantsUpdates} />
          </label>
        </div>
        <label className="ldn-check">
          <input type="checkbox" name="launchUpdates" checked={wantsUpdates} onChange={(e) => setWantsUpdates(e.target.checked)} />
          <span>Tell me when Conductor is ready to try in London.</span>
        </label>
        <label className="ldn-check">
          <input type="checkbox" name="consent" required />
          <span>
            I agree to Conductor using my answers for market research. We keep them for up to 24 months, never sell them, and delete
            them on request — see the <a href="/legal/privacy" target="_blank" rel="noopener">privacy policy</a>.
          </span>
        </label>
      </fieldset>

      {state === "error" && <p className="formnote formnote--err" role="alert">{error}</p>}

      <div className="ldn-form__foot">
        <button type="submit" className="btn btn--primary btn--lg" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send my answers"}
        </button>
        <small>About two minutes. No account, no app download.</small>
      </div>
    </form>
  );
}
