import { Building2, Clock, Facebook, Instagram, Mail, Phone } from "lucide-react";
import type { ContactPageContent } from "@/data/content";

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-.8-.8-1.25-1.87-1.25-3.02h-3.06v13.44c0 1.53-1.24 2.77-2.77 2.77a2.77 2.77 0 0 1-2.77-2.77 2.77 2.77 0 0 1 2.77-2.77c.29 0 .57.04.83.13V10.5a5.87 5.87 0 0 0-.83-.06A5.83 5.83 0 0 0 3.68 16.27a5.83 5.83 0 0 0 5.84 5.83 5.83 5.83 0 0 0 5.84-5.83V9.01a8.94 8.94 0 0 0 5.22 1.67V7.62a5.6 5.6 0 0 1-3.98-1.8z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  TikTok: TikTokIcon as typeof Facebook,
};

export default function ContactInfo({
  data,
}: {
  data: Pick<
    ContactPageContent,
    "introHeading" | "introText" | "address" | "email" | "phone" | "businessHours" | "socialLinks"
  >;
}) {
  return (
    <div className="flex flex-col p-8 sm:p-10">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-white sm:text-[28px]">
        {data.introHeading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
        {data.introText}
      </p>

      <div className="mt-8 space-y-6">
        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
            <Building2 size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Head Office</p>
            {data.address.map((line) => (
              <p key={line} className="text-sm text-white/65">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
            <Mail size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Email Us</p>
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-white/65 transition-colors hover:text-ember-300"
            >
              {data.email}
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
            <Phone size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Call Us</p>
            <a
              href={`tel:${data.phone.replace(/\s+/g, "")}`}
              className="text-sm text-white/65 transition-colors hover:text-ember-300"
            >
              {data.phone}
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
            <Clock size={18} strokeWidth={1.75} />
          </span>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Business Hours
            </p>
            {data.businessHours.map((entry) => (
              <p key={entry.day} className="text-sm text-white/65">
                <span className="text-white/80">{entry.day}:</span> {entry.hours}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
          Follow our social media
        </p>
        <div className="flex gap-3">
          {data.socialLinks.map((link) => {
            const Icon = SOCIAL_ICONS[link.platform];
            if (!Icon) return null;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-ember-400/60 hover:bg-ember-500/15 hover:text-ember-300"
              >
                <Icon size={16} strokeWidth={1.75} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
