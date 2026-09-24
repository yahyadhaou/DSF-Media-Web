import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export default async function KontaktPage() {
  const t = await getTranslations("kontaktPage");

  const labels = {
    requestTypes: t.raw("requestTypes") as string[],
    company: t("form.company"),
    companyPlaceholder: t("form.companyPlaceholder"),
    name: t("form.name"),
    namePlaceholder: t("form.namePlaceholder"),
    email: t("form.email"),
    emailPlaceholder: t("form.emailPlaceholder"),
    phone: t("form.phone"),
    phonePlaceholder: t("form.phonePlaceholder"),
    message: t("form.message"),
    messagePlaceholder: t("form.messagePlaceholder"),
    upload: t("form.upload"),
    submit: t("form.submit"),
    sent: t("form.sent"),
  };

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex flex-col gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{t("eyebrow")}</span>
        <h1 className="font-display max-w-2xl text-4xl font-bold text-fg sm:text-5xl">{t("title")}</h1>
        <p className="max-w-xl text-base leading-relaxed text-fg/60">{t("subtitle")}</p>
      </Container>

      <Container className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm labels={labels} />

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-magenta/30 bg-gradient-to-br from-magenta/15 to-transparent p-7">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-magenta shadow-[0_0_10px_2px_rgba(226,0,116,0.6)]" />
              <span className="text-xs font-bold uppercase tracking-wide text-[#FF9BC7]">
                {t("emergency.title")}
              </span>
            </div>
            <p className="text-sm text-fg/70">{t("emergency.description")}</p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-fg/8 bg-ink-soft p-7">
            <span className="flex items-center gap-3 text-sm text-fg/75">
              <MapPin size={18} className="shrink-0 text-teal" /> Reuenberg 67, 45357 Essen
            </span>
            <span className="flex items-center gap-3 text-sm text-fg/75">
              <Phone size={18} className="shrink-0 text-teal" /> +49 162 686 1853
            </span>
            <span className="flex items-center gap-3 text-sm text-fg/75">
              <Mail size={18} className="shrink-0 text-teal" /> abdel@dsf-media.de
            </span>
          </div>

          <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-fg/8 bg-ink-soft text-center">
            <MapPin size={26} className="text-teal" />
            <span className="max-w-[220px] text-xs text-fg/40">{t("mapPlaceholder")}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
