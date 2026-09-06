import type { Metadata } from "next";
import { OVERVIEW } from "../page";
import { PRODUCT } from "../product/page";
import { MARKET_TOP, PIE_CARD, MARKET_REST } from "../market/page";
import { MODEL } from "../model/page";
import { WHY_NOW } from "../why-now/page";
import { PLAN } from "../plan/page";
import { TEAM } from "../team/page";
import { FINANCIALS } from "../financials/page";
import { ASK } from "../ask/page";
import { PrintToolbar } from "./print-toolbar";

export const metadata: Metadata = {
  title: "Conductor — Investor Deck (Print)",
  // Confidential investor material — never index it.
  robots: { index: false, follow: false },
};

// The live Leaflet <CommuteMap/> does not render reliably into a PDF, so the
// market chapter carries a static note pointing to the live version instead.
const MARKET_MAP_NOTE = `
<div style="border:1px solid #ECDFCE;border-radius:16px;padding:24px;color:#6B5D4E;max-width:1200px;margin:0 auto 32px">Interactive map of 244 declared home &amp; workplace points — view live at conductor.ng/deck/market</div>
`;

const MARKET = MARKET_TOP + MARKET_MAP_NOTE + PIE_CARD + MARKET_REST;

// One continuous, print-styled assembly of the whole web deck. Each chapter is a
// page-breaking block; DeckNav/DeckPager/DeckTracker are intentionally omitted.
export default function DeckPrint() {
  return (
    <>
      <style>{`@media print { .no-print{display:none!important} .deck-scope header{display:none!important} .print-chapter{break-after:page;page-break-after:always} }
@page{size:A4 landscape;margin:10mm}
.print-chapter{ -webkit-print-color-adjust:exact; print-color-adjust:exact }
:root{ -webkit-print-color-adjust:exact; print-color-adjust:exact }`}</style>
      <PrintToolbar />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: OVERVIEW }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: PRODUCT }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: MARKET }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: MODEL }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: WHY_NOW }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: PLAN }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: TEAM }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: FINANCIALS }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: first-party ported deck markup, no user input */}
      <div className="print-chapter" dangerouslySetInnerHTML={{ __html: ASK }} />
    </>
  );
}
