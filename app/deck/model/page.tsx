import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/model.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const MODEL = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Chapter 4 · Business model</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">A 10% take on every ride. Held in escrow. Released weekly.</h1>
  <p style="font-size:18px;line-height:1.55;color:#454442;margin:0;max-width:760px">10% on the rider fare plus 10% on driver earnings — roughly ₦360 on a ₦1,500 average fare. No surge, no dynamic markup, no hidden fees.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px">
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:grid;grid-template-columns:min(300px,80vw) 1fr;gap:24px;align-items:center">
    <div class="iphone17" style="--pw:min(300px,80vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/drv-13-escrow.png" alt="Conductor app screen"></div></div></div>
    <div style="display:flex;flex-direction:column;gap:12px"><img src="/deck/images/icon-bank.png" alt="" style="width:48px;height:48px;border-radius:10px"><div style="font-size:22px;font-weight:700">How money moves</div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">The passenger pays into escrow at booking. Money is held per trip-day until the ride week completes, then released to the driver at week close. If a day does not happen, refunds are automatic and traceable to their origin.</p></div>
  </div>
  <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:grid;grid-template-columns:min(300px,80vw) 1fr;gap:24px;align-items:center">
    <div class="iphone17" style="--pw:min(300px,80vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/pax-11-cost.png" alt="Conductor app screen"></div></div></div>
    <div style="display:flex;flex-direction:column;gap:12px"><img src="/deck/images/icon-earn-weekly.png" alt="" style="width:48px;height:48px;border-radius:10px"><div style="font-size:22px;font-weight:700">What we take</div><p style="font-size:15px;line-height:1.5;color:#454442;margin:0">10% from each side of the transaction. The passenger sees the fare and the fee before booking; the driver sees net earnings per ride, per week and per month in the app.</p></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #E6E5E3;border-bottom:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Unit economics · Ikorodu ↔ Victoria Island</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">One corridor, real economics.</h2>
      <p style="font-size:17px;line-height:1.55;color:#454442;margin:0">Figures from the 5-year financial projection model, standard 4-seat car, using the actual in-app fare for this route.</p>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) min(300px,80vw) minmax(0,0.8fr);gap:32px;align-items:start">
      <div style="border:1px solid #E6E5E3;border-radius:16px;overflow:hidden;font-size:16px">
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Ride fare per passenger</span><span>₦2,835</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Blended promo discount</span><span>(₦425)</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;font-weight:700"><span>Net paid per passenger</span><span>₦2,410</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><span>× 4 passengers per trip</span><span>₦9,640</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;font-weight:700;color:#E88D0E"><span>Conductor take (10% × 2 sides)</span><span>₦964</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Driver earnings after take</span><span>₦8,676</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #E6E5E3;color:#454442"><span>Driver weekly earnings (5 days)</span><span>₦43,380</span></div>
        <div style="display:flex;justify-content:space-between;padding:14px 20px;font-weight:700"><span>Driver monthly earnings (20 days)</span><span>₦173,520</span></div>
      </div>
      <div class="iphone17" style="--pw:min(300px,80vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/pax-ikorodu.png" alt="Conductor app screen"></div></div></div>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E88D0E">₦4,820</div><div style="font-size:15px;line-height:1.4;color:#454442;margin-top:6px">weekly Conductor take from one 4-seat car running five days</div></div>
        <div style="height:1px;background:#E6E5E3"></div>
        <div><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1">₦482k</div><div style="font-size:15px;line-height:1.4;color:#454442;margin-top:6px">weekly take with 100 cars on this corridor</div></div>
        <div style="height:1px;background:#E6E5E3"></div>
        <div><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:56px;line-height:1">₦2.4m</div><div style="font-size:15px;line-height:1.4;color:#454442;margin-top:6px">weekly take with 500 cars — all from a single corridor</div></div>
      </div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:900px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Second revenue line · Conductor Deliveries</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0;text-wrap:pretty">Every car finishing a morning commute returns with empty seats and an empty boot.</h2>
    <p style="font-size:17px;line-height:1.55;color:#454442;margin:0">Cars going to the Island in the morning come back to the mainland in the afternoon, often empty. That return trip is a fully paid-for delivery route with zero marginal fuel cost. We are not building a delivery company from scratch; we are bolting a package layer onto a network of cars that already goes where deliveries need to go.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px">
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#676563">Now · Q4 2026</div>
      <div style="font-size:22px;font-weight:700;line-height:1.2">Partner with an established Lagos delivery operator</div>
      <p style="font-size:15px;line-height:1.5;color:#454442;margin:0;flex:1">They handle package pickup, sorting and last-mile logistics; we plug into their API. Our car owners pick up packages on the routes they were already driving. No delivery ops build required.</p>
      <div style="font-size:15px;font-weight:700;color:#24A148">Zero-risk go-to-market</div>
    </div>
    <div style="background:#292928;color:#FDFAF6;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#E88D0E">Then · Q1–Q2 2027</div>
      <div style="font-size:22px;font-weight:700;line-height:1.2">Deliveries native in the Conductor app</div>
      <p style="font-size:15px;line-height:1.5;color:#E6E5E3;margin:0;flex:1">Every car owner sees delivery jobs alongside passenger rides. Same fleet, same escrow, same account, no partner cut.</p>
      <div style="font-size:15px;font-weight:700;color:#E88D0E">Full margin capture</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <img src="/deck/images/illust-inside-car.png" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:16px">
      <div style="display:flex;flex-direction:column;gap:8px;font-size:15px;line-height:1.5;color:#454442">
        <div><strong style="color:#292928">Same supply.</strong> Vehicles already on the road.</div>
        <div><strong style="color:#292928">Zero marginal cost.</strong> Fuel already spent on the commute.</div>
        <div><strong style="color:#292928">Complementary peaks.</strong> Rides peak at rush hour; deliveries fill midday.</div>
        <div><strong style="color:#292928">Cross-sell.</strong> Drivers earn 15–25% more per day at about 2× utilisation.</div>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;border-top:1px solid #E6E5E3;padding-top:28px">
    <div style="font-size:15px;line-height:1.5;color:#454442"><strong style="color:#292928;display:block;font-size:17px">Corporate mobility contracts</strong>Bundled commute for staff of banks, telcos and consulting firms. LOIs in progress.</div>
    <div style="font-size:15px;line-height:1.5;color:#454442"><strong style="color:#292928;display:block;font-size:17px">Monthly rider subscription</strong>Unlimited routes on a single fee for the heaviest commuters.</div>
    <div style="font-size:15px;line-height:1.5;color:#454442"><strong style="color:#292928;display:block;font-size:17px">Driver credit products</strong>Fuel, maintenance and vehicle acquisition, underwritten by ledger history. Later.</div>
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
