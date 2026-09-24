"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SignalTunnelScene = dynamic(
  () => import("./SignalTunnelScene").then((m) => m.SignalTunnelScene),
  { ssr: false }
);

export function SignalTunnel({ active, count }: { active: number; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 1023px)").matches;
    setEnabled(!reduced && !isSmall);
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      {inView && <SignalTunnelScene active={active} count={count} />}
    </div>
  );
}
