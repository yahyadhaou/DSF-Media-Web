"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Zap, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SignalTunnel } from "@/components/pipeline/SignalTunnel";

type Step = {
  title: string;
  description: string;
  specs: string[];
};

export function SignalJourney() {
  const t = useTranslations("signalJourney");
  const steps = t.raw("steps") as Step[];
  const [active, setActive] = useState(2);
  const [mode, setMode] = useState<"storyline" | "protocol">("storyline");

  return (
    <section id="signalweg" className="scroll-mt-20 py-24 lg:py-32">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

          <div className="flex shrink-0 rounded-full border border-white/12 p-1">
            <button
              type="button"
              onClick={() => setMode("storyline")}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
                mode === "storyline" ? "bg-teal text-[#06302E]" : "text-white/50 hover:text-white/80"
              }`}
            >
              <Zap size={14} /> {t("toggleStoryline")}
            </button>
            <button
              type="button"
              onClick={() => setMode("protocol")}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
                mode === "protocol" ? "bg-teal text-[#06302E]" : "text-white/50 hover:text-white/80"
              }`}
            >
              <Settings2 size={14} /> {t("toggleProtocol")}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === "storyline" ? (
            <motion.div
              key="storyline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-10 lg:flex-row"
            >
              <div className="relative flex shrink-0 flex-col gap-8 lg:w-64">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" />
                <motion.div
                  className="absolute left-[9px] top-2 w-px bg-teal"
                  animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{ maxHeight: "calc(100% - 16px)" }}
                />
                {steps.map((step, i) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative flex items-center gap-4 text-left"
                  >
                    <span
                      className={`relative z-10 rounded-full transition-all ${
                        i === active
                          ? "h-5 w-5 bg-teal-bright shadow-[0_0_16px_4px_rgba(23,232,216,0.55)]"
                          : "h-3.5 w-3.5 bg-white/20"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        i === active ? "font-bold text-white" : "text-white/45 hover:text-white/70"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-2xl border border-white/8 bg-ink-soft">
                <SignalTunnel active={active} count={steps.length} />

                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-4 bg-gradient-to-t from-ink-soft via-ink-soft/90 to-transparent p-8 pt-24 sm:p-10 sm:pt-28"
                >
                  <span className="font-display text-2xl font-bold text-white">
                    {steps[active].title}
                  </span>
                  <p className="max-w-xl text-[15px] leading-relaxed text-white/60">
                    {steps[active].description}
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {steps[active].specs.map((spec) => (
                      <span
                        key={spec}
                        className="pointer-events-auto rounded-full border border-teal/35 bg-teal/10 px-3.5 py-1.5 text-xs font-bold text-teal-light"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="protocol"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-2xl border border-white/8"
            >
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-ink-soft text-left text-xs uppercase tracking-wider text-white/40">
                    <th className="px-6 py-4 font-bold">#</th>
                    <th className="px-6 py-4 font-bold">Schritt</th>
                    <th className="px-6 py-4 font-bold">Spezifikation 1</th>
                    <th className="px-6 py-4 font-bold">Spezifikation 2</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, i) => (
                    <tr key={step.title} className="border-t border-white/8 bg-ink even:bg-ink-soft/40">
                      <td className="px-6 py-4 font-mono text-white/40">{String(i + 1).padStart(2, "0")}</td>
                      <td className="px-6 py-4 font-semibold text-white">{step.title}</td>
                      <td className="px-6 py-4 text-teal-light">{step.specs[0]}</td>
                      <td className="px-6 py-4 text-white/55">{step.specs[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
