"use client";

import { useState } from "react";
import { APPS } from "@/lib/site";

/**
 * Live fare quote — a thin client on the app's pricing engine.
 * No fare is stored here: on request it POSTs the route's distance/duration to
 * `${NEXT_PUBLIC_PRICING_API}/api/pricing/estimate` and shows what the app
 * itself would quote. Falls back to an honest empty state (route + download)
 * when the service isn't configured/reachable — never an invented number.
 *
 * Corridors carry distance/duration only (the inputs the engine needs). Real
 * routes shipped here should be ones that actually have car owners on them.
 */
type Corridor = { id: string; from: string; to: string; km: number; min: number };

const CORRIDORS: Corridor[] = [
  { id: "agege-ikeja", from: "Agege", to: "Ikeja GRA", km: 11, min: 35 },
  { id: "yaba-vi", from: "Yaba", to: "Victoria Island", km: 15, min: 55 },
  { id: "ikorodu-lekki", from: "Ikorodu", to: "Lekki Phase 1", km: 34, min: 95 },
  { id: "ajah-vi", from: "Ajah", to: "Victoria Island", km: 22, min: 70 },
];

const API = process.env.NEXT_PUBLIC_PRICING_API;
const naira = (kobo: number) => "₦" + Math.round(kobo / 100).toLocaleString();

export function FareQuote() {
  const [cid, setCid] = useState(CORRIDORS[0]!.id);
  const [state, setState] = useState<
    { k: "idle" } | { k: "loading" } | { k: "ok"; perSeatKobo: number } | { k: "empty" }
  >({ k: "idle" });
  const c = CORRIDORS.find((x) => x.id === cid)!;

  async function getFare() {
    if (!API) {
      setState({ k: "empty" });
      return;
    }
    setState({ k: "loading" });
    try {
      const res = await fetch(`${API}/api/pricing/estimate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          distanceKm: c.km,
          estimatedDurationMin: c.min,
          vehicleClass: "COMFORT",
          totalSeats: 4,
          seatCount: 1,
        }),
      });
      if (!res.ok) throw new Error("quote failed");
      const q = await res.json();
      const perSeat =
        q.perPaxTotalPerDay ?? q.perPaxTotalPerDayV8 ?? q.perPaxRideFare ?? 0;
      setState(perSeat ? { k: "ok", perSeatKobo: perSeat } : { k: "empty" });
    } catch {
      setState({ k: "empty" });
    }
  }

  return (
    <div className="card" style={{ maxWidth: 560, padding: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-3)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 14 }}>
        Your fare, live from the app
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, color: "var(--fg-2)" }}>Your route</span>
          <select
            value={cid}
            onChange={(e) => {
              setCid(e.target.value);
              setState({ k: "idle" });
            }}
            style={{ padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--outline-variant)", background: "var(--surface-lowest)", font: "inherit", color: "var(--fg-1)" }}
          >
            {CORRIDORS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.from} → {x.to} · {x.km} km
              </option>
            ))}
          </select>
        </label>

        <div
          style={{
            padding: "18px 16px",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-low)",
            border: "1px dashed var(--outline)",
            minHeight: 76,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {state.k === "ok" ? (
            <>
              <b className="display-italic" style={{ fontSize: 38, lineHeight: 1, color: "var(--fg-1)" }}>
                {naira(state.perSeatKobo)}
              </b>
              <span style={{ fontSize: 13, color: "var(--fg-2)" }}>
                per seat, this route — agreed up front, locked at booking.
              </span>
            </>
          ) : state.k === "loading" ? (
            <span style={{ color: "var(--fg-2)" }}>Asking the app…</span>
          ) : state.k === "empty" ? (
            <span style={{ fontSize: 14, color: "var(--fg-2)" }}>
              Fares are quoted live in the app for your exact trip. Grab it and
              see your seat price for {c.from} → {c.to}.
            </span>
          ) : (
            <span style={{ fontSize: 14, color: "var(--fg-3)" }}>
              Pick a route and see the seat price.
            </span>
          )}
        </div>

        {state.k === "empty" || state.k === "idle" ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="btn btn--primary btn--sm" onClick={getFare}>
              See my fare →
            </button>
            <a className="btn btn--secondary btn--sm" href={APPS.passenger.ios}>
              Get the app
            </a>
          </div>
        ) : (
          <a className="btn btn--primary btn--sm" href={APPS.passenger.ios} style={{ justifySelf: "start" }}>
            Book this seat →
          </a>
        )}
      </div>
    </div>
  );
}
