"use client";

import { useId, useState } from "react";
import { funnel, funnelSummary } from "@/data/funnel";
import { useInView } from "./use-in-view";

const top = funnel[0]!.users;
const fmt = new Intl.NumberFormat("en-GB");

const steps = funnel.map((step, i) => {
  const prev = funnel[i - 1];
  return {
    ...step,
    share: Math.round((step.users / top) * 100),
    drop: prev ? Math.round((1 - step.users / prev.users) * 100) : 0,
    prevShare: prev ? (prev.users / top) * 100 : 100,
  };
});

// The step with the largest loss from the one before it gets the accent.
const worst = steps.reduce((w, s, i) => (s.drop > steps[w]!.drop ? i : w), 0);

export function ActivationFunnel() {
  const [active, setActive] = useState(worst);
  const { ref, inView } = useInView<HTMLOListElement>();
  const summaryId = useId();
  const current = steps[active]!;

  return (
    <figure className="flex h-full flex-col gap-3 p-3 sm:p-4" aria-describedby={summaryId}>
      <div className="flex flex-wrap items-baseline gap-x-2" aria-live="polite">
        <span className="text-2xl font-semibold tracking-tight">{fmt.format(current.users)}</span>
        <span className="text-sm text-muted">
          reach {current.label.toLowerCase()}
          {active > 0 ? `, ${current.drop}% drop from the step before` : ""}
        </span>
      </div>

      <ol ref={ref} className="flex flex-1 flex-col justify-center gap-3">
        {steps.map((step, i) => {
          const isWorst = i === worst;
          const isActive = i === active;
          return (
            <li key={step.label}>
              <button
                type="button"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${step.label}: ${fmt.format(step.users)} users, ${step.share}% of signups${
                  i > 0 ? `, ${step.drop}% drop from the step before` : ""
                }`}
                className="group block w-full rounded-md py-0.5 text-left"
              >
                <span className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                  <span className={isActive ? "text-fg" : "text-muted"}>{step.label}</span>
                  <span className="font-mono text-muted">
                    {step.share}%
                    {isWorst ? (
                      <span className="ml-1.5 inline-flex items-center gap-1 text-fg">
                        <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
                        {`-${step.drop}%`}
                      </span>
                    ) : null}
                  </span>
                </span>
                {/* Track shows where the previous step ended. The gap is the users lost. */}
                <span className="relative block h-5">
                  <span
                    className={`absolute inset-y-0 left-0 rounded-r-[4px] ${isWorst ? "bg-orange/25" : "bg-border/60"}`}
                    style={{ width: `${step.prevShare}%` }}
                  />
                  <span
                    className={`bar-grow absolute inset-y-0 left-0 rounded-r-[4px] transition-colors ${
                      isActive ? "bg-fg" : "bg-bar group-hover:bg-fg"
                    }`}
                    style={{ width: inView ? `${step.share}%` : "0%", transitionDelay: `${i * 90}ms` }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <figcaption id={summaryId} className="sr-only">
        {funnelSummary}
      </figcaption>
      <table className="sr-only">
        <caption>Activation funnel</caption>
        <thead>
          <tr>
            <th scope="col">Step</th>
            <th scope="col">Users</th>
            <th scope="col">Share of signups</th>
            <th scope="col">Drop from step before</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((s, i) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{fmt.format(s.users)}</td>
              <td>{s.share}%</td>
              <td>{i === 0 ? "None" : `${s.drop}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
