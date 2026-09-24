import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations("footer");
  const companyLinks = [
    { href: "/leistungen", label: t("columns.company.links.0") },
    { href: "/#signalweg", label: t("columns.company.links.1") },
    { href: "/team", label: t("columns.company.links.2") },
    { href: "/karriere", label: t("columns.company.links.3") },
  ];
  const legalLinks = [
    { href: "/impressum", label: t("columns.legal.links.0") },
    { href: "/datenschutz", label: t("columns.legal.links.1") },
  ];

  return (
    <footer className="border-t border-fg/8 bg-ink-soft">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="max-w-[240px] text-sm leading-relaxed text-fg/55">{t("tagline")}</p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-fg/40">
            {t("columns.company.title")}
          </span>
          <nav className="flex flex-col gap-3 text-sm text-fg/70">
            {companyLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-fg transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-fg/40">
            {t("columns.legal.title")}
          </span>
          <nav className="flex flex-col gap-3 text-sm text-fg/70">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-fg transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-fg/40">
            {t("columns.contact.title")}
          </span>
          <div className="flex flex-col gap-3 text-sm text-fg/70">
            <span className="flex items-center gap-2.5">
              <MapPin size={15} className="text-teal shrink-0" /> {t("address")}
            </span>
            <span className="flex items-center gap-2.5">
              <Phone size={15} className="text-teal shrink-0" /> {t("phone")}
            </span>
            <span className="flex items-center gap-2.5">
              <Mail size={15} className="text-teal shrink-0" /> {t("email")}
            </span>
          </div>
        </div>
      </Container>

      <div className="border-t border-fg/8 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-fg/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {t("copyright")}</span>
        </Container>
      </div>
    </footer>
  );
}
