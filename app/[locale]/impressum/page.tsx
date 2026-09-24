import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export default async function ImpressumPage() {
  const locale = await getLocale();
  const de = locale === "de";

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex max-w-2xl flex-col gap-8">
        <h1 className="font-display text-4xl font-bold text-fg">
          {de ? "Impressum" : "Legal Notice"}
        </h1>

        <Section title={de ? "Angaben gemäß § 5 TMG" : "Information pursuant to Sec. 5 German Telemedia Act (TMG)"}>
          <p>DSF Media GmbH</p>
          <p>Reuenberg 67</p>
          <p>45357 Essen</p>
          <p>Deutschland</p>
        </Section>

        <Section title={de ? "Vertreten durch" : "Represented by"}>
          <p>{de ? "Geschäftsführer: Dhaou Abdelkader" : "Managing Director: Dhaou Abdelkader"}</p>
        </Section>

        <Section title={de ? "Kontakt" : "Contact"}>
          <p>{de ? "Telefon" : "Phone"}: +49 162 686 1853</p>
          <p>E-Mail: abdel@dsf-media.de</p>
        </Section>

        <Section title={de ? "Registereintrag" : "Commercial Register"}>
          <p className="text-fg/40">
            {de
              ? "[Registergericht] · [Handelsregisternummer] — wird nach Eintragung ergänzt."
              : "[Register Court] · [Commercial Register Number] — to be added after registration."}
          </p>
        </Section>

        <Section title={de ? "Umsatzsteuer-ID" : "VAT ID"}>
          <p className="text-fg/40">
            {de
              ? "[USt-IdNr. gemäß § 27a UStG] — wird ergänzt."
              : "[VAT ID pursuant to Sec. 27a of the German VAT Act] — to be added."}
          </p>
        </Section>

        <Section title={de ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" : "Responsible for content pursuant to Sec. 18(2) MStV"}>
          <p>Dhaou Abdelkader, Reuenberg 67, 45357 Essen</p>
        </Section>

        <Section title={de ? "EU-Streitschlichtung" : "EU Dispute Resolution"}>
          <p className="text-fg/50 leading-relaxed">
            {de
              ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
              : "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. We are not obliged or willing to participate in dispute resolution proceedings before a consumer arbitration board."}
          </p>
        </Section>
      </Container>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-t border-fg/8 pt-6">
      <span className="text-xs font-bold uppercase tracking-widest text-teal">{title}</span>
      <div className="flex flex-col gap-1 text-sm leading-relaxed text-fg/65">{children}</div>
    </div>
  );
}
