import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/ask.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. The condensed-deck download link is dropped.
// Section content is server-rendered HTML.
const ASK = `
<section style="position:relative;overflow:hidden;border-bottom:1px solid #ECDFCE">
  <img src="/deck/images/bg-eko-bridge.png" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.1">
  <div style="position:relative;max-width:1200px;margin:0 auto;padding:80px 32px 64px;display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 9 · The ask</div>
      <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;text-wrap:pretty">$200k on a $5M SAFE. Twelve months of runway. Three concrete milestones.</h1>
      <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:720px">Investor money will not go into finding out whether the acquisition channel exists. It goes into scaling a channel with a proven, repeatable acquisition cost, and into switching on the second revenue line.</p>
    </div>
    <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px;font-size:16px">
      <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:64px;line-height:1;color:#EE4643">$200k</div>
      <div style="display:flex;justify-content:space-between;border-top:1px solid #514336;padding-top:12px"><span style="color:#D6C3B3">Instrument</span><span>Post-money SAFE</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Cap</span><span>$5M</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Discount</span><span>20%</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Board seat</span><span>None</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Pro-rata rights</span><span>Yes, standard</span></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:28px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Use of funds</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Where the $200k goes</h2>
  </div>
  <div style="display:flex;height:22px;border-radius:8px;overflow:hidden"><div style="width:30%;background:#EE4643"></div><div style="width:22.5%;background:#211A14"></div><div style="width:17.5%;background:#DB405A"></div><div style="width:10%;background:#9F6010"></div><div style="width:10%;background:#6B5D4E"></div><div style="width:5%;background:#D6C3B3"></div><div style="width:5%;background:#ECDFCE"></div></div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.45">
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:12px 24px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E"><span></span><span>Category</span><span style="text-align:right">Amount</span><span style="text-align:right">%</span><span>What it buys</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#EE4643"></span><strong>Marketing and acquisition</strong><span style="text-align:right">$60k</span><span style="text-align:right">30%</span><span style="color:#514336">Scale Google and Meta ads to 3× current CPI budget; launch passenger-side campaigns; drive the Sept–Feb download curve</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#211A14"></span><strong>Product and infrastructure</strong><span style="text-align:right">$45k</span><span style="text-align:right">22.5%</span><span style="color:#514336">V2.1 features, safety infrastructure, admin tools, Conductor Deliveries launch (packages on empty return trips)</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#DB405A"></span><strong>Ops and driver liquidity</strong><span style="text-align:right">$35k</span><span style="text-align:right">17.5%</span><span style="color:#514336">Corridor launch team, driver incentives, corporate outreach, community-partnership seeding</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#9F6010"></span><strong>Advisory retainer (partial cash)</strong><span style="text-align:right">$20k</span><span style="text-align:right">10%</span><span style="color:#514336">Marketing Advisory Board — about ₦3m a month cash for the critical 6–8 month launch window; balance deferred to Series A or converted to equity</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#6B5D4E"></span><strong>Legal, compliance, licensing</strong><span style="text-align:right">$20k</span><span style="text-align:right">10%</span><span style="color:#514336">LASTMA, LAGRA and regulatory footings</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#D6C3B3"></span><strong>Deliveries go-to-market</strong><span style="text-align:right">$10k</span><span style="text-align:right">5%</span><span style="color:#514336">Delivery driver onboarding, package handling ops, partner logistics</span></div>
    <div style="display:grid;grid-template-columns:20px minmax(160px,0.9fr) 80px 60px minmax(0,1.6fr);gap:16px;padding:14px 24px;align-items:center"><span style="width:16px;height:16px;border-radius:4px;background:#ECDFCE"></span><strong>Runway buffer</strong><span style="text-align:right">$10k</span><span style="text-align:right">5%</span><span style="color:#514336">Contingency</span></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:28px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Milestones this money buys</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Three checkpoints in twelve months</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
      <div style="border-top:2px solid #EE4643;padding-top:16px;display:flex;flex-direction:column;gap:8px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#EE4643">By end Dec 2026</div><p style="font-size:16px;line-height:1.55;color:#514336;margin:0">200 verified car owners · 5,000 active passengers · Lagos Island corridor at density · Deliveries beta on 3 routes</p></div>
      <div style="border-top:2px solid #EE4643;padding-top:16px;display:flex;flex-direction:column;gap:8px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#EE4643">By end Mar 2027</div><p style="font-size:16px;line-height:1.55;color:#514336;margin:0">500 verified car owners · 20,000 active passengers · 3 corridors · first corporate partnership signed · Deliveries public launch</p></div>
      <div style="border-top:2px solid #EE4643;padding-top:16px;display:flex;flex-direction:column;gap:8px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#EE4643">By end Sep 2027</div><p style="font-size:16px;line-height:1.55;color:#514336;margin:0">1,000+ verified car owners · 50,000+ active passengers · profitable on the Lagos Island corridor · Deliveries at 5k packages a month · Series A conversation</p></div>
    </div>
  </div>
</section>

<section style="background:#211A14;color:#FFF8F0">
  <div style="max-width:1200px;margin:0 auto;padding:88px 32px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:24px">
      <img src="/deck/images/LOGO%202.png" alt="Conductor" style="width:96px;height:96px;background:#FFF8F0;border-radius:24px">
      <h2 style="font-size:clamp(36px,4vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0">Let's talk.</h2>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:26px;line-height:1.25;color:#EE4643;margin:0">Interested in partnering, investing, or just seeing the app?</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a href="mailto:admin@conductor.ng" data-cta="email" style="background:linear-gradient(120deg,#E98B20,#EE4643);color:#fff;font-weight:600;font-size:16px;padding:14px 24px;border-radius:999px;text-decoration:none">Email the founders</a>
        <a href="mailto:admin@conductor.ng?subject=Conductor%20investor%20call" data-cta="book_call" style="background:transparent;color:#FFF8F0;border:1px solid #D6C3B3;font-weight:600;font-size:16px;padding:14px 24px;border-radius:999px;text-decoration:none">Book a call</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;font-size:16px;color:#ECDFCE;line-height:1.4">
        <div>conductor.ng · admin@conductor.ng · +234 810 690 2386</div>
        <div style="font-size:14px;color:#D6C3B3">Set up a meeting with the founders.</div>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a href="#" style="display:flex;flex-direction:column;padding:10px 16px;border:1px solid #514336;border-radius:12px;text-decoration:none;color:#FFF8F0;min-width:150px"><span style="font-size:11px;color:#D6C3B3;letter-spacing:0.08em;text-transform:uppercase">Passenger app</span><span style="font-size:15px;font-weight:700">Play Store · App Store</span></a>
        <a href="#" style="display:flex;flex-direction:column;padding:10px 16px;border:1px solid #514336;border-radius:12px;text-decoration:none;color:#FFF8F0;min-width:150px"><span style="font-size:11px;color:#D6C3B3;letter-spacing:0.08em;text-transform:uppercase">Driver app</span><span style="font-size:15px;font-weight:700">Play Store · App Store</span></a>
      </div>
    </div>
    <img src="/deck/images/anim-driver-passengers.gif" alt="Driver and passengers" style="width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:24px">
  </div>
</section>
`;

export default function DeckAsk() {
  return (
    <>
      <DeckTracker slide="ask" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: ASK }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "financials", label: "Financials" }} />
    </>
  );
}
