"use client";

import { useEffect, useRef } from "react";

const LAT = -9.4552808;
const LNG = 147.1922892;

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import("leaflet").Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css" as never);

      if (!containerRef.current) return;

      map = L.map(containerRef.current, { zoomControl: true }).setView([LAT, LNG], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.icon({
        iconUrl: "/images/map-pin.png",
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        tooltipAnchor: [0, -52],
      });

      const marker = L.marker([LAT, LNG], { icon }).addTo(map);

      marker.bindTooltip(
        `<div style="text-align:center;line-height:1.4">
          <strong style="font-size:13px;color:#111">SwissXpresso (PNG) Ltd</strong><br/>
          <span style="font-size:11px;color:#555">PNG Coffee &middot; Gabaka St, Gordon, Port Moresby</span>
        </div>`,
        { permanent: true, direction: "top", className: "png-map-tooltip" }
      );
    })();

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
      <style>{`
        .png-map-tooltip {
          background: white;
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          padding: 6px 12px;
          white-space: nowrap;
        }
        .png-map-tooltip::before {
          border-top-color: white;
        }
      `}</style>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div ref={containerRef} style={{ width: "100%", height: "420px" }} />
      </div>
    </section>
  );
}
