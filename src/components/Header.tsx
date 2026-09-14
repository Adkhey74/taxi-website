"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Menu, X, Calendar, Heart, Building2, Plane, Mountain } from "lucide-react"
import { useState, useEffect } from "react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useI18n } from "@/lib/i18n/context"
import { motion } from "framer-motion"

// Pages dont le haut est un hero sombre (vidéo / image) : la navbar y démarre transparente.
const HERO_ROUTES = [
  "/",
  "/taxi-aeroport",
  "/transfert-stations-ski",
  "/transport-medical-cpam",
  "/transport-medical-lyon-grenoble",
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useI18n()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Mode transparent : uniquement sur un hero sombre, tout en haut, menu mobile fermé.
  const onHeroTop = HERO_ROUTES.includes(pathname) && !scrolled && !isMobileMenuOpen

  // Survol/focus/actif : pastille blanche + texte noir, forcé en !important pour battre les classes
  // de base concaténées par Radix Slot (sinon risque de blanc-sur-blanc en thème sombre).
  const stateClasses =
    "hover:bg-white! hover:text-neutral-900! focus:bg-white! focus:text-neutral-900!"

  const topLinkClass = `group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none ${
    onHeroTop ? "text-white/80" : "text-foreground"
  } ${stateClasses} data-[active]:bg-white! data-[active]:text-neutral-900!`

  const triggerClass = `h-11 px-4 text-sm font-semibold bg-transparent transition-all duration-200 ${
    onHeroTop ? "text-white/80" : "text-foreground"
  } ${stateClasses} data-[state=open]:bg-white! data-[state=open]:text-neutral-900!`

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${
        onHeroTop
          ? "bg-transparent [&_*]:[text-shadow:0_1px_18px_rgba(0,0,0,0.45)]"
          : "border-b border-border/70 bg-background/80 supports-[backdrop-filter]:bg-background/70 backdrop-blur-xl shadow-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Logo à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                  onHeroTop
                    ? "bg-white/10 ring-1 ring-white/40 backdrop-blur-md group-hover:bg-white/15 group-hover:ring-white/60"
                    : "bg-white/[0.06] ring-1 ring-white/15 backdrop-blur-md group-hover:bg-white/10 group-hover:ring-white/25"
                }`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xl font-bold text-white">H</span>
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-xl sm:text-2xl font-bold transition-colors leading-tight whitespace-nowrap ${onHeroTop ? "text-white" : "text-foreground"}`}>
                  Hern <span className={onHeroTop ? "text-white/70" : "text-muted-foreground"}>Taxi</span>
                </span>
                <span className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${onHeroTop ? "text-white/60" : "text-muted-foreground"}`}>
                  {t("footer.tagline")}
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation au centre - Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={topLinkClass}>
                      {t("header.home")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClass}>
                    {t("header.medical")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-2xl border-border p-0 shadow-2xl shadow-primary/10">
                    <div className="w-[380px]">
                      <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/60 to-transparent" />
                      <div className="p-2.5">
                        <div className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                          {t("header.medicalMenuLabel")}
                        </div>
                        <NavigationMenuLink asChild>
                          <Link href="/transport-medical-cpam" className="group/link flex-row items-start gap-3.5 rounded-xl p-3 no-underline outline-none transition-all duration-200 hover:bg-accent focus:bg-accent border border-transparent hover:border-white/20">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold-muted text-gold transition-colors group-hover/link:bg-gold group-hover/link:text-gold-foreground">
                              <Heart className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="text-sm font-semibold leading-none text-foreground transition-colors group-hover/link:text-gold">{t("header.medicalCPAM")}</span>
                              <span className="text-xs leading-snug text-muted-foreground">{t("header.medicalCPAMDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/transport-medical-lyon-grenoble" className="group/link flex-row items-start gap-3.5 rounded-xl p-3 no-underline outline-none transition-all duration-200 hover:bg-accent focus:bg-accent border border-transparent hover:border-white/20">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold-muted text-gold transition-colors group-hover/link:bg-gold group-hover/link:text-gold-foreground">
                              <Building2 className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="text-sm font-semibold leading-none text-foreground transition-colors group-hover/link:text-gold">{t("header.medicalLyonGrenoble")}</span>
                              <span className="text-xs leading-snug text-muted-foreground">{t("header.medicalLyonGrenobleDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClass}>
                    {t("header.transfers")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-2xl border-border p-0 shadow-2xl shadow-primary/10">
                    <div className="w-[380px]">
                      <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/60 to-transparent" />
                      <div className="p-2.5">
                        <div className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                          {t("header.transfersMenuLabel")}
                        </div>
                        <NavigationMenuLink asChild>
                          <Link href="/taxi-aeroport" className="group/link flex-row items-start gap-3.5 rounded-xl p-3 no-underline outline-none transition-all duration-200 hover:bg-accent focus:bg-accent border border-transparent hover:border-white/20">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold-muted text-gold transition-colors group-hover/link:bg-gold group-hover/link:text-gold-foreground">
                              <Plane className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="text-sm font-semibold leading-none text-foreground transition-colors group-hover/link:text-gold">{t("header.airport")}</span>
                              <span className="text-xs leading-snug text-muted-foreground">{t("header.airportDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/transfert-stations-ski" className="group/link flex-row items-start gap-3.5 rounded-xl p-3 no-underline outline-none transition-all duration-200 hover:bg-accent focus:bg-accent border border-transparent hover:border-white/20">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold-muted text-gold transition-colors group-hover/link:bg-gold group-hover/link:text-gold-foreground">
                              <Mountain className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="text-sm font-semibold leading-none text-foreground transition-colors group-hover/link:text-gold">{t("header.ski")}</span>
                              <span className="text-xs leading-snug text-muted-foreground">{t("header.skiDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/vehicles" className={topLinkClass}>
                      {t("header.vehicles")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/zones-contact" className={topLinkClass}>
                      {t("header.zonesContact")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Bouton Réserver et sélecteur de langue à droite - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              variant="gold"
              className={`gap-2 h-10 px-4 ${onHeroTop ? "bg-white/10 text-white border border-white/30 backdrop-blur-sm shadow-none hover:bg-white/20 hover:text-white hover:shadow-none" : ""}`}
            >
              <Link href="/zones-contact">
                <Calendar className="h-4 w-4 [&_circle]:hidden" />
                <span className="hidden lg:inline">{t("header.bookNow")}</span>
                <span className="lg:hidden">{t("header.book")}</span>
              </Link>
            </Button>
            <LanguageSwitcher onDark={onHeroTop} />
          </div>

          {/* Menu mobile et sélecteur de langue */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher onDark={onHeroTop} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`h-10 w-10 ${onHeroTop ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/98 backdrop-blur-md animate-in slide-in-from-top-2">
            <div className="px-4 py-6 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.home")}
              </Link>
              <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{t("header.medical")}</div>
              <Link
                href="/transport-medical-cpam"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.medicalCPAM")}
              </Link>
              <Link
                href="/transport-medical-lyon-grenoble"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.medicalLyonGrenoble")}
              </Link>
              <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{t("header.transfers")}</div>
              <Link
                href="/taxi-aeroport"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.airport")}
              </Link>
              <Link
                href="/transfert-stations-ski"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.ski")}
              </Link>
              <Link
                href="/vehicles"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.vehicles")}
              </Link>
              <Link
                href="/zones-contact"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-white transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.zonesContact")}
              </Link>

              {/* Bouton Réserver mobile */}
              <div className="pt-4 border-t border-border/40">
                <Button
                  asChild
                  variant="gold"
                  className="w-full gap-2 h-11"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/zones-contact">
                    <Calendar className="h-4 w-4 [&_circle]:hidden" />
                    {t("header.bookNow")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
