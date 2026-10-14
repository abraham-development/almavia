import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { BrandGradients } from "@/components/icons";
import { site } from "@/lib/site";
import "./globals.css";

// Alternativas libres a las tipografías del brandbook:
// Angelle / Monterchi Serif → Cormorant Garamond · Cocomat Pro → Jost
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Almavia | Medicina estética y salud integral en Lima",
    template: "%s | Almavia",
  },
  description: site.description,
  keywords: [
    "medicina estética",
    "salud integral",
    "toxina botulínica",
    "ácido hialurónico",
    "medicina regenerativa",
    "estética corporal",
    "gastroenterología",
    "obesidad",
    "psicología",
    "Miraflores",
    "Lima",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Almavia",
    title: `Almavia | ${site.slogan}`,
    description: site.description,
    images: [{ url: "/images/hero-estetica.webp", width: 2400, height: 1350, alt: "Almavia" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#EAE2D2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jost.variable}`}>
      {/* Una extensión puede añadir class en <body> antes de hidratar (p. ej. expansion-alids-init). */}
      <body suppressHydrationWarning>
        <BrandGradients />
        {children}
      </body>
    </html>
  );
}
