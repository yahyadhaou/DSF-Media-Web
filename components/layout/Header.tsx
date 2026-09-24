"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/leistungen", label: t("leistungen") },
    { href: "/#signalweg", label: t("signalweg") },
    { href: "/team", label: t("team") },
    { href: "/kontakt", label: t("kontakt") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/8" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Logo variant="light" />

        <nav className="hidden items-center gap-9 text-sm text-white/70 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <Button href="/kontakt" variant="primary" className="px-6 py-3 text-sm">
            {t("cta")}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="text-white lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-ink px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5 text-base text-white/80">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LanguageSwitcher />
            <Button href="/kontakt" variant="primary" className="px-6 py-3 text-sm">
              {t("cta")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
