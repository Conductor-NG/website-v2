import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Safety — you always know who's in the car",
  description:
    "Identity verified on both sides, safe named pickup points, a one-time code at meet-up, live tracking your emergency contacts can see, share-ride and SOS on every trip.",
  alternates: { canonical: "/safety" },
};

const PRINCIPLES = [
  { t: "Nobody is anonymous", d: "Identity is verified on both sides before a first trip. There are no anonymous seats and no anonymous drivers." },
  { t: "Both sides choose", d: "Passengers request; car owners approve. Either can decline, at any point, without giving a reason." },
  { t: "Ratings run both ways", d: "Punctuality and conduct are rated in both directions — scored at the end of the week, so a single bad day can't be turned into a revenge rating." },
  { t: "Safeguards on every trip", d: "Share-ride and SOS travel with every journey, and either side can suspend a trip — no penalty." },
];

const CHECKS = [
  { t: "NIN or government ID — both sides", d: "Passengers verify identity exactly as car owners do. It's what lets each of you see a real name, with a history attached." },
  { t: "Driver's licence", d: "Checked against the verified identity. An expired licence pauses a car owner's listings until it's renewed." },
  { t: "Vehicle papers & roadworthiness", d: "Registration, insurance and a current roadworthiness certificate — for the specific car that will show up." },
  { t: "The car you'll actually see", d: "The make, colour and plate on the profile are the ones that pull up. A different car is a reportable mismatch." },
];

export default function SafetyPage() {
  return (
    <>
      <Header role="passenger" />

      {/* Hero */}
      <section className="sec">
        <div className="wrap narrow">
          <p className="eyebrow">Safety &amp; trust</p>
          <h1>You always know who&apos;s in the car.</h1>
          <p className="lede" style={{ marginTop: 22 }}>
            Same-route sharing only works if trust is built in, not bolted on.
            Here&apos;s exactly what stops the wrong person getting in — and what
            travels with every trip.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
            {PRINCIPLES.map((p) => (
              <div className="card" key={p.t}>
                <h3>{p.t}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.55 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Verified both ways</p>
          <h2 style={{ maxWidth: "18ch" }}>What we check before a first trip.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginTop: 36 }}>
            {CHECKS.map((c) => (
              <div className="card" key={c.t}>
                <h3 style={{ fontSize: 19 }}>{c.t}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.55 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The safe handshake — meeting points + first-meet code */}
      <section className="sec sec--ink">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--p80)" }}>Meeting up</p>
          <h2 style={{ maxWidth: "20ch" }}>Where you meet, and how you&apos;re sure it&apos;s them.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 38 }}>
            <div style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: "var(--radius-lg)", padding: 26 }}>
              <h3 style={{ color: "#fff" }}>Safe meeting points</h3>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,.68)", lineHeight: 1.6 }}>
                Pickups happen at named, vetted landmarks — each rated for how
                visible and safe it is (green, amber or red), so you&apos;re
                meeting at a proper spot, not a random stretch of road.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {[["Green", "#59631E"], ["Amber", "#E8A93B"], ["Red", "#C5392C"]].map(([l, c]) => (
                  <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,.8)" }}>
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: c as string }} /> {l}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: "var(--radius-lg)", padding: 26 }}>
              <h3 style={{ color: "#fff" }}>A code only the two of you share</h3>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,.68)", lineHeight: 1.6 }}>
                At pickup you exchange a one-time code. You know it&apos;s your
                driver, and they know it&apos;s you — no guessing, no getting
                into the wrong car. No code, no trip.
              </p>
              <span className="display-italic" style={{ display: "inline-block", marginTop: 16, fontSize: 30, letterSpacing: ".18em", color: "var(--p80)" }}>
                4 9 1 2
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* On every trip */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">On every trip</p>
          <h2 style={{ maxWidth: "18ch" }}>Help is one tap away.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 36 }}>
            {[
              ["Live tracking", "You — and the emergency contacts you choose — can watch the trip on a live map from start to finish."],
              ["Share your ride", "Send your live trip to anyone in one tap. They don't need the app to follow along."],
              ["SOS", "Raise an alert mid-trip and your contacts are notified with your live location straight away."],
            ].map(([t, d]) => (
              <div className="card" key={t}>
                <h3 style={{ fontSize: 19 }}>{t}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24, color: "var(--fg-2)" }}>
            Everyone rides under a{" "}
            <Link href="/legal/conduct" className="btn btn--text" style={{ display: "inline" }}>
              code of conduct
            </Link>
            , and reports are reviewed against trip GPS — not just one person&apos;s word.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="sec sec--cream">
        <div className="wrap" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 20 }}>
          <h2 style={{ maxWidth: "22ch" }}>Ride with people you can see and rate.</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn btn--primary" href="/#get">Get the app</Link>
            <Link className="btn btn--secondary" href="/how-it-works">How it works</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
