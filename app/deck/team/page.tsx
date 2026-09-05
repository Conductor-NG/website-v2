import { DeckTracker } from "../deck-client";
import { DeckPager } from "../deck-nav";

// Ported near-verbatim from the Claude Design deck (site/team.dc.html).
// Image paths → /deck/images, internal links → /deck/*, CTAs tagged data-cta
// so the enhancer tracks them. Section content is server-rendered HTML.
const TEAM = `
<section style="max-width:1200px;margin:0 auto;padding:80px 32px 48px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:16px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#E88D0E">Chapter 7 · Team</div>
  <h1 style="font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-0.02em;margin:0;max-width:960px;text-wrap:pretty">A team that shipped. An advisory bench ready to accelerate.</h1>
  <p style="font-size:18px;line-height:1.55;color:#454442;margin:0;max-width:840px">We are not a hired-in team — we are friends, and friends of friends. That is how a group this size has kept building and supporting the app for 33 months, most of it unpaid. 20+ contributors across engineering, product, design, operations, marketing and QA, in Lagos and London, with every part of the stack built in-house.</p>
</section>

<section style="max-width:1200px;margin:0 auto;padding:0 32px 56px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:20px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#676563">Co-founders</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px"><div style="width:120px;height:120px;border-radius:50%;background:#FAE8CF;display:flex;align-items:center;justify-content:center;font-size:14px;color:#9F6010">Headshot</div><div><div style="font-size:24px;font-weight:700">Wale</div><div style="font-size:15px;color:#E88D0E;font-weight:700;margin-top:4px">Founder</div></div><p style="font-size:15px;line-height:1.5;color:#909596;margin:0">One-line bio to be added.</p><a href="#" style="font-size:14px;font-weight:600;color:#E88D0E;text-decoration:none">LinkedIn →</a></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px"><div style="width:120px;height:120px;border-radius:50%;background:#FAE8CF;display:flex;align-items:center;justify-content:center;font-size:14px;color:#9F6010">Headshot</div><div><div style="font-size:24px;font-weight:700">Dimeji</div><div style="font-size:15px;color:#E88D0E;font-weight:700;margin-top:4px">Co-founder · Chief Technology Officer</div></div><p style="font-size:15px;line-height:1.5;color:#909596;margin:0">One-line bio to be added.</p><a href="#" style="font-size:14px;font-weight:600;color:#E88D0E;text-decoration:none">LinkedIn →</a></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px"><div style="width:120px;height:120px;border-radius:50%;background:#FAE8CF;display:flex;align-items:center;justify-content:center;font-size:14px;color:#9F6010">Headshot</div><div><div style="font-size:24px;font-weight:700">Bawo</div><div style="font-size:15px;color:#E88D0E;font-weight:700;margin-top:4px">Co-founder</div></div><p style="font-size:15px;line-height:1.5;color:#909596;margin:0">One-line bio to be added.</p><a href="#" style="font-size:14px;font-weight:600;color:#E88D0E;text-decoration:none">LinkedIn →</a></div>
  </div>
</section>

<section style="background:#fff;border-top:1px solid #E6E5E3;border-bottom:1px solid #E6E5E3">
  <div style="max-width:1200px;margin:0 auto;padding:56px 32px;display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;flex-direction:column;gap:8px;max-width:860px"><div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#676563">Marketing Advisory Board</div><p style="font-size:16px;line-height:1.55;color:#454442;margin:0">Assembled in mid-2026 to accelerate go-to-market. Retained at about ₦5m a month collectively; three months (~₦15m) currently accrued and reflected in the deferred-compensation table on the Financials page. The ongoing retainer is partially covered by this raise.</p></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
      <div style="background:#FAF6ED;border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px"><div style="width:72px;height:72px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:20px;font-weight:700">Advisor 1</div><div style="font-size:14px;color:#676563;margin-top:4px">Role · company · credentials pending</div></div></div>
      <div style="background:#FAF6ED;border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px"><div style="width:72px;height:72px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:20px;font-weight:700">Advisor 2</div><div style="font-size:14px;color:#676563;margin-top:4px">Role · company · credentials pending</div></div></div>
      <div style="background:#FAF6ED;border:1px solid #E6E5E3;border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px"><div style="width:72px;height:72px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:20px;font-weight:700">Advisor 3</div><div style="font-size:14px;color:#676563;margin-top:4px">Role · company · credentials pending</div></div></div>
    </div>
  </div>
</section>

<section style="max-width:1200px;margin:0 auto;padding:56px 32px 72px;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:20px">
  <div style="font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#676563">The wider team</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px">
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Enger</div><div style="font-size:13px;color:#676563">Senior Software Developer</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Victor</div><div style="font-size:13px;color:#676563">Marketing Manager</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Daniel</div><div style="font-size:13px;color:#676563">Operations Manager</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Folashade</div><div style="font-size:13px;color:#676563">Project Manager</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Oluwatoba</div><div style="font-size:13px;color:#676563">Product Designer</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Nnena</div><div style="font-size:13px;color:#676563">Project Manager</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Oluwatosin</div><div style="font-size:13px;color:#676563">Technical Project Manager</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Nyore</div><div style="font-size:13px;color:#676563">Designer</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Oyinlola</div><div style="font-size:13px;color:#676563">Communications</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">AbdulMalik</div><div style="font-size:13px;color:#676563">Product Design Lead</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Ridwan</div><div style="font-size:13px;color:#676563">Head, Business Development</div></div></div>
    <div style="background:#fff;border:1px solid #E6E5E3;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#E6E5E3;flex:none"></div><div><div style="font-size:15px;font-weight:700">Sanusi</div><div style="font-size:13px;color:#676563">Product Development Lead</div></div></div>
  </div>
  <p style="font-size:14px;color:#909596;margin:0">Friends, and friends of friends — most of them here since the beginning.</p>
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
