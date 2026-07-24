"use client";

import { motion } from "framer-motion";
import { contactInfo, contactForm } from "@/data/content";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons = { pin: PinIcon, mail: MailIcon, phone: PhoneIcon };

function SocialIcon({ icon }: { icon: "facebook" | "instagram" | "twitter" | "youtube" }) {
  const paths: Record<string, JSX.Element> = {
    facebook: (
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.3 1.4-1.3h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.6v2.2H8.3v2.8h2.4V21h2.8Z" />
    ),
    instagram: (
      <path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm0 5.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm4.3-5.7a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM12 5.2c2.1 0 2.4 0 3.2.1.8 0 1.3.2 1.6.3.4.2.7.3 1 .6.3.3.5.6.6 1 .1.3.3.8.3 1.6.1.8.1 1.1.1 3.2s0 2.4-.1 3.2c0 .8-.2 1.3-.3 1.6-.2.4-.3.7-.6 1-.3.3-.6.5-1 .6-.3.1-.8.3-1.6.3-.8.1-1.1.1-3.2.1s-2.4 0-3.2-.1c-.8 0-1.3-.2-1.6-.3-.4-.2-.7-.3-1-.6-.3-.3-.5-.6-.6-1-.1-.3-.3-.8-.3-1.6-.1-.8-.1-1.1-.1-3.2s0-2.4.1-3.2c0-.8.2-1.3.3-1.6.2-.4.3-.7.6-1 .3-.3.6-.5 1-.6.3-.1.8-.3 1.6-.3.8-.1 1.1-.1 3.2-.1Z" />
    ),
    twitter: (
      <path d="M20.5 7.3c-.5.2-1 .4-1.6.5.6-.3 1-.9 1.2-1.5-.5.3-1.1.6-1.8.7a2.8 2.8 0 0 0-4.8 2.6 8 8 0 0 1-5.8-3c-.2.4-.4.9-.4 1.4 0 1 .5 1.8 1.2 2.3-.4 0-.9-.1-1.3-.3v.1c0 1.3 1 2.5 2.2 2.7-.2.1-.5.1-.8.1-.2 0-.4 0-.6-.1.4 1.2 1.5 2 2.8 2A5.6 5.6 0 0 1 4 17.3a7.9 7.9 0 0 0 4.3 1.3c5.2 0 8-4.3 8-8v-.4c.6-.4 1-.9 1.4-1.5-.4.2-1 .4-1.5.4Z" />
    ),
    youtube: (
      <path d="M21.5 8.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 5 12 5 12 5s-3.9 0-6.6.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.3 10 2.3 11.7v1.5c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9C7.4 20 12 20 12 20s3.9 0 6.6-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.5c0-1.8-.2-3.5-.2-3.5ZM9.9 14.9V9.5l5.2 2.7-5.2 2.7Z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

export default function ContactPanel() {
  return (
    <section className="relative z-10 -mt-16 px-4 pb-20 sm:-mt-24 sm:px-6 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:grid-cols-2"
      >
        {/* Get in touch */}
        <div className="border-b border-white/10 p-8 sm:p-10 md:border-b-0 md:border-r">
          <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
            {contactInfo.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            {contactInfo.blurb}
          </p>

          <ul className="mt-7 space-y-5">
            {contactInfo.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.label} className="flex gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      {item.label}
                    </p>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-white/60">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Follow Our Social Media
            </p>
            <div className="mt-3 flex gap-2.5">
              {contactInfo.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors duration-300 hover:bg-ember-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-200"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Send us a message */}
        <div className="p-8 sm:p-10">
          <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
            {contactForm.heading}
          </h2>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="name" label={contactForm.fields.name} />
              <Field id="company" label={contactForm.fields.company} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="phone" label={contactForm.fields.phone} type="tel" />
              <Field id="email" label={contactForm.fields.email} type="email" />
            </div>
            <Field id="subject" label={contactForm.fields.subject} />
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50"
              >
                {contactForm.fields.message}
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder={contactForm.fields.message}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-ember-400/60 focus:bg-white/[0.07]"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 w-full rounded-full bg-ember-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_30px_-8px_rgba(232,52,28,0.7)] transition-colors hover:bg-ember-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200"
            >
              {contactForm.submitLabel}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
}: {
  id: string;
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={label}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-ember-400/60 focus:bg-white/[0.07]"
      />
    </div>
  );
}
