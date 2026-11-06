import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const homeTitle = `${site.name} · Stand automóvel em Braga | Carros usados, seminovos e Rent a Car`;
const homeDescription =
  "Stand automóvel em Braga: carros usados, seminovos e novos com garantia de 18 meses, financiamento até 24h, venda, troca e retoma, entregas em todo o país e aluguer de viaturas.";

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: { default: homeTitle, template: `%s · ${site.name} Braga` },
  description: homeDescription,
  keywords: [
    "stand automóvel Braga", "concessionário Braga", "carros usados Braga", "carros seminovos Portugal",
    "comprar carro usado", "retoma de carro", "financiamento automóvel", "rent a car Braga", "AutoFerasa",
  ],
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "./",
    siteName: site.name,
    locale: "pt_PT",
    type: "website",
    images: [{ url: "hero/stand-autoferasa.jpg", alt: "Stand AutoFerasa em Braga" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${site.url}/#stand`,
  name: site.name,
  description: homeDescription,
  url: `${site.url}/`,
  image: `${site.url}/hero/stand-autoferasa.jpg`,
  logo: `${site.url}/logos/autoferasa.jpg`,
  telephone: site.phone,
  email: site.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Padre Manuel Guimarães 5M1, n.º 26, 2.º Esq., Real",
    postalCode: "4700-284",
    addressLocality: "Braga",
    addressCountry: "PT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: { "@type": "Country", name: "Portugal" },
  sameAs: [site.instagram, site.facebook, "https://autonarciso.pt"],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export const viewport: Viewport = { themeColor: "#0f1113" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
