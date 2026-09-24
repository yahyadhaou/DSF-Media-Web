"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shovel, GitMerge, Building2, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ServiceItem = { title: string; description: string };

const icons = [Shovel, GitMerge, Building2, LifeBuoy];

export function ServicesGrid() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section className="py-24 lg:py-32">
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
                className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-ink-soft p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/12">
                  <Icon size={20} className="text-teal" />
                </div>
                <span className="font-display text-lg font-bold text-white">{item.title}</span>
                <p className="text-sm leading-relaxed text-white/55">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
