"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Car, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const { t } = useI18n()

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-background overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/Fait_moi_une_1080p_202512262254.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
              {t("home.title")}
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-white/90 font-semibold drop-shadow-md">
              {t("home.subtitle")}
            </p>
            <p className="text-lg text-white/80 mb-10 drop-shadow-md">
              {t("home.service24h")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                asChild 
                className="group relative bg-black text-white font-bold px-7 py-6 text-base rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-all duration-300 h-auto overflow-hidden border-2 border-black hover:border-white/20"
              >
                <Link href="/zones-contact" className="flex items-center justify-center relative z-10">
                  <Phone className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  {t("header.bookNow")}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative border-2 border-white/80 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white text-white px-7 py-6 text-base font-semibold rounded-lg shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300 h-auto overflow-hidden" 
                asChild
              >
                <a 
                  href="https://api.whatsapp.com/send?phone=33658686548&text=Bonjour%20je%20souhaite%20r%C3%A9server%20un%20taxi." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center relative z-10"
                >
                  <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  WhatsApp
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>{t("home.description1")}</p>
            <p>{t("home.description2")}</p>
            <p>{t("home.description3")}</p>
          </div>
        </div>
      </section>

      {/* Tourism & Ski Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/ski.jpg"
                  alt="Stations de ski en Savoie"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Contenu */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("home.tourism.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.tourism.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.tourism.features")}
                </p>
                <Button asChild className="mt-4">
                  <Link href="/transfert-stations-ski" className="flex items-center">
                    {t("home.tourism.learnMore")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles & Comfort Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contenu */}
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("home.vehicles.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.vehicles.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.vehicles.seat")}
                </p>
              </div>
              
              {/* Image véhicule */}
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
                <Image
                  src="/images/vehicles/Mercedes-Classe-V-transport-avec-chauffeur-transfert-aeroport-gare-1.jpeg"
                  alt="Mercedes Classe V - Véhicule de transport"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-card rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{t("home.service24h")}</h3>
            </div>
            <div className="text-center">
              <div className="bg-card rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                <Car className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{t("home.vehicles.title")}</h3>
            </div>
            <div className="text-center">
              <div className="bg-card rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Service professionnel</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}