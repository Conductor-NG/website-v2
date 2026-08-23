import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "For car owners — your empty seats pay for the drive",
  description:
    "You're already making the trip. Share your empty seats, approve every passenger yourself, and let a few seats cover most of the fuel and servicing.",
  alternates: { canonical: "/car-owners" },
};

const REQS = [
  { t: "Driver's licence", d: "Valid, and checked against your verified identity. An expired licence pauses your listings until you renew." },
  { t: "NIN or government ID", d: "The same identity check your passengers pass — so everyone rides with a real name attached." },
  { t: "Vehicle papers", d: "Registration, insurance and a current roadworthiness certificate for the exact car you'll drive." },
  { t: "A corridor you actually drive", d: "List the route you already commute. Empty seats on a trip you're making anyway." },
];

const STEPS = [
  { n: "01", t: "Publish your week", d: "Set your route, departure window, how many seats you'll share, and the app prices each one. Publish the whole week in under a minute." },
  { n: "02", t: "Approve who rides", d: "Requests arrive with a verified profile and a rating from past car owners. Approve the people you want, decline the rest — no reason needed." },
  { n: "03", t: "Drive it daily", d: "Meet your riders at the agreed point, confirm with a one-time code, and drive the trip you were making anyway." },
  { n: "04", t: "Get paid weekly", d: "Passengers pay the week up front into escrow; your share releases as each trip completes. Withdraw whenever you like." },
];

const QS = [
  { q: "Do I need a hackney permit or commercial plates?", a: "No. Conductor is cost-sharing on a trip you're already making, not commercial hire — you're not running a taxi. You drive your own route on your own private vehicle." },
  { q: "Who decides who gets in my car?", a: "You do — every single request. You approve or decline each passenger, and you can build a list of regulars you approve automatically." },
  { q: "What does it actually cost me?", a: "Nothing to list. The platform's service charge comes out of the fare, and it falls the more completed trips you have — the more you drive, the more you keep." },
  { q: "When do I get my money?", a: "Passengers pay the week ahead into escrow. Your share releases per trip once it's complete, and you withdraw to your bank whenever you want." },
  { q: "Can I limit who rides with me?", a: "Yes — you can restrict your seats to a community so only its members can even request, and keep the same few faces week to week." },
];

export default function CarOwnersPage() {
  return (
    <>
      <Header role="owner" />

      {/* Hero */}
      <section className="sec" style={{ paddingBottom: "clamp(32px,4vw,56px)" }}>
        <div className="wrap" style={{ display: "grid", gap: "clamp(28px,4vw,54px)", gridTemplateColumns: "1.15fr .85fr", alignItems: "center" }}>
          <div>
            <p className="eyebrow">For car owners</p>
            <h1>
              Your car is already <em style={{ fontStyle: "italic" }}>making the trip.</em>
            </h1>
            <p className="lede" style={{ marginTop: 22 }}>
              Share the empty seats on the drive you already do. A couple of
              seats cover most of the fuel and servicing — and you approve every
              passenger yourself.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a className="btn btn--primary" href="#get">Get the car owner app</a>
              <Link className="btn btn--secondary" href="/fares">Estimate your earnings →</Link>
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", minHeight: 340, background: "linear-gradient(160deg,#2a2620,#191510)", display: "grid", placeItems: "center", boxShadow: "var(--elev-3)" }}>
            <div style={{ width: 66, height: 66, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,.6)", display: "grid", placeItems: "center" }}>
              <span style={{ marginLeft: 5, borderLeft: "16px solid #fff", borderTop: "10px solid transparent", borderBottom: "10px solid transparent" }} />
            </div>
            <span style={{ position: "absolute", left: 16, top: 14, font: "600 10px/1 var(--font-body)", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>DRIVER.mp4</span>
            <span style={{ position: "absolute", left: 18, bottom: 16, color: "rgba(255,255,255,.72)", fontSize: 13 }}>Michael, car owner · Yaba → Victoria Island</span>
          </div>
        </div>
      </section>

      {/* Earnings framing */}
      <section className="sec sec--cream">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,48px)", alignItems: "center" }}>
          <div>
            <p className="eyebrow">The maths</p>
            <h2>A few seats cover the drive.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              You set the route; the app prices each seat for it. Fill two or
              three on a trip you were making anyway and you cover most of the
              fuel, wear and servicing — with company in the traffic.
            </p>
            <Link href="/fares" className="btn btn--text" style={{ marginTop: 16 }}>
              See your route's numbers →
            </Link>
          </div>
          <div className="card" style={{ display: "grid", gap: 14 }}>
            {[
              ["The app prices each seat", "For your route and vehicle — the same figure your passengers see."],
              ["You keep your share", "The service charge comes from the fare, and falls the more trips you complete."],
              ["Paid weekly, from escrow", "Passengers pay the week up front; your share releases per trip."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "grid", gap: 3 }}>
                <h4>{t}</h4>
                <p style={{ color: "var(--fg-2)" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="sec">
        <div className="wrap">
          <p className="eyebrow">Before you list</p>
          <h2 style={{ maxWidth: "20ch" }}>What we check.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginTop: 36 }}>
            {REQS.map((r) => (
              <div className="card" key={r.t}>
                <h3>{r.t}</h3>
                <p style={{ marginTop: 10, color: "var(--fg-2)", lineHeight: 1.55 }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approval — the objection killer */}
      <section className="sec sec--ink">
        <div className="wrap narrow" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 20 }}>
          <p className="eyebrow" style={{ color: "var(--p80)" }}>You&apos;re in control</p>
          <h2 style={{ maxWidth: "22ch" }}>You approve every passenger. Every time.</h2>
          <p className="lede" style={{ color: "rgba(255,255,255,.7)", margin: 0 }}>
            The thing that stops most people is not knowing who&apos;ll be in the
            car. On Conductor that&apos;s never in doubt — each request is yours
            to accept or decline, and you can keep the same regulars week to week.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="sec sec--cream">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2 style={{ maxWidth: "18ch" }}>Publish once, drive it daily.</h2>
          <div style={{ marginTop: 34 }}>
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

      {/* Owner questions */}
      <section className="sec">
        <div className="wrap narrow">
          <p className="eyebrow">Car owner questions</p>
          <h2 style={{ maxWidth: "20ch" }}>The five that matter.</h2>
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

      {/* Download driver app */}
      <section id="get" className="sec sec--ink">
        <div className="wrap" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 24 }}>
          <h2 style={{ maxWidth: "22ch" }}>List your first week tonight.</h2>
          <p className="lede" style={{ color: "rgba(255,255,255,.68)", margin: 0 }}>Get the car owner app and publish the route you already drive.</p>
          <div className="store">
            <a href={APPS.driver.ios} aria-label="Download on the App Store">
              <Image src="/images/download.driver.ios.svg" alt="Download on the App Store" width={172} height={52} />
            </a>
            <a href={APPS.driver.android} aria-label="Get it on Google Play">
              <Image src="/images/download.driver.android.svg" alt="Get it on Google Play" width={172} height={52} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
