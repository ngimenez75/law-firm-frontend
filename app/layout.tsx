import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio Legal | Tu respaldo jurídico, ágil y transparente",
  description:
    "Estudio jurídico argentino de vanguardia. Asesoramiento legal en daños, laboral, familia y penal con seguimiento de casos 100% digital.",
  keywords: [
    "estudio legal argentina",
    "abogados buenos aires",
    "reclamos siniestros",
    "derecho laboral",
    "derecho de familia",
    "abogados tribunales",
  ],
  openGraph: {
    title: "Estudio Legal | Asesoramiento Jurídico y Gestión Digital",
    description:
      "Atención digital con seguimiento de casos en tiempo real. Consultá tu caso de forma transparente.",
    url: "https://estudiolegal.ar",
    siteName: "Estudio Legal",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Legal | Asesoramiento Jurídico y Gestión Digital",
    description: "Atención digital con seguimiento de casos en tiempo real.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${cormorantGaramond.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-slate-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
