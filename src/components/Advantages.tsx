"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Euro, Shield, Star, Phone } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

const advantages = [
  {
    icon: CheckCircle,
    title: "Taxi Conventionné",
    description: "Service agréé et conventionné pour tous vos besoins de transport",
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    icon: Clock,
    title: "Disponible 24h/24",
    description: "Service continu toute l'année, même les jours fériés",
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    icon: Euro,
    title: "Tarifs Réglementés",
    description: "Tarifs officiels et transparents, pas de surprise",
    color: "bg-gradient-to-br from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Chauffeurs Expérimentés",
    description: "Professionnels formés et expérimentés pour votre sécurité",
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    icon: Star,
    title: "Service Premium",
    description: "Confort et qualité garantis pour tous vos déplacements",
    color: "bg-gradient-to-br from-orange-500 to-red-500"
  },
  {
    icon: Phone,
    title: "Réservation Facile",
    description: "Réservation à l'avance ou à la dernière minute",
    color: "bg-gradient-to-br from-teal-500 to-teal-600"
  }
]

export function Advantages() {
  const { t } = useI18n()
  
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">{t("advantages.title")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t("advantages.title")}
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              {t("advantages.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("advantages.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon
            return (
              <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground mb-2">{advantage.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Section CTA */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground rounded-3xl p-12 lg:p-16 text-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t("advantages.cta.title")}
                <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl text-primary">
                  {t("advantages.cta.subtitle")}
                </span>
              </h3>
              <p className="text-xl text-background/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                {t("advantages.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="flex items-center justify-center gap-2 bg-background/10 backdrop-blur-sm border-2 border-background/20 hover:bg-background/20 hover:border-background/30 transition-all duration-300 text-background font-semibold h-12 px-6">
                  <Phone className="h-5 w-5" />
                  <span>01 23 45 67 89</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2 bg-background/10 backdrop-blur-sm border-2 border-background/20 hover:bg-background/20 hover:border-background/30 transition-all duration-300 text-background font-semibold h-12 px-6">
                  <Phone className="h-5 w-5" />
                  <span>06 58 68 65 48</span>
                </Button>
                <Button asChild className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6">
                  <Link href="/reservation" className="flex items-center justify-center gap-2">
                    <Euro className="h-5 w-5" />
                    <span>{t("advantages.cta.bookNow")}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
