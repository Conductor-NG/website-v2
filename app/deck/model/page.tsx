import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/model.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
export const MODEL = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 4 · Business model</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">A 10% take on every ride. Held in escrow. Released weekly.</h1>
  <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:760px">10% on the rider fare plus 10% on car owner earnings — roughly ₦360 on a ₦1,500 average fare. No surge, no dynamic markup, no hidden fees.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px">
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:grid;grid-template-columns:min(300px,80vw) 1fr;gap:24px;align-items:center">
    <div class="iphone17" style="--pw:min(300px,80vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/drv-13-escrow.png" alt="Conductor app screen"></div></div></div>
    <div style="display:flex;flex-direction:column;gap:12px"><img src="/deck/images/icon-bank.png" alt="" style="width:48px;height:48px;border-radius:10px"><div style="font-size:22px;font-weight:700">How money moves</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">The passenger pays into escrow at booking. Money is held per trip-day until the ride week completes, then released to the car owner at week close. If a day does not happen, refunds are automatic and traceable to their origin.</p></div>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:grid;grid-template-columns:min(300px,80vw) 1fr;gap:24px;align-items:center">
    <div class="iphone17" style="--pw:min(300px,80vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/pax-11-cost.png" alt="Conductor app screen"></div></div></div>
    <div style="display:flex;flex-direction:column;gap:12px"><img src="/deck/images/icon-earn-weekly.png" alt="" style="width:48px;height:48px;border-radius:10px"><div style="font-size:22px;font-weight:700">What we take</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">10% from each side of the transaction. The passenger sees the fare and the fee before booking; the car owner sees net earnings per ride, per week and per month in the app.</p></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Unit economics · Ikorodu ↔ Victoria Island</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">One corridor, real economics.</h2>
      <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">Figures from our operating model, standard 4-seat car, using the actual in-app fare for this route.</p>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) min(300px,80vw) minmax(0,0.8fr);gap:32px;align-items:start">
      <div style="border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:16px">
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Ride fare per passenger</span><span>₦2,800</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Blended promo discount</span><span>(₦400)</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;font-weight:700"><span>Net paid per passenger</span><span>₦2,400</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><span>× 4 passengers per trip</span><span>₦9,600</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;font-weight:700;color:#EE4643"><span>Conductor take (10% × 2 sides)</span><span>₦960</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Car owner earnings after take</span><span>₦8,640</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #ECDFCE;color:#514336"><span>Car owner weekly earnings (5 days)</span><span>₦43,200</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;font-weight:700"><span>Car owner monthly earnings (20 days)</span><span>₦172,800</span></div>
      </div>
      <div class="iphone17" style="--pw:min(300px,80vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/pax-ikorodu.png" alt="Conductor app screen"></div></div></div>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div><div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#EE4643">₦4,800</div><div style="font-size:15px;line-height:1.4;color:#514336;margin-top:6px">weekly Conductor take from one 4-seat car running five days</div></div>
        <div style="height:1px;background:#ECDFCE"></div>
        <div><div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:56px;line-height:1">₦480k</div><div style="font-size:15px;line-height:1.4;color:#514336;margin-top:6px">weekly take with 100 cars on this corridor</div></div>
        <div style="height:1px;background:#ECDFCE"></div>
        <div><div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:56px;line-height:1">₦2.4m</div><div style="font-size:15px;line-height:1.4;color:#514336;margin-top:6px">weekly take with 500 cars — all from a single corridor</div></div>
      </div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:56px 32px;width:100%;box-sizing:border-box">
  <div style="background:#211A14;color:#FFF8F0;border-radius:20px;padding:44px 32px;display:flex;flex-direction:column;gap:14px;text-align:center;align-items:center">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Asset-light by design</div>
    <p style="font-size:clamp(22px,2.6vw,30px);font-weight:700;line-height:1.25;margin:0;max-width:900px;text-wrap:pretty">Conductor owns no vehicles — no cars, no buses, no bikes. The fleet is Lagos's existing private cars, already making the trip.</p>
    <p style="font-size:17px;line-height:1.55;color:#ECDFCE;margin:0;max-width:820px">We own the software, the trust layer and the ledger — not the metal. That means near-zero marginal cost per rider, no capex to scale, and a margin profile a fleet or bus operator can never match.</p>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:900px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Growth engine · Conductor for Enterprise</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0;text-wrap:pretty">We don't buy commuters on Facebook. We onboard them a company at a time.</h2>
      <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">Rather than acquire riders one ad-click at a time, we sell Conductor for Enterprise to the banks, tech firms and corporate HQs already clustered on the Island. We onboard a company's own staff, match colleagues heading the same way, and the employer subsidises the platform fee as a staff benefit — cheaper than running a shuttle, safer than a hail. LOIs are already in progress.</p>
    </div>
    <div style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5D4E">How it works</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;font-size:15px;line-height:1.5;color:#514336">
        <div><strong style="color:#211A14">Pre-loaded wallet.</strong> The company funds a transport wallet and sets a daily or monthly cap per employee.</div>
        <div><strong style="color:#211A14">Staff just book.</strong> Employees ride any live corridor; Conductor handles matching, routing, payment and reporting.</div>
        <div><strong style="color:#211A14">Pay only for rides taken.</strong> No bus contracts, no route minimums, no vehicles to manage — with a monthly utilisation dashboard.</div>
        <div><strong style="color:#211A14">Replaces the cash allowance.</strong> Firms already pay staff transport informally; we make it auditable, capped and cheaper than a shuttle.</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px">
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">1</span> Guaranteed density</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">A single 500-person HQ seeds an entire corridor overnight. No cold-start — the passengers and the car owners already share a car park.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">2</span> Built-in trust</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Colleagues in the same building, vouched for by the same employer. Two-way verification plus a shared workplace is the highest-trust match a shared ride can have.</p></div>
      <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">3</span> SaaS-like revenue</div><p style="font-size:15px;line-height:1.5;color:#ECDFCE;margin:0">The employer pays a recurring per-seat subscription on top of the 10% transaction take — contracted, predictable revenue that complements and de-risks the transaction line.</p></div>
    </div>
    <p style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:24px;line-height:1.3;color:#6B5D4E;margin:0;max-width:900px">Every corporate HQ on the Island is a pre-assembled corridor of trusted, recurring demand — waiting to be switched on.</p>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:900px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Third revenue line · Conductor Deliveries</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0;text-wrap:pretty">Every car finishing a morning commute returns with empty seats and an empty boot.</h2>
    <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">Cars going to the Island in the morning come back to the mainland in the afternoon, often empty. That return trip is a fully paid-for delivery route with zero marginal fuel cost. We are not building a delivery company from scratch; we are bolting a package layer onto a network of cars that already goes where deliveries need to go.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5D4E">Now · Q4 2026</div>
      <div style="font-size:22px;font-weight:700;line-height:1.2">Partner with an established Lagos delivery operator</div>
      <p style="font-size:15px;line-height:1.5;color:#514336;margin:0;flex:1">They handle package pickup, sorting and last-mile logistics; we plug into their API. Our car owners pick up packages on the routes they were already driving. No delivery ops build required.</p>
      <div style="font-size:15px;font-weight:700;color:#24A148">Zero-risk go-to-market</div>
    </div>
    <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EE4643">Then · Q1–Q2 2027</div>
      <div style="font-size:22px;font-weight:700;line-height:1.2">Deliveries native in the Conductor app</div>
      <p style="font-size:15px;line-height:1.5;color:#ECDFCE;margin:0;flex:1">Every car owner sees delivery jobs alongside passenger rides. Same fleet, same escrow, same account, no partner cut.</p>
      <div style="font-size:15px;font-weight:700;color:#EE4643">Full margin capture</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <img src="/deck/images/illust-inside-car.png" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:16px">
      <div style="display:flex;flex-direction:column;gap:8px;font-size:15px;line-height:1.5;color:#514336">
        <div><strong style="color:#211A14">Same supply.</strong> Vehicles already on the road.</div>
        <div><strong style="color:#211A14">Zero marginal cost.</strong> Fuel already spent on the commute.</div>
        <div><strong style="color:#211A14">Complementary peaks.</strong> Rides peak at rush hour; deliveries fill midday.</div>
        <div><strong style="color:#211A14">Cross-sell.</strong> Car owners earn 15–25% more per day at about 2× utilisation.</div>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;border-top:1px solid #ECDFCE;padding-top:28px">
    <div style="font-size:15px;line-height:1.5;color:#514336"><strong style="color:#211A14;display:block;font-size:17px">Monthly rider subscription</strong>Unlimited routes on a single fee for the heaviest commuters.</div>
    <div style="font-size:15px;line-height:1.5;color:#514336"><strong style="color:#211A14;display:block;font-size:17px">Car owner credit products</strong>Fuel, maintenance and vehicle acquisition, underwritten by ledger history. Later.</div>
    <div style="font-size:15px;line-height:1.5;color:#514336"><strong style="color:#211A14;display:block;font-size:17px">Embedded insurance</strong>Per-trip passenger and vehicle cover at booking, earning commission from the underwriter.</div>
    <div style="font-size:15px;line-height:1.5;color:#514336"><strong style="color:#211A14;display:block;font-size:17px">Commute-demand data</strong>Anonymised, aggregated corridor demand — valuable to planners, retailers and developers.</div>
  </div>
