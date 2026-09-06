import { DeckTracker } from "../deck-client";
import { CommuteMap } from "../commute-map-loader";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/market.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
//
// The origins/destinations static map images were replaced by an interactive
// Leaflet map (<CommuteMap/>). MARKET_TOP is the chapter header; PIE_CARD is the
// "52% Island cluster" donut that now sits beside the live map; MARKET_REST is
// everything from the "Recurring demand" section onward.
export const MARKET_TOP = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 3 · Market and traction</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">We rebuilt V1 to learn where Lagos commutes. 52% are headed for the same place.</h1>
  <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:760px">At onboarding, every user now declares home and workplace. Cleaned and mapped, the pattern is unmistakable — homes scatter across Lagos, but workplaces converge on a few square kilometres of Lagos Island.</p>
</section>
`;

export const PIE_CARD = `
<div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:20px">
  <div style="font-size:16px;color:#ECDFCE;line-height:1.4">of declared commute intent ends in the <span style="color:#E98B20;font-weight:700">Lagos Island cluster</span></div>
  <div style="display:flex;justify-content:center;padding:4px 0">
    <svg width="180" height="180" viewBox="0 0 180 180" style="flex:none">
      <g transform="rotate(-90 90 90)" fill="none" stroke-width="26">
        <circle cx="90" cy="90" r="70" stroke="#E98B20" stroke-dasharray="228.71 211.11" stroke-dashoffset="0"></circle>
        <circle cx="90" cy="90" r="70" stroke="#C88A4F" stroke-dasharray="109.96 329.86" stroke-dashoffset="-228.71"></circle>
        <circle cx="90" cy="90" r="70" stroke="#BBA890" stroke-dasharray="43.98 395.84" stroke-dashoffset="-338.67"></circle>
        <circle cx="90" cy="90" r="70" stroke="#D8CBB8" stroke-dasharray="30.79 409.03" stroke-dashoffset="-382.65"></circle>
        <circle cx="90" cy="90" r="70" stroke="#ECDFCE" stroke-dasharray="26.39 413.43" stroke-dashoffset="-413.44"></circle>
      </g>
      <text x="90" y="86" text-anchor="middle" style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:36px;fill:#E98B20">52%</text>
      <text x="90" y="106" text-anchor="middle" style="font-size:11px;fill:#D6C3B3;letter-spacing:0.1em">ISLAND</text>
    </svg>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:14px">
    <div style="display:flex;align-items:center;gap:10px"><span style="width:12px;height:12px;border-radius:3px;background:#E98B20;flex:none"></span><span style="flex:1;color:#FFF8F0">Island cluster</span><strong style="color:#E98B20">52%</strong></div>
    <div style="display:flex;align-items:center;gap:10px;color:#ECDFCE"><span style="width:12px;height:12px;border-radius:3px;background:#C88A4F;flex:none"></span><span style="flex:1">Mainland (Yaba, Surulere, Ajao)</span><span>25%</span></div>
    <div style="display:flex;align-items:center;gap:10px;color:#ECDFCE"><span style="width:12px;height:12px;border-radius:3px;background:#BBA890;flex:none"></span><span style="flex:1">Ikeja + Ikeja GRA</span><span>10%</span></div>
    <div style="display:flex;align-items:center;gap:10px;color:#ECDFCE"><span style="width:12px;height:12px;border-radius:3px;background:#D8CBB8;flex:none"></span><span style="flex:1">Other Lagos</span><span>7%</span></div>
    <div style="display:flex;align-items:center;gap:10px;color:#ECDFCE"><span style="width:12px;height:12px;border-radius:3px;background:#ECDFCE;flex:none"></span><span style="flex:1">Ogun-state adjacent</span><span>6%</span></div>
  </div>
