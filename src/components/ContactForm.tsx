"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-ember-400/60 focus:bg-white/[0.06]";
  const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/70";

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500/15 text-ember-300">
          <Send size={22} strokeWidth={1.75} />
        </span>
        <h3 className="mt-5 font-display text-xl font-extrabold uppercase tracking-wide text-white">
          Message Sent
        </h3>
        <p className="mt-2 max-w-xs text-sm text-white/65">
          Thanks for reaching out — we&rsquo;ll get back to you as soon as we can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/85 transition-colors hover:border-ember-400/60 hover:text-ember-200"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-10">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-white sm:text-[28px]">
        Send Us A Message
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input id="company" name="company" type="text" placeholder="Company (optional)" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="Phone (optional)" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClasses} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input id="subject" name="subject" type="text" required placeholder="What's this about?" className={inputClasses} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us a bit more…"
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-ember-300">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-ember-500 py-3 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
