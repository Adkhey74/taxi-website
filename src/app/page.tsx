"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Car, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const { t } = useI18n()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({})
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const videoRef = useRef<HTMLVideoElement>(null)

  // Fallback pour la vidéo - s'affiche après 500ms même si l'événement ne se déclenche pas
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Observer pour les images
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.keys(imageRefs.current).forEach((key) => {
      const element = imageRefs.current[key]
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImagesLoaded((prev) => ({ ...prev, [key]: true }))
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Fond blanc pendant le chargement de la vidéo - au-dessus du fond noir */}
        <div className={`absolute inset-0 bg-white z-[1] transition-opacity duration-1000 ease-in-out ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`} />
        
        {/* Fond noir en arrière-plan */}
        <div className="absolute inset-0 bg-black z-0" />
        
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onLoadedMetadata={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-[2] transition-opacity duration-1000 ease-in-out ${
            videoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ transition: "opacity 1s ease-in-out, transform 1s ease-in-out" }}
        >
          <source 
            src="https://res.cloudinary.com/dufmpr5dh/video/upload/q_auto:best,w_1920,h_1080,f_auto,vc_auto/v1766857307/Fait_moi_une_1080p_202512262254_zxnjuk.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000 ease-in-out ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`} />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-in-out ${
            videoLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
              {t("home.title")}
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-white/90 font-semibold drop-shadow-md">
              {t("home.subtitle")}
            </p>
            <p className="text-lg text-white/80 mb-6 drop-shadow-md">
              {t("home.service24h")}
            </p>
            
            {/* Numéros de téléphone */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="tel:0123456789" 
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">01 23 45 67 89</span>
              </a>
              <a 
                href="tel:0658686548" 
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">06 58 68 65 48</span>
              </a>
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
              <div 
                ref={(el) => { imageRefs.current["ski"] = el }}
                className={`relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 ease-out ${
                  imagesLoaded["ski"] 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1766938706/ski_iuqmrd.jpg"
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
              <div 
                ref={(el) => { imageRefs.current["vehicle"] = el }}
                className={`relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2 transition-all duration-1000 ease-out ${
                  imagesLoaded["vehicle"] 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
              >
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