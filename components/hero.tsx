"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { HeroScene } from "@/components/hero-scene";

function Company({ name, href, logo }: { name: string; href: string; logo: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-baseline gap-1.5 font-semibold whitespace-nowrap text-fg underline-offset-4 hover:underline"
    >
      <img src={logo} alt="" width={20} height={20} className="relative top-[3px] size-5 rounded-[5px]" />
      {name}
    </a>
  );
}

// A rising line that draws itself next to "go up".
function GrowthLine() {
  return (
    <svg
      viewBox="0 0 44 28"
      className="ml-2 inline-block h-[0.62em] w-[0.98em] align-baseline"
      fill="none"
      aria-hidden="true"
    >
      <polyline
        className="draw-line"
        pathLength={1}
        points="2,24 11,19 18,21 27,11 34,13 42,3"
        stroke="var(--mustard)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="pop-dot" cx="42" cy="3" r="3" fill="var(--mustard)" />
    </svg>
  );
}

export function Hero() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard access can fail. Open the mail app instead.
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <>
      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-border bg-bg text-fg"
      >
        <HeroScene />
        {/* Keeps text at AA contrast over the moving scene. */}
        <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-0 z-[1]" />

        <div className="pointer-events-none relative z-[2] mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <div className="flex items-center gap-4">
            <img
              src="/me.webp"
              alt=""
              width={120}
              height={120}
              fetchPriority="high"
              className="size-20 shrink-0 rounded-full bg-[#ffb955] sm:size-24"
            />
            <h1 className="flex flex-col items-start gap-2">
              <span className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</span>
              <span className="rounded-full bg-surface/80 px-3 py-1 text-sm text-muted">{site.role}</span>
            </h1>
          </div>

          <p className="mt-8 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
            I make numbers make sense, then make them{" "}
            <span className="whitespace-nowrap text-mustard">
              go up.
              <GrowthLine />
            </span>
          </p>

          <div className="mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-muted sm:text-xl">
            <p>
              Data and UX analyst at{" "}
              <Company name="MinieMoney" href="https://miniemoney.com" logo="/logos/miniemoney.svg" />, where
              I helped grow app users by{" "}
              <span className="font-mono font-medium text-sage">
                <span className="sr-only">304%</span>
                <span aria-hidden="true" className="count-up inline-block min-w-[4ch]" />
              </span>
              . Before that, I ran data and strategy at{" "}
              <Company name="Yahshud" href="https://yahshud.com" logo="/logos/yahshud.svg" /> and did the
              research behind the RAIN investment app.
            </p>
            <p>Trained as a designer, so my charts are easy to read. Opinions backed by SQL.</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-base font-medium text-bg transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="1.5" y="3" width="13" height="10" rx="2" />
                <path d="m2 4 6 5 6-5" />
              </svg>
              Email me
            </button>
            <a
              href={site.cvPath}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-surface px-6 text-base font-medium transition-colors hover:bg-border"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 1.5h5.5L13 5v9.5H4z" />
                <path d="M9 1.5V5.5h4M6.5 9h4M6.5 11.5h4" />
              </svg>
              View my CV
            </a>
          </div>
        </div>
      </section>

      <div
        role="status"
        aria-live="polite"
        className={`fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs transition-all duration-200 ${
          copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        {copied ? (
          <>
            <span className="text-sage">Copied</span> {site.email}
          </>
        ) : null}
      </div>
    </>
  );
}
