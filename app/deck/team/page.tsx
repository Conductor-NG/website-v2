import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/team.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
export const TEAM = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Chapter 7 · Team</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">A team that shipped. An advisory bench ready to accelerate.</h1>
  <p style="font-size:18px;line-height:1.55;color:#514336;margin:0;max-width:840px">We are not a hired-in team — we are friends, and friends of friends. That is how a group this size has kept building and supporting the app for 33 months — on founder-funded salaries, with most taking part of their market rate as ownership rather than cash. 20+ contributors across engineering, product, design, operations, marketing and QA, in Lagos, London and Canada, with every part of the stack built in-house.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 56px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:20px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5D4E">Co-founders</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px"><div style="width:120px;height:120px;border-radius:50%;overflow:hidden;background:#FAE8CF;flex:none"><img src="/deck/images/founder-wale.jpg" alt="Wale Shekoni" style="width:100%;height:100%;object-fit:cover;object-position:50% 22%;display:block"></div><div><div style="font-size:24px;font-weight:700">Wale Shekoni</div><div style="font-size:15px;color:#EE4643;font-weight:700;margin-top:4px">Founder</div></div><p style="font-size:15px;line-height:1.5;color:#8A7A6B;margin:0">Drove his own Obalende–Ikoyi commute for years, turning down the passengers who flagged him down because there was no safe way to say yes. Started Conductor in January 2024 to build exactly that.</p><a href="#" style="font-size:14px;font-weight:600;color:#EE4643;text-decoration:none">LinkedIn →</a></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px"><div style="width:120px;height:120px;border-radius:50%;background:#FAE8CF;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:44px;color:#9F6010">D</div><div><div style="font-size:24px;font-weight:700">Dimeji</div><div style="font-size:15px;color:#EE4643;font-weight:700;margin-top:4px">Co-founder</div></div><p style="font-size:15px;line-height:1.5;color:#8A7A6B;margin:0">One-pager to be added.</p><a href="#" style="font-size:14px;font-weight:600;color:#EE4643;text-decoration:none">LinkedIn →</a></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px"><div style="width:120px;height:120px;border-radius:50%;background:#FAE8CF;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:44px;color:#9F6010">B</div><div><div style="font-size:24px;font-weight:700">Bawo</div><div style="font-size:15px;color:#EE4643;font-weight:700;margin-top:4px">Co-founder</div></div><p style="font-size:15px;line-height:1.5;color:#8A7A6B;margin:0">One-pager to be added.</p><a href="#" style="font-size:14px;font-weight:600;color:#EE4643;text-decoration:none">LinkedIn →</a></div>
  </div>
</section>

