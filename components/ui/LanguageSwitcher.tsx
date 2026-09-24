"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-fg/14 p-1 text-xs font-bold">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={locale === l}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${
            locale === l ? "bg-fg/10 text-fg" : "text-fg/45 hover:text-fg/70"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
