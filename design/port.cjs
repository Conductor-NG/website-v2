const fs = require("fs");
const dir = "design/src";
// dependency order: primitives → screens → section HOCs → shell → pages
const order = [
  "Parts", "AppScreens", "Film", "Steps", "Shell", "Places",
  "Quote", "Calculator", "Routes",
  "PaxHome", "Owner", "HowItWorks", "SafetyNew", "FaresPage",
  "Corridors", "CorridorDetail", "About", "FAQ", "Legal",
];
let out =
  '"use client";\n/* AUTO-PORTED from the design export (design/src/*.jsx).\n' +
  '   Do not edit here — edit the source and re-run design/port.cjs.\n' +
  '   Re-skinned to the app theme via app/design-css/theme-override.css. */\n' +
  'import React from "react";\n' +
  "const ReactDOM = { createRoot: () => ({ render() {} }) };\n\n";

for (const name of order) {
  let src = fs.readFileSync(`${dir}/${name}.jsx`, "utf8");
  // Strip the prototype's global-publish + render entrypoints (may be multi-line).
  src = src
    .replace(/Object\.assign\(\s*window\s*,\s*\{[\s\S]*?\}\s*\)\s*;?/g, "")
    .replace(/ReactDOM\.createRoot\([\s\S]*?\)\s*\.render\([\s\S]*?\)\s*;?/g, "")
    .replace(/^\s*window\.[A-Za-z_$][\w$]*\s*=.*$/gm, "");
  out += `\n/* ============ ${name} ============ */\n${src}\n`;
}

// Remap the prototype's .html paths → real Next routes.
out = out.replace(/window.ConductorDesignSystem_31cc6b/g, "(typeof window!=='undefined'?window:{}).ConductorDesignSystem_31cc6b");

out = out.replace(
  /const P=\{[^}]*\};/,
  "const P={home:'/',pass:'/',own:'/car-owners',how:'/how-it-works',about:'/about',safety:'/safety',faq:'/faq',corr:'/corridors',cdet:'/corridors/agege-ikeja',fares:'/fares',privacy:'/legal/privacy',terms:'/legal/terms',conduct:'/legal/code-of-conduct',paxpol:'/legal/passenger-policy',ownpol:'/legal/car-owner-policy',refund:'/legal/privacy#refund',del:'/delete-profile',careers:'/careers',press:'/press'};"
);

out +=
  "\nexport { PaxHome, OwnerPage, HowItWorks, SafetyNew, FaresPage, Corridors, CorridorDetail, FAQPage, About, Calculator, Quote, Header, Footer, PrivacyPage, TermsPage, PassengerPolicyPage, CarOwnerPolicyPage, RefundPolicyPage, AccountDeletionPage, ConductPage, DeletePage, CareersPage, PressPage };\n";

/**
 * Refuse to write if the bundle on disk declares things this port would not.
 *
 * components/design.jsx says "do not edit here" at the top, and it has been
 * edited here anyway, more than once. On 2026-09-22 a port run from sources
 * that had never received those edits silently reverted the advanced fare
 * calculator, the Meta/TikTok conversion mapping and the social row, and the
 * loss reached production — a generated file is not something anyone reads
 * in review, so nothing caught it.
 *
 * So check before writing. If the existing bundle declares a name the fresh
 * output does not, that is drift the sources have not caught up with, and
 * overwriting throws it away. Back-port it into design/src first, or set
 * PORT_FORCE=1 having decided the loss is intended.
 */
function declaredNames(text) {
  const names = new Set();
  const re = /^(?:function|const|let|class)\s+([A-Za-z_$][\w$]*)/gm;
  let m = re.exec(text);
  while (m !== null) {
    names.add(m[1]);
    m = re.exec(text);
  }
  return names;
}

if (fs.existsSync("components/design.jsx") && process.env.PORT_FORCE !== "1") {
  const fresh = declaredNames(out);
  const lost = [...declaredNames(fs.readFileSync("components/design.jsx", "utf8"))]
    .filter((n) => !fresh.has(n));
  if (lost.length > 0) {
    console.error(
      "\nREFUSING TO WRITE — components/design.jsx declares things design/src does not:\n" +
        lost.map((n) => "  - " + n).join("\n") +
        "\n\nSomeone edited the generated bundle directly. Back-port those into\n" +
        "design/src, or re-run with PORT_FORCE=1 if dropping them is intended.\n"
    );
    process.exit(1);
  }
}

fs.writeFileSync("components/design.jsx", out);
const lines = out.split("\n").length;
console.log(`wrote components/design.jsx (${lines} lines)`);
