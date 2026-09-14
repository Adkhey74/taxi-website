import { Metadata } from "next"

const title = "Taxi conventionné CPAM Savoie | Hern Taxi"
const description = "Taxi conventionné CPAM en Savoie : transport médical assis sur prescription vers Chambéry, Grenoble et Lyon (CHU Grenoble Alpes, Léon Bérard, Édouard-Herriot). 24h/24 et 7j/7."

export const metadata: Metadata = {
  // absolute : le layout racine ajoute déjà « | Hern Taxi » via son template.
  title: { absolute: title },
  description,
  keywords: ["taxi conventionné CPAM", "taxi conventionné Savoie", "transport médical assis", "transport médical Chambéry", "taxi CPAM", "transport médical Lyon Grenoble"],
  alternates: {
    canonical: "/transport-medical-cpam",
  },
  openGraph: {
    title,
    description,
    url: "https://www.herntaxi.fr/transport-medical-cpam",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}
