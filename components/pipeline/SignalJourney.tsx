"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlueprintRoute } from "@/components/pipeline/BlueprintRoute";

type Step = { title: string; description: string; specs: string[] };

const STEP_VH = 68;

export function SignalJourney() {
  const t = useTranslations("signalJourney");
  const steps = t.raw("steps") as Step[];
  const shortLabels = t.raw("shortLabels") as string[];
  const count = steps.length;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  const stepIndexRaw = useTransform(progress, [0, 1], [0, count - 1]);
  const stepLabel = useTransform(stepIndexRaw, (v) => `${Math.min(count, Math.round(v) + 1)} / ${count}`);

  return (
    <>
      <div id="signalweg" ref={sectionRef} className="relative scroll-mt-20" style={{ height: `${count * STEP_VH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-ink">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="animate-drift-a absolute -left-1/4 top-0 h-full w-3/4 bg-gradient-to-br from-navy/40 via-teal/6 to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 py-12 sm:px-10 sm:py-14">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-teal">
                {t("eyebrow")} · <span className="text-fg/35">{t("toggleStoryline")}</span>
              </span>
              <motion.span className="font-mono text-xs font-bold text-fg/40">{stepLabel}</motion.span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-6 lg:flex-row lg:gap-4">
              <div className="w-full max-w-[640px] lg:flex-[1.3]">
                <BlueprintRoute progress={progress} labels={shortLabels} count={count} />
              </div>

              <div className="relative w-full lg:flex-1">
                <div className="relative h-[200px] border-l-2 border-teal/50 pl-6 sm:h-[180px]">
                  {steps.map((step, i) => (
                    <StepCaption key={step.title} step={step} index={i} count={count} progress={progress} />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden justify-between font-mono text-[10px] tracking-wide text-fg/25 sm:flex">
              <span>REV. {String(Math.min(count, 1)).padStart(2, "0")} · DSF-MEDIA-NE3-NE5</span>
              <span>SCHEMA A</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 lg:py-32">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow={t("toggleProtocol")} title={t("title")} subtitle={t("subtitle")} />
          <div className="overflow-hidden rounded-2xl border border-fg/8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-ink-soft text-left text-xs uppercase tracking-wider text-fg/40">
                  <th className="px-6 py-4 font-bold">#</th>
                  <th className="px-6 py-4 font-bold">Schritt</th>
                  <th className="px-6 py-4 font-bold">Spezifikation 1</th>
                  <th className="px-6 py-4 font-bold">Spezifikation 2</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step, i) => (
                  <tr key={step.title} className="border-t border-fg/8 bg-ink even:bg-ink-soft/40">
                    <td className="px-6 py-4 font-mono text-fg/40">{String(i + 1).padStart(2, "0")}</td>
                    <td className="px-6 py-4 font-semibold text-fg">{step.title}</td>
                    <td className="px-6 py-4 text-teal-light">{step.specs[0]}</td>
                    <td className="px-6 py-4 text-fg/55">{step.specs[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}

function StepCaption({
  step,
  index,
  count,
  progress,
}: {
  step: Step;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const center = index / (count - 1);
  const halfWindow = 1 / (count - 1) / 2.1;
  const opacity = useTransform(
    progress,
    [center - halfWindow * 2, center - halfWindow, center + halfWindow, center + halfWindow * 2],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [center - halfWindow * 2, center, center + halfWindow * 2], [16, 0, -16]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center gap-3.5">
      <span className="font-display text-2xl font-bold text-fg sm:text-3xl">{step.title}</span>
      <p className="max-w-md text-sm leading-relaxed text-fg/60 sm:text-[15px]">{step.description}</p>
      <div className="flex flex-wrap gap-2">
        {step.specs.map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-teal/35 bg-teal/10 px-3 py-1.5 text-[11px] font-bold text-teal-light"
          >
            {spec}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
