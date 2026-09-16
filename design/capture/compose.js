const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
const OUT = "C:/Users/Wale/Documents/Claude/website-v2/public/images/london";
fs.mkdirSync(OUT, { recursive: true });
const ONLY = (process.env.ONLY || "hero,og,map").split(",");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 2800, deviceScaleFactor: 2 });
  await p.goto("file:///C:/Users/Wale/AppData/Local/Temp/claude/c--Users-Wale-Documents-Claude/f497bcfd-876d-40bb-b237-c08cf0105a7c/scratchpad/compose.html", { waitUntil: "networkidle0", timeout: 120000 });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => window.__ready);
  await new Promise((r) => setTimeout(r, 1500));
  const jobs = { hero: ["#hero", "hero-phones.png", true], og: ["#og", "og.png", false], map: ["#map", "corridors-map.png", false] };
  for (const k of ONLY) {
    const [sel, file, transparent] = jobs[k];
    const el = await p.$(sel);
    await el.screenshot({ path: `${OUT}/${file}`, omitBackground: transparent });
    console.log("wrote", file);
  }
  await b.close();
})().catch((e) => { console.error("FATAL", e.message); process.exit(1); });
