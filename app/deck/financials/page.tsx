import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/financials.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
export const FINANCIALS = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 8 · Financials</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">Built on ~₦1.35b of committed capital. No external funding yet.</h1>
  <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:760px">Position as at 31 August 2026. Audited FY2025 accounts by Lanre Abidakun &amp; Co. (Chartered Accountants), Abuja, available on request. £1 ≈ ₦1,850 · $1 ≈ ₦1,350.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,0.7fr);gap:32px;align-items:start">
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.35">
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E"><span>Committed capital</span><span style="text-align:right">₦</span><span style="text-align:right">$</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Founder personal cash deployed</span><span style="text-align:right">₦200m</span><span style="text-align:right">$148k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Deferred market-rate compensation — team (20+ contributors)</span><span style="text-align:right">₦100m</span><span style="text-align:right">$74k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Deferred market-rate compensation — co-founders</span><span style="text-align:right">~₦1.03b</span><span style="text-align:right">~$763k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Deferred compensation — Marketing Advisory Board</span><span style="text-align:right">~₦15m</span><span style="text-align:right">~$11k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:14px 24px;border-bottom:1px solid #ECDFCE;color:#514336"><span>London &amp; Canada offices</span><span style="text-align:right">~₦8.4m</span><span style="text-align:right">~$6.2k</span></div>
    <div style="display:grid;grid-template-columns:1fr 110px 90px;gap:12px;padding:16px 24px;border-bottom:1px solid #ECDFCE;font-weight:700;background:#FAEDDE"><span>Total committed capital and compensation</span><span style="text-align:right">~₦1.35b</span><span style="text-align:right">~$1.0m</span></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:14px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#514336">2025 audited loss</span><span style="font-size:22px;font-weight:700">₦119.05m</span></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#514336">2026 cash burn to 31 Aug</span><span style="font-size:22px;font-weight:700">₦45.8m</span></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#514336">Revenue to date (Paystack)</span><span style="font-size:22px;font-weight:700">₦71k</span></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span style="font-size:15px;color:#514336">Current burn rate</span><span style="font-size:22px;font-weight:700">~₦10m / mo</span></div>
    <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:17px;font-weight:700;line-height:1.35">All founder loans and deferred compensation convert to equity at close, on the same $5M cap as the incoming investor.</div><div style="font-size:15px;color:#ECDFCE;line-height:1.4">No debt overhang. Clean balance sheet at round close.</div></div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px;position:relative">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Projection · Aug 2026 – Dec 2027</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">A ₦4b run-rate exiting 2027 — and every naira traces to one number.</h2>
    <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">This is bottoms-up, not top-down. Each active car owner generates ~₦27,000 a month in platform revenue — 2.5 passengers a trip, 4 days a week, a 70/30 one-/two-trip split, our 10% take on each side. Multiply by active car owners and you have the whole model. Growth and conversion rates are the ones we actually recorded across our two live performance-marketing apps.</p>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px">
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap">
      <div style="display:flex;gap:20px;font-size:14px;color:#514336"><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#E98B20;display:inline-block"></span>Monthly platform revenue</span><span style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#EE4643;display:inline-block"></span>Checkpoint month</span></div>
      <div style="font-size:13px;color:#8A7A6B">₦m / month</div>
    </div>
    <div style="overflow-x:auto">
      <div style="display:flex;gap:8px;min-width:760px;padding:0 4px">
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">1</span><div style="width:100%;max-width:34px;height:0.2%;min-height:3px;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Aug '26</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">3</span><div style="width:100%;max-width:34px;height:1%;min-height:3px;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Sep '26</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">8</span><div style="width:100%;max-width:34px;height:2.5%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Oct '26</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">14</span><div style="width:100%;max-width:34px;height:4%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Nov '26</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#EE4643">20</span><div style="width:100%;max-width:34px;height:6%;background:#EE4643;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#EE4643;font-weight:700;margin-top:8px;white-space:nowrap">Dec '26</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">28</span><div style="width:100%;max-width:34px;height:8.5%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Jan '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">38</span><div style="width:100%;max-width:34px;height:11.5%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Feb '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">51</span><div style="width:100%;max-width:34px;height:15%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Mar '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">65</span><div style="width:100%;max-width:34px;height:19.4%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Apr '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">83</span><div style="width:100%;max-width:34px;height:24.8%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">May '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#EE4643">103</span><div style="width:100%;max-width:34px;height:31%;background:#EE4643;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#EE4643;font-weight:700;margin-top:8px;white-space:nowrap">Jun '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">129</span><div style="width:100%;max-width:34px;height:38.6%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Jul '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">161</span><div style="width:100%;max-width:34px;height:48%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Aug '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">195</span><div style="width:100%;max-width:34px;height:58.3%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Sep '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">236</span><div style="width:100%;max-width:34px;height:70.6%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Oct '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#211A14">282</span><div style="width:100%;max-width:34px;height:84.2%;background:#E98B20;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#6B5D4E;margin-top:8px;white-space:nowrap">Nov '27</span></div>
        <div style="flex:1;min-width:40px;display:flex;flex-direction:column;align-items:center"><div style="height:260px;width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center"><span style="font-size:12px;font-weight:700;margin-bottom:4px;color:#EE4643">335</span><div style="width:100%;max-width:34px;height:100%;background:#EE4643;border-radius:4px 4px 0 0"></div></div><span style="font-size:11px;color:#EE4643;font-weight:700;margin-top:8px;white-space:nowrap">Dec '27</span></div>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:32px;align-items:start">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:15px">
      <div style="display:grid;grid-template-columns:1fr 0.9fr 0.8fr 0.9fr;gap:8px;padding:12px 20px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B5D4E"><span>Milestone</span><span style="text-align:right">Car owners</span><span style="text-align:right">Passengers</span><span style="text-align:right">Monthly rev</span></div>
      <div style="display:grid;grid-template-columns:1fr 0.9fr 0.8fr 0.9fr;gap:8px;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><strong style="color:#211A14">Dec 2026</strong><span style="text-align:right">728</span><span style="text-align:right">~1,820</span><span style="text-align:right">₦19.8m</span></div>
      <div style="display:grid;grid-template-columns:1fr 0.9fr 0.8fr 0.9fr;gap:8px;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><strong style="color:#211A14">June 2027</strong><span style="text-align:right">3,343</span><span style="text-align:right">~8,360</span><span style="text-align:right">₦103.5m</span></div>
      <div style="display:grid;grid-template-columns:1fr 0.9fr 0.8fr 0.9fr;gap:8px;padding:14px 20px;color:#514336"><strong style="color:#211A14">Dec 2027</strong><span style="text-align:right">10,132</span><span style="text-align:right">~25,330</span><span style="text-align:right">₦334.6m</span></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <div style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B5D4E">2026</div><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:34px;line-height:1;color:#211A14">₦45.5m</div><div style="font-size:14px;color:#514336">$34k</div><div style="font-size:12px;color:#8A7A6B;line-height:1.4">Full-year revenue</div></div>
      <div style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B5D4E">2027</div><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:34px;line-height:1;color:#211A14">₦1.7b</div><div style="font-size:14px;color:#514336">$1.26m</div><div style="font-size:12px;color:#8A7A6B;line-height:1.4">Full-year revenue</div></div>
      <div style="background:#211A14;border:1px solid #211A14;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#EE4643">Exit run-rate</div><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:34px;line-height:1;color:#FFF8F0">~₦4b</div><div style="font-size:14px;color:#ECDFCE">$3.0m</div><div style="font-size:12px;color:#D6C3B3;line-height:1.4">Annualised Dec-2027 run-rate</div></div>
    </div>
  </div>
  <p style="font-size:13px;color:#8A7A6B;margin:0">Bottoms-up from our monthly operating model; growth and conversion rates observed across our two live performance-marketing apps. Conservative by design.</p>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Valuation</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">$5M cap, anchored on four independent methods.</h2>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,0.6fr);gap:32px;align-items:stretch">
      <div style="border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.4">
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:12px 24px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E"><span>Method</span><span>Range</span><span>Basis</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px;border-bottom:1px solid #ECDFCE"><strong>Reproduction cost × going-concern multiple</strong><span>$2.1M–$3.5M</span><span style="color:#514336">Rebuild cost + audit + brand + traction</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px;border-bottom:1px solid #ECDFCE"><strong>African pre-seed mobility comps, 2024–25</strong><span>$3M–$5M</span><span style="color:#514336">Fez ~$5M, Rida $3–5M, Treepz early $3–4M</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px;border-bottom:1px solid #ECDFCE"><strong>Forward run-rate multiple</strong><span>$4M–$6M</span><span style="color:#514336">~$3M annualised run-rate exiting 2027 → $5M = 1.7× forward revenue</span></div>
        <div style="display:grid;grid-template-columns:1.3fr 0.8fr 1.2fr;gap:16px;padding:16px 24px"><strong>News-catalyst premium</strong><span>+20–30%</span><span style="color:#514336">Uber exit + Shuttlers POD, timing-adjusted uplift</span></div>
      </div>
      <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:32px;display:flex;flex-direction:column;justify-content:center;gap:14px">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Anchor</div>
        <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:80px;line-height:1">$5M</div>
        <div style="font-size:16px;color:#ECDFCE;line-height:1.4">Top of the defensible band. Incorporated September 2024 with ₦1m authorised capital; today a live product on both platforms, 1,000 users, 424 car-owner signups, 100 verified, and ~₦1.35b of aligned commitment already in.</div>
        <div style="border-top:1px solid #514336;padding-top:14px;display:flex;flex-direction:column;gap:8px">
          <div style="font-size:15px;color:#FFF8F0;line-height:1.4">Founders have committed ~$1M of capital.</div>
          <div style="font-size:15px;color:#ECDFCE;line-height:1.4">$200k raise = ~4% — a modest ask for an audited, live, two-sided product.</div>
        </div>
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
