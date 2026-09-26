"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

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
    <section id="top" className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
      <h1 className="flex flex-col gap-1">
        <span className="text-base font-medium tracking-tight">{site.name}</span>
        <span className="font-mono text-xs tracking-wide text-muted uppercase">{site.role}</span>
      </h1>

      <p className="mt-8 max-w-3xl text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-6xl">
        I find the <span className="text-mustard">signal</span> in product data, then turn it into
        the next decision.
      </p>

      <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
        Fintech, real estate, and public sector programs. Analyst with a design degree.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyEmail}
          className="h-11 rounded-md bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Email me
        </button>
        <a
          href={site.cvPath}
          target="_blank"
          rel="noopener"
          className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:border-fg"
        >
          View CV
        </a>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-md border border-border bg-surface px-4 py-2 font-mono text-xs transition-all duration-200 ${
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
    </section>
  );
}
