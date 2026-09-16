import type { Metadata } from "next";
import { Footer, Header } from "@/components/design";
import { LondonSurveyForm } from "./LondonSurveyForm";
import "./london.css";

export const metadata: Metadata = {
  title: "London — would you share your commute?",
  description:
    "Conductor lets commuters book a seat with a verified car owner already driving their route. See the app running on London routes, then tell us about your commute — two minutes, no download.",
  alternates: { canonical: "/london" },
  openGraph: {
    title: "Would you share your commute? — Conductor London",
    description:
      "A seat in a neighbour's car, on your route, fare agreed up front and held until each day is done. See it on London routes and tell us about your commute.",
    url: "/london",
    images: [{ url: "/images/london/og.png", width: 2400, height: 1260, alt: "Would you share your commute? — Conductor London" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/london/og.png"] },
};

/** Agreed → held → released. Inline so it inherits the site's tokens. */
function MoneyFlow() {
  const steps = [
    ["Book", "Fare agreed"],
    ["Pay", "Held in escrow"],
    ["Mon", "£ released"],
    ["Tue", "£ released"],
    ["Wed", "£ released"],
    ["Thu", "Skipped · refunded"],
    ["Fri", "£ released"],
  ];
  return (
    <svg className="ldn-flow" viewBox="0 0 900 150" role="img" aria-label="Fare agreed at booking, held in escrow when you pay, then released to the car owner after each day you ride; a skipped day is refunded">
      <line x1="60" y1="60" x2="840" y2="60" stroke="var(--outline)" strokeWidth="2" />
      <line x1="190" y1="60" x2="840" y2="60" stroke="var(--orange-base)" strokeWidth="3" strokeDasharray="6 6" />
      {steps.map(([t, s], i) => {
        const x = 60 + i * 130;
        const refund = t === "Thu";
        const money = i >= 2;
        return (
          <g key={t}>
            <circle cx={x} cy="60" r={money ? 16 : 20} fill={refund ? "#fff" : money ? "var(--success-20)" : i === 0 ? "#fff" : "var(--orange-10)"} stroke={refund ? "var(--pink-base)" : money ? "var(--success-base)" : "var(--orange-base)"} strokeWidth="2.5" />
            {money && !refund && <path d={`M${x - 6} 60 l4 4 l8 -9`} fill="none" stroke="var(--success-base)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
            {refund && <path d={`M${x - 5} 55 l10 10 M${x + 5} 55 l-10 10`} fill="none" stroke="var(--pink-base)" strokeWidth="2.5" strokeLinecap="round" />}
            {!money && <text x={x} y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--fg-1)">{i + 1}</text>}
            <text x={x} y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--fg-1)">{t}</text>
            <text x={x} y="128" textAnchor="middle" fontSize="12" fill={refund ? "var(--pink-base)" : "var(--fg-3)"}>{s}</text>
          </g>
        );
      })}
      <text x="60" y="22" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--fg-3)">YOUR WALLET</text>
      <text x="840" y="22" textAnchor="end" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--fg-3)">CAR OWNER</text>
    </svg>
  );
}

/** App screen inside the site's iPhone frame (same markup as design.jsx's Phone). */
function Phone({ src, alt, w = 300 }: { src: string; alt: string; w?: number }) {
  return (
    <div className="iphone17" style={{ "--pw": `min(${w}px, 78vw)` } as React.CSSProperties}>
      <div className="iphone17__btn iphone17__btn--action" />
      <div className="iphone17__btn iphone17__btn--vup" />
      <div className="iphone17__btn iphone17__btn--vdown" />
      <div className="iphone17__btn iphone17__btn--power" />
      <div className="iphone17__bezel">
        <div className="iphone17__status">
          <span className="iphone17__time">9:41</span>
          <span className="iphone17__sig">
            <svg viewBox="0 0 20 12" width={17} height={11} aria-hidden="true">
              <rect x={0} y={7} width={3} height={5} rx={1} fill="currentColor" />
              <rect x={5} y={4.5} width={3} height={7.5} rx={1} fill="currentColor" />
              <rect x={10} y={2} width={3} height={10} rx={1} fill="currentColor" />
              <rect x={15} y={0} width={3} height={12} rx={1} fill="currentColor" opacity={0.35} />
            </svg>
            <svg viewBox="0 0 16 12" width={15} height={11} aria-hidden="true">
              <path d="M8 11.2 0.6 3.4A10.5 10.5 0 0 1 15.4 3.4Z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" opacity={0.9} />
            </svg>
            <svg viewBox="0 0 26 12" width={24} height={11} aria-hidden="true">
              <rect x={0.6} y={0.6} width={22} height={10.8} rx={2.6} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.5} />
              <rect x={2} y={2} width={17} height={8} rx={1.4} fill="currentColor" />
              <rect x={23.6} y={3.6} width={1.8} height={4.8} rx={0.9} fill="currentColor" opacity={0.5} />
            </svg>
          </span>
        </div>
        <div className="iphone17__island" />
        <div className="iphone17__screen">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
    </div>
  );
}

