"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TransportMedicalCPAMPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 min-h-[60vh] flex items-center overflow-hidden">
        {/* Image background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dufmpr5dh/image/upload/v1766938706/emergency_qtwa47.jpg"
            alt="Transport médical conventionné CPAM"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              {t("medicalCPAM.title")}
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-white/90 font-semibold drop-shadow-md">
              {t("medicalCPAM.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("medicalCPAM.description")}
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">{t("medicalCPAM.transports.title")}</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("medicalCPAM.transports.consultation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("medicalCPAM.transports.examens")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("medicalCPAM.transports.hospitalisation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("medicalCPAM.transports.traitement")}</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t("medicalCPAM.coverage")}
              </p>
              <p className="text-muted-foreground leading-relaxed font-semibold">
                {t("medicalCPAM.noCoverage")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">{t("medicalCPAM.ctaTitle")}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-7 text-lg">
                <Link href="/zones-contact" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("cta.contactUs")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 px-8 py-7 text-lg font-semibold" asChild>
                <a href="https://api.whatsapp.com/send?phone=33658686548&text=Bonjour%20je%20souhaite%20r%C3%A9server%20un%20transport%20m%C3%A9dical." target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t("cta.whatsapp")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
