import type { Metadata } from "next";
import { TopBar } from "@/components/top-bar";
import { SignalRoom } from "@/components/signal-room/signal-room";
import { cards } from "@/data/signal-room";

export const metadata: Metadata = {
  title: "Showcase",
  robots: { index: false, follow: false },
};

function Placeholder({ index }: { index: string }) {
  return (
    <div className="grid h-full min-h-48 place-items-center font-mono text-xs text-muted">
      Widget {index} lands in step 3
    </div>
  );
}

// Dev-only review route. Components are built here before they go on the main page.
export default function Showcase() {
  const widgets = Object.fromEntries(cards.map((c) => [c.id, <Placeholder key={c.id} index={c.index} />]));
  return (
    <>
      <TopBar />
      <main>
        <SignalRoom widgets={widgets} />
      </main>
    </>
  );
}
