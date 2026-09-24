import { getTranslations } from "next-intl/server";
import { Shovel, GitMerge, Building2, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type ServiceItem = { title: string; description: string };
type Step = { title: string; description: string };
const icons = [Shovel, GitMerge, Building2, LifeBuoy];

export default async function LeistungenPage() {
  const t = await getTranslations();
  const items = t.raw("services.items") as ServiceItem[];
  const steps = t.raw("signalJourney.steps") as Step[];

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex flex-col gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
          {t("leistungenPage.eyebrow")}
        </span>
        <h1 className="font-display max-w-2xl text-4xl font-bold text-white sm:text-5xl">
          {t("leistungenPage.title")}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/60">
          {t("leistungenPage.subtitle")}
        </p>
      </Container>

      <Container className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-ink-soft p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/12">
                <Icon size={22} className="text-teal" />
              </div>
              <span className="font-display text-xl font-bold text-white">{item.title}</span>
              <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
            </div>
          );
        })}
      </Container>

      <Container className="mt-24 flex flex-col gap-10">
        <span className="border-b border-white/8 pb-3 text-xs font-bold uppercase tracking-widest text-white/40">
          {t("signalJourney.title")}
        </span>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4 rounded-xl border border-white/8 bg-ink-soft p-6">
              <span className="font-display shrink-0 text-lg font-bold text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-white">{s.title}</span>
                <span className="text-xs leading-relaxed text-white/50">{s.description}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-20 flex flex-col items-center gap-5 text-center">
        <h2 className="font-display max-w-lg text-2xl font-bold text-white sm:text-3xl">
          {t("finalCta.title")}
        </h2>
        <Button href="/kontakt" variant="primary">
          {t("finalCta.cta")}
        </Button>
      </Container>
    </div>
  );
}
