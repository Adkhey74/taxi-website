import { Metadata } from "next"

const title = "Transfert stations de ski Savoie | Hern Taxi"
const description = "Transferts en taxi vers les stations de Tarentaise depuis Chambéry et Aix-les-Bains : Courchevel, Méribel, La Plagne, Les Arcs, Tignes. Bagages et skis, familles et groupes."

export const metadata: Metadata = {
  // absolute : le layout racine ajoute déjà « | Hern Taxi » via son template.
  title: { absolute: title },
  description,
  keywords: ["transfert stations de ski", "taxi stations de ski Savoie", "taxi Courchevel", "taxi Val d'Isère", "transfert ski Tarentaise", "navette stations de ski"],
  alternates: {
    canonical: "/transfert-stations-ski",
  },
  openGraph: {
    title,
    description,
    url: "https://www.herntaxi.fr/transfert-stations-ski",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}
