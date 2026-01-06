import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Taxi Aéroport - Transfert aéroport Chambéry | Hern Taxi",
  description: "Service de taxi aéroport professionnel pour vos transferts vers et depuis l'aéroport. Disponible 24h/24. Réservation en ligne facile et rapide.",
  keywords: ["taxi aéroport", "transfert aéroport", "aéroport Chambéry", "taxi aéroport Savoie", "navette aéroport"],
  alternates: {
    canonical: "/taxi-aeroport",
  },
  openGraph: {
    title: "Taxi Aéroport - Transfert aéroport Chambéry | Hern Taxi",
    description: "Service de taxi aéroport professionnel pour vos transferts vers et depuis l'aéroport de Chambéry, Lyon-Saint-Exupéry et Genève. Disponible 24h/24.",
    url: "https://www.herntaxi.fr/taxi-aeroport",
    images: [
      {
        url: "https://res.cloudinary.com/dufmpr5dh/image/upload/v1767287362/classv_jinqie.jpg",
        width: 1200,
        height: 630,
        alt: "Taxi aéroport Chambéry - Hern Taxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Aéroport - Transfert aéroport Chambéry | Hern Taxi",
    description: "Service de taxi aéroport professionnel pour vos transferts vers et depuis l'aéroport de Chambéry, Lyon-Saint-Exupéry et Genève.",
    images: ["https://res.cloudinary.com/dufmpr5dh/image/upload/v1767287362/classv_jinqie.jpg"],
  },
}