</section>

<section style="background:#211A14;color:#FFF8F0">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:900px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Possible revenue line · Treasury float</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0;text-wrap:pretty">The escrow model holds cash. Cash on deposit earns.</h2>
      <p style="font-size:17px;line-height:1.55;color:#ECDFCE;margin:0">Passengers pay for the week upfront, so their fares sit in escrow for the duration of every trip — and more than half of all trips run five days. At any point, an estimated <strong style="color:#FFF8F0">15–25% of monthly GMV</strong> is held on our rails. Parked in a liquid call deposit at about <strong style="color:#FFF8F0">12% a year</strong>, that float becomes a revenue line at near-zero marginal cost — additive to, never instead of, the transaction take.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px">
      <div style="background:#2C231B;border:1px solid #514336;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#D6C3B3">Dec 2026</div><div style="font-size:15px;color:#ECDFCE">~₦200m GMV / month</div><div style="font-size:15px;color:#ECDFCE">₦30–50m held in escrow</div><div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:34px;line-height:1;color:#E98B20;margin-top:6px">~₦4–6m<span style="font-size:15px;color:#8A7A6B"> / yr</span></div></div>
      <div style="background:#2C231B;border:1px solid #514336;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#D6C3B3">Jun 2027</div><div style="font-size:15px;color:#ECDFCE">~₦1.0b GMV / month</div><div style="font-size:15px;color:#ECDFCE">₦155–260m held in escrow</div><div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:34px;line-height:1;color:#E98B20;margin-top:6px">~₦19–31m<span style="font-size:15px;color:#8A7A6B"> / yr</span></div></div>
      <div style="background:#EE4643;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:6px"><div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#FFE9E4">Dec 2027 · run-rate</div><div style="font-size:15px;color:#FFF8F0">~₦3.35b GMV / month</div><div style="font-size:15px;color:#FFF8F0">₦500–840m held in escrow</div><div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:40px;line-height:1;color:#fff;margin-top:6px">~₦60–100m<span style="font-size:15px;color:#FFE9E4"> / yr</span></div></div>
    </div>
    <p style="font-size:14px;line-height:1.5;color:#D6C3B3;margin:0;max-width:960px">Illustrative, and shown as optionality — not included in the core projection. It requires a trust/escrow structure where Conductor is entitled to the interest (or a bank sweep that shares it), never touches principal, and keeps a payout and refund buffer. GMV is taken at ≈10× platform revenue, reflecting our ~10% take.</p>
  </div>
</section>
`;

export default function DeckModel() {
  return (
    <>
      <DeckTracker slide="model" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: MODEL }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "market", label: "Market" }} next={{ slug: "why-now", label: "Why now" }} />
    </>
  );
}