</div>
`;

// Recurring-demand donut with direct leader-line labels (so no legend-matching).
// Signature-red ramp for the >=3-day slices (which meet our minimum trip
// length) and warm-grey for the 1-2 day slices, distinct from the amber Island
// donut above it. Built at module load — coordinates computed, then static SVG.
function recurringDonut(): string {
  const cx = 300;
  const cy = 190;
  const r = 96;
  const sw = 44;
  const data = [
    { label: "5 days", count: 38, pct: 31, color: "#EE4643" },
    { label: "6 days", count: 16, pct: 13, color: "#F26F6C" },
    { label: "7 days", count: 16, pct: 13, color: "#F6938F" },
    { label: "4 days", count: 6, pct: 5, color: "#F9B3B0" },
    { label: "3 days", count: 14, pct: 12, color: "#FBD0CE" },
    { label: "2 days", count: 10, pct: 8, color: "#D6C3B3" },
    { label: "1 day", count: 22, pct: 18, color: "#ECDFCE" },
  ];
  const total = data.reduce((s, d) => s + d.count, 0);
  const C = 2 * Math.PI * r;
  const rings: string[] = [];
  type Lab = { d: (typeof data)[number]; x1: number; y1: number; right: boolean; ly: number };
  const labels: Lab[] = [];
  let acc = 0;
  for (const d of data) {
    const len = (d.count / total) * C;
    const gap = C - len;
    rings.push(
      `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${d.color}" stroke-dasharray="${len.toFixed(2)} ${gap.toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}"></circle>`,
    );
    const mid = (acc + len / 2) / C;
    const theta = ((-90 + mid * 360) * Math.PI) / 180;
    labels.push({
      d,
      x1: cx + (r + sw / 2) * Math.cos(theta),
      y1: cy + (r + sw / 2) * Math.sin(theta),
      right: Math.cos(theta) >= 0,
      ly: cy + (r + sw / 2 + 16) * Math.sin(theta),
    });
    acc += len;
  }
  // De-collide labels on each side (sort by y, enforce a minimum gap).
  const spread = (side: boolean) => {
    const arr = labels.filter((l) => l.right === side).sort((a, b) => a.ly - b.ly);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].ly - arr[i - 1].ly < 34) arr[i].ly = arr[i - 1].ly + 34;
    }
    return arr;
  };
  const parts: string[] = [];
  for (const side of [true, false]) {
    const arr = spread(side);
    const labelX = side ? cx + r + sw / 2 + 60 : cx - r - sw / 2 - 60;
    const elbowX = side ? labelX - 14 : labelX + 14;
    const anchor = side ? "start" : "end";
    const tx = side ? labelX + 6 : labelX - 6;
    for (const l of arr) {
      parts.push(
        `<polyline points="${l.x1.toFixed(1)},${l.y1.toFixed(1)} ${elbowX.toFixed(1)},${l.ly.toFixed(1)} ${labelX.toFixed(1)},${l.ly.toFixed(1)}" fill="none" stroke="#D8CBB8" stroke-width="1"></polyline>`,
        `<circle cx="${l.x1.toFixed(1)}" cy="${l.y1.toFixed(1)}" r="2.5" fill="${l.d.color}"></circle>`,
        `<text x="${tx.toFixed(1)}" y="${(l.ly - 2).toFixed(1)}" text-anchor="${anchor}" style="font-size:13px;font-weight:700;fill:#211A14">${l.d.label}</text>`,
        `<text x="${tx.toFixed(1)}" y="${(l.ly + 13).toFixed(1)}" text-anchor="${anchor}" style="font-size:12px;fill:#6B5D4E">${l.d.pct}%</text>`,
      );
    }
  }
  return `<svg viewBox="0 0 600 380" width="100%" style="max-width:560px;display:block;margin:0 auto">
    <g transform="rotate(-90 ${cx} ${cy})" fill="none" stroke-width="${sw}" stroke-linecap="butt">${rings.join("")}</g>
    ${parts.join("")}
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:46px;fill:#EE4643">74%</text>
    <text x="${cx}" y="${cy + 20}" text-anchor="middle" style="font-size:12px;fill:#8A7A6B;letter-spacing:0.12em">3+ DAYS</text>
  </svg>`;
}

const RECURRING_DONUT = recurringDonut();

