"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "dsf-media-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(value: "all" | "necessary") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-white/10 bg-ink-soft/95 p-5 backdrop-blur-md shadow-2xl sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm leading-relaxed text-white/70">{t("text")}</p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => decide("necessary")}
              className="rounded-full border border-white/18 px-4 py-2.5 text-xs font-bold text-white/80 hover:bg-white/5"
            >
              {t("acceptNecessary")}
            </button>
            <button
              type="button"
              onClick={() => decide("all")}
              className="rounded-full bg-teal px-4 py-2.5 text-xs font-bold text-[#06302E] hover:bg-teal-bright"
            >
              {t("acceptAll")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
