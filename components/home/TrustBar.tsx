"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function TrustBar() {
  const t = useTranslations("trustBar");
  const items = t.raw("items") as string[];

  return (
    <div className="border-y border-fg/8 bg-ink-soft/60">
      <Container className="flex flex-wrap items-center gap-x-10 gap-y-4 py-6">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex items-center gap-2.5 text-sm text-fg/60"
          >
            <CheckCircle2 size={16} className="shrink-0 text-teal" />
            {item}
          </motion.span>
        ))}
      </Container>
    </div>
  );
}
