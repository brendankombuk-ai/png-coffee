export default function ContactMap({ embedUrl }: { embedUrl: string }) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <iframe
          src={embedUrl}
          title="PNG Coffee location map"
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Company name label positioned over the map pin */}
        <div
          className="pointer-events-none absolute"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, calc(-100% - 16px))" }}
        >
          <div className="relative rounded-lg bg-white px-3 py-2 text-center shadow-lg">
            <p className="whitespace-nowrap text-[13px] font-bold text-gray-900">
              SwissXpresso (PNG) Ltd
            </p>
            <p className="whitespace-nowrap text-[11px] text-gray-500">
              PNG Coffee · Gabaka St, Gordon, Port Moresby
            </p>
            {/* Pointer triangle */}
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "7px solid white",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
