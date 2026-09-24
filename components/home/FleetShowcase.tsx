"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Truck, Wind, Gauge, Drill } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FleetItem = { title: string; description: string };
const icons = [Truck, Wind, Gauge, Drill];

export function FleetShowcase() {
  const t = useTranslations("fleet");
  const items = t.raw("items") as FleetItem[];

  return (
    <section className="border-y border-fg/8 bg-ink-soft/40 py-24 lg:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4 rounded-2xl border border-fg/8 bg-ink p-7"
              >
                <Icon size={26} className="text-teal" />
                <span className="font-display text-base font-bold text-fg">{item.title}</span>
                <p className="text-sm leading-relaxed text-fg/55">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
