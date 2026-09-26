import type { Metadata } from "next";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = {
  title: "Showcase",
  robots: { index: false, follow: false },
};

// Dev-only review route. Components are built here before they go on the main page.
export default function Showcase() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs text-muted">Showcase. Components appear here for review.</p>
      </main>
    </>
  );
}
