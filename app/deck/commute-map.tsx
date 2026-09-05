"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import L from "leaflet";
import "leaflet.markercluster";
import { useEffect, useRef, useState } from "react";

type Kind = "pickup" | "dropoff";
type Point = { k: Kind; lat: number; lng: number };
type Mode = "both" | "pickup" | "dropoff";

const ORANGE = "#E88D0E";
const INK = "#292928";
const LINE = "#E6E5E3";
const GREEN = "#16a34a";

export function CommuteMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const totalRef = useRef(1);
  const [points, setPoints] = useState<Point[]>([]);
  const [mode, setMode] = useState<Mode>("both");

  // Create the map once.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, { scrollWheelZoom: false, maxZoom: 16 }).setView([6.52, 3.37], 11);
    // Esri light-gray canvas — free, no API key, no watermark. Base + labels.
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 16, attribution: "Tiles &copy; Esri" },
    ).addTo(map);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 16 },
    ).addTo(map);

    // Colour each cluster bubble by category so the Home/Workplace filter is
    // visually obvious: all-home = green, all-work = orange, mixed = ink. Size
    // by count. (Leaflet's default bubbles colour by count, which would collide
    // with the legend and read as "the filter isn't working".)
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 45,
      iconCreateFunction: (c) => {
        const kids = c.getAllChildMarkers();
        let home = 0;
        for (const k of kids) {
          if ((k as unknown as { kind?: Kind }).kind === "pickup") home++;
        }
        const work = kids.length - home;
        const color = home && work ? INK : home ? GREEN : ORANGE;
        // Label clusters by SHARE, not headcount: the big Island blob reads
        // ~52% (tying back to the pie), shares sum to 100% so nothing looks
        // fabricated, and the sample size (N) never appears. Radius grows with
        // the square root of the count.
        const pct = (kids.length / totalRef.current) * 100;
        const label = pct < 1 ? "<1%" : `${Math.round(pct)}%`;
        const size = Math.min(66, Math.max(30, Math.round(20 + Math.sqrt(kids.length) * 3.4)));
        return L.divIcon({
          html: `<div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:${color};color:#fff;font-weight:700;font-size:12px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.22)">${label}</div>`,
          className: "",
          iconSize: [size, size],
        });
      },
    });
    cluster.addTo(map);

    mapRef.current = map;
    clusterRef.current = cluster;

    // Load the survey points once.
    fetch("/deck/commute-points.json")
      .then((r) => r.json())
      .then((data: Point[]) => setPoints(data))
      .catch(() => setPoints([]));

    return () => {
      map.remove();
      mapRef.current = null;
      clusterRef.current = null;
    };
  }, []);

  // Rebuild markers whenever the mode or the data changes.
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;

    cluster.clearLayers();
    const visible = points.filter((p) => mode === "both" || p.k === mode);
    // Denominator for the cluster share labels (the current mode's point total).
    totalRef.current = visible.length || 1;
    for (const p of visible) {
      const color = p.k === "pickup" ? GREEN : ORANGE;
      const marker = L.circleMarker([p.lat, p.lng], {
        radius: 6,
        color: "#fff",
        fillColor: color,
        fillOpacity: 0.9,
        weight: 1.5,
      });
      // Tag the marker so the cluster icon can colour itself by category.
      (marker as unknown as { kind: Kind }).kind = p.k;
      marker.addTo(cluster);
    }
  }, [mode, points]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Pill label="Both" active={mode === "both"} onClick={() => setMode("both")} />
          <Pill label="Home" active={mode === "pickup"} onClick={() => setMode("pickup")} />
          <Pill label="Workplace" active={mode === "dropoff"} onClick={() => setMode("dropoff")} />
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#454442" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={dot(GREEN)} />
            Home
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={dot(ORANGE)} />
            Workplace
          </span>
        </div>
      </div>
      <div
        ref={containerRef}
        style={{
          height: 460,
          width: "100%",
          borderRadius: 16,
          border: `1px solid ${LINE}`,
          overflow: "hidden",
        }}
      />
    </div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        font: "inherit",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        padding: "8px 16px",
        borderRadius: 999,
        border: `1px solid ${active ? ORANGE : LINE}`,
        background: active ? ORANGE : "#fff",
        color: active ? "#fff" : INK,
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function dot(color: string): React.CSSProperties {
  return { width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block", flex: "none" };
}
