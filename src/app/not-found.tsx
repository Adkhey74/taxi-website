import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-xl mx-auto text-center py-20">
        <div className="eyebrow eyebrow--center mb-6 justify-center">Erreur 404</div>
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight mb-4">
          Page <span className="text-gold">introuvable</span>
        </h1>
        <div className="gold-rule mx-auto mb-6" />
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil ou contactez-nous pour réserver votre taxi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="gold" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a href="tel:0952473625">
              <Phone className="h-5 w-5" />
              09 52 47 36 25
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}
