"use client";

import { createContext, useContext, useState } from "react";
import type { View } from "@/data/signal-room";

type SignalRoomState = { view: View; setView: (view: View) => void };

const SignalRoomContext = createContext<SignalRoomState>({ view: "exec", setView: () => {} });

export function SignalRoomProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("exec");
  return <SignalRoomContext.Provider value={{ view, setView }}>{children}</SignalRoomContext.Provider>;
}

export const useGlobalView = () => useContext(SignalRoomContext);

const options: { value: View; label: string }[] = [
  { value: "exec", label: "Exec" },
  { value: "analyst", label: "Analyst" },
];

export function ViewSwitch({
  value,
  onChange,
  label,
  size = "md",
}: {
  value: View;
  onChange: (view: View) => void;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <div role="group" aria-label={label} className="flex w-fit rounded-full border border-border p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full font-mono transition-colors ${
            size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs"
          } ${value === option.value ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// The Signal Room header control. Changing it resets every card's own override.
export function GlobalViewSwitch() {
  const { view, setView } = useGlobalView();
  return <ViewSwitch value={view} onChange={setView} label="View for all cards" />;
}
