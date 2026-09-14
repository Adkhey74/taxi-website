"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, Wifi, Shield, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import Image from "next/image"

export function Vehicles() {
  const { t } = useI18n()
  
  const vehicles = [
    {
      name: t("vehicles.mercedes.name") as string,
      capacity: t("vehicles.mercedes.capacity") as string,
      description: t("vehicles.mercedes.description") as string,
      features: (() => {
        const features = t("vehicles.mercedes.features")
        return Array.isArray(features) ? features : []
      })(),
      icon: Car,
      color: "bg-gradient-to-br from-slate-700 to-slate-900",
      image: "https://res.cloudinary.com/dufmpr5dh/image/upload/v1767287362/classv_jinqie.jpg",
      hasImage: true,
    },
  ]
  return (
    <section className="relative overflow-hidden pt-16 pb-32 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{ background: "radial-gradient(60rem 26rem at 50% -4rem, rgba(255,255,255,0.06), transparent)" }}
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-muted border border-gold/30 mb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{t("vehicles.ourFleet")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t("vehicles.title")} <span className="gold-gradient-text">
              {t("vehicles.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("vehicles.description")}
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-8 lg:gap-12 mb-20 ${vehicles.length === 1 ? "lg:max-w-2xl lg:mx-auto" : "lg:grid-cols-2"}`}>
          {vehicles.map((vehicle, index) => {
            const IconComponent = vehicle.icon
            return (
              <Card key={index} className="group overflow-hidden border border-border bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 p-0">
                <div className={`relative aspect-video w-full overflow-hidden ${vehicle.hasImage && vehicle.image ? '' : 'bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50'}`}>
                  {vehicle.hasImage && vehicle.image ? (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <>
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                        <div className="text-center relative z-10">
                          <div className="bg-gold-muted rounded-2xl p-6 inline-block mb-4 group-hover:bg-gold/20 transition-colors border border-gold/30">
                            <IconComponent className="h-20 w-20 text-gold mx-auto" />
                          </div>
                          <p className="text-foreground font-bold text-lg">{vehicle.name}</p>
                        </div>
                      </>
                    </div>
                  )}
                </div>
                <CardHeader className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gold-muted flex items-center justify-center border border-gold/30">
                      <IconComponent className="h-7 w-7 text-gold" />
                    </div>
                    <div className="text-right">
                      <CardTitle className="text-2xl text-foreground mb-1">{vehicle.name}</CardTitle>
                      <CardDescription className="text-gold font-semibold">{vehicle.capacity}</CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {vehicle.description}
                  </p>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {vehicle.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features de la flotte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="text-center group">
            <div className="bg-gold-muted backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 border border-gold/30 group-hover:border-gold/50 shadow-sm">
              <Shield className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">{t("vehicles.features.security.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("vehicles.features.security.description")}</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gold-muted backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 border border-gold/30 group-hover:border-gold/50 shadow-sm">
              <Users className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">{t("vehicles.features.capacity.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("vehicles.features.capacity.description")}</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gold-muted backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 border border-gold/30 group-hover:border-gold/50 shadow-sm">
              <Wifi className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">{t("vehicles.features.comfort.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("vehicles.features.comfort.description")}</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gold-muted backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 border border-gold/30 group-hover:border-gold/50 shadow-sm">
              <Clock className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">{t("vehicles.features.availability.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("vehicles.features.availability.description")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}