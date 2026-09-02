import { ImageResponse } from "next/og";

// Site-wide social share card (WhatsApp / X / Facebook / LinkedIn).
export const alt = "Conductor — share the ride on your route, split the cost";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 3×3 mark motif, rebuilt with plain divs (no external asset to fetch).
function Mark() {
  const cells = [
    ["#E98B20", "#EE4643", "#E98B20"],
    ["#EE4643", "#E98B20", "#EE4643"],
    ["#E98B20", "#EE4643", "#E98B20"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {cells.map((row, r) => (
        <div key={r} style={{ display: "flex", gap: 8 }}>
          {row.map((c, i) => (
            <div
              key={i}
              style={{ width: 34, height: 34, borderRadius: 8, background: c }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1b1b1b",
          color: "#f5f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Mark />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            Conductor
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.05 }}>
            Share the ride on your route.
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.05, color: "#f0a13d" }}>
            Split the cost.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <div style={{ color: "#cbc4b5" }}>
            Verified both ways · fare agreed up front
          </div>
          <div style={{ fontWeight: 700 }}>conductor.ng</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
