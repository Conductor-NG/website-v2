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
const MARKET_TOP = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Chapter 3 · Market and traction</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">122 users told us where they need to go. 63 of them are going to the same place.</h1>
  <p style="font-size:18px;line-height:1.55;color:#454442;margin:0;max-width:760px">Declared home and workplace from 122 onboarded users, September 2026. Homes scatter across Lagos; workplaces converge on roughly four square kilometres.</p>
</section>
`;

const PIE_CARD = `
<div style="background:#292928;color:#FDFAF6;border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:20px">
  <div style="font-size:16px;color:#E6E5E3;line-height:1.4">of declared commute intent ends in the <span style="color:#E88D0E;font-weight:700">Lagos Island cluster</span></div>
  <div style="display:flex;justify-content:center;padding:4px 0">
    <svg width="180" height="180" viewBox="0 0 180 180" style="flex:none">
      <g transform="rotate(-90 90 90)" fill="none" stroke-width="26">
        <circle cx="90" cy="90" r="70" stroke="#E88D0E" stroke-dasharray="228.71 211.11" stroke-dashoffset="0"></circle>
        <circle cx="90" cy="90" r="70" stroke="#C9C7C4" stroke-dasharray="109.96 329.86" stroke-dashoffset="-228.71"></circle>
        <circle cx="90" cy="90" r="70" stroke="#A5A29F" stroke-dasharray="43.98 395.84" stroke-dashoffset="-338.67"></circle>
        <circle cx="90" cy="90" r="70" stroke="#807E7B" stroke-dasharray="30.79 409.03" stroke-dashoffset="-382.65"></circle>
        <circle cx="90" cy="90" r="70" stroke="#5C5A57" stroke-dasharray="26.39 413.43" stroke-dashoffset="-413.44"></circle>
      </g>
      <text x="90" y="86" text-anchor="middle" style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:36px;fill:#E88D0E">52%</text>
      <text x="90" y="106" text-anchor="middle" style="font-size:11px;fill:#ACA9A6;letter-spacing:0.1em">ISLAND</text>
    </svg>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:14px">
    <div style="display:flex;align-items:center;gap:10px"><span style="width:12px;height:12px;border-radius:3px;background:#E88D0E;flex:none"></span><span style="flex:1;color:#FDFAF6">Island cluster</span><strong style="color:#E88D0E">63 · 52%</strong></div>
    <div style="display:flex;align-items:center;gap:10px;color:#E6E5E3"><span style="width:12px;height:12px;border-radius:3px;background:#C9C7C4;flex:none"></span><span style="flex:1">Mainland (Yaba, Surulere, Ajao)</span><span>30 · 25%</span></div>
    <div style="display:flex;align-items:center;gap:10px;color:#E6E5E3"><span style="width:12px;height:12px;border-radius:3px;background:#A5A29F;flex:none"></span><span style="flex:1">Ikeja + Ikeja GRA</span><span>12 · 10%</span></div>
    <div style="display:flex;align-items:center;gap:10px;color:#E6E5E3"><span style="width:12px;height:12px;border-radius:3px;background:#807E7B;flex:none"></span><span style="flex:1">Other Lagos</span><span>9 · 7%</span></div>
    <div style="display:flex;align-items:center;gap:10px;color:#E6E5E3"><span style="width:12px;height:12px;border-radius:3px;background:#5C5A57;flex:none"></span><span style="flex:1">Ogun-state adjacent</span><span>8 · 6%</span></div>
  </div>
