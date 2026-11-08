import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "../globals.css";

// Self-hosted (not next/font/google): Google's font-fetch at build time was
// failing on Netlify's build container ("Cannot read properties of null"),
// a known next/font/google + Netlify issue. These are the same two font
// files Google would have served, just bundled locally — no network call
// needed at build time, and both are variable fonts so one file each covers
// every weight we use.
const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-variable.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "500 700",
});

const manrope = localFont({
  src: "../fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dsf-media.de"),
  title: {
    default: "DSF Media GmbH — Glasfaser-Spezialist für Netzebene 4 & 5",
    template: "%s — DSF Media GmbH",
  },
  description:
    "DSF Media GmbH ist Montagepartner für Netzebene 4 & 5: Inhouse-Verkabelung, Wohnungsanschluss bis zur Glasfaserdose, Spleiß- und Messtechnik sowie 24/7-Entstörung.",
  openGraph: {
    title: "DSF Media GmbH — Glasfaser-Spezialist für Netzebene 4 & 5",
    description:
      "Glasfaser im Gebäude – vom Hausübergabepunkt bis zur Glasfaserdose in jeder Wohnung.",
    siteName: "DSF Media GmbH",
    locale: "de_DE",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} bg-ink font-body antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <SmoothScroll>
              <ScrollProgress />
              <div className="grain-overlay" />
              <Header />
              <main>{children}</main>
              <Footer />
              <CookieBanner />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
