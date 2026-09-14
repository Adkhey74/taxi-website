"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-[#0C0C0E] text-foreground border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo et description */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-gold/50 group-hover:ring-gold transition-all duration-300 group-hover:scale-105">
                <span className="text-2xl font-bold text-gold">H</span>
              </div>
              <div>
                <span className="text-2xl font-bold block leading-tight text-foreground">Hern <span className="text-gold">Taxi</span></span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/60 font-medium">{t("footer.tagline")}</span>
              </div>
            </Link>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              <a href="tel:0952473625" className="bg-white/5 hover:bg-gold/15 p-3 rounded-lg transition-all duration-200 border border-gold/20 hover:border-gold/50">
                <Phone className="h-4 w-4 text-gold" />
              </a>
              <a href="tel:0658686548" className="bg-white/5 hover:bg-gold/15 p-3 rounded-lg transition-all duration-200 border border-gold/20 hover:border-gold/50">
                <Phone className="h-4 w-4 text-gold" />
              </a>
              <a href="mailto:herntaxi73@gmail.com" className="bg-white/5 hover:bg-gold/15 p-3 rounded-lg transition-all duration-200 border border-gold/20 hover:border-gold/50">
                <Mail className="h-4 w-4 text-gold" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-foreground inline-flex items-center gap-2 before:h-4 before:w-1 before:rounded-full before:bg-gold before:content-['']">{t("footer.services")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/transport-medical-cpam" className="text-foreground/70 hover:text-gold transition-all duration-200 inline-block hover:translate-x-1">
                  {t("header.medicalCPAM")}
                </Link>
              </li>
              <li>
                <Link href="/transport-medical-lyon-grenoble" className="text-foreground/70 hover:text-gold transition-all duration-200 inline-block hover:translate-x-1">
                  {t("header.medicalLyonGrenoble")}
                </Link>
              </li>
              <li>
                <Link href="/taxi-aeroport" className="text-foreground/70 hover:text-gold transition-all duration-200 inline-block hover:translate-x-1">
                  {t("header.airport")}
                </Link>
              </li>
              <li>
                <Link href="/transfert-stations-ski" className="text-foreground/70 hover:text-gold transition-all duration-200 inline-block hover:translate-x-1">
                  {t("header.ski")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-foreground inline-flex items-center gap-2 before:h-4 before:w-1 before:rounded-full before:bg-gold before:content-['']">{t("footer.usefulLinks")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/zones-contact" className="text-foreground/70 hover:text-gold transition-all duration-200 inline-block hover:translate-x-1">
                  {t("header.zonesContact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-foreground inline-flex items-center gap-2 before:h-4 before:w-1 before:rounded-full before:bg-gold before:content-['']">{t("footer.contact")}</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg border border-gold/20">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <a href="tel:0952473625" className="text-foreground font-semibold hover:text-foreground/80 transition-colors">09 52 47 36 25</a>
                  <p className="text-foreground/70 text-xs">{t("footer.availability")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg border border-gold/20">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <a href="tel:0658686548" className="text-foreground font-semibold hover:text-foreground/80 transition-colors">06 58 68 65 48</a>
                  <p className="text-foreground/70 text-xs">{t("footer.mobile")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg border border-gold/20">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">herntaxi73@gmail.com</p>
                  <p className="text-foreground/70 text-xs">{t("footer.responseTime")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg border border-gold/20">
                  <MapPin className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">{t("footer.serviceArea")}</p>
                  <p className="text-foreground/70 text-xs">{t("footer.serviceRadius")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg border border-gold/20">
                  <Clock className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">{t("footer.availability")}</p>
                  <p className="text-foreground/70 text-xs">{t("footer.allDays")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/70 text-sm text-center md:text-left">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="text-foreground/60 hover:text-gold transition-colors duration-200">
                {t("footer.legal")}
              </Link>
              <Link href="/confidentialite" className="text-foreground/60 hover:text-gold transition-colors duration-200">
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
