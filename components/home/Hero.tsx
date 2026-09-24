"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 80, damping: 20 });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), { stiffness: 60, damping: 18 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), { stiffness: 60, damping: 18 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden"
    >
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="animate-drift-a pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full bg-teal/12 blur-3xl"
      />
      <div className="animate-drift-b pointer-events-none absolute -bottom-32 -left-24 h-[440px] w-[440px] rounded-full bg-navy-2/22 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[240px] w-[240px] rounded-full bg-magenta/8 blur-3xl" />

      <Container className="relative py-24 lg:py-32">
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 800 }}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-8"
        >
          <motion.div variants={item} className="flex flex-wrap gap-2.5">
            <Badge>{t("badgeIso")}</Badge>
            <Badge>{t("badgeDvgw")}</Badge>
            <Badge tone="telekom">{t("badgeTelekom")}</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display max-w-3xl text-[2.6rem] font-bold leading-[1.08] text-white sm:text-6xl"
          >
            {t("titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-teal-light via-teal to-teal-bright bg-clip-text text-transparent">
              {t("titleAccent")}
            </span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-white/60">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3.5">
            <Button href="/kontakt" variant="primary">
              {t("ctaPrimary")}
            </Button>
            <Button href="/karriere" variant="outline">
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          <motion.a
            href="#signalweg"
            variants={item}
            className="mt-6 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            {t("scrollHint")}
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