export const MARKET_REST = `
<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Recurring demand</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">74% commute three or more days a week.</h2>
      <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">Not one-off rides — recurring, predictable, week in, week out. That is what makes carpooling work economically, and what on-demand hailing never captured. It is why a trip must run at least three days a week: that is where predictable, poolable demand begins, and where a driver–passenger pair becomes a weekly recurring revenue stream.</p>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:24px;line-height:1.3;color:#6B5D4E;margin:0">We are not building a route. We are building a magnet.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      ${RECURRING_DONUT}
      <div style="display:flex;justify-content:space-between;border-top:1px solid #ECDFCE;padding-top:12px;margin-top:6px;font-weight:700;font-size:15px"><span>3+ days a week — our minimum trip length</span><span style="color:#EE4643">74%</span></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Traction</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">1,000 users. 100 verified car owners. Growing 65–87% month over month.</h2>
  </div>
  <div style="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,0.8fr);gap:32px;align-items:stretch">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px">
      <div style="display:flex;gap:20px;font-size:14px;color:#514336;flex-wrap:wrap"><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#ECDFCE;display:inline-block"></span>Cumulative users</span><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#F0A24A;display:inline-block"></span>Car owners onboarded</span><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#EE4643;display:inline-block"></span>Verifiable car owners</span></div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:14px;height:240px;align-items:end;border-bottom:1px solid #ECDFCE">
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:73.6%;background:#ECDFCE;border-radius:4px 4px 0 0"></div><div style="flex:1;height:32.3%;background:#F0A24A;border-radius:4px 4px 0 0"></div><div style="flex:1;height:3.9%;background:#EE4643;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:74.5%;background:#ECDFCE;border-radius:4px 4px 0 0"></div><div style="flex:1;height:32.7%;background:#F0A24A;border-radius:4px 4px 0 0"></div><div style="flex:1;height:4%;background:#EE4643;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:77.5%;background:#ECDFCE;border-radius:4px 4px 0 0"></div><div style="flex:1;height:35.3%;background:#F0A24A;border-radius:4px 4px 0 0"></div><div style="flex:1;height:4.2%;background:#EE4643;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:81.6%;background:#ECDFCE;border-radius:4px 4px 0 0"></div><div style="flex:1;height:37.7%;background:#F0A24A;border-radius:4px 4px 0 0"></div><div style="flex:1;height:5.8%;background:#EE4643;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:94.7%;background:#ECDFCE;border-radius:4px 4px 0 0"></div><div style="flex:1;height:49%;background:#F0A24A;border-radius:4px 4px 0 0"></div><div style="flex:1;height:6%;background:#EE4643;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:100%;background:#ECDFCE;border-radius:4px 4px 0 0"></div><div style="flex:1;height:53.3%;background:#F0A24A;border-radius:4px 4px 0 0"></div><div style="flex:1;height:7.3%;background:#EE4643;border-radius:4px 4px 0 0"></div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:14px;font-size:13px;color:#6B5D4E;text-align:center"><span>27 Jul</span><span>03 Aug</span><span>10 Aug</span><span>17 Aug</span><span>24 Aug</span><span>31 Aug</span></div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;font-size:15px;border-top:1px solid #ECDFCE;padding-top:14px">
        <span style="color:#6B5D4E">31 Aug 2026</span><strong style="text-align:right">795</strong><strong style="text-align:right">424</strong><strong style="text-align:right">58</strong>
        <span style="color:#6B5D4E">5-week change</span><span style="text-align:right;color:#EE4643;font-weight:700">+36%</span><span style="text-align:right;color:#EE4643;font-weight:700">+65%</span><span style="text-align:right;color:#EE4643;font-weight:700">+87%</span>
      </div>
      <div style="font-size:13px;color:#6B5D4E;line-height:1.4">Weekly cumulative to 31 Aug 2026 — the ramp has since carried us past <strong style="color:#EE4643">1,000 users</strong> and <strong style="color:#EE4643">100 verified car owners</strong>.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5D4E">Acquisition · Google Ads, 21 Aug – 3 Sep</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">2,160</div><div style="font-size:14px;color:#514336;margin-top:6px">downloads in 14 days</div></div>
        <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">$0.32</div><div style="font-size:14px;color:#514336;margin-top:6px">cost per install</div></div>
        <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">6.8%</div><div style="font-size:14px;color:#514336;margin-top:6px">download → any signup</div></div>
        <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">5.7%</div><div style="font-size:14px;color:#514336;margin-top:6px">download → car owner onboarded</div></div>
        <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">0.56%</div><div style="font-size:14px;color:#514336;margin-top:6px">download → verifiable driver</div></div>
        <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1;color:#E98B20">4,600</div><div style="font-size:14px;color:#ECDFCE;margin-top:6px">car-owner downloads / mo — 3.8× projection</div></div>
      </div>
      <p style="font-size:15px;line-height:1.5;color:#514336;margin:0">The model projected 1,200 car-owner downloads for month one. We are pacing at 4,600 a month on car-owner ads alone — <strong style="color:#211A14">3.8× our own projection</strong>, on a limited paid budget. Passenger-side ads have not launched.</p>
    </div>
  </div>
</section>
`;

export default function DeckMarket() {
  return (
    <>
      <DeckTracker slide="market" />
      <main>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
        <div dangerouslySetInnerHTML={{ __html: MARKET_TOP }} />
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px 72px",
            width: "100%",
            boxSizing: "border-box",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)",
            gap: 24,
            alignItems: "start",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <CommuteMap />
          </div>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
          <div dangerouslySetInnerHTML={{ __html: PIE_CARD }} />
        </section>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
        <div dangerouslySetInnerHTML={{ __html: MARKET_REST }} />
      </main>
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "product", label: "Product" }} next={{ slug: "model", label: "Model" }} />
    </>
  );
}