</div>
`;

// Recurring-demand donut with direct leader-line labels (so no legend-matching)
// and a blue palette distinct from the orange/grey Island donut above it.
// Built at module load — coordinates computed, then written as static SVG.
function recurringDonut(): string {
  const cx = 300;
  const cy = 190;
  const r = 96;
  const sw = 44;
  const data = [
    { label: "5 days", count: 38, pct: 31, color: "#1E3A8A" },
    { label: "6 days", count: 16, pct: 13, color: "#1D4ED8" },
    { label: "7 days", count: 16, pct: 13, color: "#2563EB" },
    { label: "4 days", count: 6, pct: 5, color: "#3B82F6" },
    { label: "3 days", count: 14, pct: 12, color: "#60A5FA" },
    { label: "2 days", count: 10, pct: 8, color: "#93C5FD" },
    { label: "1 day", count: 22, pct: 18, color: "#BFDBFE" },
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
        `<polyline points="${l.x1.toFixed(1)},${l.y1.toFixed(1)} ${elbowX.toFixed(1)},${l.ly.toFixed(1)} ${labelX.toFixed(1)},${l.ly.toFixed(1)}" fill="none" stroke="#C9C7C4" stroke-width="1"></polyline>`,
        `<circle cx="${l.x1.toFixed(1)}" cy="${l.y1.toFixed(1)}" r="2.5" fill="${l.d.color}"></circle>`,
        `<text x="${tx.toFixed(1)}" y="${(l.ly - 2).toFixed(1)}" text-anchor="${anchor}" style="font-size:13px;font-weight:700;fill:#292928">${l.d.label}</text>`,
        `<text x="${tx.toFixed(1)}" y="${(l.ly + 13).toFixed(1)}" text-anchor="${anchor}" style="font-size:12px;fill:#676563">${l.d.count} · ${l.d.pct}%</text>`,
      );
    }
  }
  return `<svg viewBox="0 0 600 380" width="100%" style="max-width:560px;display:block;margin:0 auto">
    <g transform="rotate(-90 ${cx} ${cy})" fill="none" stroke-width="${sw}" stroke-linecap="butt">${rings.join("")}</g>
    ${parts.join("")}
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:46px;fill:#1D4ED8">57%</text>
    <text x="${cx}" y="${cy + 20}" text-anchor="middle" style="font-size:12px;fill:#909596;letter-spacing:0.12em">5+ DAYS</text>
  </svg>`;
}

const RECURRING_DONUT = recurringDonut();

const MARKET_REST = `
<section style="background:#fff;border-top:1px solid #E6E5E3;border-bottom:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Recurring demand</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">57% commute five or more days a week.</h2>
      <p style="font-size:17px;line-height:1.55;color:#454442;margin:0">Not one-off rides — recurring, predictable, week in, week out. That is what makes carpooling work economically, and what on-demand hailing never captured. Every driver–passenger pair, once matched, is a weekly recurring revenue stream.</p>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:24px;line-height:1.3;color:#676563;margin:0">We are not building a route. We are building a magnet.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      ${RECURRING_DONUT}
      <div style="display:flex;justify-content:space-between;border-top:1px solid #E6E5E3;padding-top:12px;margin-top:6px;font-weight:700;font-size:15px"><span>5+ days a week (recurring commute)</span><span style="color:#1D4ED8">70 · 57%</span></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Traction</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">795 users. 58 verified car owners. Growing 65–87% month over month.</h2>
  </div>
  <div style="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,0.8fr);gap:32px;align-items:stretch">
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px">
      <div style="display:flex;gap:20px;font-size:14px;color:#454442;flex-wrap:wrap"><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#E6E5E3;display:inline-block"></span>Cumulative users</span><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#F0C379;display:inline-block"></span>Car owners onboarded</span><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#E88D0E;display:inline-block"></span>Verifiable car owners</span></div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:14px;height:240px;align-items:end;border-bottom:1px solid #E6E5E3">
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:73.6%;background:#E6E5E3;border-radius:4px 4px 0 0"></div><div style="flex:1;height:32.3%;background:#F0C379;border-radius:4px 4px 0 0"></div><div style="flex:1;height:3.9%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:74.5%;background:#E6E5E3;border-radius:4px 4px 0 0"></div><div style="flex:1;height:32.7%;background:#F0C379;border-radius:4px 4px 0 0"></div><div style="flex:1;height:4%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:77.5%;background:#E6E5E3;border-radius:4px 4px 0 0"></div><div style="flex:1;height:35.3%;background:#F0C379;border-radius:4px 4px 0 0"></div><div style="flex:1;height:4.2%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:81.6%;background:#E6E5E3;border-radius:4px 4px 0 0"></div><div style="flex:1;height:37.7%;background:#F0C379;border-radius:4px 4px 0 0"></div><div style="flex:1;height:5.8%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:94.7%;background:#E6E5E3;border-radius:4px 4px 0 0"></div><div style="flex:1;height:49%;background:#F0C379;border-radius:4px 4px 0 0"></div><div style="flex:1;height:6%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div>
        <div style="display:flex;gap:3px;align-items:end;height:100%"><div style="flex:1;height:100%;background:#E6E5E3;border-radius:4px 4px 0 0"></div><div style="flex:1;height:53.3%;background:#F0C379;border-radius:4px 4px 0 0"></div><div style="flex:1;height:7.3%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:14px;font-size:13px;color:#676563;text-align:center"><span>27 Jul</span><span>03 Aug</span><span>10 Aug</span><span>17 Aug</span><span>24 Aug</span><span>31 Aug</span></div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;font-size:15px;border-top:1px solid #E6E5E3;padding-top:14px">
        <span style="color:#676563">31 Aug 2026</span><strong style="text-align:right">795</strong><strong style="text-align:right">424</strong><strong style="text-align:right">58</strong>
        <span style="color:#676563">5-week change</span><span style="text-align:right;color:#E88D0E;font-weight:700">+36%</span><span style="text-align:right;color:#E88D0E;font-weight:700">+65%</span><span style="text-align:right;color:#E88D0E;font-weight:700">+87%</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#676563">Acquisition · Google Ads, 21 Aug – 3 Sep</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">2,160</div><div style="font-size:14px;color:#454442;margin-top:6px">downloads in 14 days</div></div>
        <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">$0.32</div><div style="font-size:14px;color:#454442;margin-top:6px">cost per install</div></div>
        <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">6.8%</div><div style="font-size:14px;color:#454442;margin-top:6px">download → any signup</div></div>
        <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">5.7%</div><div style="font-size:14px;color:#454442;margin-top:6px">download → car owner onboarded</div></div>
        <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1">0.56%</div><div style="font-size:14px;color:#454442;margin-top:6px">download → verifiable driver</div></div>
        <div style="background:#292928;color:#FDFAF6;border-radius:16px;padding:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:40px;line-height:1;color:#E88D0E">$57</div><div style="font-size:14px;color:#E6E5E3;margin-top:6px">cost per verified car owner</div></div>
      </div>
      <p style="font-size:15px;line-height:1.5;color:#454442;margin:0">The model projected 1,200 car-owner downloads for month one. We are pacing at 4,600 a month on car-owner ads alone — <strong style="color:#292928">3.8× our own projection</strong>, on a limited paid budget. Passenger-side ads have not launched.</p>
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
