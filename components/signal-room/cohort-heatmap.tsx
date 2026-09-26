"use client";

import { useId, useRef, useState } from "react";
import { cohortHighlight, cohortMonths, cohortSummary, cohorts } from "@/data/cohorts";
import { useInView } from "./use-in-view";

type Cell = { row: number; col: number };

// One hue, light to dark. Retention sets how far along the validated ramp a cell sits.
const fill = (value: number) => `color-mix(in oklch, var(--heat-hi) ${value}%, var(--heat-lo))`;

const cols = Array.from({ length: cohortMonths }, (_, i) => i);

export function CohortHeatmap() {
  const [active, setActive] = useState<Cell>(cohortHighlight);
  const [focus, setFocus] = useState<Cell>(cohortHighlight);
  const cellRefs = useRef(new Map<string, HTMLButtonElement>());
  const { ref, inView } = useInView<HTMLDivElement>();
  const summaryId = useId();

  const value = cohorts[active.row]?.retention[active.col];

  const move = (event: React.KeyboardEvent, { row, col }: Cell) => {
    const next = { row, col };
    if (event.key === "ArrowRight") next.col += 1;
    else if (event.key === "ArrowLeft") next.col -= 1;
    else if (event.key === "ArrowDown") next.row += 1;
    else if (event.key === "ArrowUp") next.row -= 1;
    else return;
    event.preventDefault();
    const target = cohorts[next.row];
    if (!target || next.col < 0 || next.col >= target.retention.length) return;
    setFocus(next);
    setActive(next);
    cellRefs.current.get(`${next.row}-${next.col}`)?.focus();
  };

  return (
    <figure className="flex h-full flex-col gap-3 p-3 sm:p-4" aria-describedby={summaryId}>
      {/* Readout: the value leads, the label follows. */}
      <div className="flex items-baseline gap-2" aria-live="polite">
        <span className="text-2xl font-semibold tracking-tight">{value}%</span>
        <span className="text-sm text-muted">
          of {cohorts[active.row]?.month} signups active in month {active.col}
        </span>
      </div>

      <div ref={ref} role="grid" aria-label="Retention by signup month" className="grid grid-cols-[2.25rem_repeat(6,minmax(0,1fr))] gap-[2px]">
        <div role="row" className="contents">
          {/* A real grid slot. The label inside is for screen readers only. */}
          <span role="columnheader">
            <span className="sr-only">Signup month</span>
          </span>
          {cols.map((c) => (
            <span key={c} role="columnheader" className="pb-1 text-center font-mono text-[10px] text-muted">
              <span aria-hidden="true">M{c}</span>
              <span className="sr-only">Month {c}</span>
            </span>
          ))}
        </div>
        {cohorts.map((cohort, row) => (
          <div key={cohort.month} role="row" className="contents">
            <span role="rowheader" className="self-center font-mono text-[11px] text-muted">
              {cohort.month}
            </span>
            {cols.map((col) => {
              const v = cohort.retention[col];
              if (v === undefined) return <span key={col} role="gridcell" aria-hidden="true" />;
              const isActive = active.row === row && active.col === col;
              return (
                <button
                  key={col}
                  role="gridcell"
                  type="button"
                  ref={(el) => {
                    if (el) cellRefs.current.set(`${row}-${col}`, el);
                  }}
                  tabIndex={focus.row === row && focus.col === col ? 0 : -1}
                  aria-label={`${cohort.month} signups, month ${col}: ${v}%`}
                  aria-selected={isActive}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive({ row, col })}
                  onClick={() => {
                    setActive({ row, col });
                    setFocus({ row, col });
                  }}
                  onFocus={() => setActive({ row, col })}
                  onKeyDown={(e) => move(e, { row, col })}
                  style={{ background: fill(v), animationDelay: `${col * 70}ms` }}
                  className={`h-8 rounded-[4px] outline-offset-1 sm:h-9 ${inView ? "cell-in" : "opacity-0"} ${
                    isActive ? "outline-2 outline-fg outline-solid" : ""
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Scale legend for the single-hue ramp. */}
      <div className="mt-auto flex items-center gap-2 font-mono text-[10px] text-muted" aria-hidden="true">
        <span>0%</span>
        <span className="h-1.5 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${fill(0)}, ${fill(100)})` }} />
        <span>100%</span>
      </div>

      <figcaption id={summaryId} className="sr-only">
        {cohortSummary}
      </figcaption>
      <table className="sr-only">
        <caption>Retention by signup month, percent still active</caption>
        <thead>
          <tr>
            <th scope="col">Signup month</th>
            {cols.map((c) => (
              <th key={c} scope="col">
                Month {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cohorts.map((cohort) => (
            <tr key={cohort.month}>
              <th scope="row">{cohort.month}</th>
              {cols.map((c) => (
                <td key={c}>{cohort.retention[c] === undefined ? "No data yet" : `${cohort.retention[c]}%`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
