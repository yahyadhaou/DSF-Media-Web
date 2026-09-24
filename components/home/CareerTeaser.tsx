"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CareerTeaser() {
  const t = useTranslations("careerTeaser");
  const roles = t.raw("roles") as string[];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-fg/8 bg-gradient-to-br from-navy via-ink-soft to-ink p-10 sm:p-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal/15 blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              {t("eyebrow")}
            </span>
            <h2 className="font-display max-w-xl text-3xl font-bold text-fg sm:text-4xl">
              {t("title")}
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-fg/60">{t("subtitle")}</p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-fg/16 px-3.5 py-1.5 text-xs font-semibold text-fg/75"
                >
                  {r}
                </span>
              ))}
            </div>

            <Button href="/karriere" variant="primary" className="mt-4 w-fit">
              {t("cta")} <ArrowUpRight size={16} />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
