import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="border-t border-white/8 py-24 text-center">
      <Container className="flex flex-col items-center gap-6">
        <h2 className="font-display max-w-xl text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">{t("subtitle")}</p>
        <Button href="/kontakt" variant="primary">
          {t("cta")}
        </Button>
      </Container>
    </section>
  );
}
