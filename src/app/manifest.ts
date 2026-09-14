import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hern Taxi - Transport professionnel en Savoie",
    short_name: "Hern Taxi",
    description:
      "Service de taxi professionnel 24h/24 et 7j/7 en Savoie : aéroport, transport médical CPAM, stations de ski.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#101112",
    lang: "fr",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
