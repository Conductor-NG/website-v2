import type { Metadata } from "next";
import Link from "next/link";
import { FareQuote } from "@/components/FareQuote";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Fares — your real numbers, not a guess",
  description:
    "Conductor prices each seat live for your exact route and locks it at booking. See what a seat costs, how it drops the more you ride, and where your money sits.",
  alternates: { canonical: "/fares" },
};

const WAYS = [
  { t: "A Conductor seat", d: "A share of a trip already happening. Agreed up front, locked at booking, no surge.", good: true },
  { t: "A hailing app", d: "The whole fare for a car dispatched just for you — plus surge when you most need it." },
  { t: "Driving yourself", d: "Every naira of fuel, wear and servicing, on you alone — plus the parking and the traffic." },
  { t: "Danfo", d: "Cheap, but no plan you can set your day around, and none of the verification." },
];

const ESCROW = [
  { n: "01", t: "You pay the week ahead", d: "One payment for the days you've booked — held safely, not sent to the driver yet." },
  { n: "02", t: "It sits in escrow", d: "Your money stays put until a trip actually happens. Nobody's paid for a ride that hasn't run." },
  { n: "03", t: "Released per trip", d: "As each day completes, the driver's share is released. Their money follows the ride, not the promise." },
  { n: "04", t: "Refunds are automatic", d: "Suspend a day, or a driver can't make it, and that day comes back to you — no ticket to raise." },
];

const QS = [
  { q: "How is the fare worked out?", a: "The app prices each seat from your route's distance and time for the vehicle you're riding — the same engine, whether you're estimating here or booking in the app. No rate is stored on this website." },
  { q: "Will the price change after I book?", a: "No. The fare is agreed up front and locked at booking. There is no surge and no service fee added on top later." },
  { q: "How does 'up to 100% off' work?", a: "The more you ride within a week, the less each seat costs — the discount builds as your completed trips add up, up to a free seat. It resets each week." },
  { q: "What if I don't travel one day?", a: "Suspend the day and you're not charged for it. You only ever pay for the days that actually run." },
  { q: "Where does my money sit until the trip?", a: "In escrow. It's only released to the driver once the trip is complete — so you're never out of pocket for a ride that didn't happen." },
];

export default function FaresPage() {
  return (
    <>
      <Header role="passenger" />

      {/* Hero + quote */}
      <section className="sec" style={{ paddingBottom: "clamp(40px,5vw,72px)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,48px)", alignItems: "center" }}>
          <div>
            <p className="eyebrow">Fares</p>
            <h1>Your real numbers, not a guess.</h1>
            <p className="lede" style={{ marginTop: 20 }}>
              Conductor prices each seat live for your exact route and locks it
              at booking. Pick your corridor and see the seat price — the same
              one you&apos;ll pay in the app.
            </p>
          </div>
          <FareQuote />
        </div>
      </section>

      {/* Four ways to travel */}
      <section className="sec sec--cream">
        <div className="wrap">
          <p className="eyebrow">Four ways to travel</p>
          <h2 style={{ maxWidth: "16ch" }}>Same trip, four costs.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginTop: 36 }}>
            {WAYS.map((w) => (
              <div className="card" key={w.t} style={w.good ? { borderColor: "var(--brand-orange)", background: "var(--p95)" } : undefined}>
                <h3>{w.t}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.55 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ride more, pay less — the discount */}
      <section className="sec">
        <div className="wrap narrow" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 18 }}>
          <p className="eyebrow">Ride more, pay less</p>
          <h2 style={{ maxWidth: "20ch" }}>
            It gets cheaper the more you ride — <em>up to 100% off within the week.</em>
          </h2>
          <p className="lede" style={{ margin: 0 }}>
            The base fare is already a share, not the whole car. On top of that,
            the discount builds with every completed trip in the week — until a
            seat can cost you nothing at all. It resets each week, so it rewards
            the daily commute.
          </p>
        </div>
      </section>

      {/* Escrow */}
      <section className="sec sec--cream">
        <div className="wrap">
          <p className="eyebrow">Where the money sits</p>
          <h2 style={{ maxWidth: "20ch" }}>Paid ahead, released per trip.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            You pay for the week up front, but nobody is paid for a ride until it
            actually happens.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginTop: 34 }}>
            {ESCROW.map((s) => (
              <div className="card" key={s.n} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "start" }}>
                <span className="display-italic" style={{ fontSize: 30, color: "var(--brand-orange)", lineHeight: 1 }}>{s.n}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p style={{ marginTop: 6, color: "var(--fg-2)", lineHeight: 1.55 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Only pay for days that run */}
      <section className="sec">
        <div className="wrap narrow" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 16 }}>
          <p className="eyebrow">Only pay for what you use</p>
          <h2 style={{ maxWidth: "22ch" }}>Not travelling a day? You&apos;re not charged for it.</h2>
          <p className="lede" style={{ margin: 0 }}>
            Suspend any day before the trip and it drops off your bill — no
            penalty, no support ticket. You only ever pay for the days that
            actually run.
          </p>
        </div>
      </section>

      {/* Pricing questions */}
      <section className="sec sec--cream">
        <div className="wrap narrow">
          <p className="eyebrow">Pricing questions</p>
          <h2 style={{ maxWidth: "18ch" }}>The five people ask.</h2>
          <div style={{ marginTop: 30 }}>
            {QS.map((x) => (
              <div key={x.q} style={{ padding: "22px 0", borderTop: "1px solid var(--outline-variant)" }}>
                <h3 style={{ fontSize: 19 }}>{x.q}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.6, maxWidth: "68ch" }}>{x.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec">
        <div className="wrap" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 20 }}>
          <h2 style={{ maxWidth: "20ch" }}>See your fare, then take the seat.</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn btn--primary" href="/#quote">Get a quote →</Link>
            <Link className="btn btn--secondary" href="/how-it-works">How it works</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
