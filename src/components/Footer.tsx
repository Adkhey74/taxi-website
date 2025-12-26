import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo et description */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-2xl font-bold text-primary-foreground">H</span>
              </div>
              <div>
                <span className="text-2xl font-bold block leading-tight">Hern Taxi</span>
                <span className="text-xs text-background/70 font-medium">Transport professionnel</span>
              </div>
            </Link>
            <p className="text-background/80 text-sm leading-relaxed">
              Service de taxi professionnel pour tous vos déplacements. 
              Fiabilité, ponctualité et confort garantis.
            </p>
            <div className="flex gap-3">
              <a href="tel:0123456789" className="bg-background/10 hover:bg-background/20 p-3 rounded-lg transition-all duration-200 border border-background/20 hover:border-background/30">
                <Phone className="h-4 w-4" />
              </a>
              <a href="mailto:contact@hern-taxi.fr" className="bg-background/10 hover:bg-background/20 p-3 rounded-lg transition-all duration-200 border border-background/20 hover:border-background/30">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-background">Nos Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Transfert aéroport
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Transport en ville
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Longue distance
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Service express
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Forfait journée
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-background">Liens utiles</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link href="/advantages" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Avantages
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-background transition-colors duration-200 inline-block hover:translate-x-1">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-background">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-background/10 p-2 rounded-lg border border-background/20">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <a href="tel:0123456789" className="text-background font-semibold hover:text-primary transition-colors">01 23 45 67 89</a>
                  <p className="text-background/70 text-xs">24h/24 - 7j/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-background/10 p-2 rounded-lg border border-background/20">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <a href="tel:0658686548" className="text-background font-semibold hover:text-primary transition-colors">06 58 68 65 48</a>
                  <p className="text-background/70 text-xs">Mobile</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-background/10 p-2 rounded-lg border border-background/20">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-background font-semibold">contact@hern-taxi.fr</p>
                  <p className="text-background/70 text-xs">Réponse sous 2h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-background/10 p-2 rounded-lg border border-background/20">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-background font-semibold">Paris et région parisienne</p>
                  <p className="text-background/70 text-xs">Rayon de 50km</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-background/10 p-2 rounded-lg border border-background/20">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-background font-semibold">24h/24 - 7j/7</p>
                  <p className="text-background/70 text-xs">Tous les jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/70 text-sm text-center md:text-left">
              © 2024 Hern Taxi. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="text-background/70 hover:text-background transition-colors duration-200">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-background/70 hover:text-background transition-colors duration-200">
                Confidentialité
              </Link>
              <Link href="/cgv" className="text-background/70 hover:text-background transition-colors duration-200">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
