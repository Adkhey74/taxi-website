"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Menu, X, Calendar, Heart, Building2, Plane, Mountain } from "lucide-react"
import { useState } from "react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useI18n } from "@/lib/i18n/context"
import { motion } from "framer-motion"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  const menuItemClass =
    "group/link flex-row items-start gap-3.5 rounded-xl p-3 no-underline outline-none transition-all duration-200 hover:bg-muted focus:bg-muted border border-transparent hover:border-border"
  // Le composant de base force les icônes en gris ([&_svg]:text-muted-foreground) : au survol, le
  // carré passe au noir, donc l'icône est repassée en blanc pour rester visible.
  const menuIconClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-primary/5 text-primary transition-colors group-hover/link:bg-primary group-hover/link:text-primary-foreground group-hover/link:[&_svg]:text-primary-foreground! group-focus/link:bg-primary group-focus/link:[&_svg]:text-primary-foreground!"
  const menuTitleClass = "text-sm font-semibold leading-none text-foreground transition-colors group-hover/link:text-primary"
  const menuDescClass = "text-xs leading-snug text-muted-foreground"

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur-md supports-[backdrop-filter]:bg-background/95 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl font-bold text-primary-foreground">H</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight whitespace-nowrap">
                  Hern Taxi
                </span>
                <span className="text-xs text-muted-foreground font-medium">{t("footer.tagline")}</span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation au centre - Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none data-[active]:bg-muted data-[active]:text-foreground">
                      {t("header.home")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-4 text-sm font-semibold data-[state=open]:bg-muted data-[state=open]:text-foreground">
                    {t("header.medical")}
                  </NavigationMenuTrigger>
                  {/* Style repris de la branche refonte-i18n-pwa : son « gold » (blanc sur thème sombre) devient ici primary (noir sur thème clair). */}
                  <NavigationMenuContent className="rounded-2xl border-border p-0 shadow-2xl shadow-primary/10">
                    <div className="w-[380px]">
                      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                      <div className="p-2.5">
                        <div className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                          {t("header.medicalMenuLabel")}
                        </div>
                        <NavigationMenuLink asChild>
                          <Link href="/transport-medical-cpam" className={menuItemClass}>
                            <span className={menuIconClass}>
                              <Heart className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className={menuTitleClass}>{t("header.medicalCPAM")}</span>
                              <span className={menuDescClass}>{t("header.medicalCPAMDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/transport-medical-lyon-grenoble" className={menuItemClass}>
                            <span className={menuIconClass}>
                              <Building2 className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className={menuTitleClass}>{t("header.medicalLyonGrenoble")}</span>
                              <span className={menuDescClass}>{t("header.medicalLyonGrenobleDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-4 text-sm font-semibold data-[state=open]:bg-muted data-[state=open]:text-foreground">
                    {t("header.transfers")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-2xl border-border p-0 shadow-2xl shadow-primary/10">
                    <div className="w-[380px]">
                      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                      <div className="p-2.5">
                        <div className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                          {t("header.transfersMenuLabel")}
                        </div>
                        <NavigationMenuLink asChild>
                          <Link href="/taxi-aeroport" className={menuItemClass}>
                            <span className={menuIconClass}>
                              <Plane className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className={menuTitleClass}>{t("header.airport")}</span>
                              <span className={menuDescClass}>{t("header.airportDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/transfert-stations-ski" className={menuItemClass}>
                            <span className={menuIconClass}>
                              <Mountain className="h-5 w-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className={menuTitleClass}>{t("header.ski")}</span>
                              <span className={menuDescClass}>{t("header.skiDesc")}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/vehicles" className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none data-[active]:bg-muted data-[active]:text-foreground">
                      {t("header.vehicles")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/zones-contact" className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none data-[active]:bg-muted data-[active]:text-foreground">
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
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-md hover:shadow-lg transition-all duration-200 font-semibold h-10 px-4"
            >
              <Link href="/zones-contact">
                <Calendar className="h-4 w-4 [&_circle]:hidden" />
                <span className="hidden lg:inline">{t("header.bookNow")}</span>
                <span className="lg:hidden">{t("header.book")}</span>
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Menu mobile et sélecteur de langue */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10"
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
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.home")}
              </Link>
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">{t("header.medical")}</div>
              <Link
                href="/transport-medical-cpam"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.medicalCPAM")}
              </Link>
              <Link
                href="/transport-medical-lyon-grenoble"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.medicalLyonGrenoble")}
              </Link>
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">{t("header.transfers")}</div>
              <Link
                href="/taxi-aeroport"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.airport")}
              </Link>
              <Link
                href="/transfert-stations-ski"
                className="block px-6 py-2 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.ski")}
              </Link>
              <Link
                href="/vehicles"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.vehicles")}
              </Link>
              <Link
                href="/zones-contact"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.zonesContact")}
              </Link>
              
              {/* Bouton Réserver mobile */}
              <div className="pt-4 border-t border-border/40">
                <Button 
                  asChild
                  className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 shadow-md hover:shadow-lg transition-all duration-200"
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


