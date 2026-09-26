"use client";

import { cards } from "@/data/signal-room";
import { Card } from "./card";
import { GlobalViewSwitch, SignalRoomProvider } from "./view-switch";

export function SignalRoom({ widgets }: { widgets: Partial<Record<string, React.ReactNode>> }) {
  return (
    <SignalRoomProvider>
      <section id="signal-room" aria-labelledby="signal-room-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted">02</p>
            <h2 id="signal-room-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Signal Room
            </h2>
            <p className="mt-2 max-w-md text-muted">
              Live widgets, not screenshots. Flip to Analyst to see how each one is worked out.
            </p>
          </div>
          <GlobalViewSwitch />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {cards.map((meta) => (
            <Card key={meta.id} meta={meta}>
              {widgets[meta.id]}
            </Card>
          ))}
        </div>
      </section>
    </SignalRoomProvider>
  );
}
