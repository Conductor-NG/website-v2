import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/plan.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const PLAN = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 6 · Plan and competition</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">What we did. What we do next.</h1>
  <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:760px">Every milestone below is either done or ten days out. We have been building quietly for 33 months. The raise switches on the growth valve.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 72px;width:100%;box-sizing:border-box">
  <div style="position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
    <div style="display:flex;flex-direction:column;gap:14px;border-top:2px solid #ECDFCE;padding-top:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#6B5D4E">Q4 2024</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Company incorporated (RC 7952968). MVP build begins.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;border-top:2px solid #ECDFCE;padding-top:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#6B5D4E">Q4 2025</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Public MVP launch. First 500 users onboarded.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;border-top:2px solid #ECDFCE;padding-top:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#6B5D4E">Q3 2026</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">V2 rebuild ships: escrow, verification, community. Digital ads begin.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;border-top:2px solid #EE4643;padding-top:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#EE4643">Sep 15, 2026</div><p style="font-size:15px;line-height:1.5;margin:0;font-weight:700">Paid rides launch on the Lagos Island cluster.</p></div>
    <div style="display:flex;flex-direction:column;gap:14px;border-top:2px dashed #D6C3B3;padding-top:20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:30px;line-height:1;color:#6B5D4E">Q4 2026 – Q1 2027</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">1,000 car owners · 10,000 passengers · corporate partnerships · Conductor Deliveries live.</p></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Go-to-market</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Corridor-first. Community-driven. Corporate-scaled.</h2>
      <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">The community feature lets a workplace or estate become its own private carpool. That is the sticky product-market fit we are pushing toward.</p>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) min(240px,42vw) min(240px,42vw);gap:24px;align-items:start">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EE4643">Phase 1 · Sep–Nov 2026</div><div style="font-size:22px;font-weight:700">Hyper-local launch</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Ikorodu ↔ VI and Ajah ↔ Lekki. Seed density first: get to 100 verified car owners per corridor before opening the next.</p></div>
        <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EE4643">Phase 2 · Dec 2026–Feb 2027</div><div style="font-size:22px;font-weight:700">Corporate partnerships</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Banks, telcos and consulting firms with 500+ staff. Rides bundled as an employee benefit. LOIs already in progress.</p></div>
        <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:8px"><div style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#EE4643">Phase 3 · Mar–Jun 2027</div><div style="font-size:22px;font-weight:700">Scaled acquisition</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Ads at scale targeted at Island-destination commuters. Referral engine. Waitlist conversion.</p></div>
      </div>
      <div class="iphone17" style="--pw:min(240px,42vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/pax-10-community.png" alt="Conductor app screen"></div></div></div>
      <div class="iphone17" style="--pw:min(240px,42vw)"><div class="iphone17__btn iphone17__btn--action"></div><div class="iphone17__btn iphone17__btn--vup"></div><div class="iphone17__btn iphone17__btn--vdown"></div><div class="iphone17__btn iphone17__btn--power"></div><div class="iphone17__bezel"><div class="iphone17__status"><span class="iphone17__time">9:41</span></div><div class="iphone17__island"></div><div class="iphone17__screen"><img src="/deck/images/drv-08-community.png" alt="Conductor app screen"></div></div></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:32px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Competitive landscape</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Post-Uber, the field is open. What is left does not fit the commuter.</h2>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:auto">
    <div style="min-width:900px;font-size:15px;line-height:1.35">
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E;text-align:center"><span></span><span style="color:#EE4643">Conductor</span><span>Bolt</span><span>inDrive</span><span>Shuttlers POD</span><span>LagRide</span><span>Uber</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;text-align:center;align-items:center"><strong style="text-align:left">Community carpooling matched to destination</strong><span style="color:#24A148;font-weight:700">Yes</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">Small group only</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">No</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;text-align:center;align-items:center"><strong style="text-align:left">Recurring weekly commutes</strong><span style="color:#24A148;font-weight:700">Yes</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">Manual re-book</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">No</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;text-align:center;align-items:center"><strong style="text-align:left">Two-way verification (car owner and passenger)</strong><span style="color:#24A148;font-weight:700">Both</span><span style="color:#8A7A6B">Driver only</span><span style="color:#8A7A6B">Driver only</span><span style="color:#8A7A6B">Driver only</span><span style="color:#8A7A6B">Driver only</span><span style="color:#8A7A6B">Driver only</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;text-align:center;align-items:center"><strong style="text-align:left">Fixed, predictable pricing</strong><span style="color:#24A148;font-weight:700">Yes</span><span style="color:#8A7A6B">Surge</span><span style="color:#8A7A6B">Negotiated</span><span>Yes</span><span>Yes</span><span style="color:#8A7A6B">Surge</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;text-align:center;align-items:center"><strong style="text-align:left">Escrow and weekly payouts</strong><span style="color:#24A148;font-weight:700">Yes</span><span style="color:#8A7A6B">Daily direct</span><span style="color:#8A7A6B">Cash-first</span><span>Yes</span><span>Yes</span><span>Weekly</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;border-bottom:1px solid #ECDFCE;text-align:center;align-items:center"><strong style="text-align:left">Present in Lagos</strong><span style="color:#24A148;font-weight:700">Sep 15</span><span>Yes</span><span>Yes</span><span style="color:#8A7A6B">Early access</span><span>Yes</span><span style="color:#C41818">Exiting</span></div>
      <div style="display:grid;grid-template-columns:1.6fr repeat(6,1fr);padding:14px 24px;text-align:center;align-items:center"><strong style="text-align:left">Built for the daily commute (₦-affordable)</strong><span style="color:#24A148;font-weight:700">Yes</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">No</span><span style="color:#8A7A6B">Premium</span><span style="color:#8A7A6B">Mixed</span><span style="color:#8A7A6B">No</span></div>
    </div>
  </div>
  <p style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:24px;line-height:1.3;color:#6B5D4E;margin:0;max-width:900px">The only carpooling platform, in the only city Uber just left, at the moment Shuttlers is still gated to a waitlist.</p>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:32px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Moat</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">What competitors cannot copy in six months.</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px">
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">1</span> Destination-magnet matching</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Every commuter is going to VI, Lekki or Ikeja. We match on destination, not route. On-demand hailing cannot retrofit this.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">2</span> Two-way verification</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">Every competitor verifies drivers. Nobody verifies riders. We do both — and once a workplace or estate community is closed-loop verified, it does not unsubscribe.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">3</span> Community-scoped groups</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">A workplace or estate can be its own private group. Switching cost: your whole community would have to move.</p></div>
      <div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px"><div style="font-size:20px;font-weight:700"><span style="color:#EE4643">4</span> Audit-quality operating spine</div><p style="font-size:15px;line-height:1.5;color:#514336;margin:0">FY2025 audited by Lanre Abidakun &amp; Co. London office at 27 College Road, CR0. RC 7952968 in Nigeria. Real books, real ops, a real team of 20+.</p></div>
    </div>
  </div>
</section>
`;

export default function DeckPlan() {
  return (
    <>
      <DeckTracker slide="plan" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: PLAN }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "why-now", label: "Why now" }} next={{ slug: "team", label: "Team" }} />
    </>
  );
}