const STEPS: { shot: string; title: string; body: React.ReactNode; alt: string }[] = [
  {
    shot: "pax-01-find",
    title: "Find the cars already going your way",
    alt: "Passenger app map of south London showing published commutes near Clapham",
    body: <>Open the map and every published commute near you is on it — where it leaves from, when, and how long it takes. This is <b>Clapham</b> on a weekday morning.</>,
  },
  {
    shot: "pax-02-results",
    title: "Compare the price per day, the days, the owner",
    alt: "List of London commutes with per-day prices, weekday chips and verified car owners",
    body: <>Same trips as a list. Monday-to-Friday chips, a price <b>per day</b>, seats left, and the car owner — verified, with their rating and trip count.</>,
  },
  {
    shot: "pax-03-detail",
    title: "See the exact route before you ask",
    alt: "Trip detail showing the Clapham to Canary Wharf route on the map with the week's days and price",
    body: <>The route on the map, walk to pick-up, arrival time, the car and the owner. <b>£4.28 a day</b> from Clapham to Canary Wharf, next week, Mon–Fri.</>,
  },
  {
    shot: "pax-04-request",
    title: "Request a seat — the owner decides",
    alt: "Send request screen for the Clapham to Canary Wharf trip with the car and seat map",
    body: <>Nobody is assigned to anyone. You ask for a seat; the car owner sees your profile and approves or declines. <b>Both sides choose.</b></>,
  },
  {
    shot: "pax-07-requests",
    title: "Approved? Pay for the week to lock it",
    alt: "Requests screen showing an approved Clapham to Canary Wharf seat awaiting payment",
    body: <>Once approved you pay for the week up front — <b>£28.50 for five days</b> here, fees included. Pay in the window or the seat goes back on the market.</>,
  },
  {
    shot: "pax-06-wallet",
    title: "Your money is held, then released day by day",
    alt: "Wallet screen explaining escrow: paid into escrow, released to the car owner after each completed day",
    body: <>Payment sits in <b>escrow</b>, not with the driver. Each day you actually ride, that day's share is released. Cancel a day in time and it comes back to you.</>,
  },
];

export default function Page() {
  return (
    <>
      <Header role="passenger" page="london" />
      <main>
        <section className="phero">
          <div className="hero__glow" />
          <div className="wrap">
            <div className="phero__grid ldn-phero">
              <div>
                <p className="crumb"><a href="/">Home</a> › London</p>
                <p className="eyebrow">London · commuter research</p>
                <h1 className="h1">
                  Would you share your commute with someone <em>already driving your way?</em>
                </h1>
                <p className="lede" style={{ marginTop: 24 }}>
                  Conductor runs in Lagos today. Car owners publish the commute they already drive; passengers book a seat for the week;
                  the fare is agreed up front and held until each day is done. We're looking at London next — so we ran the passenger
                  app on London routes to show you exactly what it would look like, then we'd like two minutes of your time.
                </p>
                <div className="hero__cta" style={{ marginTop: 28 }}>
                  <a href="#survey" className="btn btn--primary btn--lg">Take the 2-minute survey</a>
                  <a href="#app" className="btn btn--ghostline btn--lg">See the app on London routes</a>
                </div>
                <p className="ldn-hero__note"><i /> Real app screens · illustrative London prices · no download needed</p>
              </div>
              <div className="ldn-hero__art">
                <img
                  src="/images/london/hero-phones.png"
                  alt="Three passenger app screens on London routes: the map of commutes near Clapham, the Clapham to Canary Wharf trip, and the wallet showing money held in escrow"
                  width={1500}
                  height={900}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="app" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
          <div className="wrap">
            <div className="shead">
              <p className="eyebrow">The passenger app, on London routes</p>
              <h2 className="h2">Clapham to Canary Wharf, <em>Monday to Friday.</em></h2>
            </div>
            <div className="ldn-steps">
              {STEPS.map((s, i) => (
                <article className="ldn-step" key={s.shot}>
                  <div className="ldn-step__ph">
                    <Phone src={`/images/screens/uk/${s.shot}.png`} alt={s.alt} />
                  </div>
                  <h3 className="ldn-step__t"><b>{i + 1}</b>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
            <p className="ldn-caption">
              These are screenshots of the live Conductor passenger app with London trips loaded. Prices are illustrative — London
              fares would be set for London costs — and the car owner shown is a test account.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="shead">
              <p className="eyebrow">The money, in three lines</p>
              <h2 className="h2">Agreed before, held during, <em>released after.</em></h2>
            </div>
            <div className="ldn-flow__wrap"><MoneyFlow /></div>
            <div className="ldn-money">
              <div className="feat">
                <h3>The fare is fixed before you book</h3>
                <p>One price per day for the seat, shown before you request it. No surge, no meter, no negotiating in the car.</p>
              </div>
              <div className="feat">
                <h3>Paid up front, held in escrow</h3>
                <p>You pay for the week when the owner approves you. Conductor holds the money — the driver doesn't get it yet.</p>
              </div>
              <div className="feat">
                <h3>Released one day at a time</h3>
                <p>After each day's ride, that day's share goes to the car owner. A day that doesn't happen is refunded to you.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="survey" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="ldn-survey">
              <div className="ldn-survey__aside">
                <p className="eyebrow">The survey</p>
                <h2 className="h2">Tell us about <em>your</em> commute.</h2>
                <p className="lede">
                  Nine quick questions — where you go, how you get there today, and whether a seat in a verified neighbour's car would work
                  for you. It's the same set of questions the app asks our Lagos passengers, so we can compare like with like.
                </p>
                <ul>
                  <li>Takes about two minutes.</li>
                  <li>No account or download.</li>
                  <li>Name and email are optional.</li>
                  <li>Answers are used only to plan a London launch.</li>
                </ul>
                <figure className="ldn-mapfig">
                  <img
                    src="/images/london/corridors-map.png"
                    alt="Map of London with eight commuter corridors drawn on it: Clapham to Canary Wharf, Brixton to Victoria, East Croydon to London Bridge, Ealing to Paddington, Stratford to Liverpool Street, Walthamstow to King's Cross, Wood Green to Old Street"
                    width={2400}
                    height={1800}
                    loading="lazy"
                  />
                  <figcaption>The corridors loaded into the app for this page. Tell us yours — the busiest ones open first.</figcaption>
                </figure>
              </div>
              <LondonSurveyForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
