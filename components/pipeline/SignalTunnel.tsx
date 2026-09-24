"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";

const SignalTunnelScene = dynamic(
  () => import("./SignalTunnelScene").then((m) => m.SignalTunnelScene),
  { ssr: false }
);

export function SignalTunnel({
  progress,
  count,
}: {
  progress: MotionValue<number>;
  count: number;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    setEnabled(!reduced && !isSmall);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <SignalTunnelScene progress={progress} count={count} />
    </div>
  );
}
