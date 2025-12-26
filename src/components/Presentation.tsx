import { Card, CardContent } from "@/components/ui/card"
import { Car, MapPin, Clock, Shield } from "lucide-react"

export function Presentation() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image placeholder */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden border border-border/50 shadow-xl">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
                <div className="text-center z-10 relative">
                  <div className="bg-primary/10 rounded-3xl p-8 inline-block mb-6 border border-primary/20">
                    <Car className="h-32 w-32 text-primary mx-auto" />
                  </div>
                  <p className="text-foreground font-bold text-xl mb-2">Flotte Premium</p>
                  <p className="text-muted-foreground text-sm">Mercedes V-Class & Skoda Kodiaq</p>
                </div>
              </div>
            </div>

            {/* Contenu textuel */}
            <div className="space-y-6 order-1 lg:order-2">
              <Card className="border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <span className="text-sm font-semibold text-primary">À propos</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
                    Hern Taxi vous propose
                    <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                      ses services
                    </span>
                  </h2>
                  
                  <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                    <p>
                      <strong className="text-foreground">Hern Taxi</strong> vous propose ses services afin d&apos;effectuer tous vos déplacements 
                      en toute simplicité. L&apos;avantage d&apos;un service toutes distances toute l&apos;année est avant tout 
                      la <strong className="text-foreground">flexibilité</strong>.
                    </p>
                    
                    <p>
                      Ainsi qu&apos;elle que soient les conditions de circulation ou les motifs de votre déplacement, 
                      vous trouverez un chauffeur taxi disponible et attentif à vos besoins en nous contactant.
                    </p>
                    
                    <p>
                      Outre la région parisienne et l&apos;Île-de-France, nous pouvons vous conduire également 
                      partout en France et même dans les pays limitrophes.
                    </p>
                  </div>

                  {/* Features rapides */}
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">Tout type de transport</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">Disponible 24h/24</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">Chauffeurs agréés</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">Véhicules modernes</span>
                    </div>
                  </div>

                  {/* Section expandable */}
                  <div className="mt-8 p-5 bg-primary/5 rounded-xl border border-primary/10 hover:border-primary/20 hover:bg-primary/10 transition-all duration-200">
                    <div className="flex items-center justify-between cursor-pointer group">
                      <span className="font-semibold text-foreground">
                        Un taxi depuis et vers toute la région parisienne
                      </span>
                      <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                        <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
