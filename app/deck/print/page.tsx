import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { PIE_CARD, RECURRING_DONUT } from "../market/page";
import { PrintToolbar } from "./print-toolbar";

export const metadata: Metadata = {
  title: "Conductor — Investor Deck (Print)",
  // Confidential investor material — never index it.
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Design tokens (current deck theme).
const INK = "#211A14";
const BODY = "#514336";
const MUTED = "#6B5D4E";
const DIV = "#ECDFCE";
const RED = "#EE4643";
const AMBER = "#E98B20";
const CREAM = "#FFF8F0";
const serif: CSSProperties = { fontFamily: "'Instrument Serif',Georgia,serif", fontStyle: "italic" };

// ---------------------------------------------------------------------------
// Reusable slide frame — one A4-landscape page, one concept.
function Slide({
  eyebrow,
  title,
  n,
  dark,
  gradient,
  children,
  center,
  bodyStyle,
}: {
  eyebrow?: string;
  title?: ReactNode;
  n: number;
  dark?: boolean;
  gradient?: boolean;
  children?: ReactNode;
  center?: boolean;
  bodyStyle?: CSSProperties;
}) {
  const cls = `slide${dark ? " slide--dark" : ""}${gradient ? " slide--grad" : ""}`;
  return (
    <section className={cls}>
      {eyebrow ? <div className="slide__eyebrow">{eyebrow}</div> : null}
      {title ? <h2 className="slide__title">{title}</h2> : null}
      <div
        className="slide__body"
        style={{ justifyContent: center ? "center" : "flex-start", ...bodyStyle }}
      >
        {children}
      </div>
      <div className="slide__footer">
        <span>Conductor · Confidential</span>
        <span>{n}</span>
      </div>
    </section>
  );
}

function Phone({ src, pw = "150px" }: { src: string; pw?: string }) {
  return (
    <div className="iphone17" style={{ alignSelf: "center", "--pw": pw } as CSSProperties}>
      <div className="iphone17__btn iphone17__btn--action" />
      <div className="iphone17__btn iphone17__btn--vup" />
      <div className="iphone17__btn iphone17__btn--vdown" />
      <div className="iphone17__btn iphone17__btn--power" />
      <div className="iphone17__bezel">
        <div className="iphone17__status">
          <span className="iphone17__time">9:41</span>
        </div>
        <div className="iphone17__island" />
        <div className="iphone17__screen">
          <img src={src} alt="Conductor app screen" />
        </div>
      </div>
    </div>
  );
}

// biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck chart markup, no user input
const Html = ({ h, style }: { h: string; style?: CSSProperties }) => (
  <div style={style} dangerouslySetInnerHTML={{ __html: h }} />
);

// Card helpers -------------------------------------------------------------
const cardLight: CSSProperties = {
  background: "#fff",
  border: `1px solid ${DIV}`,
  borderRadius: 14,
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
const cardDark: CSSProperties = {
  background: INK,
  color: CREAM,
  borderRadius: 14,
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

// Six hero stat cards (overview) -------------------------------------------
const HERO_STATS: { n: string; label: string; dark?: boolean }[] = [
  { n: "100", label: "test trips run — plus 20 deliveries piloted", dark: true },
  { n: "1,000", label: "sign-ups" },
  { n: "74%", label: "commute three or more days a week" },
  { n: "52%", label: "head to one Lagos Island corridor" },
  { n: "100", label: "verified car owners ready" },
  { n: "Sept 15", label: "paid rides launch", dark: true },
];

// Revenue-ramp bars (financials) — same data, same on-brand styling --------
const RAMP: { m: string; v: string; h: string; cp?: boolean }[] = [
  { m: "Aug '26", v: "1", h: "0.6%" },
  { m: "Sep '26", v: "3", h: "1%" },
  { m: "Oct '26", v: "8", h: "2.5%" },
  { m: "Nov '26", v: "14", h: "4%" },
  { m: "Dec '26", v: "20", h: "6%", cp: true },
  { m: "Jan '27", v: "28", h: "8.5%" },
  { m: "Feb '27", v: "38", h: "11.5%" },
  { m: "Mar '27", v: "51", h: "15%" },
  { m: "Apr '27", v: "65", h: "19.4%" },
  { m: "May '27", v: "83", h: "24.8%" },
  { m: "Jun '27", v: "103", h: "31%", cp: true },
  { m: "Jul '27", v: "129", h: "38.6%" },
  { m: "Aug '27", v: "161", h: "48%" },
  { m: "Sep '27", v: "195", h: "58.3%" },
  { m: "Oct '27", v: "236", h: "70.6%" },
  { m: "Nov '27", v: "282", h: "84.2%" },
  { m: "Dec '27", v: "335", h: "100%", cp: true },
];

// Traction growth bars (market) — three series per week --------------------
const GROWTH: { wk: string; a: string; b: string; c: string }[] = [
  { wk: "27 Jul", a: "73.6%", b: "32.3%", c: "3.9%" },
  { wk: "03 Aug", a: "74.5%", b: "32.7%", c: "4%" },
  { wk: "10 Aug", a: "77.5%", b: "35.3%", c: "4.2%" },
  { wk: "17 Aug", a: "81.6%", b: "37.7%", c: "5.8%" },
  { wk: "24 Aug", a: "94.7%", b: "49%", c: "6%" },
  { wk: "31 Aug", a: "100%", b: "53.3%", c: "7.3%" },
];

// Competition matrix (plan) ------------------------------------------------
const COMP_COLS = ["Conductor", "Bolt", "inDrive", "Shuttlers POD", "LagRide", "Uber"];
const COMP_ROWS: { label: string; cells: [string, string][] }[] = [
  {
    label: "Community carpooling matched to destination",
    cells: [
      ["Yes", "y"],
      ["No", "n"],
      ["No", "n"],
      ["Small group only", "n"],
      ["No", "n"],
      ["No", "n"],
    ],
  },
  {
    label: "Recurring weekly commutes",
    cells: [
      ["Yes", "y"],
      ["No", "n"],
      ["No", "n"],
      ["Manual re-book", "n"],
      ["No", "n"],
      ["No", "n"],
    ],
  },
  {
    label: "Two-way verification (owner + passenger)",
    cells: [
      ["Both", "y"],
      ["Driver only", "n"],
      ["Driver only", "n"],
      ["Driver only", "n"],
      ["Driver only", "n"],
      ["Driver only", "n"],
    ],
  },
  {
    label: "Fixed, predictable pricing",
    cells: [
      ["Yes", "y"],
      ["Surge", "n"],
      ["Negotiated", "n"],
      ["Yes", "p"],
      ["Yes", "p"],
      ["Surge", "n"],
    ],
  },
  {
    label: "Escrow and weekly payouts",
    cells: [
      ["Yes", "y"],
      ["Daily direct", "n"],
      ["Cash-first", "n"],
      ["Yes", "p"],
      ["Yes", "p"],
      ["Weekly", "p"],
    ],
  },
  {
    label: "Present in Lagos",
    cells: [
      ["Sep 15", "y"],
      ["Yes", "p"],
      ["Yes", "p"],
      ["Early access", "n"],
      ["Yes", "p"],
      ["Exiting", "x"],
    ],
  },
  {
    label: "Built for the daily commute (₦-affordable)",
    cells: [
      ["Yes", "y"],
      ["No", "n"],
      ["No", "n"],
      ["Premium", "n"],
      ["Mixed", "n"],
      ["No", "n"],
    ],
  },
];

// Failure modes (why-now) --------------------------------------------------
const FAILURES: [string, string][] = [
  ["Passenger no-show", "Driver still paid — settlement router charges NO_SHOW and CANCEL_LATE alongside completed rides"],
  ["Driver no-start", "Full refund cascade through per-component escrows; disputes auto-open with GPS evidence"],
  ["Payment dispute", "26-hour window, GPS-adjudicated, append-only investigation timeline"],
  ["Physical altercation on board", "Incident logging, banned-identity registry, community road-incident feed"],
  ["Lost item", "In-app claim, roster-based accountability, dispute case file for admin resolution"],
  ["Accident", "In-app SOS, incident capture, roster contacts, escrow held pending resolution"],
  ["Criminal incident", "Verified identity makes every rider traceable; banned-identity registry prevents re-entry"],
  ["Suspended trip-day (weather, breakdown)", "Passengers never charged for suspended days; escrow releases correctly"],
  ["Fake or revenge rating", "End-of-week only, server-gated by attendance"],
  ["Refund attribution", "Per-component escrows and per-user accounting trace every refund to its origin"],
];

export default function DeckPrint() {
  let p = 0;
  const next = () => (p += 1);
  return (
    <div className="deck-print">
      <style>{`
:root{ -webkit-print-color-adjust:exact; print-color-adjust:exact }
@page{ size:A4 landscape; margin:0 }
@media print{
  .no-print{display:none!important}
  .deck-scope header, .deck-scope nav{display:none!important}
  .deck-print{background:${CREAM}!important;padding:0!important;gap:0!important}
}
.deck-print{ display:flex; flex-direction:column; align-items:center; gap:22px; padding:24px; background:#E4DACB; width:100%; box-sizing:border-box }
.slide{
  width:297mm; height:210mm; box-sizing:border-box; padding:16mm 18mm; overflow:hidden;
  position:relative; display:flex; flex-direction:column; background:${CREAM};
  break-after:page; page-break-after:always;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
  color:${INK}; font-family:'Roboto Flex', system-ui, sans-serif;
  box-shadow:0 8px 30px rgba(33,26,20,0.20);
}
.slide:last-child{ break-after:auto; page-break-after:auto }
.slide--dark{ background:${INK}; color:${CREAM} }
.slide--grad{ background:linear-gradient(120deg,${AMBER},${RED}); color:#2E1C03 }
.slide__eyebrow{ font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${RED}; margin-bottom:10px; flex:none }
.slide--grad .slide__eyebrow{ color:#2E1C03 }
.slide__title{ font-size:31px; font-weight:800; line-height:1.14; letter-spacing:-0.01em; margin:0 0 16px; flex:none; max-width:1050px }
.slide__body{ flex:1; min-height:0; display:flex; flex-direction:column }
.slide__footer{ position:absolute; left:18mm; right:18mm; bottom:8mm; display:flex; justify-content:space-between; font-size:11px; color:#8A7A6B; flex:none }
.slide--dark .slide__footer{ color:#9F8E7C }
.slide--grad .slide__footer{ color:rgba(46,28,3,0.55) }
@media print{ .slide{ box-shadow:none } }
`}</style>

      <PrintToolbar />

      {/* 1 — COVER --------------------------------------------------------- */}
      <section className="slide slide--dark" style={{ justifyContent: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
          <img
            src="/deck/images/LOGO%202.png"
            alt="Conductor"
            style={{ width: 84, height: 84, background: CREAM, borderRadius: 20 }}
          />
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: RED }}>
            Investor Deck · Confidential
          </div>
          <h1 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0, maxWidth: 1000 }}>
            Nigeria's carpooling platform, built for the daily commute.
          </h1>
          <p style={{ ...serif, fontSize: 34, lineHeight: 1.2, color: RED, margin: 0 }}>
            Ride together, share together, save together.
          </p>
          <div style={{ marginTop: 8, fontSize: 18, color: DIV }}>
            Seed round · $200k SAFE · $5M cap · September 2026
          </div>
        </div>
        <div className="slide__footer">
          <span>Conductor · Confidential</span>
          <span>{next()}</span>
        </div>
      </section>

      {/* 2 — TIMING -------------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Timing"
        title="The Nigerian ride market just re-opened. We are days from serving it."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 8 }}>
          {[
            {
              date: "Sept 1, 2026",
              h: "Uber announces exit from Nigeria",
              p: "Millions of commuters lose their on-demand provider of choice. On-demand hailing could not make Nigerian unit economics work at commuter prices.",
              dark: false,
              dateColor: MUTED,
            },
            {
              date: "Sept 3, 2026",
              h: "Shuttlers announces POD",
              p: "Pre-booked private small-group rides, waitlist only. A consumer pivot with corporate-shuttle DNA: fixed price, premium positioning, manual re-booking.",
              dark: false,
              dateColor: MUTED,
            },
            {
              date: "Sept 15, 2026",
              h: "Conductor launches paid rides",
              p: "Community carpooling on the Lagos Island corridor. 100 verified car owners ready today. Supply is already-driving vehicles, so marginal cost per rider is near zero.",
              dark: true,
              dateColor: RED,
            },
          ].map((c) => (
            <div key={c.date} style={{ ...(c.dark ? cardDark : cardLight), gap: 12, padding: 24 }}>
              <div style={{ ...serif, fontSize: 30, color: c.dateColor, lineHeight: 1 }}>{c.date}</div>
              <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{c.h}</div>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: c.dark ? DIV : BODY, margin: 0 }}>{c.p}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 3 — PROBLEM ------------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Problem"
        title="Lagos loses ₦4 trillion a year to gridlock. Commuters pay for it twice."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: BODY, margin: 0 }}>
              The public transport that exists is unregulated, unsafe and unreliable. The private hire that existed
              priced itself out of daily use. The 3M+ Lagos professionals who commute every day have no reliable,
              affordable option.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {[
                ["₦4tn", "annual productivity loss to congestion · LAMATA, World Bank"],
                [">40%", "of monthly income spent on transport · Bureau of Statistics"],
                ["1 per car", "most private cars carry only the driver at peak · LAMATA surveys"],
              ].map(([n, l]) => (
                <div key={l} style={{ borderTop: `2px solid ${RED}`, paddingTop: 14 }}>
                  <div style={{ ...serif, fontSize: 32, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 6, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <img
            src="/deck/images/illust-bus-with-conductor.png"
            alt="Crowded Lagos bus"
            style={{ width: "100%", aspectRatio: "16/11", objectFit: "cover", borderRadius: 16 }}
          />
        </div>
      </Slide>

      {/* 4 — SOLUTION ------------------------------------------------------ */}
      <Slide
        n={next()}
        eyebrow="Solution"
        title="Community carpooling, matched by where you are going."
      >
        <p style={{ fontSize: 16, lineHeight: 1.55, color: BODY, margin: "0 0 20px", maxWidth: 1000 }}>
          Conductor connects Lagos professionals who share destinations, not routes. Every morning, everyone is going to
          the same cluster: Lagos Island, Victoria Island, Lekki, Ikoyi. A car owner heading there can absorb three or
          four passengers from anywhere along the way — and because 57% of our users commute five or more days a week, a
          match is a recurring weekly arrangement, not a one-off ride.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            ["For passengers", "Affordable, predictable commuting costs. Real ₦ fares, per-day pricing, verified car owners, same seat all week."],
            ["For car owners", "A new revenue stream on the drive you already make. Escrow-held earnings released weekly; you approve every passenger."],
            ["For all of Lagos", "Fewer cars on the road, less traffic, safer streets, and workplaces and estates connected as communities."],
          ].map(([h, pp]) => (
            <div key={h} style={{ ...cardLight, padding: 22, gap: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{h}</div>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: BODY, margin: 0 }}>{pp}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 5 — TRACTION HERO ------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Traction"
        title="What we have already proven, before the first paid ride."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, flex: 1, alignContent: "center" }}>
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              style={{
                ...(s.dark ? cardDark : cardLight),
                padding: 28,
                gap: 8,
                justifyContent: "center",
              }}
            >
              <div style={{ ...serif, fontSize: 52, lineHeight: 1, color: s.dark ? RED : INK }}>{s.n}</div>
              <div style={{ fontSize: 16, color: s.dark ? DIV : MUTED, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Slide>

      {/* 6 — PRODUCT · PASSENGER ------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Product · Passenger app"
        title="The passenger experience, in four screens."
      >
        <p style={{ fontSize: 15, lineHeight: 1.5, color: BODY, margin: "0 0 14px", maxWidth: 980 }}>
          Booking a week of commutes takes about 90 seconds. No surge pricing, no mid-trip cancellations. Same driver,
          same seat, same route, five mornings running.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            ["/deck/images/pax-01-map.png", "1 Discover", "Real Lagos map. Every published commute near you, with departure time and duration."],
            ["/deck/images/pax-02-results.png", "2 Compare", "Recurring Mon–Fri day chips. Per-day fare, verified drivers, ratings, seat count."],
            ["/deck/images/pax-03-ownerprofile.png", "3 Trust", "Documents verified. Pick your car owner and see the seat roster before you commit."],
            ["/deck/images/pax-livetrip.png", "4 Ride", "The ride, happening live. Track it, share it with family, arrive together."],
          ].map(([src, h, cap]) => (
            <div key={h} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Phone src={src} pw="148px" />
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                <span style={{ color: RED }}>{h.split(" ")[0]}</span> {h.slice(2)}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: BODY, margin: 0 }}>{cap}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 7 — PRODUCT · CAR OWNER ------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Product · Car owner app"
        title="Earn on the drive you already make."
      >
        <p style={{ ...serif, fontSize: 20, lineHeight: 1.3, color: RED, margin: "0 0 4px" }}>
          We say car owner, not driver — and we mean it.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.5, color: BODY, margin: "0 0 14px", maxWidth: 1000 }}>
          The person publishing a trip may be a bank manager, a founder, or a head of school driving their own car to the
          Island. They are not for hire; they open a seat in a car they command — choosing the route, approving every
          passenger, and setting the standard they expect on board.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            ["/deck/images/drv-00-create.png", "1 Create the trip", "Set your route, days and price. About 60 seconds."],
            ["/deck/images/drv-01-requests.png", "2 Curate passengers", "Every passenger approved by you before locking in. Never assigned."],
            ["/deck/images/drv-12-earnings.png", "3 Track earnings", "Real-time dashboard: per ride, per week, per month."],
            ["/deck/images/drv-13-escrow.png", "4 Get paid", "Escrow-held, released at week close. No chasing, no disputes."],
          ].map(([src, h, cap]) => (
            <div key={h} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Phone src={src} pw="140px" />
              <div style={{ fontSize: 15, fontWeight: 700 }}>
                <span style={{ color: RED }}>{h.split(" ")[0]}</span> {h.slice(2)}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: BODY, margin: 0 }}>{cap}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 8 — TRUST & SAFETY ------------------------------------------------ */}
      <Slide
        n={next()}
        dark
        eyebrow="Trust and safety"
        title="What happens when things go wrong? Four answers, all live today."
      >
        <p style={{ fontSize: 15, lineHeight: 1.5, color: DIV, margin: "0 0 16px", maxWidth: 980 }}>
          Trust is not a feature here; it is the product. None of this is a roadmap item.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            ["/deck/images/pax-09-verification.png", "Verify both ways", "Passengers and car owners: documents, NIN, phone, liveness selfie. No anonymous strangers."],
            ["/deck/images/pax-06-sos.png", "SOS built in", "One tap broadcasts location to emergency contacts and Conductor ops. Every trip has a live safety net."],
            ["/deck/images/pax-tripshare-v2.png", "Live-share the trip", "Family and friends see the trip in real time. Automatic on every ride."],
            ["/deck/images/pax-03-ownerprofile.png", "Community roster", "See exactly who else is in the car before you board. No surprise passengers."],
          ].map(([src, h, cap]) => (
            <div key={h} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{h}</div>
              <Phone src={src} pw="140px" />
              <p style={{ fontSize: 13, lineHeight: 1.45, color: DIV, margin: 0 }}>{cap}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 9 — DEMAND GEOMETRY (52% donut) ---------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Market · Demand geometry"
        title="We rebuilt V1 to learn where Lagos commutes. 52% head for one place."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 40, alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: BODY, margin: 0 }}>
              At onboarding, every user declares home and workplace. Cleaned and mapped, the pattern is unmistakable —
              homes scatter across Lagos, but workplaces converge on a few square kilometres of Lagos Island.
            </p>
            <p style={{ ...serif, fontSize: 22, lineHeight: 1.3, color: MUTED, margin: 0 }}>
              Homes scatter. Workplaces converge. That convergence is the whole opportunity.
            </p>
            <div style={{ border: `1px solid ${DIV}`, borderRadius: 12, padding: 16, color: MUTED, fontSize: 13 }}>
              Interactive map of 244 declared home &amp; workplace points — view live at conductor.ng/deck/market
            </div>
          </div>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck chart, no user input */}
          <Html h={PIE_CARD} style={{ maxWidth: 360, justifySelf: "center", width: "100%" }} />
        </div>
      </Slide>

      {/* 10 — RECURRING DEMAND (74% donut) -------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Market · Recurring demand"
        title="74% commute three or more days a week."
      >
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 40, alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: BODY, margin: 0 }}>
              Not one-off rides — recurring, predictable, week in, week out. That is what makes carpooling work
              economically, and what on-demand hailing never captured. It is why a trip must run at least three days a
              week: that is where poolable demand begins, and where a driver–passenger pair becomes a weekly recurring
              revenue stream.
            </p>
            <p style={{ ...serif, fontSize: 22, lineHeight: 1.3, color: MUTED, margin: 0 }}>
              We are not building a route. We are building a magnet.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${DIV}`, paddingTop: 12, fontWeight: 700, fontSize: 15 }}>
              <span>3+ days a week — our minimum trip length</span>
              <span style={{ color: RED }}>74%</span>
            </div>
          </div>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck chart, no user input */}
          <Html h={RECURRING_DONUT} style={{ width: "100%" }} />
        </div>
      </Slide>

      {/* 11 — GROWTH & ACQUISITION (traction bars) ------------------------ */}
      <Slide
        n={next()}
        eyebrow="Market · Traction"
        title="1,000 users. 100 verified car owners. Growing 65–87% month over month."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 28, alignItems: "start", flex: 1 }}>
          <div style={{ ...cardLight, padding: 22, gap: 16 }}>
            <div style={{ display: "flex", gap: 18, fontSize: 12, color: BODY, flexWrap: "wrap" }}>
              {[
                ["#ECDFCE", "Cumulative users"],
                ["#F0A24A", "Car owners onboarded"],
                [RED, "Verifiable car owners"],
              ].map(([c, l]) => (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: c, display: "inline-block" }} />
                  {l}
                </span>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, height: 170, alignItems: "end", borderBottom: `1px solid ${DIV}` }}>
              {GROWTH.map((g) => (
                <div key={g.wk} style={{ display: "flex", gap: 3, alignItems: "end", height: "100%" }}>
                  <div style={{ flex: 1, height: g.a, background: "#ECDFCE", borderRadius: "4px 4px 0 0" }} />
                  <div style={{ flex: 1, height: g.b, background: "#F0A24A", borderRadius: "4px 4px 0 0" }} />
                  <div style={{ flex: 1, height: g.c, background: RED, borderRadius: "4px 4px 0 0" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, fontSize: 12, color: MUTED, textAlign: "center" }}>
              {GROWTH.map((g) => (
                <span key={g.wk}>{g.wk}</span>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", fontSize: 14, borderTop: `1px solid ${DIV}`, paddingTop: 12 }}>
              <span style={{ color: MUTED }}>31 Aug 2026</span>
              <strong style={{ textAlign: "right" }}>795</strong>
              <strong style={{ textAlign: "right" }}>424</strong>
              <strong style={{ textAlign: "right" }}>58</strong>
              <span style={{ color: MUTED }}>5-week change</span>
              <span style={{ textAlign: "right", color: RED, fontWeight: 700 }}>+36%</span>
              <span style={{ textAlign: "right", color: RED, fontWeight: 700 }}>+65%</span>
              <span style={{ textAlign: "right", color: RED, fontWeight: 700 }}>+87%</span>
            </div>
            <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>
              Weekly cumulative to 31 Aug 2026 — the ramp has since carried us past{" "}
              <strong style={{ color: RED }}>1,000 users</strong> and{" "}
              <strong style={{ color: RED }}>100 verified car owners</strong>.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>
              Acquisition · Google Ads, 21 Aug – 3 Sep
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["2,160", "downloads in 14 days", false],
                ["$0.32", "cost per install", false],
                ["6.8%", "download → any signup", false],
                ["5.7%", "download → car owner", false],
              ].map(([n, l]) => (
                <div key={l as string} style={{ ...cardLight, padding: 14, gap: 4 }}>
                  <div style={{ ...serif, fontSize: 30, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 12, color: BODY }}>{l}</div>
                </div>
              ))}
              <div style={{ ...cardDark, padding: 14, gap: 4, gridColumn: "1 / span 2" }}>
                <div style={{ ...serif, fontSize: 30, lineHeight: 1, color: AMBER }}>4,600</div>
                <div style={{ fontSize: 12, color: DIV }}>
                  car-owner downloads / mo — 3.8× our own projection, on a limited paid budget. Passenger-side ads have
                  not launched.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* 12 — BUSINESS MODEL ---------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Business model"
        title="A 10% take on every ride. Held in escrow. Released weekly."
      >
        <p style={{ fontSize: 17, lineHeight: 1.55, color: BODY, margin: "0 0 22px", maxWidth: 1000 }}>
          10% on the rider fare plus 10% on driver earnings — roughly ₦360 on a ₦1,500 average fare. No surge, no dynamic
          markup, no hidden fees.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ ...cardLight, padding: 24, gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>How money moves</div>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: BODY, margin: 0 }}>
              The passenger pays into escrow at booking. Money is held per trip-day until the ride week completes, then
              released to the driver at week close. If a day does not happen, refunds are automatic and traceable to
              their origin.
            </p>
          </div>
          <div style={{ ...cardLight, padding: 24, gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>What we take</div>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: BODY, margin: 0 }}>
              10% from each side of the transaction. The passenger sees the fare and the fee before booking; the driver
              sees net earnings per ride, per week and per month in the app.
            </p>
          </div>
        </div>
      </Slide>

      {/* 13 — ENTERPRISE --------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Growth engine · Conductor for Enterprise"
        title="We don't buy commuters on Facebook. We onboard them a company at a time."
      >
        <p style={{ fontSize: 16, lineHeight: 1.55, color: BODY, margin: "0 0 20px", maxWidth: 1050 }}>
          Rather than acquire riders one ad-click at a time, we sell Conductor for Enterprise to the banks, tech firms
          and corporate HQs already clustered on the Island. We onboard a company's own staff, match colleagues heading
          the same way, and the employer subsidises the platform fee as a staff benefit. LOIs are already in progress.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            ["1 Guaranteed density", "A single 500-person HQ seeds an entire corridor overnight. No cold-start — the passengers and car owners already share a car park.", false],
            ["2 Built-in trust", "Colleagues in the same building, vouched for by the same employer. Two-way verification plus a shared workplace is the highest-trust match a shared ride can have.", false],
            ["3 SaaS-like revenue", "The employer pays a recurring per-seat subscription on top of the 10% take — contracted, predictable revenue that de-risks the transaction line.", true],
          ].map(([h, pp, dark]) => (
            <div key={h as string} style={{ ...(dark ? cardDark : cardLight), padding: 22, gap: 10 }}>
              <div style={{ fontSize: 19, fontWeight: 700 }}>
                <span style={{ color: RED }}>{(h as string).split(" ")[0]}</span> {(h as string).slice(2)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: dark ? DIV : BODY, margin: 0 }}>{pp}</p>
            </div>
          ))}
        </div>
        <p style={{ ...serif, fontSize: 20, lineHeight: 1.3, color: MUTED, margin: "18px 0 0", maxWidth: 1000 }}>
          Every corporate HQ on the Island is a pre-assembled corridor of trusted, recurring demand — waiting to be
          switched on.
        </p>
      </Slide>

      {/* 14 — DELIVERIES --------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Third revenue line · Conductor Deliveries"
        title="Every car finishing a morning commute returns with empty seats and an empty boot."
      >
        <p style={{ fontSize: 16, lineHeight: 1.55, color: BODY, margin: "0 0 20px", maxWidth: 1050 }}>
          Cars going to the Island in the morning come back to the mainland in the afternoon, often empty. That return
          trip is a fully paid-for delivery route with zero marginal fuel cost. We are not building a delivery company
          from scratch; we are bolting a package layer onto a network of cars that already goes where deliveries need to
          go.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <div style={{ ...cardLight, padding: 22, gap: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>
              Now · Q4 2026
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>Partner with an established Lagos delivery operator</div>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: BODY, margin: 0, flex: 1 }}>
              They handle pickup, sorting and last-mile; we plug into their API. Our car owners pick up packages on the
              routes they were already driving. No delivery ops build required.
            </p>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#24A148" }}>Zero-risk go-to-market</div>
          </div>
          <div style={{ ...cardDark, padding: 22, gap: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED }}>
              Then · Q1–Q2 2027
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>Deliveries native in the Conductor app</div>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: DIV, margin: 0, flex: 1 }}>
              Every car owner sees delivery jobs alongside passenger rides. Same fleet, same escrow, same account, no
              partner cut.
            </p>
            <div style={{ fontSize: 14, fontWeight: 700, color: RED }}>Full margin capture</div>
          </div>
          <div style={{ ...cardLight, padding: 22, gap: 8, justifyContent: "center" }}>
            {[
              ["Same supply.", "Vehicles already on the road."],
              ["Zero marginal cost.", "Fuel already spent on the commute."],
              ["Complementary peaks.", "Rides peak at rush hour; deliveries fill midday."],
              ["Cross-sell.", "Drivers earn 15–25% more per day at ~2× utilisation."],
            ].map(([b, t]) => (
              <div key={b} style={{ fontSize: 14, lineHeight: 1.45, color: BODY }}>
                <strong style={{ color: INK }}>{b}</strong> {t}
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* 15 — UNIT ECONOMICS ---------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Unit economics · Ikorodu ↔ Victoria Island"
        title="One corridor, real economics."
      >
        <p style={{ fontSize: 15, lineHeight: 1.5, color: BODY, margin: "0 0 16px" }}>
          Figures from the 5-year projection model, standard 4-seat car, using the actual in-app fare for this route.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 32, alignItems: "start", flex: 1 }}>
          <div style={{ border: `1px solid ${DIV}`, borderRadius: 14, overflow: "hidden", fontSize: 14.5 }}>
            {[
              ["Ride fare per passenger", "₦2,835", false, false],
              ["Blended promo discount", "(₦425)", false, false],
              ["Net paid per passenger", "₦2,410", true, false],
              ["× 4 passengers per trip", "₦9,640", false, false],
              ["Conductor take (10% × 2 sides)", "₦964", true, true],
              ["Driver earnings after take", "₦8,676", false, false],
              ["Driver weekly earnings (5 days)", "₦43,380", false, false],
              ["Driver monthly earnings (20 days)", "₦173,520", true, false],
            ].map(([l, v, bold, red], i, arr) => (
              <div
                key={l as string}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${DIV}` : "none",
                  fontWeight: bold ? 700 : 400,
                  color: red ? RED : bold ? INK : BODY,
                }}
              >
                <span>{l}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            {[
              ["₦4,820", "weekly Conductor take from one 4-seat car running five days", RED],
              ["₦482k", "weekly take with 100 cars on this corridor", INK],
              ["₦2.4m", "weekly take with 500 cars — all from a single corridor", INK],
            ].map(([n, l, c]) => (
              <div key={l}>
                <div style={{ ...serif, fontSize: 48, lineHeight: 1, color: c }}>{n}</div>
                <div style={{ fontSize: 14, lineHeight: 1.4, color: BODY, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* 16 — WHY NOW · ANECDOTE ------------------------------------------ */}
      <Slide
        n={next()}
        dark
        eyebrow="Why we haven't launched yet"
        title={<span style={{ ...serif, fontWeight: 400, fontSize: 30, color: RED }}>&ldquo;We wait for the man. The man does not wait for us.&rdquo;</span>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 40, alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ ...serif, fontSize: 19, lineHeight: 1.4, margin: 0, color: CREAM }}>
              When I was younger, my mother and I stood outside our house every morning waiting for Mr. Ajose, our
              neighbour, to drive us on his way to work. She instilled in me that we must always be the ones ready and
              waiting for him, never the other way around. He was doing us a favour. If we weren't ready when he pulled
              up, he left without us.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, color: DIV }}>
              That discipline is what makes every carpooling arrangement work in Nigeria. Conductor is built on that
              rule: the driver publishes his trip and commits to the route, the pickup point and the time — and the
              passenger must be ready when he arrives. The app holds the passenger to that discipline, not the driver.
              Every design decision flows from this one principle.
            </p>
            <div style={{ fontSize: 15, color: "#D6C3B3" }}>Wale Shekoni, Founder</div>
          </div>
          <img
            src="/deck/images/illust-passenger-and-driver.png"
            alt=""
            style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 20 }}
          />
        </div>
      </Slide>

      {/* 17 — WHY NOW · LESSONS ------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Why we waited · what it taught us"
        title="We could have turned this on 12 months ago. We chose not to."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, justifyContent: "center" }}>
          {[
            ["1", "We flipped the role, and had to teach the flip", "Every Nigerian who has ordered a ride knows the script: passenger books, driver shows up. Conductor flips it — the driver publishes the trip, the passenger shows up. The MVP failed to teach the flip; V1 embeds the concept in the UI itself. We learned this on our own money, before spending an investor's."],
            ["2", "Predictability over randomness", "Nigerians already carpool with ride-hailing — but only for parties and nights out. Random, weekend-peaked, no two rides alike. A repeatable Monday-through-Friday commute at a splittable price is unsolved. 74% of our users commute 3+ days a week; 52% head for the same Island cluster. That is the wedge — 33 months getting it right."],
            ["3", "Chicken-and-egg, solved by supply-side saturation", "Launch to passengers with no drivers and they leave — churn that is unrecoverable. Our answer: saturate supply quietly before turning on demand. ~50% of onboarded car owners work the Island cluster, with pickups spread across residential Lagos. September 15 launches with the density for demand to convert on day one."],
          ].map(([n, h, pp]) => (
            <div key={n} style={{ ...cardLight, flexDirection: "row", gap: 20, padding: 20, alignItems: "flex-start" }}>
              <div style={{ ...serif, fontSize: 46, lineHeight: 1, color: RED, flex: "none", width: 50 }}>{n}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>{h}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, color: BODY, margin: 0 }}>{pp}</p>
              </div>
            </div>
          ))}
        </div>
      </Slide>

      {/* 18 — WHY NOW · INFRASTRUCTURE ------------------------------------ */}
      <Slide
        n={next()}
        eyebrow="Why we waited · front-loaded infrastructure"
        title="We built infrastructure a launched company cannot retrofit."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, flex: 1, alignContent: "center" }}>
          {[
            ["Bank-grade ledger", "Double-entry general ledger mirroring Temenos T24 architecture. Per-user, per-day, per-trip attribution — every naira traceable to source, holder and destination."],
            ["Escrow payment mechanics", "Passenger money held per trip-day, released only after service completion, with a 26-hour dispute window. Five-account per-component escrow model."],
            ["GPS-adjudicated disputes", "Arguments settled by trip data and roster attendance, not customer-service opinion. Append-only timeline, five-occupant roster, driver/peer/self attestations."],
            ["Analytics + admin console", "User panel, ledger viewer, dispute case files, referral leaderboards, KPI dashboards. We can run A/B experiments on live users from day one."],
            ["Verified + banned-identity registry", "Bad actors cannot create new accounts and re-enter. Standard on paper, uncommon in practice."],
          ].map(([h, pp]) => (
            <div key={h} style={{ ...cardLight, padding: 18, gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{h}</div>
              <p style={{ fontSize: 12.5, lineHeight: 1.45, color: BODY, margin: 0 }}>{pp}</p>
            </div>
          ))}
          <div style={{ ...cardDark, padding: 18, gap: 8, justifyContent: "center" }}>
            <div style={{ ...serif, fontSize: 24, lineHeight: 1.15, color: RED }}>Every capability is built, not bought.</div>
            <p style={{ fontSize: 12.5, lineHeight: 1.45, color: DIV, margin: 0 }}>
              Assembling this from vendors would have cost more, taken longer, and left us dependent on suppliers who
              could kill the business. We own the whole stack. That is the moat.
            </p>
          </div>
        </div>
      </Slide>

      {/* 19 — WHY NOW · FAILURE MODES ------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Why we waited · every failure mode designed for"
        title="Anything that can go wrong on a shared ride already has a coded response."
      >
        <p style={{ fontSize: 14, lineHeight: 1.5, color: BODY, margin: "0 0 12px", maxWidth: 1050 }}>
          We are not turning on an untested system. <strong style={{ color: INK }}>50+ live trips</strong> completed
          across multiple Lagos locations, ~100 passengers and 5 drivers — feedback that directly drove V1. Each
          response is product logic backed by the ledger, not a customer-service policy.
        </p>
        <div style={{ border: `1px solid ${DIV}`, borderRadius: 12, overflow: "hidden", background: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr", gap: 20, padding: "9px 20px", borderBottom: `1px solid ${DIV}`, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <span style={{ color: "#C41818" }}>Failure mode</span>
            <span style={{ color: "#24A148" }}>Built-in response</span>
          </div>
          {FAILURES.map(([f, r], i) => (
            <div
              key={f}
              style={{
                display: "grid",
                gridTemplateColumns: "0.5fr 1.5fr",
                gap: 20,
                padding: "8px 20px",
                borderBottom: i < FAILURES.length - 1 ? `1px solid ${DIV}` : "none",
                fontSize: 12.5,
                lineHeight: 1.4,
              }}
            >
              <strong>{f}</strong>
              <span style={{ color: BODY }}>{r}</span>
            </div>
          ))}
        </div>
      </Slide>

      {/* 20 — WHY NOW · CLOSE (gradient) ---------------------------------- */}
      <section className="slide slide--grad" style={{ justifyContent: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
          <p style={{ ...serif, fontSize: 30, lineHeight: 1.3, margin: 0, maxWidth: 1050 }}>
            The right question is not <span style={{ color: CREAM, fontWeight: 700, fontStyle: "normal" }}>&ldquo;why haven't you
            launched yet?&rdquo;</span> It is: how did you get a bank-grade ledger, an escrow engine, a dispute
            adjudicator, a full admin platform, 100 test trips, 20 package deliveries, 1,000 users and a proven CAC — a
            product already stress-tested against every failure mode a shared ride can produce — built before your first
            paid ride?
          </p>
          <p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, margin: 0, color: CREAM, maxWidth: 950 }}>
            33 months of founder-funded salaries and a team invested through ownership, so that when we turn it on on
            September 15, it works the first time.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", fontSize: 15, fontWeight: 600, borderTop: "1px solid rgba(46,28,3,0.25)", paddingTop: 18 }}>
            <span>$0.32 cost per install</span>
            <span>2,160 downloads in 14 days</span>
            <span>Investor money scales a channel that already exists.</span>
          </div>
        </div>
        <div className="slide__footer">
          <span>Conductor · Confidential</span>
          <span>{next()}</span>
        </div>
      </section>

      {/* 21 — MILESTONES + GTM -------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Plan · Milestones and go-to-market"
        title="What we did. What we do next."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 24 }}>
          {[
            ["Q4 2024", "Company incorporated (RC 7952968). MVP build begins.", DIV, false],
            ["Q4 2025", "Public MVP launch. First 500 users onboarded.", DIV, false],
            ["Q3 2026", "V2 rebuild ships: escrow, verification, community. Digital ads begin.", DIV, false],
            ["Sep 15, 2026", "Paid rides launch on the Lagos Island cluster.", RED, true],
            ["By end 2027", "10,000+ car owners · 25,000+ passengers · Enterprise live · Deliveries public · Series A conversation", "#D6C3B3", false],
          ].map(([d, pp, bc, hot]) => (
            <div key={d as string} style={{ borderTop: `2px ${(bc as string) === "#D6C3B3" ? "dashed" : "solid"} ${bc}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ ...serif, fontSize: 24, lineHeight: 1, color: hot ? RED : MUTED }}>{d}</div>
              <p style={{ fontSize: 12.5, lineHeight: 1.45, color: hot ? INK : BODY, fontWeight: hot ? 700 : 400, margin: 0 }}>{pp}</p>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: RED, marginBottom: 12 }}>
          Go-to-market · Corridor-first, community-driven, corporate-scaled
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            ["Phase 1 · Sep–Nov 2026", "Hyper-local launch", "Ikorodu ↔ VI and Ajah ↔ Lekki. Seed density first: 100 verified car owners per corridor before opening the next."],
            ["Phase 2 · Dec 2026–Feb 2027", "Conductor for Enterprise", "Sell to Island HQs with 500+ staff. Onboard employees, match coworkers, employer subsidises the fee. LOIs in progress."],
            ["Phase 3 · Mar–Jun 2027", "Scaled acquisition", "Ads at scale targeting Island-destination commuters. Referral engine. Waitlist conversion."],
          ].map(([ph, h, pp]) => (
            <div key={ph} style={{ ...cardLight, padding: 18, gap: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: RED }}>{ph}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{h}</div>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: BODY, margin: 0 }}>{pp}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 22 — COMPETITION -------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Competitive landscape"
        title="Post-Uber, the field is open. What is left does not fit the commuter."
      >
        <div style={{ border: `1px solid ${DIV}`, borderRadius: 12, overflow: "hidden", background: "#fff", fontSize: 12.5 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.7fr repeat(6,1fr)", padding: "10px 18px", borderBottom: `1px solid ${DIV}`, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: MUTED, textAlign: "center" }}>
            <span />
            {COMP_COLS.map((c, i) => (
              <span key={c} style={{ color: i === 0 ? RED : MUTED }}>{c}</span>
            ))}
          </div>
          {COMP_ROWS.map((row, ri) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1.7fr repeat(6,1fr)",
                padding: "9px 18px",
                borderBottom: ri < COMP_ROWS.length - 1 ? `1px solid ${DIV}` : "none",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <strong style={{ textAlign: "left" }}>{row.label}</strong>
              {row.cells.map(([txt, kind], ci) => {
                const color = kind === "y" ? "#24A148" : kind === "x" ? "#C41818" : kind === "p" ? INK : "#8A7A6B";
                return (
                  <span key={`${row.label}-${ci}`} style={{ color, fontWeight: kind === "y" ? 700 : 400 }}>
                    {txt}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <p style={{ ...serif, fontSize: 20, lineHeight: 1.3, color: MUTED, margin: "18px 0 0", maxWidth: 1000 }}>
          The only carpooling platform, in the only city Uber just left, at the moment Shuttlers is still gated to a
          waitlist.
        </p>
      </Slide>

      {/* 23 — MOAT --------------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Moat"
        title="What competitors cannot copy in six months."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1, alignContent: "center" }}>
          {[
            ["1 Destination-magnet matching", "Every commuter is going to VI, Lekki or Ikeja. We match on destination, not route. On-demand hailing cannot retrofit this."],
            ["2 Two-way verification", "Every competitor verifies drivers. Nobody verifies riders. We do both — and once a workplace or estate community is closed-loop verified, it does not unsubscribe."],
            ["3 Community-scoped groups", "A workplace or estate can be its own private group. Switching cost: your whole community would have to move."],
            ["4 Audit-quality operating spine", "FY2025 audited by Lanre Abidakun & Co. RC 7952968 in Nigeria. Real books, real ops, a real team of 20+."],
          ].map(([h, pp]) => (
            <div key={h} style={{ ...cardLight, padding: 24, gap: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                <span style={{ color: RED }}>{h.split(" ")[0]}</span> {h.slice(2)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: BODY, margin: 0 }}>{pp}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 24 — TEAM --------------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Team"
        title="A team that shipped — friends, and friends of friends."
      >
        <p style={{ fontSize: 15, lineHeight: 1.55, color: BODY, margin: "0 0 20px", maxWidth: 1050 }}>
          We are not a hired-in team. That is how a group this size has kept building for 33 months — on founder-funded
          salaries, with most taking part of their market rate as ownership rather than cash. 20+ contributors across
          engineering, product, design, operations, marketing and QA, in Lagos, London and Canada, with every part of
          the stack built in-house.
        </p>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
          Co-founders
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            ["Wale", "Founder"],
            ["Dimeji", "Co-founder · Chief Technology Officer"],
            ["Bawo", "Co-founder"],
          ].map(([name, role]) => (
            <div key={name} style={{ ...cardLight, padding: 24, gap: 14, flexDirection: "row", alignItems: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#FAE8CF", flex: "none" }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: 13, color: RED, fontWeight: 700, marginTop: 4 }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: "#8A7A6B", margin: "22px 0 0" }}>
          Plus a wider team of 20+ — engineers, PMs, designers, ops, marketing and BD. Friends, and friends of friends —
          most here since the beginning.
        </p>
      </Slide>

      {/* 25 — FINANCIALS · CAPITAL + BURN --------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Financials · Position at 31 Aug 2026"
        title="Built on ~₦1.35b of committed capital. No external funding yet."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 28, alignItems: "start", flex: 1 }}>
          <div style={{ border: `1px solid ${DIV}`, borderRadius: 14, overflow: "hidden", fontSize: 13.5, background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 82px", gap: 10, padding: "11px 20px", borderBottom: `1px solid ${DIV}`, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: MUTED }}>
              <span>Committed capital</span>
              <span style={{ textAlign: "right" }}>₦</span>
              <span style={{ textAlign: "right" }}>$</span>
            </div>
            {[
              ["Founder personal cash deployed", "₦200m", "$148k", false],
              ["Deferred comp — team (20+ contributors)", "₦100m", "$74k", false],
              ["Deferred comp — co-founders", "~₦1.03b", "~$763k", false],
              ["Deferred comp — Marketing Advisory Board", "~₦15m", "~$11k", false],
              ["London & Canada offices", "~₦8.4m", "~$6.2k", false],
              ["Total committed capital & compensation", "~₦1.35b", "~$1.0m", true],
            ].map(([l, naira, usd, total], i, arr) => (
              <div
                key={l as string}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 82px",
                  gap: 10,
                  padding: "11px 20px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${DIV}` : "none",
                  color: BODY,
                  fontWeight: total ? 700 : 400,
                  background: total ? "#FAEDDE" : "transparent",
                }}
              >
                <span>{l}</span>
                <span style={{ textAlign: "right" }}>{naira}</span>
                <span style={{ textAlign: "right" }}>{usd}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["2025 audited loss", "₦119.05m"],
              ["2026 cash burn to 31 Aug", "₦45.8m"],
              ["Current burn rate", "~₦10m / mo"],
            ].map(([l, v]) => (
              <div key={l} style={{ ...cardLight, padding: "16px 20px", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontSize: 14, color: BODY }}>{l}</span>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <div style={{ ...cardDark, padding: 20, gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35 }}>
                Founder loans and deferred comp convert to equity at close, on the same $5M cap as the incoming investor.
              </div>
              <div style={{ fontSize: 13, color: DIV, lineHeight: 1.4 }}>No debt overhang. Clean balance sheet at close.</div>
            </div>
          </div>
        </div>
      </Slide>

      {/* 26 — FINANCIALS · REVENUE RAMP ----------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Projection · Aug 2026 – Dec 2027"
        title="A ₦4b run-rate exiting 2027 — every naira traces to one number."
      >
        <p style={{ fontSize: 13.5, lineHeight: 1.5, color: BODY, margin: "0 0 12px", maxWidth: 1050 }}>
          Bottoms-up, not top-down. Each active car owner generates <strong style={{ color: INK }}>~₦27,000 a month</strong>{" "}
          in platform revenue — 2.5 passengers a trip, 4 days a week, our 10% take on each side. Multiply by active car
          owners and you have the whole model. Growth and conversion rates are the ones we actually recorded across our
          two live performance-marketing apps.
        </p>
        <div style={{ ...cardLight, padding: "16px 18px", gap: 8, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: MUTED }}>
            <span style={{ display: "flex", gap: 16 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: AMBER }} /> Monthly platform revenue
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: RED }} /> Checkpoint month
              </span>
            </span>
            <span>₦m / month</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "end" }}>
            {RAMP.map((b) => (
              <div key={b.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ height: 150, width: "100%", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, marginBottom: 3, color: b.cp ? RED : INK }}>{b.v}</span>
                  <div style={{ width: "100%", maxWidth: 28, height: b.h, minHeight: 3, background: b.cp ? RED : AMBER, borderRadius: "3px 3px 0 0" }} />
                </div>
                <span style={{ fontSize: 9, color: b.cp ? RED : MUTED, fontWeight: b.cp ? 700 : 400, marginTop: 6, whiteSpace: "nowrap" }}>{b.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 24, alignItems: "start" }}>
          <div style={{ border: `1px solid ${DIV}`, borderRadius: 12, overflow: "hidden", fontSize: 13, background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr 0.9fr 0.9fr", gap: 8, padding: "9px 18px", borderBottom: `1px solid ${DIV}`, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: MUTED }}>
              <span>Milestone</span>
              <span style={{ textAlign: "right" }}>Active car owners</span>
              <span style={{ textAlign: "right" }}>Active pax</span>
              <span style={{ textAlign: "right" }}>Monthly rev</span>
            </div>
            {[
              ["Dec 2026", "700", "~1,800", "₦19.8m"],
              ["June 2027", "3,300", "~8,400", "₦103.5m"],
              ["Dec 2027", "10,100", "~25,300", "₦334.6m"],
            ].map(([m, co, pax, rev], i, arr) => (
              <div key={m} style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr 0.9fr 0.9fr", gap: 8, padding: "11px 18px", borderBottom: i < arr.length - 1 ? `1px solid ${DIV}` : "none", color: BODY }}>
                <strong style={{ color: INK }}>{m}</strong>
                <span style={{ textAlign: "right" }}>{co}</span>
                <span style={{ textAlign: "right" }}>{pax}</span>
                <span style={{ textAlign: "right" }}>{rev}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {[
              ["2026", "₦45.5m", "$34k", "Full-year revenue", false],
              ["2027", "₦1.7b", "$1.26m", "Full-year revenue", false],
              ["Exit run-rate", "~₦4b", "$3.0m", "Annualised Dec-2027", true],
            ].map(([yr, v, usd, cap, dark]) => (
              <div key={yr as string} style={{ ...(dark ? cardDark : { ...cardLight, background: "#FAEDDE" }), padding: 14, gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: dark ? RED : MUTED }}>{yr}</div>
                <div style={{ ...serif, fontSize: 28, lineHeight: 1, color: dark ? CREAM : INK }}>{v}</div>
                <div style={{ fontSize: 12, color: dark ? DIV : BODY }}>{usd}</div>
                <div style={{ fontSize: 10.5, color: dark ? "#D6C3B3" : "#8A7A6B", lineHeight: 1.35 }}>{cap}</div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* 27 — VALUATION ---------------------------------------------------- */}
      <Slide
        n={next()}
        eyebrow="Valuation"
        title="$5M cap, anchored on four independent methods."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: 28, alignItems: "stretch", flex: 1 }}>
          <div style={{ border: `1px solid ${DIV}`, borderRadius: 14, overflow: "hidden", fontSize: 14, background: "#fff", alignSelf: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1.2fr", gap: 16, padding: "11px 22px", borderBottom: `1px solid ${DIV}`, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: MUTED }}>
              <span>Method</span>
              <span>Range</span>
              <span>Basis</span>
            </div>
            {[
              ["Reproduction cost × going-concern multiple", "$2.1M–$3.5M", "Rebuild cost + audit + brand + traction"],
              ["African pre-seed mobility comps, 2024–25", "$3M–$5M", "Fez ~$5M, Rida $3–5M, Treepz early $3–4M"],
              ["Forward run-rate multiple", "$4M–$6M", "~$3M annualised run-rate → $5M = 1.7× forward revenue"],
              ["News-catalyst premium", "+20–30%", "Uber exit + Shuttlers POD, timing-adjusted uplift"],
            ].map(([m, r, b], i, arr) => (
              <div key={m} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1.2fr", gap: 16, padding: "14px 22px", borderBottom: i < arr.length - 1 ? `1px solid ${DIV}` : "none", lineHeight: 1.4 }}>
                <strong>{m}</strong>
                <span>{r}</span>
                <span style={{ color: BODY }}>{b}</span>
              </div>
            ))}
          </div>
          <div style={{ ...cardDark, padding: 28, justifyContent: "center", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: RED }}>Anchor</div>
            <div style={{ ...serif, fontSize: 68, lineHeight: 1 }}>$5M</div>
            <div style={{ fontSize: 14, color: DIV, lineHeight: 1.4 }}>
              Top of the defensible band. A live product on both platforms, 1,000 users, 424 car-owner signups, 100
              verified, and ~₦1.35b of aligned commitment already in.
            </div>
            <div style={{ borderTop: "1px solid #514336", paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 14, color: CREAM, lineHeight: 1.4 }}>Founders have committed ~$1M of capital.</div>
              <div style={{ fontSize: 14, color: DIV, lineHeight: 1.4 }}>$200k raise = ~4% — a modest ask for an audited, live, two-sided product.</div>
            </div>
          </div>
        </div>
      </Slide>

      {/* 28 — THE ASK ------------------------------------------------------ */}
      <Slide
        n={next()}
        eyebrow="The ask"
        title="$200k on a $5M SAFE. Twelve months of runway. Three checkpoints."
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr", gap: 28, alignItems: "start", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>Where the $200k goes</div>
            <div style={{ display: "flex", height: 18, borderRadius: 8, overflow: "hidden" }}>
              {[["30%", RED], ["22.5%", INK], ["17.5%", "#DB405A"], ["10%", "#9F6010"], ["10%", MUTED], ["5%", "#D6C3B3"], ["5%", DIV]].map(([w, c], i) => (
                <div key={i} style={{ width: w, background: c }} />
              ))}
            </div>
            <div style={{ border: `1px solid ${DIV}`, borderRadius: 12, overflow: "hidden", fontSize: 13, background: "#fff" }}>
              {[
                [RED, "Marketing and acquisition", "$60k", "30%", "Scale Google & Meta ads to 3× CPI budget; launch passenger-side campaigns"],
                [INK, "Product and infrastructure", "$45k", "22.5%", "V2.1 features, safety infra, admin tools, Conductor Deliveries launch"],
                ["#DB405A", "Ops and driver liquidity", "$35k", "17.5%", "Corridor launch team, driver incentives, corporate outreach"],
                ["#9F6010", "Advisory retainer (partial cash)", "$20k", "10%", "~₦3m/mo cash for the launch window; balance deferred or equity"],
                [MUTED, "Legal, compliance, licensing", "$20k", "10%", "LASTMA, LAGRA and regulatory footings"],
                ["#D6C3B3", "Deliveries go-to-market", "$10k", "5%", "Driver onboarding, package ops, partner logistics"],
                [DIV, "Runway buffer", "$10k", "5%", "Contingency"],
              ].map(([c, cat, amt, pct, what], i, arr) => (
                <div key={cat as string} style={{ display: "grid", gridTemplateColumns: "16px 1.1fr 56px 46px 1.7fr", gap: 12, padding: "9px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${DIV}` : "none", alignItems: "center" }}>
                  <span style={{ width: 14, height: 14, borderRadius: 4, background: c as string }} />
                  <strong>{cat}</strong>
                  <span style={{ textAlign: "right" }}>{amt}</span>
                  <span style={{ textAlign: "right" }}>{pct}</span>
                  <span style={{ color: BODY, fontSize: 12, lineHeight: 1.35 }}>{what}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...cardDark, padding: 22, gap: 10 }}>
              <div style={{ ...serif, fontSize: 48, lineHeight: 1, color: RED }}>$200k</div>
              {[
                ["Instrument", "Post-money SAFE"],
                ["Cap", "$5M"],
                ["Discount", "20%"],
                ["Board seat", "None"],
                ["Pro-rata rights", "Yes, standard"],
              ].map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderTop: i === 0 ? "1px solid #514336" : "none", paddingTop: i === 0 ? 10 : 0 }}>
                  <span style={{ color: "#D6C3B3" }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            {[
              ["By Dec 2026", "700 monthly active car owners · ~1,800 monthly active passengers · ~₦19.8m / mo"],
              ["By June 2027", "3,300 monthly active car owners · ~8,400 monthly active passengers · ~₦103.5m / mo"],
              ["By Dec 2027", "10,100 monthly active car owners · ~25,300 monthly active passengers · ~₦334.6m / mo"],
            ].map(([d, pp]) => (
              <div key={d} style={{ borderTop: `2px solid ${RED}`, paddingTop: 8 }}>
                <div style={{ ...serif, fontSize: 20, lineHeight: 1, color: RED }}>{d}</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.4, color: BODY, margin: "4px 0 0" }}>{pp}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* 29 — THANK YOU ---------------------------------------------------- */}
      <section className="slide slide--dark" style={{ justifyContent: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
          <img
            src="/deck/images/LOGO%202.png"
            alt="Conductor"
            style={{ width: 84, height: 84, background: CREAM, borderRadius: 20 }}
          />
          <h2 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0 }}>
            Let's talk.
          </h2>
          <p style={{ ...serif, fontSize: 26, lineHeight: 1.25, color: RED, margin: 0 }}>
            Interested in partnering, investing, or just seeing the app?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 18, color: DIV, lineHeight: 1.5 }}>
            <div>conductor.ng · admin@conductor.ng · +234 810 690 2386</div>
            <div style={{ fontSize: 15, color: "#D6C3B3" }}>View the live deck and book at conductor.ng/deck</div>
          </div>
        </div>
        <div className="slide__footer">
          <span>Conductor · Confidential</span>
          <span>{next()}</span>
        </div>
      </section>
    </div>
  );
}
