"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo et description */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-2xl font-bold text-primary-foreground">H</span>
              </div>
              <div>
                <span className="text-2xl font-bold block leading-tight text-primary-foreground">Hern Taxi</span>
                <span className="text-xs text-primary-foreground/70 font-medium">{t("footer.tagline")}</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              <a href="tel:0952473625" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-3 rounded-lg transition-all duration-200 border border-primary-foreground/20 hover:border-primary-foreground/30">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </a>
              <a href="tel:0658686548" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-3 rounded-lg transition-all duration-200 border border-primary-foreground/20 hover:border-primary-foreground/30">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </a>
              <a href="mailto:contact@hern-taxi.fr" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-3 rounded-lg transition-all duration-200 border border-primary-foreground/20 hover:border-primary-foreground/30">
                <Mail className="h-4 w-4 text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-primary-foreground">{t("footer.services")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/transport-medical-cpam" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block hover:translate-x-1">
                  {t("header.medicalCPAM")}
                </Link>
              </li>
              <li>
                <Link href="/transport-medical-lyon-grenoble" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block hover:translate-x-1">
                  {t("header.medicalLyonGrenoble")}
                </Link>
              </li>
              <li>
                <Link href="/taxi-aeroport" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block hover:translate-x-1">
                  {t("header.airport")}
                </Link>
              </li>
              <li>
                <Link href="/transfert-stations-ski" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block hover:translate-x-1">
                  {t("header.ski")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-primary-foreground">{t("footer.usefulLinks")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/zones-contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block hover:translate-x-1">
                  {t("header.zonesContact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-primary-foreground">{t("footer.contact")}</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2 rounded-lg border border-primary-foreground/20">
                  <Phone className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <a href="tel:0952473625" className="text-primary-foreground font-semibold hover:text-primary-foreground/80 transition-colors">09 52 47 36 25</a>
                  <p className="text-primary-foreground/70 text-xs">{t("footer.availability")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2 rounded-lg border border-primary-foreground/20">
                  <Phone className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <a href="tel:0658686548" className="text-primary-foreground font-semibold hover:text-primary-foreground/80 transition-colors">06 58 68 65 48</a>
                  <p className="text-primary-foreground/70 text-xs">{t("footer.mobile")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2 rounded-lg border border-primary-foreground/20">
                  <Mail className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">contact@hern-taxi.fr</p>
                  <p className="text-primary-foreground/70 text-xs">{t("footer.responseTime")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2 rounded-lg border border-primary-foreground/20">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">{t("footer.serviceArea")}</p>
                  <p className="text-primary-foreground/70 text-xs">{t("footer.serviceRadius")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2 rounded-lg border border-primary-foreground/20">
                  <Clock className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">{t("footer.availability")}</p>
                  <p className="text-primary-foreground/70 text-xs">{t("footer.allDays")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm text-center md:text-left">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
                {t("footer.legal")}
              </Link>
              <Link href="/confidentialite" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
