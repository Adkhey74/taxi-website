import { Metadata } from "next"
import { Vehicles } from "@/components/Vehicles"

const title = "Taxi 1 à 8 passagers – Nos véhicules | Hern Taxi"
const description = "Mercedes Classe V et Renault Trafic : taxis de 1 à 8 passagers avec grand espace bagages et climatisation. Siège bébé et rehausseur gratuits sur demande, en Savoie."

export const metadata: Metadata = {
  // absolute : le layout racine ajoute déjà « | Hern Taxi » via son template.
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/vehicles",
  },
  openGraph: {
    title,
    description,
    url: "https://www.herntaxi.fr/vehicles",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function VehiclesPage() {
  return (
    <main className="min-h-screen">
      <Vehicles />
    </main>
  )
}
