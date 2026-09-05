"use client";

import dynamic from "next/dynamic";

// `ssr: false` must live inside a Client Component in Next 16, and it keeps
// Leaflet (which touches `window`) out of the server bundle. The market page
// (a Server Component) renders this wrapper like any other component.
export const CommuteMap = dynamic(() => import("./commute-map").then((m) => m.CommuteMap), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 460 + 60,
        width: "100%",
        borderRadius: 16,
        border: "1px solid #ECDFCE",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6B5D4E",
        fontSize: 15,
      }}
    >
      Loading map…
    </div>
  ),
});
