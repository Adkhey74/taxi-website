import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n/context";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
import { ReservationModalProvider } from "@/contexts/ReservationModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hern Taxi - Service de transport professionnel",
  description: "Service de taxi fiable et professionnel pour tous vos déplacements. Aéroport, ville, longue distance. Disponible 24h/24.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <ReservationModalProvider>
            <Header />
            {children}
            <Footer />
            <WhatsAppButton />
            <Toaster position="top-center" richColors />
          </ReservationModalProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
