"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, MapPin, Car, Clock, Users, Euro } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

const services = [
  {
    icon: Plane,
    title: "Aéroport",
    serviceType: "aeroport" as const,
    description: "Transferts vers et depuis l'aéroport avec suivi des vols en temps réel",
    features: ["Suivi des vols", "Attente gratuite", "Bagages inclus"],
    price: "À partir de 45€",
    color: "bg-gradient-to-br from-slate-600 to-slate-800"
  },
  {
    icon: MapPin,
    title: "Transport en ville",
    serviceType: "ville" as const,
    description: "Déplacements urbains et banlieue avec chauffeurs expérimentés",
    features: ["Ponctualité garantie", "Confort assuré", "Tarifs clairs"],
    price: "À partir de 15€",
    color: "bg-gradient-to-br from-orange-500 to-red-500"
  },
  {
    icon: Car,
    title: "Longue distance",
    serviceType: "longue-distance" as const,
    description: "Voyages inter-villes et déplacements professionnels",
    features: ["Véhicules confortables", "WiFi gratuit", "Arrêts possibles"],
    price: "Sur devis",
    color: "bg-gradient-to-br from-gray-600 to-gray-800"
  },
  {
    icon: Users,
    title: "Événements",
    serviceType: "evenement" as const,
    description: "Transport pour mariages, soirées d'entreprise et événements spéciaux",
    features: ["Véhicules premium", "Chauffeur en tenue", "Décoration possible"],
    price: "Sur devis",
    color: "bg-gradient-to-br from-orange-600 to-red-600"
  },
  {
    icon: Clock,
    title: "Service express",
    serviceType: "express" as const,
    description: "Transport urgent et course express en moins de 15 minutes",
    features: ["Arrivée rapide", "Priorité absolue", "Service premium"],
    price: "À partir de 25€",
    color: "bg-gradient-to-br from-red-500 to-red-700"
  },
  {
    icon: Euro,
    title: "Forfait journée",
    serviceType: "forfait" as const,
    description: "Location de véhicule avec chauffeur pour la journée entière",
    features: ["8h de service", "Kilométrage illimité", "Pause chauffeur"],
    price: "À partir de 280€",
    color: "bg-gradient-to-br from-slate-700 to-slate-900"
  }
]

export function Services() {
  const { t } = useI18n()
  
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">{t("services.title")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t("services.title")}
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              {t("services.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("services.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-foreground mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-2xl font-bold text-foreground">{service.price}</span>
                    <Button variant="outline" size="sm" asChild className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold">
                      <Link href={`/reservation?service=${service.serviceType}`}>
                        {t("services.book")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-8 py-7 h-auto">
            {t("services.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  )
}
