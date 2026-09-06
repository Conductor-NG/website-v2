import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/why-now.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const WHY_NOW = `
<section style="background:#211A14;color:#FFF8F0">
  <div style="max-width:1200px;margin:0 auto;padding:88px 32px;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,0.9fr);gap:56px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:24px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 5 · Why we haven't launched yet</div>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(24px,2.4vw,30px);line-height:1.35;margin:0;text-wrap:pretty;color:#FFF8F0">When I was younger, my mother and I stood outside our house every morning waiting for Mr. Ajose, our neighbour, to drive us on his way to work. His route passed our home. He dropped us at the junction near his office and we continued the rest of the journey on our own — my mum to her work, and me to my school. She instilled in me that we must always be the ones ready and waiting for him, never the other way around. He was doing us a favour. If we weren't ready when he pulled up, he left without us.</p>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(28px,3vw,40px);line-height:1.2;margin:0;color:#EE4643">"We wait for the man. The man does not wait for us."</p>
      <p style="font-size:17px;line-height:1.55;margin:0;color:#ECDFCE">That discipline is what made the arrangement work, and it is what makes every carpooling arrangement work everywhere in Nigeria. Conductor is built on that rule. The driver publishes his trip and commits to the route, the pickup point and the time — and the passenger must be ready when he arrives. If a passenger is not there, the driver is free to leave without them; the app holds the passenger to that discipline, not the driver. Every design decision in the product flows from this one principle.</p>
      <div style="font-size:15px;color:#D6C3B3">Wale Shekoni, Founder</div>
    </div>
    <img src="/deck/images/illust-passenger-and-driver.png" alt="" style="width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:24px">
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <h1 style="font-size:clamp(34px,4vw,48px);font-weight:800;line-height:1.08;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">We could have turned this on 12 months ago. We chose not to. Here is what we built and learned by waiting.</h1>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:24px">
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:32px;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#EE4643">1</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">We flipped the role, and had to teach the flip</div>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Every Nigerian who has ordered a ride knows the same script: passenger books, driver shows up. That is Uber, Bolt, every ride-hailing app in this market. Conductor flips it — the driver publishes the trip, the passenger shows up. Just like my mother and the neighbour.</p>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">The MVP failed to teach the flip. Users opened the app expecting Uber and got confused. V1 rebuilds every screen around the model: the driver's route, the pickup point, the drop-off point, the passenger's responsibility to be ready. The concept is embedded in the UI itself, not left to a tutorial nobody reads. We learned this on our own money, before spending investor money acquiring users who would have churned within minutes.</p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:32px;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#EE4643">2</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">Predictability over randomness</div>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Nigerians already carpool with ride-hailing — but only for parties, weddings and nights out. Three to five friends split a Bolt fare. Real behaviour, but random: it peaks on weekends and no two rides look the same. Conductor is not built for randomness. A banker goes to work five days a week, four weeks a month, about 45 weeks a year. A civil servant, a teacher, a factory worker, a nurse — the same predictability. 74% of our onboarded users commute at least three days a week, and 52% are headed for the same Lagos Island cluster.</p>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Scheduling a random Friday-night group ride is a solved problem — Bolt does it. Scheduling a repeatable Monday-through-Friday commute at a splittable price is not. That is the wedge, and it is what we spent 33 months getting right. <strong style="color:#211A14">No app in Nigeria serves predictability. That is the gap.</strong></p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:32px;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#EE4643">3</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">The chicken-and-egg problem, solved by supply-side saturation</div>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Every two-sided marketplace faces the same paradox: you need drivers to attract passengers, and passengers to attract drivers. If we launch to passengers before there are enough drivers, passengers open the app, see no trips near them, and leave — and that churn is unrecoverable. If we launch to drivers with no passengers, drivers publish once and never again.</p>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Our answer: saturate the supply side quietly before turning on demand. About 50% of onboarded car owners work in the Island cluster, with pickups spread across residential Lagos — Ikeja, Surulere, Yaba, Egbeda, Alagbado, Ojo, Ajah. For a passenger in Egbeda going to VI to reliably find a match within their time window, we need dozens of drivers on that corridor, not two. <strong style="color:#211A14">September 15 launches with the density needed for the demand side to convert on day one.</strong></p>
    </div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
      <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#EE4643">4</div>
      <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
        <div style="font-size:24px;font-weight:700;line-height:1.2">We front-loaded infrastructure a launched company cannot retrofit</div>
        <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Every marketplace that tried to bolt on trust, safety and money-plumbing after launch has failed at it in Nigeria. If it is not in the foundation, it never gets in. Conductor's foundation, built and tested before the first paid ride:</p>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:10px;background:#FAE8CF;display:inline-flex;align-items:center;justify-content:center;flex:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C97810" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 10 12 4l7 6"/><path d="M5 10v11"/><path d="M19 10v11"/><path d="M9 14v3"/><path d="M15 14v3"/></svg></span><span style="font-size:18px;font-weight:700">Bank-grade ledger</span></div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">A double-entry general ledger mirroring the architecture of Temenos T24 — the core banking platform used by major Nigerian commercial banks — and the CBN-approved microfinance platform. Per-user, per-day, per-trip, per-account attribution. Every naira is traceable to its source, holder and destination. The accounting spine of a financial institution, running inside a mobility product.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:10px;background:#FAE8CF;display:inline-flex;align-items:center;justify-content:center;flex:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C97810" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.4"/></svg></span><span style="font-size:18px;font-weight:700">Escrow-based payment mechanics</span></div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Passenger money held per trip-day, released to drivers only after service completion, with a 26-hour dispute window. A five-account per-component escrow model — refunds cascade through the correct accounts, not out of a single messy pool.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:10px;background:#FAE8CF;display:inline-flex;align-items:center;justify-content:center;flex:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C97810" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M7 21h10"/><path d="M6 6l6-1.5L18 6"/><path d="M3 12l3-6 3 6a3 3 0 0 1-6 0z"/><path d="M15 12l3-6 3 6a3 3 0 0 1-6 0z"/></svg></span><span style="font-size:18px;font-weight:700">GPS-adjudicated dispute engine</span></div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Arguments are settled by trip data and roster attendance, not customer-service opinion. Append-only investigation timeline, five-occupant roster, driver, peer and self attestations.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:10px;background:#FAE8CF;display:inline-flex;align-items:center;justify-content:center;flex:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C97810" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l3-4 3 3 4-6"/></svg></span><span style="font-size:18px;font-weight:700">Analytics platform and admin console</span></div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">User panel, ledger viewer, dispute case files, marketer and staff referral leaderboards, KPI dashboards, tracking and automation console. We can run A/B experiments on live users from day one. Most Series A startups do not have this; we have it pre-launch.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:10px;background:#FAE8CF;display:inline-flex;align-items:center;justify-content:center;flex:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C97810" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg></span><span style="font-size:18px;font-weight:700">Verified identity and banned-identity registry</span></div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Bad actors cannot create new accounts and re-enter. Standard on paper, uncommon in practice.</p></div>
      <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:center;gap:10px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:28px;line-height:1.2;color:#EE4643">Every capability is built, not bought.</div><p style="font-size:15px;line-height:1.5;color:#ECDFCE;margin:0">Assembling this from vendors would have cost more, taken longer, and left us dependent on suppliers who could kill the business. We own the whole stack. That is the moat.</p></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#EE4643">5</div>
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">Every failure mode has already been designed for</div>
      <p style="font-size:16px;line-height:1.55;color:#514336;margin:0">We are not turning on an untested system on September 15. <strong style="color:#211A14">50+ live trips</strong> completed across multiple Lagos locations, with about 100 passengers and 5 drivers — external volunteers and the internal team — and feedback that has directly driven V1. More importantly, anything that could go wrong on a shared ride already has a response encoded as product logic, backed by the ledger — not as a customer-service policy.</p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.45">
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase"><span style="color:#C41818">Failure mode</span><span style="color:#24A148">Built-in response</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Passenger no-show</strong><span style="color:#514336">Driver still paid — the settlement router charges NO_SHOW and CANCEL_LATE alongside completed rides</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Driver no-start</strong><span style="color:#514336">Full refund cascade through per-component escrows; disputes auto-open with GPS evidence</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Payment dispute</strong><span style="color:#514336">26-hour window, GPS-adjudicated, append-only investigation timeline</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Physical altercation on board</strong><span style="color:#514336">Incident logging, banned-identity registry, community road-incident feed</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Lost item</strong><span style="color:#514336">In-app claim, roster-based accountability, dispute case file for admin resolution</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Accident</strong><span style="color:#514336">In-app SOS, incident capture, roster contacts, escrow held pending resolution</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Criminal incident</strong><span style="color:#514336">Verified identity means every passenger and driver is traceable; the banned-identity registry prevents re-entry</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Suspended trip-day (weather, breakdown)</strong><span style="color:#514336">Passengers never charged for suspended days; escrow releases correctly</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Fake or revenge rating</strong><span style="color:#514336">End-of-week only, server-gated by attendance</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px"><strong>Refund attribution</strong><span style="color:#514336">Per-component escrows and per-user accounting trace every refund to its origin</span></div>
  </div>
</section>

<section style="background:linear-gradient(120deg,#E98B20,#EE4643);color:#2E1C03">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:24px">
    <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(24px,2.6vw,32px);line-height:1.3;margin:0;max-width:1000px;text-wrap:pretty">The right question is not <span style="color:#FFF8F0;font-weight:700">“why haven't you launched yet?”</span> It is: how did you get a bank-grade ledger, an escrow engine, a dispute adjudicator, a full admin platform, 100 test trips, 20 package deliveries, 1,000 users and an acquisition channel with proven CAC — a product already stress-tested against every failure mode a shared ride can produce — built before your first paid ride?</p>
    <p style="font-size:24px;font-weight:700;line-height:1.3;margin:0;color:#FFF8F0;max-width:900px;text-wrap:pretty">33 months of founder-funded salaries and a team invested through ownership, so that when we turn it on on September 15, it works the first time.</p>
    <div style="display:flex;gap:28px;flex-wrap:wrap;font-size:15px;font-weight:600;border-top:1px solid rgba(46,28,3,0.25);padding-top:20px"><span>$0.32 cost per install</span><span>2,160 downloads in 14 days</span><span>Investor money scales a channel that already exists.</span></div>
  </div>
</section>
`;

export default function DeckWhyNow() {
  return (
    <>
      <DeckTracker slide="why-now" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: WHY_NOW }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "model", label: "Model" }} next={{ slug: "plan", label: "Plan" }} />
    </>
  );
}
