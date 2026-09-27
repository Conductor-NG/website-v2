import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Chapter 10 — the round after this one. Same inline-style vocabulary as the
// ported deck chapters so it reads as one document.
//
// Every figure here is derived, not asserted: 4% comes from $200k on the $5M
// post-money cap (the same number /deck/financials already quotes), and the
// 4x from that 4% priced at $20M. The milestones are the ones already on
// /deck/ask — this page deliberately adds no new targets, because its whole
// argument is that the $20M has to be EARNED by the targets already promised.
export const NEXT_ROUND = `
<section style="position:relative;overflow:hidden;border-bottom:1px solid #ECDFCE">
  <div style="position:relative;max-width:1200px;margin:0 auto;padding:80px 32px 64px;display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 10 · The round after this one</div>
      <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;text-wrap:pretty">$1–2M at $20M, from institutional investors — once this round has earned the number.</h1>
      <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:720px">This $200k is not the raise that scales Conductor. It is the raise that makes Conductor fundable at a real price. Twelve months from now the plan is to sit in front of major VCs with the corridor economics proven, Deliveries live and a second revenue line running — and ask for $1–2M at a $20M valuation. That is the job this round is being hired to do.</p>
    </div>
    <div style="background:#211A14;color:#FFF8F0;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:12px;font-size:16px">
      <div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:56px;line-height:1;color:#E98B20">$1–2M</div>
      <div style="display:flex;justify-content:space-between;border-top:1px solid #514336;padding-top:12px"><span style="color:#D6C3B3">Target valuation</span><span>$20M</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Instrument</span><span>Priced equity</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">New investor takes</span><span>5–10%</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Who we approach</span><span>Institutional VCs</span></div>
      <div style="display:flex;justify-content:space-between"><span style="color:#D6C3B3">Timing</span><span>On the milestones, not a date</span></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:28px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">What this means for you</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">Your $200k does not stay a $200k SAFE</h2>
    <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">You come in on a $5M cap. The institutions come in at $20M. When the priced round closes, your SAFE converts at your cap, not theirs — so the same cheque is holding four times the valuation it was written against.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:8px">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E">You invest now</div>
      <div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:44px;line-height:1;color:#211A14">$200k</div>
      <div style="font-size:15px;color:#514336">On a $5M post-money SAFE cap, 20% discount, no board seat.</div>
    </div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:8px">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E">That converts to</div>
      <div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:44px;line-height:1;color:#211A14">~4%</div>
      <div style="font-size:15px;color:#514336">$200k on a $5M cap. The cap beats the discount at any price above $6.25M, so the cap is what applies.</div>
    </div>
    <div style="background:#211A14;color:#FFF8F0;border:1px solid #211A14;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:8px">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#D6C3B3">Priced at $20M, that is</div>
      <div style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:44px;line-height:1;color:#E98B20">~$800k</div>
      <div style="font-size:15px;color:#D6C3B3">A 4× mark on paper — before any of it is liquid, and only if the round clears at $20M.</div>
    </div>
  </div>
  <p style="font-size:14px;line-height:1.55;color:#8A7A6B;margin:0;max-width:860px">Stated plainly, because it matters: a 4× paper mark is not a return. It is what the next investor's price does to your entry price. It becomes real at an exit or a secondary, and it becomes nothing if the milestones below are missed and the round prices lower — which is the risk you are being paid the $5M cap to take.</p>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:72px 32px;display:flex;flex-direction:column;gap:28px">
    <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Why $20M is a target and not a claim</div>
      <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">This round buys the evidence for the number</h2>
      <p style="font-size:17px;line-height:1.55;color:#514336;margin:0">We are not asking you to accept $20M today. We are telling you what we intend to be able to defend, and what has to be true first. Institutional investors price on traction, not narrative — so the $200k goes almost entirely into producing traction that survives diligence.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px">
      <div style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9F6010">Checkpoint 1 · Dec 2026</div>
        <div style="font-size:16px;line-height:1.5;color:#211A14;font-weight:600">A corridor at density, and a second product in beta</div>
        <div style="font-size:15px;line-height:1.5;color:#514336">700 monthly active car owners, ~2,000 passengers, ~₦20m monthly revenue, Lagos Island at density, Deliveries beta on three routes.</div>
      </div>
      <div style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9F6010">Checkpoint 2 · June 2027</div>
        <div style="font-size:16px;line-height:1.5;color:#211A14;font-weight:600">The raise conversation opens here</div>
        <div style="font-size:15px;line-height:1.5;color:#514336">3,000 car owners, ~8,000 passengers, ~₦100m monthly revenue, three states, first Conductor-for-Enterprise contract, Deliveries public launch. Multi-city, multi-product, two revenue lines — the shape institutions underwrite.</div>
      </div>
      <div style="background:#211A14;color:#FFF8F0;border:1px solid #211A14;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#E98B20">Beyond · Dec 2027</div>
        <div style="font-size:16px;line-height:1.5;font-weight:600">The $1–2M is what gets us here</div>
        <div style="font-size:15px;line-height:1.5;color:#D6C3B3">10,000 car owners, ~25,000 passengers, ~₦350m monthly (~₦4b run-rate), profitable on the Island corridor — and a Series A conversation at a price this round is not trying to set.</div>
      </div>
    </div>
    <p style="font-size:14px;line-height:1.55;color:#8A7A6B;margin:0;max-width:860px">We go when the numbers go, not when the calendar does. Raising at $20M against Checkpoint 1 alone would be asking institutions to take the same leap we are asking you to take — and paying a much higher price for it.</p>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:72px 32px 80px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:28px">
  <div style="display:flex;flex-direction:column;gap:12px;max-width:860px">
    <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">The two rounds side by side</div>
    <h2 style="font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.01em;margin:0">One is proof capital. The other is scale capital.</h2>
  </div>
  <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;overflow:hidden;font-size:15px;line-height:1.45">
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:12px 24px;border-bottom:1px solid #ECDFCE;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B5D4E"><span></span><span>This round — now</span><span>Next round — on the milestones</span></div>
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Amount</strong><span style="color:#514336">$200k</span><span style="color:#514336">$1–2M</span></div>
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Valuation</strong><span style="color:#514336">$5M cap</span><span style="color:#514336">$20M target</span></div>
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Instrument</strong><span style="color:#514336">Post-money SAFE, 20% discount</span><span style="color:#514336">Priced equity round</span></div>
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>From</strong><span style="color:#514336">Angels and operators who can judge the product</span><span style="color:#514336">Institutional VCs who price on traction</span></div>
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:14px 24px;border-bottom:1px solid #ECDFCE"><strong>Buys</strong><span style="color:#514336">Proof: one corridor at density, Deliveries live, the channel repeatable</span><span style="color:#514336">Scale: states, fleet supply, enterprise, the second revenue line at volume</span></div>
    <div style="display:grid;grid-template-columns:minmax(140px,0.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px;padding:14px 24px"><strong>Risk you carry</strong><span style="color:#514336">Execution — the number is unproven, which is why the cap is $5M</span><span style="color:#514336">Priced on evidence, so far less</span></div>
  </div>
</section>
`;

export default function DeckNextRound() {
  return (
    <>
      <DeckTracker slide="next-round" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: NEXT_ROUND }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "ask", label: "The ask" }} />
    </>
  );
}
