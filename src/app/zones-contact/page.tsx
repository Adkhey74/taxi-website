"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageCircle, MapPin, CheckCircle, Calendar, Clock, Plane, Luggage, AlertCircle, Loader2, Heart, Mountain, Users } from "lucide-react"
import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CreateReservationInput, ServiceType } from "@/types/reservation"
import { toast } from "sonner"

function ReservationFormSection() {
  const { t } = useI18n()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState<CreateReservationInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "ville", // Valeur par défaut, sera mise à jour dans useEffect
    pickupAddress: "",
    dropoffAddress: "",
    pickupDate: "",
    pickupTime: "",
    passengers: 1,
    luggage: 0,
    flightNumber: "",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam && ["ville", "aeroport", "medical", "ski"].includes(serviceParam)) {
      setFormData(prev => ({ ...prev, serviceType: serviceParam as ServiceType }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "passengers" || name === "luggage" ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage("")

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t("reservation.errorOccurred") as string)
      }

      // Afficher le toast de succès
      toast.success(t("reservation.success") as string, {
        description: t("reservation.successMessage") as string,
        duration: 5000,
      })

      setSubmitStatus("success")
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          serviceType: "ville",
          pickupAddress: "",
          dropoffAddress: "",
          pickupDate: "",
          pickupTime: "",
          passengers: 1,
          luggage: 0,
          flightNumber: "",
          notes: "",
        })
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : t("reservation.errorOccurred") as string
      toast.error(t("reservation.errorTitle") as string, {
        description: errorMsg,
        duration: 5000,
      })
      setSubmitStatus("error")
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceOptions = [
    { value: "ville", labelKey: "reservation.serviceTypes.ville", icon: MapPin },
    { value: "aeroport", labelKey: "reservation.serviceTypes.aeroport", icon: Plane },
    { value: "medical", labelKey: "reservation.serviceTypes.medical", icon: Heart },
    { value: "ski", labelKey: "reservation.serviceTypes.ski", icon: Mountain },
  ]

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
          Réservez votre course
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Remplissez le formulaire ci-dessous pour effectuer votre réservation. Tous les champs marqués d&apos;un astérisque (*) sont obligatoires.
        </p>
      </div>

      {/* Messages d'état */}
      {submitStatus === "success" && (
        <div className="mb-4 sm:mb-6 p-4 sm:p-5 rounded-xl bg-green-50 border-2 border-green-200 dark:bg-green-950/30">
          <div className="flex items-start gap-3 sm:gap-4">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-green-900 dark:text-green-100 text-base sm:text-lg mb-1">
                {t("reservation.success")}
              </p>
              <p className="text-sm sm:text-base text-green-700 dark:text-green-300">
                {t("reservation.successMessage")}
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-4 sm:mb-6 p-4 sm:p-5 rounded-xl bg-red-50 border-2 border-red-200 dark:bg-red-950/30">
          <div className="flex items-start gap-3 sm:gap-4">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-red-900 dark:text-red-100 text-base sm:text-lg mb-1">{t("reservation.error")}</p>
              <p className="text-sm sm:text-base text-red-700 dark:text-red-300 break-words">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Type de service */}
            <div>
              <label className="block text-base sm:text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                <span>{t("reservation.serviceType")}</span>
                <span className="text-red-500 text-sm">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {serviceOptions.map((service) => {
                  const Icon = service.icon
                  const isSelected = formData.serviceType === service.value
                  return (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value as ServiceType }))}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                          : "border-border bg-background hover:border-primary/50 hover:bg-muted/50 hover:scale-105"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1.5" />
                      <div className="text-[10px] sm:text-xs font-semibold text-center leading-tight">{t(service.labelKey) as string}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Colonne gauche - Informations client */}
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {t("reservation.clientInfo")}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-1.5">
                          {t("reservation.firstName")} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="h-11 text-base"
                          placeholder={t("reservation.firstNamePlaceholder") as string}
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-1.5">
                          {t("reservation.lastName")} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="h-11 text-base"
                          placeholder={t("reservation.lastNamePlaceholder") as string}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("reservation.email")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-11 text-base"
                        placeholder={t("reservation.emailPlaceholder") as string}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("reservation.phone")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-11 text-base"
                        placeholder={t("reservation.phonePlaceholder") as string}
                      />
                    </div>
                  </div>
                </div>

                {/* Colonne droite - Détails de la réservation */}
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t("reservation.reservationDetails")}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pickupAddress" className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("reservation.pickupAddress")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="pickupAddress"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        required
                        className="h-11 text-base"
                        placeholder={t("reservation.pickupAddressPlaceholder") as string}
                      />
                    </div>

                    <div>
                      <label htmlFor="dropoffAddress" className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("reservation.dropoffAddress")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="dropoffAddress"
                        name="dropoffAddress"
                        value={formData.dropoffAddress}
                        onChange={handleChange}
                        required
                        className="h-11 text-base"
                        placeholder={t("reservation.dropoffAddressPlaceholder") as string}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupDate" className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-primary" />
                          {t("reservation.date")} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="pickupDate"
                          name="pickupDate"
                          type="date"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          required
                          className="h-11 text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="pickupTime" className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-primary" />
                          {t("reservation.time")} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="pickupTime"
                          name="pickupTime"
                          type="time"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          required
                          className="h-11 text-base"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="passengers" className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-primary" />
                          {t("reservation.passengers")} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="passengers"
                          name="passengers"
                          type="number"
                          min="1"
                          max="8"
                          value={formData.passengers}
                          onChange={handleChange}
                          required
                          className="h-11 text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="luggage" className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                          <Luggage className="h-4 w-4 text-primary" />
                          {t("reservation.luggage")}
                        </label>
                        <Input
                          id="luggage"
                          name="luggage"
                          type="number"
                          min="0"
                          value={formData.luggage}
                          onChange={handleChange}
                          className="h-11 text-base"
                        />
                      </div>
                    </div>

                    {formData.serviceType === "aeroport" && (
                      <div>
                        <label htmlFor="flightNumber" className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                          <Plane className="h-4 w-4 text-primary" />
                          {t("reservation.flightNumber")}
                        </label>
                        <Input
                          id="flightNumber"
                          name="flightNumber"
                          value={formData.flightNumber}
                          onChange={handleChange}
                          className="h-11 text-base"
                          placeholder={t("reservation.flightNumberPlaceholder") as string}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="notes" className="block text-sm font-semibold text-foreground mb-1.5">
                        {t("reservation.notes")}
                      </label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t("reservation.notesPlaceholder") as string}
                        className="resize-none text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="border-t border-border pt-6 bg-muted/30 -mx-5 sm:-mx-6 lg:-mx-8 px-5 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  {t("reservation.helpNeeded")}{" "}
                  <a href="tel:0658686548" className="text-primary hover:underline font-semibold">
                    06 58 68 65 48
                  </a>
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold h-12 px-8 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("reservation.submitting")}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      {t("reservation.confirm")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default function ZonesContactPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                {t("zonesContact.title")}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                Réservez votre transport en toute simplicité. Consultez nos zones de service ci-contre pendant que vous remplissez le formulaire.
              </p>
            </div>

            {/* Layout en deux colonnes sur desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Colonne gauche - Formulaire de réservation */}
              <div className="lg:col-span-2">
                <Suspense fallback={<div className="text-center">{t("common.loading")}</div>}>
                  <ReservationFormSection />
                </Suspense>
              </div>

              {/* Colonne droite - Zones desservies (sticky sur desktop) */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-foreground flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Nos zones de service
                      </h2>
                      
                      <div className="space-y-4">
                      <Card className="border border-border shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="p-5 bg-muted/30">
                          <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                            {t("zonesContact.zones.local.title")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                          <ul className="space-y-2.5 text-base text-foreground">
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.local.motte")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.local.chambery")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.local.aix")}</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border border-border shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="p-5 bg-muted/30">
                          <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                            {t("zonesContact.zones.region.title")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                          <ul className="space-y-2.5 text-base text-foreground">
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.region.savoie")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.region.tarentaise")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.region.hauteTarentaise")}</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border border-border shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="p-5 bg-muted/30">
                          <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                            {t("zonesContact.zones.longDistance.title")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                          <ul className="space-y-2.5 text-base text-foreground">
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.longDistance.lyon")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.longDistance.grenoble")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.longDistance.france")}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{t("zonesContact.zones.longDistance.suisse")}</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Informations supplémentaires */}
                  <Card className="border border-primary/30 bg-primary/5 shadow-md">
                    <CardHeader className="p-5 border-b border-primary/20">
                      <CardTitle className="text-base font-bold text-foreground">
                        Informations utiles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          {t("zonesContact.reservation.dateTime")}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t("zonesContact.reservation.dateTimeDesc")}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          {t("zonesContact.reservation.passengers")}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t("zonesContact.reservation.passengersDesc")}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {t("zonesContact.reservation.special")}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t("zonesContact.reservation.seat")}</p>
                      </div>
                      <div className="pt-3 border-t border-primary/20">
                        <p className="text-xs text-muted-foreground font-semibold text-center">{t("zonesContact.reservation.service")}</p>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
