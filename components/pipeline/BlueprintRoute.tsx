"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const VB_W = 1000;
const VB_H = 460;
const MARGIN = 60;
const Y_TOP = 120;
const Y_BOTTOM = 340;

function stationPoint(i: number, count: number) {
  const x = MARGIN + (i * (VB_W - MARGIN * 2)) / (count - 1);
  const y = i % 2 === 0 ? Y_BOTTOM : Y_TOP;
  return { x, y };
}

function buildManhattanPath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    d += ` L ${midX} ${prev.y} L ${midX} ${curr.y} L ${curr.x} ${curr.y}`;
  }
  return d;
}

export function BlueprintRoute({
  progress,
  labels,
  count,
}: {
  progress: MotionValue<number>;
  labels: string[];
  count: number;
}) {
  const points = Array.from({ length: count }, (_, i) => stationPoint(i, count));
  const d = buildManhattanPath(points);
  const dashOffset = useTransform(progress, [0.04, 0.98], [1, 0]);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <pattern id="bpgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={VB_W} height={VB_H} fill="url(#bpgrid)" />

      {/* faint full route, always visible as context */}
      <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="2 8" />

      {/* bright route, drawn progressively as you scroll */}
      <motion.path
        d={d}
        fill="none"
        stroke="#17C9C4"
        strokeWidth="2.5"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: dashOffset }}
      />

      {points.map((p, i) => (
        <Station key={i} point={p} index={i} count={count} label={labels[i]} progress={progress} />
      ))}
    </svg>
  );
}

function Station({
  point,
  index,
  count,
  label,
  progress,
}: {
  point: { x: number; y: number };
  index: number;
  count: number;
  label: string;
  progress: MotionValue<number>;
}) {
  const center = index / (count - 1);
  const halfWindow = 1 / (count - 1) / 2;
  const isActive = useTransform(progress, (v) => Number(Math.abs(v - center) < halfWindow));
  const r = useTransform(isActive, [0, 1], [6, 13]);
  const glowOpacity = useTransform(isActive, [0, 1], [0, 0.55]);
  const dotColor = useTransform(isActive, [0, 1], ["#7FE0DA", "#EFFFFC"]);
  const labelOpacity = useTransform(isActive, [0, 1], [0.35, 1]);

  return (
    <g>
      <motion.circle cx={point.x} cy={point.y} r={22} fill="#17E8D8" style={{ opacity: glowOpacity }} />
      <motion.circle cx={point.x} cy={point.y} r={r} style={{ fill: dotColor }} />
      <motion.text
        x={point.x}
        y={point.y + (point.y === Y_BOTTOM ? 38 : -22)}
        fill="#7FE0DA"
        fontSize="12"
        fontWeight={700}
        textAnchor="middle"
        fontFamily="monospace"
        style={{ opacity: labelOpacity }}
      >
        {label}
      </motion.text>
    </g>
  );
}
