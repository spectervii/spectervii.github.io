"use client";

import { Suspense, lazy, useEffect, useState } from "react";

// Three.js and the scene load in their own chunk, after first paint.
const TempleNightScene = lazy(() =>
  import("@designcodeio/threeui/components/TempleNightScene").then((m) => ({
    default: m.TempleNightScene,
  })),
);

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

function shouldLoadScene() {
  const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (connection?.saveData) return false;
  if (["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroScene() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!shouldLoadScene()) return;
    let cancel = () => {};
    const start = () => {
      // Wait for the hero count-up and line draw to finish, so the scene's
      // shader compile does not stall them. Then wait for an idle moment.
      const delay = setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") {
          const id = window.requestIdleCallback(() => setShow(true), { timeout: 3000 });
          cancel = () => window.cancelIdleCallback(id);
        } else {
          setShow(true);
        }
      }, 2500);
      cancel = () => clearTimeout(delay);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      cancel();
    };
  }, []);

  if (!show) return null;

  return (
    <div aria-hidden="true" className="hero-scene absolute inset-0">
      <Suspense fallback={null}>
        <TempleNightScene variant="temple-night" />
      </Suspense>
    </div>
  );
}
