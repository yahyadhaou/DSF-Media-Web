import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export default async function DatenschutzPage() {
  const locale = await getLocale();
  const de = locale === "de";

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex max-w-2xl flex-col gap-8">
        <h1 className="font-display text-4xl font-bold text-fg">
          {de ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>

        <Section title={de ? "1. Verantwortlicher" : "1. Data Controller"}>
          <p>
            {de
              ? "Verantwortlich für die Datenverarbeitung auf dieser Website ist die DSF Media GmbH, Reuenberg 67, 45357 Essen, E-Mail: abdel@dsf-media.de."
              : "The data controller for this website is DSF Media GmbH, Reuenberg 67, 45357 Essen, Germany, email: abdel@dsf-media.de."}
          </p>
        </Section>

        <Section title={de ? "2. Erhebung und Verarbeitung von Daten" : "2. Collection and Processing of Data"}>
          <p>
            {de
              ? "Beim Besuch dieser Website erhebt unser Hosting-Anbieter automatisch technische Zugriffsdaten (u. a. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite), um den Betrieb der Website sicherzustellen. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt."
              : "When you visit this website, our hosting provider automatically collects technical access data (e.g. IP address, date/time, page requested) to ensure the website operates correctly. This data is not combined with other data sources."}
          </p>
        </Section>

        <Section title={de ? "3. Kontaktformular" : "3. Contact Form"}>
          <p>
            {de
              ? "Wenn Sie uns über das Kontaktformular eine Anfrage senden, werden Ihre Angaben (Firma, Ansprechpartner, E-Mail, Telefon, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet und gespeichert, solange dies für die Bearbeitung erforderlich ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO."
              : "If you send us a request via the contact form, your information (company, contact person, email, phone, message) is processed and stored to handle your request for as long as necessary. The legal basis is Art. 6(1)(b) GDPR."}
          </p>
        </Section>

        <Section title={de ? "4. Bewerbungsformular" : "4. Application Form"}>
          <p>
            {de
              ? "Bewerberdaten aus dem Karriere-Formular werden ausschließlich zur Durchführung des Bewerbungsverfahrens verarbeitet (Art. 6 Abs. 1 lit. b DSGVO i. V. m. § 26 BDSG) und nach Abschluss des Verfahrens gemäß den gesetzlichen Aufbewahrungsfristen gelöscht."
              : "Applicant data from the careers form is processed solely to carry out the application process (Art. 6(1)(b) GDPR in conjunction with Sec. 26 BDSG) and deleted after the process ends, in line with statutory retention periods."}
          </p>
        </Section>

        <Section title={de ? "5. Cookies" : "5. Cookies"}>
          <p>
            {de
              ? "Diese Website verwendet ausschließlich technisch notwendige Cookies, sofern Sie über den Cookie-Banner nicht ausdrücklich in weitere, optionale Cookies eingewilligt haben. Ihre Auswahl können Sie jederzeit über den Cookie-Banner anpassen."
              : "This website uses only technically necessary cookies unless you have explicitly consented to additional, optional cookies via the cookie banner. You can change your selection at any time via the cookie banner."}
          </p>
        </Section>

        <Section title={de ? "6. Ihre Rechte" : "6. Your Rights"}>
          <p>
            {de
              ? "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde. Wenden Sie sich hierzu an abdel@dsf-media.de."
              : "You have the right to access, rectify, erase and restrict the processing of your personal data, as well as the right to lodge a complaint with a data protection supervisory authority. Please contact abdel@dsf-media.de."}
          </p>
        </Section>

        <Section title={de ? "7. Hosting" : "7. Hosting"}>
          <p className="text-fg/40">
            {de
              ? "[Angaben zum Hosting-Anbieter / Auftragsverarbeiter werden vor Live-Schaltung ergänzt.]"
              : "[Details of the hosting provider / data processor will be added before go-live.]"}
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
