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
  "const P={home:'/',pass:'/',own:'/car-owners',how:'/how-it-works',about:'/about',safety:'/safety',faq:'/faq',corr:'/corridors',cdet:'/corridors/agege-ikeja',fares:'/fares',privacy:'/legal/privacy',terms:'/legal/terms',conduct:'/legal/code-of-conduct',del:'/delete-profile',careers:'/careers',press:'/press'};"
);

out +=
  "\nexport { PaxHome, OwnerPage, HowItWorks, SafetyNew, FaresPage, Corridors, CorridorDetail, FAQPage, About, Calculator, Quote, Header, Footer, PrivacyPage, TermsPage, ConductPage, DeletePage, CareersPage, PressPage };\n";

fs.writeFileSync("components/design.jsx", out);
const lines = out.split("\n").length;
console.log(`wrote components/design.jsx (${lines} lines)`);
