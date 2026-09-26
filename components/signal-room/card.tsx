"use client";

import { useEffect, useId, useState } from "react";
import type { CardMeta, View } from "@/data/signal-room";
import { ViewSwitch, useGlobalView } from "./view-switch";

// Tailwind needs full class names in source, so spans map to fixed classes.
const spanClass: Record<CardMeta["span"], string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

export function Card({ meta, children }: { meta: CardMeta; children: React.ReactNode }) {
  const { view: globalView } = useGlobalView();
  const [override, setOverride] = useState<View | null>(null);
  const view = override ?? globalView;
  const titleId = useId();

  // A change to the global switch wins over any per-card choice.
  useEffect(() => setOverride(null), [globalView]);

  return (
    <article
      aria-labelledby={titleId}
      className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-bg ${spanClass[meta.span]}`}
    >
      <header className="flex items-start justify-between gap-3 p-4 pb-3 sm:p-5 sm:pb-3">
        <div className="min-w-0">
          <h3 id={titleId} className="flex items-baseline gap-2 text-base font-semibold tracking-tight">
            <span className="font-mono text-xs font-normal text-muted">{meta.index}</span>
            {meta.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{meta.question}</p>
        </div>
        <ViewSwitch value={view} onChange={setOverride} label={`View for ${meta.title}`} size="sm" />
      </header>

      <div className="dot-grid mx-4 min-h-48 flex-1 rounded-xl border border-border sm:mx-5">{children}</div>

      {/* Both panels stay in the layout, so the card height does not jump on swap. */}
      <div className="grid p-4 sm:p-5 [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:min-w-0">
        <p
          inert={view !== "exec"}
          className={`text-lg leading-snug font-medium tracking-tight text-balance transition-opacity duration-200 ${
            view === "exec" ? "opacity-100" : "opacity-0"
          }`}
        >
          {meta.exec}
        </p>
        <dl
          inert={view !== "analyst"}
          className={`space-y-1 font-mono text-xs leading-relaxed transition-opacity duration-200 ${
            view === "analyst" ? "opacity-100" : "opacity-0"
          }`}
        >
          <dt className="sr-only">Logic</dt>
          <dd>
            <code className="block overflow-x-auto whitespace-pre text-mustard">{meta.analyst.logic.join("\n")}</code>
          </dd>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Segment</dt>
            <dd className="min-w-0">{meta.analyst.segment}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Assumes</dt>
            <dd className="min-w-0">{meta.analyst.assumption}</dd>
          </div>
        </dl>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted sm:px-5">
        <span>Illustrative data</span>
        <span>Refreshed {meta.refreshed}</span>
      </footer>
    </article>
  );
}