<section style="background:#211A14;color:#FFF8F0">
  <div style="max-width:1200px;margin:0 auto;padding:64px 32px;display:grid;grid-template-columns:minmax(240px,340px) 1fr;gap:44px;align-items:start">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="border-radius:20px;overflow:hidden;aspect-ratio:4/5;background:#2C231B"><img src="/deck/images/founder-wale.jpg" alt="Wale Shekoni, Founder of Conductor" style="width:100%;height:100%;object-fit:cover;display:block"></div>
      <div><div style="font-size:20px;font-weight:700">Wale Shekoni</div><div style="font-size:14px;color:#D6C3B3;margin-top:2px">Founder</div></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#EE4643">Founder's story</div>
      <p style="font-size:18px;line-height:1.6;color:#ECDFCE;margin:0">In 2019 I drove to and from my office on Ikoyi Road, by Obalende. On the way home, going up the Obalende bridge, commuters would flag me down to hitch a ride toward the Iyana Oworo bus stop — while I was headed for Costain roundabout. Same road, same direction. And yet I never picked anyone up.</p>
      <p style="font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:clamp(24px,2.6vw,32px);line-height:1.3;color:#EE4643;margin:0">"The demand was literally flagging me down. The trust to say yes just didn't exist yet."</p>
      <p style="font-size:18px;line-height:1.6;color:#ECDFCE;margin:0">I didn't know these people and no one could vouch for them. They didn't know where I was going. I didn't know the going rate for a drop anywhere in Lagos, and they had no way of knowing whether I meant to carry them for free. And if anything happened on that bridge — if I ever felt unsafe — there was no one I could reach in the moment.</p>
      <p style="font-size:18px;line-height:1.6;color:#ECDFCE;margin:0">In January 2024 it all came together, and we began building Conductor — the trust, the pricing, the vouching, and the safety line that were missing on that bridge. Today the app is complete, and we are turning it on.</p>
      <div style="font-size:15px;color:#D6C3B3;margin-top:4px">— Wale Shekoni, Founder</div>
    </div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #ECDFCE;border-bottom:1px solid #ECDFCE">
  <div style="max-width:1200px;margin:0 auto;padding:56px 32px;display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;flex-direction:column;gap:8px;max-width:860px"><div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5D4E">Marketing Advisory Board</div><p style="font-size:16px;line-height:1.55;color:#514336;margin:0">Assembled in mid-2026 to accelerate go-to-market. Retained at about ₦5m a month collectively; three months (~₦15m) currently accrued and reflected in the committed-capital table on the Financials page. The ongoing retainer is partially covered by this raise.</p></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
      <a href="https://ng.linkedin.com/in/izuchukwu-umemba-115596b8" target="_blank" rel="noopener noreferrer" style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px;text-decoration:none;color:inherit"><div style="width:72px;height:72px;border-radius:50%;background:#ECDFCE;flex:none;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:28px;color:#9F6010">IU</div><div><div style="font-size:20px;font-weight:700">Izuchukwu Umemba</div><div style="font-size:14px;color:#6B5D4E;margin-top:4px">Marketing advisor</div><div style="font-size:13px;color:#EE4643;font-weight:600;margin-top:6px">LinkedIn →</div></div></a>
      <a href="https://ca.linkedin.com/in/oluwatayo-alofun" target="_blank" rel="noopener noreferrer" style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px;text-decoration:none;color:inherit"><div style="width:72px;height:72px;border-radius:50%;background:#ECDFCE;flex:none;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:28px;color:#9F6010">OA</div><div><div style="font-size:20px;font-weight:700">Oluwatayo Alofun</div><div style="font-size:14px;color:#6B5D4E;margin-top:4px">Marketing advisor</div><div style="font-size:13px;color:#EE4643;font-weight:600;margin-top:6px">LinkedIn →</div></div></a>
      <a href="https://ng.linkedin.com/in/seun-koshoedo-10a9b712b" target="_blank" rel="noopener noreferrer" style="background:#FAEDDE;border:1px solid #ECDFCE;border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px;text-decoration:none;color:inherit"><div style="width:72px;height:72px;border-radius:50%;background:#ECDFCE;flex:none;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif','Roboto Flex',Georgia,serif;font-style:italic;font-size:28px;color:#9F6010">SK</div><div><div style="font-size:20px;font-weight:700">Seun Koshoedo</div><div style="font-size:14px;color:#6B5D4E;margin-top:4px">Marketing advisor</div><div style="font-size:13px;color:#EE4643;font-weight:600;margin-top:6px">LinkedIn →</div></div></a>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:56px 32px 72px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:20px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B5D4E">The wider team</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px">
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Enger</div><div style="font-size:13px;color:#6B5D4E">Senior Software Developer</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Victor</div><div style="font-size:13px;color:#6B5D4E">Marketing Manager</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Daniel</div><div style="font-size:13px;color:#6B5D4E">Operations Manager</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Folashade</div><div style="font-size:13px;color:#6B5D4E">Project Manager</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Oluwatoba</div><div style="font-size:13px;color:#6B5D4E">Product Designer</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Nnena</div><div style="font-size:13px;color:#6B5D4E">Project Manager</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Oluwatosin</div><div style="font-size:13px;color:#6B5D4E">Technical Project Manager</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Nyore</div><div style="font-size:13px;color:#6B5D4E">Designer</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Oyinlola</div><div style="font-size:13px;color:#6B5D4E">Communications</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">AbdulMalik</div><div style="font-size:13px;color:#6B5D4E">Product Design Lead</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Ridwan</div><div style="font-size:13px;color:#6B5D4E">Head, Business Development</div></div></div>
    <div style="background:#fff;border:1px solid #ECDFCE;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#ECDFCE;flex:none"></div><div><div style="font-size:15px;font-weight:700">Sanusi</div><div style="font-size:13px;color:#6B5D4E">Product Development Lead</div></div></div>
  </div>
  <p style="font-size:14px;color:#8A7A6B;margin:0">Friends, and friends of friends — most of them here since the beginning.</p>
</section>
`;

export default function DeckTeam() {
  return (
    <>
      <DeckTracker slide="team" />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <main dangerouslySetInnerHTML={{ __html: TEAM }} />
      <div style={{ flex: 1 }} />
      <DeckPager prev={{ slug: "plan", label: "Plan" }} next={{ slug: "financials", label: "Financials" }} />
    </>
  );
}
