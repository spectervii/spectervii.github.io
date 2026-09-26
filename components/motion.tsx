"use client";

/*
  Motion, ready for later. Nothing imports this file yet, so it adds 0 KB today.

  Usage:
    import { MotionProvider, m } from "@/components/motion";
    <MotionProvider>
      <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} />
    </MotionProvider>

  Use `m.*`, not `motion.*`. Strict mode throws if `motion.*` is used,
  because that would pull the full bundle into first load.
*/
import { LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";

// Animation features load in their own chunk the first time an `m.*` element mounts.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

export { m };
