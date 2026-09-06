import { DeckTracker } from "./deck-client";
import { DeckPager } from "./deck-nav";

// Ported near-verbatim from the Claude Design deck (site/overview.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
export const OVERVIEW = `
<section style="position:relative;overflow:hidden;border-bottom:1px solid #ECDFCE">
  <img src="/deck/images/bg-eko-bridge.png" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.22">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(253,250,246,0.3),rgba(253,250,246,0.95))"></div>
  <div style="position:relative;max-width:1200px;margin:0 auto;padding:80px 32px 64px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,0.8fr);gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:24px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Seed round · $200k SAFE · $5M cap</div>
      <h1 style="font-size:clamp(38px,5vw,60px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0">Nigeria's carpooling platform, built for the daily commute.</h1>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1.2;color:#EE4643;margin:0">Ride together, share together, save together.</p>
      <p style="font-size:19px;line-height:1.55;color:#514336;margin:0;max-width:600px">Conductor matches car owners with passengers going to the same place. Car owners publish the trip they are already making; passengers book a seat for the week. Paid rides launch on the Lagos Island corridor on 15 September 2026.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a href="/deck/ask" data-cta="see_ask" style="background:linear-gradient(120deg,#E98B20,#EE4643);color:#fff;font-weight:600;font-size:16px;padding:14px 24px;border-radius:999px;text-decoration:none">See the ask</a>
        <a href="/deck/product" data-cta="watch_product" style="background:#fff;color:#211A14;border:1px solid #D6C3B3;font-weight:600;font-size:16px;padding:14px 24px;border-radius:999px;text-decoration:none">Watch the product</a>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:24px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:48px;line-height:1;color:#EE4643">100</div><div style="font-size:15px;color:#ECDFCE;margin-top:6px">test trips run — plus 20 deliveries piloted</div></div>
      <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:24px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:48px;line-height:1">1,000</div><div style="font-size:15px;color:#6B5D4E;margin-top:6px">sign-ups</div></div>
      <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:24px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:48px;line-height:1">74%</div><div style="font-size:15px;color:#6B5D4E;margin-top:6px">commute three or more days a week</div></div>
      <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:24px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:48px;line-height:1">52%</div><div style="font-size:15px;color:#6B5D4E;margin-top:6px">head to one Lagos Island corridor</div></div>
      <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:24px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:48px;line-height:1">~500</div><div style="font-size:15px;color:#6B5D4E;margin-top:6px">car owners onboarded · 100 verified</div></div>
      <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:24px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:44px;line-height:1;color:#EE4643">Sept 15</div><div style="font-size:15px;color:#ECDFCE;margin-top:6px">paid rides launch</div></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:80px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:820px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Timing</div>
    <h2 style="font-size:38px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">The Nigerian ride market just re-opened. We are ten days from serving it.</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:36px;color:#6B5D4E;line-height:1">Sept 1, 2026</div><div style="font-size:22px;font-weight:700;line-height:1.2">Uber announces exit from Nigeria</div><p style="font-size:17px;line-height:1.5;color:#514336;margin:0">Millions of Nigerian commuters lose their on-demand provider of choice. On-demand hailing could not make Nigerian unit economics work at commuter prices.</p></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:36px;color:#6B5D4E;line-height:1">Sept 3, 2026</div><div style="font-size:22px;font-weight:700;line-height:1.2">Shuttlers announces POD</div><p style="font-size:17px;line-height:1.5;color:#514336;margin:0">Pre-booked private small-group rides, waitlist only. A consumer pivot with corporate-shuttle DNA underneath: fixed price, premium positioning, manual re-booking.</p></div>
    <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:36px;color:#EE4643;line-height:1">Sept 15, 2026</div><div style="font-size:22px;font-weight:700;line-height:1.2">Conductor launches paid rides</div><p style="font-size:17px;line-height:1.5;color:#ECDFCE;margin:0">Community carpooling on the Lagos Island corridor. ~500 car owners onboarded, 100 verified and ready today — and climbing as we saturate supply. Supply is already-driving vehicles, so marginal cost per rider is near zero.</p></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:80px 32px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:24px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Problem</div>
      <h2 style="font-size:38px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Lagos loses ₦4 trillion a year to gridlock. Commuters pay for it twice.</h2>
      <p style="font-size:18px;line-height:1.55;color:#514336;margin:0">The public transport that exists is unregulated, unsafe and unreliable. The private hire that existed priced itself out of daily use. The 3M+ Lagos professionals who commute every day have no reliable, affordable option.</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div style="border-top:2px solid #EE4643;padding-top:14px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:34px;line-height:1">₦4tn</div><div style="font-size:14px;color:#6B5D4E;margin-top:6px;line-height:1.4">annual productivity loss to congestion · LAMATA, World Bank</div></div>
        <div style="border-top:2px solid #EE4643;padding-top:14px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:34px;line-height:1">&gt;40%</div><div style="font-size:14px;color:#6B5D4E;margin-top:6px;line-height:1.4">of monthly income spent on transport · Bureau of Statistics</div></div>
        <div style="border-top:2px solid #EE4643;padding-top:14px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:34px;line-height:1">1 per car</div><div style="font-size:14px;color:#6B5D4E;margin-top:6px;line-height:1.4">most private cars carry only the driver at peak · LAMATA surveys</div></div>
      </div>
    </div>
    <img src="/deck/images/illust-bus-with-conductor.png" alt="Crowded Lagos bus" style="width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:16px">
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:80px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:820px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Solution</div>
    <h2 style="font-size:38px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Community carpooling, matched by where you are going.</h2>
    <p style="font-size:18px;line-height:1.55;color:#514336;margin:0">Conductor connects Lagos professionals who share destinations, not routes. Every morning, everyone is going to the same cluster: Lagos Island, Victoria Island, Lekki, Ikoyi. A car owner heading there can absorb three or four passengers from anywhere along the way. And because 57% of our users commute five or more days a week, a match is a recurring weekly arrangement, not a one-off ride.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden"><div style="height:220px;background:#FAEDDE;display:flex;justify-content:center;align-items:flex-end;overflow:hidden"><img src="/deck/images/illust-rider-lady.png" alt="" style="height:200px"></div><div style="padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:22px;font-weight:700">For passengers</div><p style="font-size:16px;line-height:1.5;color:#514336;margin:0">Affordable, predictable commuting costs. Real ₦ fares, per-day pricing, verified car owners, same seat all week.</p></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden"><div style="height:220px;overflow:hidden"><img src="/deck/images/illust-driver.png" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center 60%"></div><div style="padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:22px;font-weight:700">For car owners</div><p style="font-size:16px;line-height:1.5;color:#514336;margin:0">A new revenue stream on the drive you already make. Escrow-held earnings released weekly; you approve every passenger.</p></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden"><div style="height:220px;overflow:hidden"><img src="/deck/images/illust-passengers.png" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center 40%"></div><div style="padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:22px;font-weight:700">For all of Lagos</div><p style="font-size:16px;line-height:1.5;color:#514336;margin:0">Fewer cars on the road, less traffic, safer streets, and workplaces and estates connected as communities.</p></div></div>
  </div>
</section>
`;

export default function DeckOverview() {
  return (
    <>
      <DeckTracker slide="overview" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: OVERVIEW }} />
      <div style={{ flex: 1 }} />
      <DeckPager next={{ slug: "product", label: "Product" }} />
    </>
  );
}
