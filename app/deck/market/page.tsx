import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/market.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const MARKET = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Chapter 3 · Market and traction</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">122 users told us where they need to go. 63 of them are going to the same place.</h1>
  <p style="font-size:18px;line-height:1.55;color:#454442;margin:0;max-width:760px">Declared pickup and drop-off from 122 onboarded users, September 2026. Origins scatter across Lagos; destinations converge on roughly four square kilometres.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px">
  <div style="display:flex;flex-direction:column;gap:12px"><div style="font-size:20px;font-weight:700">Origins scatter across Lagos</div><img src="/deck/images/pickup%20map%20markers.png" alt="Pickup map" style="width:100%;border-radius:16px;border:1px solid #E6E5E3"><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">Ikorodu, Ajah, Berger, Yaba, Surulere, Sangotedo, and Ogun-state suburbs such as Mowe, Ibafo and Asese.</p></div>
  <div style="display:flex;flex-direction:column;gap:12px"><div style="font-size:20px;font-weight:700">Destinations converge on the Island</div><img src="/deck/images/destinantion%20map%20markers.png" alt="Destination map" style="width:100%;border-radius:16px;border:1px solid #E6E5E3"><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">Lagos Island, Victoria Island, Lekki Phase 1, Ikoyi. Different addresses, functionally the same destination.</p></div>
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
</section>

<section style="background:#fff;border-top:1px solid #E6E5E3;border-bottom:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Recurring demand</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">57% commute five or more days a week.</h2>
      <p style="font-size:17px;line-height:1.55;color:#454442;margin:0">Not one-off rides — recurring, predictable, week in, week out. That is what makes carpooling work economically, and what on-demand hailing never captured. Every driver–passenger pair, once matched, is a weekly recurring revenue stream.</p>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:24px;line-height:1.3;color:#676563;margin:0">We are not building a route. We are building a magnet.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;justify-content:center">
        <svg width="180" height="180" viewBox="0 0 180 180" style="flex:none">
          <g transform="rotate(-90 90 90)" fill="none" stroke-width="26">
            <circle cx="90" cy="90" r="70" stroke="#E88D0E" stroke-dasharray="137.0 302.82" stroke-dashoffset="0"></circle>
            <circle cx="90" cy="90" r="70" stroke="#E8A94A" stroke-dasharray="57.68 382.14" stroke-dashoffset="-137.0"></circle>
            <circle cx="90" cy="90" r="70" stroke="#F0C379" stroke-dasharray="57.68 382.14" stroke-dashoffset="-194.68"></circle>
            <circle cx="90" cy="90" r="70" stroke="#D5D3D0" stroke-dasharray="21.63 418.19" stroke-dashoffset="-252.36"></circle>
            <circle cx="90" cy="90" r="70" stroke="#B7B4B1" stroke-dasharray="50.47 389.35" stroke-dashoffset="-273.99"></circle>
            <circle cx="90" cy="90" r="70" stroke="#908E8B" stroke-dasharray="36.05 403.77" stroke-dashoffset="-324.46"></circle>
            <circle cx="90" cy="90" r="70" stroke="#6B6966" stroke-dasharray="79.31 360.51" stroke-dashoffset="-360.51"></circle>
          </g>
          <text x="90" y="86" text-anchor="middle" style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:36px;fill:#E88D0E">57%</text>
          <text x="90" y="106" text-anchor="middle" style="font-size:11px;fill:#909596;letter-spacing:0.1em">5+ DAYS</text>
        </svg>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;min-width:190px">
          <div style="display:flex;align-items:center;gap:10px;color:#292928"><span style="width:12px;height:12px;border-radius:3px;background:#E88D0E;flex:none"></span><span style="flex:1;font-weight:700">5 days</span><strong style="color:#E88D0E">38 · 31%</strong></div>
          <div style="display:flex;align-items:center;gap:10px;color:#454442"><span style="width:12px;height:12px;border-radius:3px;background:#E8A94A;flex:none"></span><span style="flex:1">6 days</span><span>16 · 13%</span></div>
          <div style="display:flex;align-items:center;gap:10px;color:#454442"><span style="width:12px;height:12px;border-radius:3px;background:#F0C379;flex:none"></span><span style="flex:1">7 days</span><span>16 · 13%</span></div>
          <div style="display:flex;align-items:center;gap:10px;color:#454442"><span style="width:12px;height:12px;border-radius:3px;background:#B7B4B1;flex:none"></span><span style="flex:1">3 days</span><span>14 · 12%</span></div>
          <div style="display:flex;align-items:center;gap:10px;color:#454442"><span style="width:12px;height:12px;border-radius:3px;background:#6B6966;flex:none"></span><span style="flex:1">1 day</span><span>22 · 18%</span></div>
          <div style="display:flex;align-items:center;gap:10px;color:#454442"><span style="width:12px;height:12px;border-radius:3px;background:#908E8B;flex:none"></span><span style="flex:1">2 days</span><span>10 · 8%</span></div>
          <div style="display:flex;align-items:center;gap:10px;color:#454442"><span style="width:12px;height:12px;border-radius:3px;background:#D5D3D0;flex:none"></span><span style="flex:1">4 days</span><span>6 · 5%</span></div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;border-top:1px solid #E6E5E3;padding-top:12px;margin-top:6px;font-weight:700;font-size:15px"><span>5+ days a week (recurring commute)</span><span style="color:#E88D0E">70 · 57%</span></div>
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
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: MARKET }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "product", label: "Product" }} next={{ slug: "model", label: "Model" }} />
    </>
  );
}
