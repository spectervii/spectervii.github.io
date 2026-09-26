"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const lagosTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function LagosClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(lagosTime.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs text-muted">
      <span className="sr-only">Local time in Lagos: </span>
      <time aria-hidden={time === null}>{time ?? "--:--:--"}</time>{" "}
      <span aria-hidden="true">WAT</span>
    </span>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const isDark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-8 place-items-center rounded-md border border-border text-muted transition-colors hover:text-fg"
    >
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
        <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function TopBar() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="text-sm font-medium tracking-tight">
          {site.name}
        </a>
        <div className="flex items-center gap-3">
          <LagosClock />
          <ThemeToggle />
          <kbd className="hidden rounded-md border border-border px-1.5 py-1 font-mono text-xs text-muted sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>
    </header>
  );
}
