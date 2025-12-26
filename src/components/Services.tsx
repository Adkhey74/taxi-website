"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, MapPin, Car, Clock, Users, Euro } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"


export function Services() {
  const { t } = useI18n()
  
  const services = [
    {
      icon: Plane,
      serviceType: "aeroport" as const,
      titleKey: "servicesData.aeroport.title",
      descriptionKey: "servicesData.aeroport.description",
      featuresKey: "servicesData.aeroport.features",
      priceKey: "servicesData.aeroport.price",
      color: "bg-gradient-to-br from-slate-600 to-slate-800"
    },
    {
      icon: MapPin,
      serviceType: "ville" as const,
      titleKey: "servicesData.ville.title",
      descriptionKey: "servicesData.ville.description",
      featuresKey: "servicesData.ville.features",
      priceKey: "servicesData.ville.price",
      color: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      icon: Car,
      serviceType: "longue-distance" as const,
      titleKey: "servicesData.longue-distance.title",
      descriptionKey: "servicesData.longue-distance.description",
      featuresKey: "servicesData.longue-distance.features",
      priceKey: "servicesData.longue-distance.price",
      color: "bg-gradient-to-br from-gray-600 to-gray-800"
    },
    {
      icon: Users,
      serviceType: "evenement" as const,
      titleKey: "servicesData.evenement.title",
      descriptionKey: "servicesData.evenement.description",
      featuresKey: "servicesData.evenement.features",
      priceKey: "servicesData.evenement.price",
      color: "bg-gradient-to-br from-orange-600 to-red-600"
    },
    {
      icon: Clock,
      serviceType: "express" as const,
      titleKey: "servicesData.express.title",
      descriptionKey: "servicesData.express.description",
      featuresKey: "servicesData.express.features",
      priceKey: "servicesData.express.price",
      color: "bg-gradient-to-br from-red-500 to-red-700"
    },
    {
      icon: Euro,
      serviceType: "forfait" as const,
      titleKey: "servicesData.forfait.title",
      descriptionKey: "servicesData.forfait.description",
      featuresKey: "servicesData.forfait.features",
      priceKey: "servicesData.forfait.price",
      color: "bg-gradient-to-br from-slate-700 to-slate-900"
    }
  ]
  
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
                  <CardTitle className="text-2xl text-foreground mb-2">{t(service.titleKey)}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {t(service.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {(() => {
                      const features = t(service.featuresKey)
                      const featuresArray = Array.isArray(features) ? features : []
                      return featuresArray.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))
                    })()}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-2xl font-bold text-foreground">{t(service.priceKey)}</span>
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
