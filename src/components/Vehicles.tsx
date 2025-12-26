import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, Wifi, Shield, Clock } from "lucide-react"

const vehicles = [
  {
    name: "Mercedes V-Class",
    capacity: "1 à 7 passagers",
    description: "Véhicule premium pour tous vos déplacements",
    features: ["Confort supérieur", "Climatisation", "Sièges cuir", "Espace bagages"],
    icon: Car,
    color: "bg-gradient-to-br from-slate-700 to-slate-900",
    image: "/api/placeholder/400/250"
  },
  {
    name: "Skoda Kodiaq",
    capacity: "1 à 6 passagers", 
    description: "SUV moderne pour vos trajets urbains et longue distance",
    features: ["4x4 disponible", "Confort optimal", "Technologie avancée", "Fiabilité"],
    icon: Car,
    color: "bg-gradient-to-br from-blue-600 to-cyan-600",
    image: "/api/placeholder/400/250"
  }
]

export function Vehicles() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Notre Flotte</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Véhicules
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              Premium
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Des véhicules modernes et confortables pour tous vos déplacements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {vehicles.map((vehicle, index) => {
            const IconComponent = vehicle.icon
            return (
              <Card key={index} className="group overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30">
                <div className="relative h-72 bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                  <div className="text-center relative z-10">
                    <div className="bg-primary/10 rounded-2xl p-6 inline-block mb-4 group-hover:bg-primary/20 transition-colors border border-primary/20">
                      <IconComponent className="h-20 w-20 text-primary mx-auto" />
                    </div>
                    <p className="text-foreground font-bold text-lg">{vehicle.name}</p>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <CardTitle className="text-2xl text-foreground mb-1">{vehicle.name}</CardTitle>
                      <CardDescription className="text-primary font-semibold">{vehicle.capacity}</CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {vehicle.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {vehicle.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features de la flotte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="text-center group">
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Sécurité</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Véhicules entretenus et contrôlés régulièrement</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Capacité</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">De 1 à 7 passagers selon vos besoins</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
              <Wifi className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Confort</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Climatisation, WiFi, sièges confortables</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Disponibilité</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Flotte disponible 24h/24, 7j/7</p>
          </div>
        </div>
      </div>
    </section>
  )
}