"use client";

import { useEffect } from "react";

// Client-only toolbar for the print/PDF view. Offers a manual "Print / Save as
// PDF" button and auto-fires the browser print dialog shortly after mount so the
// "Download the deck" link lands the reader straight on the save-to-PDF flow.
export function PrintToolbar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      window.print();
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className="no-print"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        padding: "14px 24px",
        borderBottom: "1px solid #ECDFCE",
        background: "#FFF8F0",
        fontFamily: "'Roboto Flex', system-ui, sans-serif",
        color: "#211A14",
      }}
    >
      <span style={{ fontSize: 15, color: "#514336" }}>
        Print or Save as PDF to download the deck.
      </span>
      <button
        type="button"
        onClick={() => window.print()}
        style={{
          background: "linear-gradient(120deg,#E98B20,#EE4643)",
          color: "#fff",
          fontWeight: 600,
          fontSize: 15,
          padding: "10px 20px",
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
        }}
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
