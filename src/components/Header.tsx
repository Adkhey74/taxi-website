"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Menu, X, Calendar } from "lucide-react"
import { useState } from "react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo à gauche */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
              <span className="text-2xl font-bold text-primary-foreground">H</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors block leading-tight">
                Hern Taxi
              </span>
              <span className="text-xs text-muted-foreground font-medium">{t("footer.tagline")}</span>
            </div>
          </Link>

          {/* Navigation au centre - Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent data-[active]:text-accent-foreground">
                      {t("header.home")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-4 text-sm font-semibold data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
                    {t("header.services")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-200"
                            href="/services">
                            <div className="mb-2 mt-4 text-lg font-bold text-foreground">
                              {t("headerDropdown.ourServices")}
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {t("headerDropdown.discoverServices")}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-2">
                        <Link
                          href="/vehicles"
                          className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border border-transparent hover:border-primary/10">
                          <div className="text-sm font-semibold leading-none">{t("headerDropdown.vehicles")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            {t("headerDropdown.discoverFleet")}
                          </p>
                        </Link>
                        <Link
                          href="/advantages"
                          className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border border-transparent hover:border-primary/10">
                          <div className="text-sm font-semibold leading-none">{t("headerDropdown.advantages")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            {t("headerDropdown.whyChooseUs")}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent data-[active]:text-accent-foreground">
                      {t("header.about")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent data-[active]:text-accent-foreground">
                      {t("header.contact")}
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
              <Link href="/reservation" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary-foreground [&_circle]:hidden" />
                <span className="hidden lg:inline">{t("header.bookNow")}</span>
                <span className="lg:hidden">{t("header.book")}</span>
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden">
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
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.home")}
              </Link>
              <Link
                href="/services"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.services")}
              </Link>
              <Link
                href="/vehicles"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.vehicles")}
              </Link>
              <Link
                href="/advantages"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.advantages")}
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.about")}
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.contact")}
              </Link>
              
              {/* Bouton Réserver mobile */}
              <div className="pt-4 border-t border-border/40">
                <Button 
                  asChild 
                  className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link href="/reservation" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-primary-foreground [&_circle]:hidden" />
                    {t("header.bookNow")}
                  </Link>
                </Button>
              </div>
              
              {/* Sélecteur de langue mobile */}
              <div className="pt-3 border-t border-border/40">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
