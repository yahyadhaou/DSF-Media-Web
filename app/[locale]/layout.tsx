import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dsf-media.de"),
  title: {
    default: "DSF Media GmbH — Glasfaserausbau & Montagepartner",
    template: "%s — DSF Media GmbH",
  },
  description:
    "DSF Media GmbH ist zertifizierter Montagepartner für Netzebene 3–5: Tiefbau, Spleißtechnik, Inhouse-Installation und 24/7-Entstörung.",
  openGraph: {
    title: "DSF Media GmbH — Glasfaserausbau & Montagepartner",
    description:
      "Präzision im Glasfaserausbau – vom Lichtimpuls bis zur Aktivierung.",
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
        className={`${spaceGrotesk.variable} ${manrope.variable} bg-ink font-sans antialiased`}
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
