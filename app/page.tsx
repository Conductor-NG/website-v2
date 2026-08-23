import Image from "next/image";
import Link from "next/link";
import { FareQuote } from "@/components/FareQuote";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APPS } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    t: "Find your route",
    d: "Search your corridor and see who's driving it — seats, times and names on a real trip.",
  },
  {
    n: "02",
    t: "Choose who you travel with",
    d: "Every driver is verified, with a rating from past passengers and the actual car on their profile.",
  },
  {
    n: "03",
    t: "Meet at the agreed point",
    d: "You meet at a safe, named pickup point — and confirm each other with a one-time code before you set off.",
  },
  {
    n: "04",
    t: "Pay, ride, rate",
    d: "Pay for the week up front; the money sits in escrow and releases per trip. Only pay for days that run.",
  },
];

const WHAT = [
  { t: "Same route", d: "A seat on a car already going your way — not a car dispatched for you." },
  { t: "Fare agreed up front", d: "The app prices the seat and locks it at booking. No surge, ever." },
  { t: "Verified both ways", d: "Driver and passenger both verify identity before a first trip." },
];

const SAFETY = [
  { t: "Verified identity", d: "NIN on both sides — no anonymous seats." },
  { t: "Live tracking", d: "You and your emergency contacts see the trip live." },
  { t: "Share ride & SOS", d: "One tap to share your ride or raise an alert." },
];

export default function HomePage() {
  return (
    <>
      <Header role="passenger" />

      {/* Hero */}
      <section className="sec" style={{ paddingBottom: "clamp(32px,4vw,56px)" }}>
        <div className="wrap" style={{ display: "grid", gap: "clamp(28px,4vw,54px)", gridTemplateColumns: "1.15fr .85fr", alignItems: "center" }}>
          <div>
            <p className="eyebrow">Lagos &amp; Abuja</p>
            <h1>
              Someone is already driving <em style={{ fontStyle: "italic" }}>your route</em> this
              morning.
            </h1>
            <p className="lede" style={{ marginTop: 22 }}>
              Book a seat on a car already making your trip, and pay a share of
              the cost — not the whole fare. Verified both ways, agreed up front.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a className="btn btn--primary" href="#quote">
                See your fare →
              </a>
              <Link className="btn btn--secondary" href="/how-it-works">
                How it works
              </Link>
            </div>
          </div>

          {/* Film hero placeholder (PASSENGER.mp4 goes here) */}
          <div
            aria-label="Passenger film"
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              minHeight: 340,
              background: "linear-gradient(160deg,#2e1c03,#14100a)",
              display: "grid",
              placeItems: "center",
              boxShadow: "var(--elev-3)",
            }}
          >
            <div style={{ width: 66, height: 66, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,.6)", display: "grid", placeItems: "center" }}>
              <span style={{ marginLeft: 5, borderLeft: "16px solid #fff", borderTop: "10px solid transparent", borderBottom: "10px solid transparent" }} />
            </div>
            <span style={{ position: "absolute", left: 16, top: 14, font: "600 10px/1 var(--font-body)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
              PASSENGER.mp4
            </span>
            <span style={{ position: "absolute", left: 18, bottom: 16, color: "rgba(255,255,255,.72)", fontSize: 13 }}>
              Chidi, passenger operations
            </span>
          </div>
        </div>
      </section>

      {/* Live quote */}
      <section id="quote" className="sec sec--cream" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <div className="wrap" style={{ display: "grid", gap: "clamp(24px,3vw,48px)", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
          <div>
            <p className="eyebrow">Your money</p>
            <h2>Cheaper than hailing, on your exact route.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Pick your corridor and the app quotes your seat — the same number
              you&apos;ll pay when you book. And it drops the more you ride:{" "}
              <em>up to 100% off within the week.</em>
            </p>
            <Link href="/fares" className="btn btn--text" style={{ marginTop: 16 }}>
              See the full fare breakdown →
            </Link>
          </div>
          <FareQuote />
        </div>
      </section>

      {/* What Conductor is */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">What Conductor is</p>
          <h2 style={{ maxWidth: "18ch" }}>The same commute, shared and split.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 40 }}>
            {WHAT.map((w) => (
              <div className="card" key={w.t}>
                <h3>{w.t}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.55 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section className="sec sec--cream">
        <div className="wrap">
          <p className="eyebrow">Your first ride</p>
          <h2 style={{ maxWidth: "16ch" }}>Four steps, one commute.</h2>
          <div style={{ display: "grid", gap: 0, marginTop: 34 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 22, padding: "24px 0", borderTop: "1px solid var(--outline-variant)", alignItems: "start" }}>
                <span className="display-italic" style={{ fontSize: 34, color: "var(--brand-orange)", lineHeight: 1 }}>{s.n}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p style={{ marginTop: 8, color: "var(--fg-2)", maxWidth: "60ch", lineHeight: 1.55 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety row */}
      <section className="sec">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,48px)", alignItems: "center" }}>
          <div>
            <p className="eyebrow">Safety</p>
            <h2>You always know who&apos;s in the car.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Nobody is anonymous. Identity is verified on both sides, the trip
              tracks live, and either side can suspend a ride — no penalty.
            </p>
            <Link href="/safety" className="btn btn--secondary" style={{ marginTop: 22 }}>
              How we keep it safe →
            </Link>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {SAFETY.map((s) => (
              <div className="card" key={s.t} style={{ padding: 20, display: "grid", gap: 4 }}>
                <h4>{s.t}</h4>
                <p style={{ color: "var(--fg-2)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="get" className="sec sec--ink">
        <div className="wrap" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 24 }}>
          <h2 style={{ maxWidth: "20ch" }}>Your seat is one download away.</h2>
          <p className="lede" style={{ color: "rgba(255,255,255,.68)", margin: 0 }}>
            Get the passenger app and see who&apos;s driving your route tomorrow.
          </p>
          <div className="store">
            <a href={APPS.passenger.ios} aria-label="Download on the App Store">
              <Image src="/images/download.passenger.ios.svg" alt="Download on the App Store" width={172} height={52} />
            </a>
            <a href={APPS.passenger.android} aria-label="Get it on Google Play">
              <Image src="/images/download.passenger.android.svg" alt="Get it on Google Play" width={172} height={52} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
