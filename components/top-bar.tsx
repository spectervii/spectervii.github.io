"use client";

import { useEffect, useState } from "react";

const lagosParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function useLagosTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  const [h, m, s] = lagosParts.format(now).split(":").map(Number);
  return { h, m, s, label: lagosParts.format(now) };
}

function ClockFace({ h, m, s }: { h: number; m: number; s: number }) {
  const hand = (deg: number, length: number, width: number, color: string) => (
    <line
      x1="20"
      y1="20"
      x2="20"
      y2={20 - length}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      transform={`rotate(${deg} 20 20)`}
    />
  );
  return (
    <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="white" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="20" y1="3.5" x2="20" y2="6" stroke="#111" strokeWidth="1.5" transform={`rotate(${i * 30} 20 20)`} />
      ))}
      {hand((h % 12) * 30 + m * 0.5, 9, 2.5, "#111")}
      {hand(m * 6 + s * 0.1, 13, 2, "#111")}
      {hand(s * 6, 14, 1, "var(--orange)")}
      <circle cx="20" cy="20" r="1.6" fill="#111" />
    </svg>
  );
}

function NigeriaFlag() {
  return (
    <svg viewBox="0 0 3 2" className="h-2.5 w-[15px] shrink-0 rounded-[2px]" aria-hidden="true">
      <rect width="3" height="2" fill="#008751" />
      <rect x="1" width="1" height="2" fill="#fff" />
    </svg>
  );
}

function LagosClock() {
  const time = useLagosTime();
  return (
    <div className="flex items-center gap-3">
      {time ? <ClockFace {...time} /> : <span className="size-10 shrink-0 rounded-full bg-surface" />}
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-mono text-sm">
          <span className="sr-only">Local time in Lagos: </span>
          {time?.label ?? "--:--:--"} <span className="text-muted">WAT</span>
        </span>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-surface px-1.5 py-1 text-xs text-muted">
          <NigeriaFlag />
          Lagos, Nigeria
        </span>
      </div>
    </div>
  );
}

type Theme = "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stored = root.dataset.theme as Theme | undefined;
    setTheme(stored ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }, []);

  const choose = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const option = (value: Theme, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => choose(value)}
      aria-pressed={theme === value}
      aria-label={label}
      className={`grid size-8 place-items-center rounded-full transition-colors ${
        theme === value ? "bg-fg text-bg" : "text-muted hover:text-fg"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div role="group" aria-label="Colour theme" className="flex gap-0.5 rounded-full bg-surface p-1">
      {option(
        "light",
        "Light theme",
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1" />
        </svg>,
      )}
      {option(
        "dark",
        "Dark theme",
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
          <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
        </svg>,
      )}
    </div>
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <LagosClock />
        <div className="flex items-center gap-3">
          <kbd className="hidden rounded-md border border-border px-1.5 py-1 font-mono text-xs text-muted sm:inline-block">
            ⌘K
          </kbd>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
