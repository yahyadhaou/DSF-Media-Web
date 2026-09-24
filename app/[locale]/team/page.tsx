import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

type Member = {
  initials: string;
  name: string;
  role: string;
  note: string;
  gradient: string;
};

const leadership: Member[] = [
  {
    initials: "DA",
    name: "Dhaou Abdelkader",
    role: "Geschäftsführer",
    note: "Verantwortlich für Partnerbeziehungen, Projektakquise und operative Steuerung.",
    gradient: "from-navy to-teal",
  },
];

const technical: Member[] = [
  { initials: "LH", name: "Lisa Hoffmann", role: "Projektleiterin NE3", note: "12 Jahre Tiefbau & Trassenplanung", gradient: "from-navy-2 to-teal" },
  { initials: "MB", name: "Marco Berger", role: "Spleißtechniker", note: "Zertifiziert · Fusion & OTDR-Messung", gradient: "from-navy-2 to-teal" },
  { initials: "JK", name: "Jonas Krüger", role: "Bauleiter", note: "Koordination Tiefbau & HDD-Einsätze", gradient: "from-navy-2 to-teal" },
  { initials: "SW", name: "Sabine Weiß", role: "Inhouse-Installation", note: "MDU-Verkabelung & Wohnungswirtschaft", gradient: "from-navy-2 to-teal" },
];

const admin: Member[] = [
  { initials: "TN", name: "Tarek Nasser", role: "Disposition & 24/7-Einsatz", note: "Koordiniert Notdienst-Einsätze", gradient: "from-navy to-navy-2" },
  { initials: "EF", name: "Elena Fischer", role: "Kaufmännische Leitung", note: "Abrechnung & Vertragswesen", gradient: "from-navy to-navy-2" },
];

export default async function TeamPage() {
  const t = await getTranslations("teamPage");

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-dashed border-white/15 px-3 py-1 text-[11px] text-white/35">
          {t("placeholderNote")}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{t("eyebrow")}</span>
        <h1 className="font-display max-w-2xl text-4xl font-bold text-white sm:text-5xl">{t("title")}</h1>
        <p className="max-w-lg text-base leading-relaxed text-white/60">{t("subtitle")}</p>
      </Container>

      <Container className="mt-16 flex flex-col gap-14">
        <Group label={t("groups.leadership")} members={leadership} />
        <Group label={t("groups.technical")} members={technical} />
        <Group label={t("groups.admin")} members={admin} />
      </Container>
    </div>
  );
}

function Group({ label, members }: { label: string; members: Member[] }) {
  return (
    <div className="flex flex-col gap-6">
      <span className="border-b border-white/8 pb-3 text-xs font-bold uppercase tracking-widest text-white/40">
        {label}
      </span>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m) => (
          <div
            key={m.name}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-ink-soft p-7 text-center"
          >
            <div
              className={`flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br ${m.gradient} font-display text-xl font-bold text-white`}
            >
              {m.initials}
            </div>
            <span className="font-display text-base font-bold text-white">{m.name}</span>
            <span className="text-xs font-semibold text-teal-light">{m.role}</span>
            <span className="text-xs text-white/45">{m.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
