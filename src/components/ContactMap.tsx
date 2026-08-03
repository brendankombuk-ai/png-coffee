"use client";

import { useEffect, useRef } from "react";

const LAT = -9.4552808;
const LNG = 147.1922892;

declare global {
  interface Window {
    _initPNGCoffeeMap?: () => void;
  }
}

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function initMap() {
      if (!mapRef.current || !window.google?.maps) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: LAT, lng: LNG },
        zoom: 16,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: LAT, lng: LNG },
        map,
        title: "We Are Located Here",
        icon: {
          url: "/images/map-pin.png",
          scaledSize: new window.google.maps.Size(48, 48),
          anchor: new window.google.maps.Point(24, 48),
          labelOrigin: new window.google.maps.Point(24, -8),
        },
      });

    }

    if (window.google?.maps) {
      initMap();
      return;
    }

    window._initPNGCoffeeMap = initMap;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=_initPNGCoffeeMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
      delete window._initPNGCoffeeMap;
    };
  }, []);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div ref={mapRef} style={{ width: "100%", height: "420px" }} />
      </div>
    </section>
  );
}
