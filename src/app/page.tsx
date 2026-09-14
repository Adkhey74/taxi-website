"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Phone, Car, Shield, Clock, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const { t } = useI18n()
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Fallback : afficher la vidéo après 500 ms même si l'événement de chargement ne se déclenche pas
  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])


  return (
    <main>
      {/* Hero Section */}
      <section className="relative -mt-20 flex min-h-screen items-center overflow-hidden bg-black">
        {/* Vidéo de fond */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: videoLoaded ? 1.08 : 1.2, opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onLoadedMetadata={() => setVideoLoaded(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/newvideohero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Overlays dégradés (lisibilité + profondeur), toujours présents -> aucun flash blanc */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/40 to-black/85" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
        {/* Masque le watermark (coin bas-droit de la vidéo) — vignette sombre naturelle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(58% 42% at 100% 100%, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.6) 32%, transparent 64%)",
          }}
        />

        {/* Contenu */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 lg:pt-32">
          <motion.div
            className="surface-dark mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                {t("home.service24h")}
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
              {t("home.title")}
            </h1>

            <div className="mx-auto mb-6 flex max-w-2xl flex-col items-center gap-1.5 text-xl font-semibold text-white sm:text-2xl lg:text-3xl [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]">
              <p>{t("home.subtitle")}</p>
              <p>{t("home.subtitle2")}</p>
              <p>{t("home.subtitle3")}</p>
            </div>
            <p className="mx-auto mb-9 max-w-xl text-base text-white/70 sm:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {t("home.subtitle3Detail")}
            </p>

            {/* CTA + téléphones */}
            <div className="flex flex-col items-center gap-5">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="gold" size="lg" className="h-14 gap-2 px-8 text-base shadow-xl shadow-black/25">
                  <Link href="/zones-contact">
                    <Calendar className="h-5 w-5 [&_circle]:hidden" />
                    {t("header.bookNow")}
                  </Link>
                </Button>
              </motion.div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href="tel:0952473625"
                  className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/15"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>09 52 47 36 25</span>
                </motion.a>
                <motion.a
                  href="tel:0658686548"
                  className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/15"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>06 58 68 65 48</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-white/80"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Description Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6 text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gold-rule mx-auto mb-2" />
            <motion.p
              className="text-2xl sm:text-3xl font-semibold leading-snug text-foreground tracking-tight"
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
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div 
                className="group relative h-[420px] lg:h-[560px] overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10 shadow-2xl shadow-black/50 after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:via-black/5 after:to-transparent after:content-['']"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1766938706/ski_iuqmrd.jpg"
                  alt="Stations de ski en Savoie"
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
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
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.25em] text-white/40 tabular-nums">01</span>
                  <span className="h-px w-10 bg-white/25" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                  {t("home.tourism.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.tourism.description")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild variant="outline" size="lg" className="mt-2 group/btn">
                    <Link href="/transfert-stations-ski#stations-desservies" className="flex items-center gap-2">
                      {t("home.tourism.stationsServed")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.tourism.features")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild variant="outline" size="lg" className="mt-2 group/btn">
                    <Link href="/transfert-stations-ski#services-ski" className="flex items-center gap-2">
                      {t("home.tourism.servicesInfo")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Transport Section */}
      <section className="py-20 lg:py-28 bg-background">
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
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.25em] text-white/40 tabular-nums">02</span>
                  <span className="h-px w-10 bg-white/25" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                  {t("home.medical.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.medical.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.medical.features")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild variant="outline" size="lg" className="mt-2 group/btn">
                    <Link href="/transport-medical-cpam" className="flex items-center gap-2">
                      {t("home.medical.learnMore")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Image */}
              <motion.div 
                className="group relative h-[420px] lg:h-[560px] overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10 shadow-2xl shadow-black/50 after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:via-black/5 after:to-transparent after:content-[''] order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1767022577/pexels-cottonbro-7579827_htskx2.jpg"
                  alt="Transport médical conventionné CPAM"
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Transport Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div 
                className="group relative h-[420px] lg:h-[560px] overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10 shadow-2xl shadow-black/50 after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:via-black/5 after:to-transparent after:content-['']"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1280,c_limit/v1766938705/aeroport_i3lxia.jpg"
                  alt="Taxi aéroport"
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
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
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.25em] text-white/40 tabular-nums">03</span>
                  <span className="h-px w-10 bg-white/25" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                  {t("home.airport.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.airport.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.airport.features")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild variant="outline" size="lg" className="mt-2 group/btn">
                    <Link href="/taxi-aeroport" className="flex items-center gap-2">
                      {t("home.airport.learnMore")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles & Comfort Section */}
      <section className="py-20 lg:py-28 bg-background">
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
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.25em] text-white/40 tabular-nums">04</span>
                  <span className="h-px w-10 bg-white/25" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                  {t("home.vehicles.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.vehicles.description")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("home.vehicles.seat")}
                </p>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button asChild variant="outline" size="lg" className="mt-2 group/btn">
                    <Link href="/vehicles" className="flex items-center gap-2">
                      {t("header.vehicles")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Image véhicule */}
              <motion.div 
                className="group relative h-[420px] lg:h-[560px] overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10 shadow-2xl shadow-black/50 after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/55 after:via-black/5 after:to-transparent after:content-[''] order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="/images/vehicles/Mercedes-Classe-V-transport-avec-chauffeur-transfert-aeroport-gare-1.jpeg"
                  alt="Mercedes Classe V - Véhicule de transport"
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28 bg-muted">
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
                  className="group flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:scale-105">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{feature.text}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}