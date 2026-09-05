import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/why-now.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const WHY_NOW = `
<section style="background:#292928;color:#FDFAF6">
  <div style="max-width:1200px;margin:0 auto;padding:88px 32px;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,0.9fr);gap:56px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:24px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Chapter 5 · Why we haven't launched yet</div>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(24px,2.4vw,30px);line-height:1.35;margin:0;text-wrap:pretty">When I was younger, my mother and I stood outside our house every morning waiting for the neighbour to drive us on his way to work. His route passed our home. He dropped us at the junction near his office and we continued the rest of the journey on our own — my mum to her work, and me to my school. We waited for him, never the other way around. He was doing us a favour. If we weren't ready when he pulled up, he left without us.</p>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(28px,3vw,40px);line-height:1.2;margin:0;color:#E88D0E">"We wait for the man. The man does not wait for us."</p>
      <p style="font-size:17px;line-height:1.55;margin:0;color:#E6E5E3">That discipline is what made the arrangement work, and it is what makes every carpooling arrangement work everywhere in Nigeria. Conductor is built on that rule. The driver publishes his trip and commits to the route, the pickup point and the time; the app makes sure he does not leave early. But the passenger must be ready when he arrives. Every design decision in the product flows from this one principle.</p>
      <div style="font-size:15px;color:#ACA9A6">Ridwan Abdulateef, CEO</div>
    </div>
    <img src="/deck/images/illust-passenger-and-driver.png" alt="" style="width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:24px">
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <h1 style="font-size:clamp(34px,4vw,48px);font-weight:800;line-height:1.08;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">We could have turned this on 12 months ago. We chose not to. Here is what we built and learned by waiting.</h1>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:24px">
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:32px;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E88D0E">1</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">We flipped the role, and had to teach the flip</div>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Every Nigerian who has ordered a ride knows the same script: passenger books, driver shows up. That is Uber, Bolt, every ride-hailing app in this market. Conductor flips it — the driver publishes the trip, the passenger shows up. Just like my mother and the neighbour.</p>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">The MVP failed to teach the flip. Users opened the app expecting Uber and got confused. V1 rebuilds every screen around the model: the driver's route, the pickup point, the drop-off point, the passenger's responsibility to be ready. The concept is embedded in the UI itself, not left to a tutorial nobody reads. We learned this on our own money, before spending investor money acquiring users who would have churned within minutes.</p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:32px;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E88D0E">2</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">Predictability over randomness</div>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Nigerians already carpool with ride-hailing — but only for parties, weddings and nights out. Three to five friends split a Bolt fare. Real behaviour, but random: it peaks on weekends and no two rides look the same. Conductor is not built for randomness. A banker goes to work five days a week, four weeks a month, about 45 weeks a year. A civil servant, a teacher, a factory worker, a nurse — the same predictability. 57% of our onboarded users commute 5+ days a week; 63 of 122 travel to the Island cluster.</p>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Scheduling a random Friday-night group ride is a solved problem — Bolt does it. Scheduling a repeatable Monday-through-Friday commute at a splittable price is not. That is the wedge, and it is what we spent 33 months getting right. <strong style="color:#292928">No app in Nigeria serves predictability. That is the gap.</strong></p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:32px;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E88D0E">3</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">The chicken-and-egg problem, solved by supply-side saturation</div>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Every two-sided marketplace faces the same paradox: you need drivers to attract passengers, and passengers to attract drivers. If we launch to passengers before there are enough drivers, passengers open the app, see no trips near them, and leave — and that churn is unrecoverable. If we launch to drivers with no passengers, drivers publish once and never again.</p>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Our answer: saturate the supply side quietly before turning on demand. About 50% of onboarded car owners work in the Island cluster, with pickups spread across residential Lagos — Ikeja, Surulere, Yaba, Egbeda, Alagbado, Ojo, Ajah. For a passenger in Egbeda going to VI to reliably find a match within their time window, we need dozens of drivers on that corridor, not two. <strong style="color:#292928">September 15 launches with the density needed for the demand side to convert on day one.</strong></p>
    </div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #E6E5E3;border-bottom:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
      <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E88D0E">4</div>
      <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
        <div style="font-size:24px;font-weight:700;line-height:1.2">We front-loaded infrastructure a launched company cannot retrofit</div>
        <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Every marketplace that tried to bolt on trust, safety and money-plumbing after launch has failed at it in Nigeria. If it is not in the foundation, it never gets in. Conductor's foundation, built and tested before the first paid ride:</p>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">
      <div style="border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><img src="/deck/images/icon-bank.png" alt="" style="width:40px;height:40px;border-radius:10px"><span style="font-size:18px;font-weight:700">Bank-grade ledger</span></div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">A double-entry general ledger mirroring the architecture of Temenos T24 — the core banking platform used by major Nigerian commercial banks — and the CBN-approved microfinance platform. Per-user, per-day, per-trip, per-account attribution. Every naira is traceable to its source, holder and destination. The accounting spine of a financial institution, running inside a mobility product.</p></div>
      <div style="border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><img src="/deck/images/icon-earn-weekly.png" alt="" style="width:40px;height:40px;border-radius:10px"><span style="font-size:18px;font-weight:700">Escrow-based payment mechanics</span></div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">Passenger money held per trip-day, released to drivers only after service completion, with a 26-hour dispute window. A five-account per-component escrow model — refunds cascade through the correct accounts, not out of a single messy pool.</p></div>
      <div style="border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><img src="/deck/images/icon-map-car.png" alt="" style="width:40px;height:40px;border-radius:10px"><span style="font-size:18px;font-weight:700">GPS-adjudicated dispute engine</span></div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">Arguments are settled by trip data and roster attendance, not customer-service opinion. Append-only investigation timeline, five-occupant roster, driver, peer and self attestations.</p></div>
      <div style="border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><img src="/deck/images/icon-under-review.png" alt="" style="width:40px;height:40px;border-radius:10px"><span style="font-size:18px;font-weight:700">Analytics platform and admin console</span></div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">User panel, ledger viewer, dispute case files, marketer and staff referral leaderboards, KPI dashboards, tracking and automation console. We can run A/B experiments on live users from day one. Most Series A startups do not have this; we have it pre-launch.</p></div>
      <div style="border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:12px"><img src="/deck/images/icon-security.png" alt="" style="width:40px;height:40px;border-radius:10px"><span style="font-size:18px;font-weight:700">Verified identity and banned-identity registry</span></div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">Bad actors cannot create new accounts and re-enter. Standard on paper, uncommon in practice.</p></div>
      <div style="background:#292928;color:#FDFAF6;border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:center;gap:10px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:28px;line-height:1.2;color:#E88D0E">Every capability is built, not bought.</div><p style="font-size:15px;line-height:1.5;color:#E6E5E3;margin:0">Assembling this from vendors would have cost more, taken longer, and left us dependent on suppliers who could kill the business. We own the whole stack. That is the moat.</p></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E88D0E">5</div>
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:24px;font-weight:700;line-height:1.2">Every failure mode has already been designed for</div>
      <p style="font-size:16px;line-height:1.55;color:#454442;margin:0">We are not turning on an untested system on September 15. <strong style="color:#292928">50+ live trips</strong> completed across multiple Lagos locations, with about 100 passengers and 5 drivers — external volunteers and the internal team — and feedback that has directly driven V1. More importantly, anything that could go wrong on a shared ride already has a response encoded as product logic, backed by the ledger — not as a customer-service policy.</p>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.45">
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase"><span style="color:#C41818">Failure mode</span><span style="color:#24A148">Built-in response</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Passenger no-show</strong><span style="color:#454442">Driver still paid — the settlement router charges NO_SHOW and CANCEL_LATE alongside completed rides</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Driver no-start</strong><span style="color:#454442">Full refund cascade through per-component escrows; disputes auto-open with GPS evidence</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Payment dispute</strong><span style="color:#454442">26-hour window, GPS-adjudicated, append-only investigation timeline</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Physical altercation on board</strong><span style="color:#454442">Incident logging, banned-identity registry, community road-incident feed</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Lost item</strong><span style="color:#454442">In-app claim, roster-based accountability, dispute case file for admin resolution</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Accident</strong><span style="color:#454442">In-app SOS, incident capture, roster contacts, escrow held pending resolution</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Criminal incident</strong><span style="color:#454442">Verified identity means every passenger and driver is traceable; the banned-identity registry prevents re-entry</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Suspended trip-day (weather, breakdown)</strong><span style="color:#454442">Passengers never charged for suspended days; escrow releases correctly</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px;border-bottom:1px solid #E6E5E3"><strong>Fake or revenge rating</strong><span style="color:#454442">End-of-week only, server-gated by attendance</span></div>
    <div style="display:grid;grid-template-columns:minmax(160px,0.6fr) minmax(0,1.4fr);gap:20px;padding:14px 24px"><strong>Refund attribution</strong><span style="color:#454442">Per-component escrows and per-user accounting trace every refund to its origin</span></div>
  </div>
</section>

<section style="background:#E88D0E;color:#2E1C03">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:24px">
    <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:clamp(24px,2.6vw,32px);line-height:1.3;margin:0;max-width:1000px;text-wrap:pretty">The right question is not "why haven't you launched yet?" It is: how did you get a bank-grade ledger, an escrow engine, a dispute adjudicator, a full admin platform, 50 test trips, 795 users and an acquisition channel with proven CAC — a product already stress-tested against every failure mode a shared ride can produce — built before your first paid ride?</p>
    <p style="font-size:24px;font-weight:700;line-height:1.3;margin:0;color:#FDFAF6;max-width:900px;text-wrap:pretty">33 months of founder capital and unpaid team commitment, so that when we turn it on on September 15, it works the first time.</p>
    <div style="display:flex;gap:28px;flex-wrap:wrap;font-size:15px;font-weight:600;border-top:1px solid rgba(46,28,3,0.25);padding-top:20px"><span>$0.32 cost per install</span><span>2,160 downloads in 14 days</span><span>$57 per verified car owner</span><span>Investor money scales a channel that already exists.</span></div>
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
