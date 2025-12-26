"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Shield, Clock, Users, Award, Phone } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

export default function AboutPage() {
  const { t } = useI18n()
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="text-sm font-semibold text-primary">{t("about.badge")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("about.title")}
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                {t("about.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("about.heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
                {t("about.history.title")}
              </h2>
            </div>
            
            <Card className="border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base">
                  <p>
                    {t("about.history.paragraph1")}
                  </p>
                  <p>
                    {t("about.history.paragraph2")}
                  </p>
                  <p>
                    {t("about.history.paragraph3")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-semibold text-primary">{t("about.values.badge")}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("about.values.title")}
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                {t("about.values.titleHighlight")}
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">{t("about.values.ponctualite.title")}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {t("about.values.ponctualite.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">{t("about.values.securite.title")}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {t("about.values.securite.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                  <Star className="h-10 w-10 text-primary fill-primary/20" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">{t("about.values.qualite.title")}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {t("about.values.qualite.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">{t("about.values.serviceClient.title")}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {t("about.values.serviceClient.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">{t("about.values.experience.title")}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {t("about.values.experience.description")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 hover:border-primary/30">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/30 shadow-sm">
                  <Phone className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">{t("about.values.disponibilite.title")}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {t("about.values.disponibilite.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-24 bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("about.stats.title")}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-background/80 text-lg font-medium">{t("about.stats.drivers")}</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                100K+
              </div>
              <div className="text-background/80 text-lg font-medium">{t("about.stats.clients")}</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-background/80 text-lg font-medium">{t("about.stats.availability")}</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-background/80 text-lg font-medium">{t("about.stats.experience")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              {t("about.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-8 py-7 h-auto">
                <Link href="/reservation" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("about.cta.bookNow")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 font-semibold px-8 py-7 h-auto">
                <Link href="/contact">
                  {t("about.cta.requestQuote")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
