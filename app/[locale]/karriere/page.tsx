"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const TOTAL_STEPS = 3;

export default function KarrierePage() {
  const t = useTranslations("karrierePage");
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const roles = t.raw("roles") as string[];

  const stepFields: Record<number, string[]> = {
    1: t.raw("steps.1.fields") as string[],
    2: t.raw("steps.2.fields") as string[],
    3: t.raw("steps.3.fields") as string[],
  };

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex flex-col items-center gap-4 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{t("eyebrow")}</span>
        <h1 className="font-display max-w-2xl text-4xl font-bold text-white sm:text-5xl">{t("title")}</h1>
        <p className="max-w-lg text-base leading-relaxed text-white/60">{t("subtitle")}</p>
      </Container>

      <Container className="mt-14 flex max-w-xl flex-col gap-8">
        {!done && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    s < step
                      ? "bg-teal text-[#06302E]"
                      : s === step
                        ? "border-2 border-teal text-teal"
                        : "border border-white/16 text-white/30"
                  }`}
                >
                  {s < step ? <Check size={14} /> : s}
                </div>
                {s < TOTAL_STEPS && (
                  <div className={`h-px flex-1 ${s < step ? "bg-teal" : "bg-white/12"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-teal/30 bg-teal/8 p-10 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-[#06302E]">
                <Check size={26} />
              </div>
              <span className="font-display text-xl font-bold text-white">
                {t("submit")}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-ink-soft p-8"
            >
              <span className="font-display text-lg font-bold text-white">
                {t(`steps.${step}.title`)}
              </span>

              {stepFields[step].map((field) =>
                field.toLowerCase().includes("position") || field.toLowerCase().includes("role") ? (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-white/60">{field}</label>
                    <select className="rounded-lg border border-white/14 bg-ink px-3.5 py-3 text-sm text-white focus:border-teal focus:outline-none">
                      {roles.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-white/60">{field}</label>
                    <input
                      type="text"
                      placeholder={field}
                      className="rounded-lg border border-white/14 bg-ink px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:border-teal focus:outline-none"
                    />
                  </div>
                )
              )}

              <div className="mt-2 flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                    {t("back")}
                  </Button>
                ) : (
                  <span />
                )}
                {step < TOTAL_STEPS ? (
                  <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
                    {t("next")}
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setDone(true)}>
                    {t("submit")}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
