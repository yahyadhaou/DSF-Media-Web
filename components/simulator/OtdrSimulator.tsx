"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type OtdrEvent = {
  km: number;
  dropDb: number;
  reflective: boolean;
  key: "launch" | "splice1" | "splice2" | "connector" | "end";
};

const EVENTS: OtdrEvent[] = [
  { km: 0, dropDb: 0, reflective: true, key: "launch" },
  { km: 1.2, dropDb: 0.05, reflective: false, key: "splice1" },
  { km: 3.0, dropDb: 0.04, reflective: false, key: "splice2" },
  { km: 4.3, dropDb: 0.15, reflective: true, key: "connector" },
  { km: 5.0, dropDb: 0, reflective: true, key: "end" },
];

const ROUTE_KM = 5;
const FIBER_ATTENUATION_DB_PER_KM = 0.35;
const MAX_DISPLAY_LOSS = 2.4;
const CHART_W = 1000;
const CHART_H = 260;

function cumulativeLoss(km: number) {
  let loss = FIBER_ATTENUATION_DB_PER_KM * km;
  for (const e of EVENTS) {
    if (e.km > 0 && e.km <= km) loss += e.dropDb;
  }
  return loss;
}

function buildPath() {
  const points: [number, number][] = [];
  const step = 0.02;
  for (let km = 0; km <= ROUTE_KM; km += step) {
    const x = (km / ROUTE_KM) * CHART_W;
    let loss = cumulativeLoss(km);

    const nearReflective = EVENTS.find(
      (e) => e.reflective && Math.abs(e.km - km) < 0.04 && e.km > 0
    );
    if (nearReflective) loss -= 0.18 * (1 - Math.abs(nearReflective.km - km) / 0.04);

    const y = Math.min(CHART_H - 4, (loss / MAX_DISPLAY_LOSS) * CHART_H);
    points.push([x, y]);
  }
  return points;
}

function activeEventFor(km: number) {
  let current = EVENTS[0];
  for (const e of EVENTS) {
    if (km + 0.001 >= e.km) current = e;
  }
  return current;
}

export function OtdrSimulator() {
  const t = useTranslations("otdr");
  const [km, setKm] = useState(2.4);
  const points = useMemo(buildPath, []);
  const pathD = useMemo(
    () => "M " + points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L "),
    [points]
  );
  const areaD = `${pathD} L ${CHART_W},${CHART_H} L 0,${CHART_H} Z`;

  const markerX = (km / ROUTE_KM) * CHART_W;
  const markerY = (cumulativeLoss(km) / MAX_DISPLAY_LOSS) * CHART_H;
  const event = activeEventFor(km);
  const loss = cumulativeLoss(km);

  return (
    <section className="py-24 lg:py-32">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="rounded-2xl border border-fg/8 bg-ink-soft p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-fg/40">
                {t("distanceLabel")}
              </span>
              <span className="font-display text-2xl font-bold text-fg">{km.toFixed(2)} km</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-fg/40">
                {t("eventLabel")}
              </span>
              <span className="font-display text-2xl font-bold text-teal-light">
                {t(`events.${event.key}`)}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-fg/40">
                {t("lossLabel")}
              </span>
              <span className="font-display text-2xl font-bold text-fg">{loss.toFixed(3)} dB</span>
            </div>
          </div>

          <div className="relative">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="w-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="otdrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#17C9C4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#17C9C4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3, 4].map((g) => (
                <line
                  key={g}
                  x1={(g / 4) * CHART_W}
                  y1={0}
                  x2={(g / 4) * CHART_W}
                  y2={CHART_H}
                  stroke="rgba(255,255,255,0.06)"
                />
              ))}

              <path d={areaD} fill="url(#otdrFill)" />
              <path d={pathD} fill="none" stroke="#17C9C4" strokeWidth={2.5} />

              {EVENTS.filter((e) => e.km > 0).map((e) => (
                <line
                  key={e.key}
                  x1={(e.km / ROUTE_KM) * CHART_W}
                  y1={0}
                  x2={(e.km / ROUTE_KM) * CHART_W}
                  y2={CHART_H}
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="3 4"
                />
              ))}

              <line x1={markerX} y1={0} x2={markerX} y2={CHART_H} stroke="#FFFFFF" strokeOpacity={0.35} />
              <circle cx={markerX} cy={markerY} r={7} fill="#17E8D8" />
              <circle cx={markerX} cy={markerY} r={14} fill="none" stroke="#17E8D8" strokeOpacity={0.4} />
            </svg>
          </div>

          <input
            type="range"
            min={0}
            max={ROUTE_KM}
            step={0.01}
            value={km}
            onChange={(e) => setKm(parseFloat(e.target.value))}
            className="mt-6 w-full accent-teal"
            aria-label={t("distanceLabel")}
          />

          <div className="mt-3 flex justify-between text-xs text-fg/35">
            <span>0 km</span>
            <span>{ROUTE_KM} km</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
