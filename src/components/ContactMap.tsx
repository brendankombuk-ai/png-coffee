export default function ContactMap({ embedUrl }: { embedUrl: string }) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <iframe
          src={embedUrl}
          title="PNG Coffee location map"
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
