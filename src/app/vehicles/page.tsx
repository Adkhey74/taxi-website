import { Vehicles } from "@/components/Vehicles"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nos véhicules - Flotte Mercedes",
  description: "Découvrez notre flotte de véhicules Mercedes haut de gamme pour tous vos transports en Savoie : berlines et vans spacieux, confort premium, jusqu'à 8 passagers. Disponible 24h/24.",
  keywords: ["véhicules taxi", "flotte Mercedes", "van taxi Savoie", "taxi 8 passagers", "véhicule confort taxi"],
  alternates: {
    canonical: "/vehicles",
  },
  openGraph: {
    title: "Nos véhicules - Flotte Mercedes | Hern Taxi",
    description: "Découvrez notre flotte de véhicules Mercedes haut de gamme pour tous vos transports en Savoie : berlines et vans spacieux, confort premium, jusqu'à 8 passagers.",
    url: "https://www.herntaxi.fr/vehicles",
    images: [
      {
        url: "https://res.cloudinary.com/dufmpr5dh/image/upload/v1767287362/classv_jinqie.jpg",
        width: 1200,
        height: 630,
        alt: "Flotte de véhicules Mercedes - Hern Taxi",
      },
    ],
  },
}

export default function VehiclesPage() {
  return (
    <main className="min-h-screen">
      <Vehicles />
    </main>
  )
}
