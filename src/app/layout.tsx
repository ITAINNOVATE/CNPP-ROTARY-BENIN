import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#005DAA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Vacciner pour la Vie | Rotary Bénin",
  description: "Une initiative de la Commission Nationale Polio Plus du Rotary Bénin. Informer, rassurer et protéger grâce à une information fiable sur la vaccination.",
  keywords: ["Vaccination", "Polio", "Bénin", "Rotary International", "Santé Publique", "Enfants", "OMS", "UNICEF"],
  openGraph: {
    title: "Vacciner pour la Vie | Rotary Bénin",
    description: "Une initiative de la Commission Nationale Polio Plus du Rotary Bénin pour informer et protéger la population grâce à la vaccination.",
    url: "https://vaccinerpourlavie.bj",
    siteName: "Vacciner pour la Vie",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Famille béninoise en bonne santé",
      },
    ],
    locale: "fr_BJ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacciner pour la Vie | Rotary Bénin",
    description: "Informer, rassurer et protéger grâce à une information fiable sur la vaccination.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
