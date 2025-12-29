"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Plane, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function TaxiAeroportPage() {
  const { t } = useI18n()
  const [imageLoaded, setImageLoaded] = useState(false)

  // Fallback pour l'image - s'affiche après 500ms même si l'événement ne se déclenche pas
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 min-h-[60vh] flex items-center overflow-hidden">
        {/* Fond blanc pendant le chargement de l'image */}
        <div className={`absolute inset-0 bg-white z-[1] transition-opacity duration-1000 ease-in-out ${
          imageLoaded ? "opacity-0" : "opacity-100"
        }`} />
        
        {/* Fond sombre en arrière-plan */}
        <div className="absolute inset-0 bg-gray-900 z-0" />
        
        {/* Image background */}
        <div className={`absolute inset-0 z-[2] transition-opacity duration-1000 ease-in-out ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}>
          <Image
            src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1920,c_limit/v1766938705/aeroport_i3lxia.jpg"
            alt="Aéroport"
            fill
            className="object-cover"
            priority
            onLoad={() => setImageLoaded(true)}
          />
          <div className={`absolute inset-0 bg-black/50 z-10 transition-opacity duration-1000 ease-in-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-in-out ${
            imageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              {t("airport.title")}
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-white/90 font-semibold drop-shadow-md">
              {t("airport.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("airport.description")}
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Plane className="h-6 w-6 text-primary" />
                {t("airport.airports.title")}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("airport.airports.chambéry")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("airport.airports.lyon")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("airport.airports.grenoble")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("airport.airports.geneve")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("airport.airports.milan")}</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t("airport.vehicles")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("airport.seat")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">{t("airport.ctaTitle")}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-7 text-lg">
                <Link href="/zones-contact" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("cta.book")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 px-8 py-7 text-lg font-semibold" asChild>
                <a href="https://api.whatsapp.com/send?phone=33658686548&text=Bonjour%20je%20souhaite%20r%C3%A9server%20un%20taxi%20pour%20l%27a%C3%A9roport." target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t("cta.whatsapp")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
