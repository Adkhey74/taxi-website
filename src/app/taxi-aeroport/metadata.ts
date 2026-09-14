import { Metadata } from "next"

const title = "Taxi Aéroport Chambéry – Transferts stations | Hern Taxi"
const description = "Taxi depuis l'aéroport de Chambéry, Lyon Saint-Exupéry ou Genève vers Val Thorens, Courchevel, Méribel, Tignes et Val d'Isère. Jusqu'à 8 passagers avec bagages, 24h/24."
const image = "https://res.cloudinary.com/dufmpr5dh/image/upload/v1767287362/classv_jinqie.jpg"

export const metadata: Metadata = {
  // absolute : le layout racine ajoute déjà « | Hern Taxi » via son template.
  title: { absolute: title },
  description,
  keywords: ["taxi aéroport Chambéry", "transfert aéroport Chambéry", "Chambéry airport transfer", "taxi aéroport stations de ski", "taxi aéroport Savoie"],
  alternates: {
    canonical: "/taxi-aeroport",
  },
  openGraph: {
    title,
    description,
    url: "https://www.herntaxi.fr/taxi-aeroport",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Taxi aéroport Chambéry - Hern Taxi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
}
