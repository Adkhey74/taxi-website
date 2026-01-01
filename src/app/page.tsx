"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Phone, Car, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const { t } = useI18n()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Recharger la vidéo si on passe de mobile à desktop ou vice versa
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [isMobile])

  // Fallback pour la vidéo - s'affiche après 500ms même si l'événement ne se déclenche pas
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
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
        
        {/* Video background avec overlay intégré */}
        <motion.div
          className="absolute inset-0 w-full h-full z-[2] overflow-hidden"
          initial={{ 
            scale: 1.15,
            opacity: 0
          }}
          animate={{ 
            scale: videoLoaded ? 1 : 1.15,
            opacity: videoLoaded ? 1 : 0
          }}
          transition={{
            duration: 2,
            ease: [0.25, 0.1, 0.25, 1], // Courbe d'animation douce et moderne
          }}
        >
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
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src={
                isMobile 
                  ? "https://res.cloudinary.com/dufmpr5dh/video/upload/q_auto:best,w_1280,h_720,f_auto,vc_auto/v1766857307/Fait_moi_une_1080p_202512262254_zxnjuk.mp4"
                  : "https://res.cloudinary.com/dufmpr5dh/video/upload/q_auto:best,w_1920,h_1080,f_auto,vc_auto/v1766857307/Fait_moi_une_1080p_202512262254_zxnjuk.mp4"
              }
              type="video/mp4" 
            />
          </video>
          
          {/* Overlay pour améliorer la lisibilité du texte - synchronisé avec la vidéo */}
          <motion.div
            className="absolute inset-0 bg-black/60 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded ? 1 : 0 }}
            transition={{
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </motion.div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: videoLoaded ? 1 : 0, y: videoLoaded ? 0 : 30 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
              {t("home.title")}
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-4 text-white font-semibold drop-shadow-xl [text-shadow:_2px_2px_6px_rgb(0_0_0_/_70%)] space-y-1">
              <p>{t("home.subtitle")}</p>
              <p>{t("home.subtitle2")}</p>
              <p>{t("home.subtitle3")}</p>
            </div>
            <div className="text-xl sm:text-2xl text-white mb-6 drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)] space-y-1">
              <p>{t("home.subtitle3Detail")}</p>
              <p>{t("home.service24h")}</p>
            </div>
            
            {/* Numéros de téléphone */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a 
                href="tel:0952473625" 
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-semibold shadow-lg hover:shadow-xl backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">09 52 47 36 25</span>
              </motion.a>
              <motion.a 
                href="tel:0658686548" 
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-semibold shadow-lg hover:shadow-xl backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg">06 58 68 65 48</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("home.description1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("home.description2")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("home.description3")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tourism & Ski Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div 
                className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1766938706/ski_iuqmrd.jpg"
                  alt="Stations de ski en Savoie"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Contenu */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("home.tourism.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.tourism.description")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild className="mt-2 hover:shadow-xl transition-all duration-300">
                    <Link href="/transfert-stations-ski#stations-desservies" className="flex items-center">
                      {t("home.tourism.stationsServed")}
                    </Link>
                  </Button>
                </motion.div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.tourism.features")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild className="mt-2 hover:shadow-xl transition-all duration-300">
                    <Link href="/transfert-stations-ski#services-ski" className="flex items-center">
                      {t("home.tourism.servicesInfo")}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Transport Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contenu */}
              <motion.div 
                className="space-y-6 order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("home.medical.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.medical.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.medical.features")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild className="mt-2 hover:shadow-xl transition-all duration-300">
                    <Link href="/transport-medical-cpam" className="flex items-center">
                      {t("home.medical.learnMore")}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Image */}
              <motion.div 
                className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1767022577/pexels-cottonbro-7579827_htskx2.jpg"
                  alt="Transport médical conventionné CPAM"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Transport Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div 
                className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1766938705/aeroport_i3lxia.jpg"
                  alt="Taxi aéroport"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Contenu */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("home.airport.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.airport.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.airport.features")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild className="mt-2 hover:shadow-xl transition-all duration-300">
                    <Link href="/taxi-aeroport" className="flex items-center">
                      {t("home.airport.learnMore")}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
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
              <motion.div 
                className="space-y-6 order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("home.vehicles.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.vehicles.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.vehicles.seat")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild className="mt-2 hover:shadow-xl transition-all duration-300">
                    <Link href="/vehicles" className="flex items-center">
                      {t("header.vehicles")}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Image véhicule */}
              <motion.div 
                className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="/images/vehicles/Mercedes-Classe-V-transport-avec-chauffeur-transfert-aeroport-gare-1.jpeg"
                  alt="Mercedes Classe V - Véhicule de transport"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Clock, text: t("home.service24h") },
              { icon: Car, text: t("home.vehicles.title") },
              { icon: Shield, text: t("home.professionalService") }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="bg-card rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-border shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-10 w-10 text-primary" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{feature.text}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}