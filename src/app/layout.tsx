import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n/context";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hern Taxi - Service de transport professionnel",
    template: "%s | Hern Taxi"
  },
  description: "Service de taxi fiable et professionnel pour tous vos déplacements. Aéroport, ville, longue distance. Disponible 24h/24 et 7j/7 à Chambéry, Aix-les-Bains et région.",
  keywords: ["taxi", "transport", "chauffeur", "aéroport", "Chambéry", "Aix-les-Bains", "Savoie", "transport médical", "réservation taxi"],
  authors: [{ name: "Hern Taxi" }],
  creator: "Hern Taxi",
  publisher: "Hern Taxi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // metadataBase: new URL("[NOUVEAU_DOMAINE]"), // À décommenter et remplir après changement de domaine
  alternates: {
    canonical: "/",
    languages: {
      "fr": "/",
      "en": "/",
    },
  },
  // openGraph: {
  //   type: "website",
  //   locale: "fr_FR",
  //   url: "[NOUVEAU_DOMAINE]", // À remplir après changement de domaine
  //   siteName: "Hern Taxi",
  //   title: "Hern Taxi - Service de transport professionnel",
  //   description: "Service de taxi fiable et professionnel pour tous vos déplacements. Aéroport, ville, longue distance. Disponible 24h/24 et 7j/7.",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1200,h_630,c_limit/v1766938705/aeroport_i3lxia.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Hern Taxi - Service de transport professionnel",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Hern Taxi - Service de transport professionnel",
  //   description: "Service de taxi fiable et professionnel pour tous vos déplacements. Aéroport, ville, longue distance.",
  //   images: ["https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1200,h_630,c_limit/v1766938705/aeroport_i3lxia.jpg"],
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "votre-code-verification-google",
    // yandex: "votre-code-verification-yandex",
    // yahoo: "votre-code-verification-yahoo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-center" richColors />
        </I18nProvider>
      </body>
    </html>
  );
}
