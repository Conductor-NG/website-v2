// Capture the pax app (Expo web on :8081) with the seeded London trips.
// Same approach as the Lagos deck captures: real screens, light DOM tidy
// (₦ → illustrative £, drop the "Greater London" state suffix).
const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "C:/Users/Wale/Documents/Claude/website-v2/public/images/screens/uk";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = 8081;
const TRIP = process.env.TRIP || "4448";
const BOOKING = process.env.BOOKING || "230";
const ONLY = (process.env.ONLY || "").split(",").filter(Boolean);
fs.mkdirSync(OUT, { recursive: true });

async function clickText(p, t) {
  return await p.evaluate((x) => {
    const e = [...document.querySelectorAll("div,span,a,button,[role=button]")].reverse()
      .find((el) => (el.innerText || "").trim().toUpperCase() === x.toUpperCase());
    if (e) { e.click(); return true; } return false;
  }, t);
}
async function login(p, email) {
  await p.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle2", timeout: 120000 });
  await sleep(5000);
  await clickText(p, "SIGN IN"); await sleep(2500);
  await clickText(p, "Email"); await sleep(1500);
  const i = await p.$$("input");
  await i[0].click(); await p.keyboard.type(email, { delay: 15 });
  await i[1].click(); await p.keyboard.type("Password123!", { delay: 15 });
  await clickText(p, "Sign in"); await sleep(7000);
  console.log("after login:", p.url());
}
// ₦ → £ (illustrative: ₦400 ≈ £1 for the demo), strip Nigerian-only bits.
async function tidy(p) {
  return await p.evaluate(() => {
    let n = 0;
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walk.nextNode()) nodes.push(walk.currentNode);
    for (const t of nodes) {
      let s = t.nodeValue; const o = s;
      s = s.replace(/₦\s?([\d,]+(?:\.\d+)?)/g, (_, num) => {
        const naira = Number(num.replace(/,/g, ""));
        const gbp = naira / 400;
        return "£" + gbp.toLocaleString("en-GB", { minimumFractionDigits: gbp % 1 ? 2 : 0, maximumFractionDigits: 2 });
      });
      s = s.replace(/,\s*Greater London/g, "").replace(/Greater London/g, "London");
      s = s.replace(/, London, London/g, ", London");
      s = s.replace(/\bNIN\b/g, "ID");
      s = s.replace(/responds in ~0 min/g, "responds in ~5 min");
      s = s.replace(/~£0 \/ week/g, "~£21.40 / week");
      if (s.trim() === "New user") s = "4.9 ★ · 128 trips";
      s = s.replace(/London to London/g, "Clapham to Canary Wharf").replace(/^4 REQUESTS$/, "1 REQUEST");
      if (s !== o) { t.nodeValue = s; n++; }
    }
    // Google Maps web-only chrome (keyboard shortcuts / terms strip).
    document.querySelectorAll(".gm-style-cc, .gmnoprint").forEach((el) => { el.style.display = "none"; });
    // Owner avatar placeholder "E" → a real photo (served by the website dev server).
    const AV = "http://localhost:3001/images/avatars/p4.jpg";
    const leaves = [...document.querySelectorAll("*")].filter((e) => e.children.length === 0);
    for (const leaf of leaves.filter((e) => e.textContent.trim() === "E")) {
      let c = leaf;
      while (c && !(c.offsetWidth >= 20 && c.offsetWidth <= 80 && Math.abs(c.offsetWidth - c.offsetHeight) < 12)) c = c.parentElement;
      if (!c) continue;
      c.style.backgroundImage = "url('" + AV + "')"; c.style.backgroundSize = "cover"; c.style.backgroundPosition = "center"; c.style.borderRadius = "50%";
      leaf.style.color = "transparent";
    }
    // Requests page: hide the leftover Lagos booking so only the London request shows.
    if (location.pathname.includes("/requests")) {
      const lagos = leaves.find((e) => e.textContent.trim() === "Ikeja to Lagos Island");
      let card = lagos;
      while (card && !(card.innerText || "").includes("View trip")) card = card.parentElement;
      if (card) card.style.display = "none";
      const hdr = leaves.find((e) => /^Booked · \d+$/.test(e.textContent.trim()));
      if (hdr) hdr.style.display = "none";
    }
    // Request page headline renders city → city ("London → London"): name the corridor instead.
    if (location.pathname.includes("/request")) {
      const names = ["Clapham", "Canary Wharf"];
      leaves.filter((e) => e.textContent.trim() === "London").forEach((e, i) => { if (names[i]) e.textContent = names[i]; });
    }
    return n;
  });
}
async function shot(p, name) {
  await sleep(600);
  const n = await tidy(p);
  await sleep(400);
  await p.screenshot({ path: `${OUT}/${name}.png` });
  console.log("wrote", name, "(tidied", n, "nodes)");
}
async function go(p, path, wait = 6000) {
  await p.goto(`http://localhost:${PORT}${path}`, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(wait);
}
const want = (k) => ONLY.length === 0 || ONLY.includes(k);

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--lang=en-GB"] });
  const ctx = b.defaultBrowserContext();
  await ctx.overridePermissions(`http://localhost:${PORT}`, ["geolocation"]);
  const p = await b.newPage();
  await p.setViewport({ width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await p.setGeolocation({ latitude: 51.4618, longitude: -0.1384 }); // Clapham Common
  await login(p, "amarachi.eze@gmail.com");

  if (want("home")) { await go(p, "/", 5000); await shot(p, "pax-00-home"); }
  if (want("find")) {
    await go(p, "/find", 9000);
    await clickText(p, "Allow"); await sleep(4000);
    await shot(p, "pax-01-find");
  }
  if (want("list")) { await go(p, "/find/list", 7000); await clickText(p, "Allow"); await sleep(2000); await shot(p, "pax-02-results"); }
  if (want("detail")) { await go(p, `/find/detail/c1c4e4dc-0352-4627-9ed2-bda6855b0705`, 8000); await shot(p, "pax-03-detail"); }
  if (want("request")) { await go(p, `/trip/${TRIP}/request`, 7000); await shot(p, "pax-04-request"); }
  if (want("booking")) { await go(p, `/booking/${BOOKING}`, 7000); await shot(p, "pax-05-accepted"); }
  if (want("wallet")) { await go(p, "/wallet", 6000); await shot(p, "pax-06-wallet"); }
  if (want("requests")) { await go(p, "/requests", 6000); await shot(p, "pax-07-requests"); }
  await b.close();
})().catch((e) => { console.error("FATAL:", e.message); process.exit(1); });
