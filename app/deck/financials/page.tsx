import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/financials.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const FINANCIALS = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Chapter 8 · Financials</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">Built on ~₦1.35b of committed capital. No external funding yet.</h1>
  <p style="font-size:18px;line-height:1.55;color:#454442;margin:0;max-width:760px">Position as at 31 August 2026. Audited FY2025 accounts by Lanre Abidakun &amp; Co. (Chartered Accountants), Abuja, available on request. £1 ≈ ₦1,920 · $1 ≈ ₦1,500.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,0.7fr);gap:32px;align-items:start">
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.35">
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#676563"><span>Committed capital</span><span style="text-align:right">₦</span><span style="text-align:right">$</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Founder personal cash deployed</span><span style="text-align:right">₦200m</span><span style="text-align:right">$133k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Deferred market-rate compensation — team (20+ contributors)</span><span style="text-align:right">₦100m</span><span style="text-align:right">$67k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Deferred market-rate compensation — co-founders</span><span style="text-align:right">~₦1.03b</span><span style="text-align:right">~$685k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Deferred compensation — Marketing Advisory Board (3 months × ₦5m)</span><span style="text-align:right">~₦15m</span><span style="text-align:right">~$10k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;color:#454442"><span>London office (unbooked historical + ongoing)</span><span style="text-align:right">~₦7.2m</span><span style="text-align:right">~$4.8k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Canada office (since Feb 2026)</span><span style="text-align:right">~₦1.2m</span><span style="text-align:right">~$0.8k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:16px 24px;border-bottom:1px solid #E6E5E3;font-weight:700;background:#FAF6ED"><span>Total committed capital and compensation</span><span style="text-align:right">~₦1.35b</span><span style="text-align:right">~$905k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;color:#909596"><span>Google Workspace / Cloud credits leveraged (in-kind)</span><span style="text-align:right">—</span><span style="text-align:right">~$13k</span></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:14px">
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#454442">2025 audited loss</span><span style="font-size:22px;font-weight:700">₦119.05m</span></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#454442">2026 cash burn to 31 Aug</span><span style="font-size:22px;font-weight:700">₦45.8m</span></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#454442">Revenue to date (Paystack)</span><span style="font-size:22px;font-weight:700">₦71k</span></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#454442">Current burn rate</span><span style="font-size:22px;font-weight:700">~₦5m / mo</span></div>
    <div style="background:#292928;color:#FDFAF6;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:17px;font-weight:700;line-height:1.35">All founder loans and deferred compensation convert to equity at close, on the same $5M cap as the incoming investor.</div><div style="font-size:15px;color:#E6E5E3;line-height:1.4">No debt overhang. Clean balance sheet at round close.</div></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #E6E5E3;border-bottom:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:64px 32px;display:grid;grid-template-columns:minmax(0,0.8fr) minmax(0,1.2fr);gap:40px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Co-founder deferred compensation</div>
      <h2 style="font-size:30px;font-weight:700;line-height:1.15;letter-spacing:-0.01em;margin:0">The math behind ~₦1.03b</h2>
      <p style="font-size:15px;line-height:1.55;color:#454442;margin:0">Each co-founder has worked unpaid at market rate, benchmarked at £5,000 a month — a conservative chief-level UK rate, roughly half of what actual chief titles command in London. Omolara Shekoni (80% owner, silent partner) draws deferred salary as she has been formally listed as Finance &amp; Administration Manager since day one.</p>
    </div>
    <div style="border:1px solid #E6E5E3;border-radius:16px;overflow:hidden;font-size:15px">
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px;padding:12px 20px;border-bottom:1px solid #E6E5E3;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#676563"><span>Co-founder</span><span>Months (since)</span><span style="text-align:right">At £5k/mo</span><span style="text-align:right">₦ equiv.</span></div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px;padding:12px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">Hammed Shekoni</strong><span>33 (Jan 2024)</span><span style="text-align:right">£165k</span><span style="text-align:right">~₦317m</span></div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px;padding:12px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">Oladimeji Shekoni</strong><span>33 (Jan 2024)</span><span style="text-align:right">£165k</span><span style="text-align:right">~₦317m</span></div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px;padding:12px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">Omolara Shekoni</strong><span>33 (Jan 2024)</span><span style="text-align:right">£165k</span><span style="text-align:right">~₦317m</span></div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px;padding:12px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">Bawo Maleghemi</strong><span>8 (Feb 2026)</span><span style="text-align:right">£40k</span><span style="text-align:right">~₦77m</span></div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px;padding:14px 20px;font-weight:700;background:#FAF6ED"><span>Total</span><span></span><span style="text-align:right">£535k · ~$685k</span><span style="text-align:right">~₦1.03b</span></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px;position:relative">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Five-year projection</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">₦107b revenue by 2030. Break-even in year one.</h2>
    <p style="font-size:17px;line-height:1.55;color:#454442;margin:0">Model assumes 20% month-on-month download growth ramping to 30% by mid-2027 and converging to 15% at maturity. Current car-owner downloads are pacing 3.8× the month-one projection.</p>
  </div>
  <div style="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,0.8fr);gap:32px;align-items:stretch">
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;gap:20px;font-size:14px;color:#454442"><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#E88D0E;display:inline-block"></span>Revenue (₦b)</span><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#292928;display:inline-block"></span>Net profit (₦b)</span></div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:24px;height:260px;align-items:end;border-bottom:1px solid #E6E5E3;padding:0 8px">
        <div style="display:flex;gap:4px;align-items:end;height:100%"><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;font-weight:700;margin-bottom:4px">0.45</span><div style="width:100%;height:1%;min-height:3px;background:#E88D0E;border-radius:4px 4px 0 0"></div></div><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;color:#676563;margin-bottom:4px">0.02</span><div style="width:100%;height:1%;min-height:3px;background:#292928;border-radius:4px 4px 0 0"></div></div></div>
        <div style="display:flex;gap:4px;align-items:end;height:100%"><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;font-weight:700;margin-bottom:4px">3.9</span><div style="width:100%;height:4%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;color:#676563;margin-bottom:4px">2.4</span><div style="width:100%;height:2.5%;background:#292928;border-radius:4px 4px 0 0"></div></div></div>
        <div style="display:flex;gap:4px;align-items:end;height:100%"><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;font-weight:700;margin-bottom:4px">15.9</span><div style="width:100%;height:14%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;color:#676563;margin-bottom:4px">10.7</span><div style="width:100%;height:9.5%;background:#292928;border-radius:4px 4px 0 0"></div></div></div>
        <div style="display:flex;gap:4px;align-items:end;height:100%"><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;font-weight:700;margin-bottom:4px">44.4</span><div style="width:100%;height:38%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;color:#676563;margin-bottom:4px">30.6</span><div style="width:100%;height:26%;background:#292928;border-radius:4px 4px 0 0"></div></div></div>
        <div style="display:flex;gap:4px;align-items:end;height:100%"><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;font-weight:700;margin-bottom:4px">106.7</span><div style="width:100%;height:90%;background:#E88D0E;border-radius:4px 4px 0 0"></div></div><div style="flex:1;display:flex;flex-direction:column;justify-content:end;align-items:center;height:100%"><span style="font-size:13px;color:#676563;margin-bottom:4px">74.1</span><div style="width:100%;height:62%;background:#292928;border-radius:4px 4px 0 0"></div></div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:24px;padding:0 8px;font-size:14px;font-weight:700;text-align:center"><span>2026</span><span>2027</span><span>2028</span><span>2029</span><span>2030</span></div>
    </div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;overflow:hidden;font-size:15px">
      <div style="display:grid;grid-template-columns:0.7fr 1fr 1fr 0.8fr;gap:8px;padding:12px 20px;border-bottom:1px solid #E6E5E3;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#676563"><span>Year</span><span style="text-align:right">Revenue</span><span style="text-align:right">Net profit</span><span style="text-align:right">Rides</span></div>
      <div style="display:grid;grid-template-columns:0.7fr 1fr 1fr 0.8fr;gap:8px;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">2026</strong><span style="text-align:right">₦453m · $302k</span><span style="text-align:right">₦23.5m · $16k</span><span style="text-align:right">1.69m</span></div>
      <div style="display:grid;grid-template-columns:0.7fr 1fr 1fr 0.8fr;gap:8px;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">2027</strong><span style="text-align:right">₦3.91b · $2.61m</span><span style="text-align:right">₦2.41b · $1.61m</span><span style="text-align:right">13.9m</span></div>
      <div style="display:grid;grid-template-columns:0.7fr 1fr 1fr 0.8fr;gap:8px;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">2028</strong><span style="text-align:right">₦15.87b · $10.58m</span><span style="text-align:right">₦10.70b · $7.13m</span><span style="text-align:right">54.7m</span></div>
      <div style="display:grid;grid-template-columns:0.7fr 1fr 1fr 0.8fr;gap:8px;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><strong style="color:#292928">2029</strong><span style="text-align:right">₦44.42b · $29.62m</span><span style="text-align:right">₦30.59b · $20.4m</span><span style="text-align:right">151m</span></div>
      <div style="display:grid;grid-template-columns:0.7fr 1fr 1fr 0.8fr;gap:8px;padding:14px 20px;color:#454442"><strong style="color:#292928">2030</strong><span style="text-align:right">₦106.70b · $71.13m</span><span style="text-align:right">₦74.05b · $49.4m</span><span style="text-align:right">361m</span></div>
    </div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Valuation</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">$5M cap, anchored on four independent methods.</h2>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,0.6fr);gap:32px;align-items:stretch">
      <div style="border:1px solid #E6E5E3;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.4">
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:12px 24px;border-bottom:1px solid #E6E5E3;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#676563"><span>Method</span><span>Range</span><span>Basis</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px;border-bottom:1px solid #E6E5E3"><strong>Reproduction cost × going-concern multiple</strong><span>$2.1M–$3.5M</span><span style="color:#454442">Rebuild cost + audit + brand + traction</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px;border-bottom:1px solid #E6E5E3"><strong>African pre-seed mobility comps, 2024–25</strong><span>$3M–$5M</span><span style="color:#454442">Fez ~$5M, Rida $3–5M, Treepz early $3–4M</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px;border-bottom:1px solid #E6E5E3"><strong>Traction × 2027 revenue projection, 60% haircut</strong><span>$3.2M–$5.2M</span><span style="color:#454442">2027 revenue × 3–5× × (1 − 60% risk)</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px"><strong>News-catalyst premium</strong><span>+20–30%</span><span style="color:#454442">Uber exit + Shuttlers POD, timing-adjusted uplift</span></div>
      </div>
      <div style="background:#292928;color:#FDFAF6;border-radius:16px;padding:32px;display:flex;flex-direction:column;justify-content:center;gap:14px">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Anchor</div>
        <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:80px;line-height:1">$5M</div>
        <div style="font-size:16px;color:#E6E5E3;line-height:1.4">Top of the defensible band. Incorporated September 2024 with ₦1m authorised capital; today a live product on both platforms, 795 users, 424 car-owner signups, 58 verified, and ~₦1.35b of aligned commitment already in.</div>
      </div>
    </div>
  </div>
</section>
`;

export default function DeckFinancials() {
  return (
    <>
      <DeckTracker slide="financials" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: FINANCIALS }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "team", label: "Team" }} next={{ slug: "ask", label: "The ask" }} />
    </>
  );
}
