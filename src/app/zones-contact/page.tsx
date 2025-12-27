"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageCircle, MapPin, CheckCircle, Calendar, Clock, Users, Plane, Luggage, AlertCircle, Loader2 } from "lucide-react"
import { useState, Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CreateReservationInput, ServiceType } from "@/types/reservation"

function ReservationFormSection() {
  const { t } = useI18n()
  const router = useRouter()
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
    if (serviceParam && ["ville", "aeroport", "longue-distance", "evenement"].includes(serviceParam)) {
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
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : t("reservation.errorOccurred") as string)
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceOptions = [
    { value: "ville", labelKey: "reservation.serviceTypes.ville", icon: MapPin },
    { value: "aeroport", labelKey: "reservation.serviceTypes.aeroport", icon: Plane },
    { value: "longue-distance", labelKey: "reservation.serviceTypes.longueDistance", icon: MapPin },
    { value: "evenement", labelKey: "reservation.serviceTypes.evenement", icon: Users },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
          {t("zonesContact.contact.form")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("zonesContact.reservation.specify")}
        </p>
      </div>

      {/* Messages d'état */}
      {submitStatus === "success" && (
        <div className="mb-6 p-5 rounded-xl bg-green-50 border-2 border-green-200 dark:bg-green-950/30">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green-900 dark:text-green-100 text-lg mb-1">
                {t("reservation.success")}
              </p>
              <p className="text-green-700 dark:text-green-300">
                {t("reservation.successMessage")}
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-5 rounded-xl bg-red-50 border-2 border-red-200 dark:bg-red-950/30">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
                  <p className="font-bold text-red-900 dark:text-red-100 text-lg mb-1">{t("reservation.error")}</p>
              <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 lg:p-10 space-y-10">
            {/* Type de service */}
            <div>
              <label className="block text-lg font-bold mb-4 text-foreground">
                {t("reservation.serviceType")}
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
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-center">{t(service.labelKey) as string}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Colonne gauche */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{t("reservation.clientInfo")}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                        {t("reservation.firstName")} <span className="text-red-500">{t("reservation.required")}</span>
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="h-12"
                        placeholder={t("reservation.firstNamePlaceholder") as string}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                        {t("reservation.lastName")} <span className="text-red-500">{t("reservation.required")}</span>
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="h-12"
                        placeholder={t("reservation.lastNamePlaceholder") as string}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        {t("reservation.email")} <span className="text-red-500">{t("reservation.required")}</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12"
                        placeholder={t("reservation.emailPlaceholder") as string}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        {t("reservation.phone")} <span className="text-red-500">{t("reservation.required")}</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-12"
                        placeholder={t("reservation.phonePlaceholder") as string}
                      />
                    </div>
                  </div>
                </div>

                {/* Colonne droite */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{t("reservation.reservationDetails")}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pickupAddress" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {t("reservation.pickupAddress")} <span className="text-red-500">{t("reservation.required")}</span>
                      </label>
                      <Input
                        id="pickupAddress"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        required
                        className="h-12"
                        placeholder={t("reservation.pickupAddressPlaceholder") as string}
                      />
                    </div>

                    <div>
                      <label htmlFor="dropoffAddress" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {t("reservation.dropoffAddress")} <span className="text-red-500">{t("reservation.required")}</span>
                      </label>
                      <Input
                        id="dropoffAddress"
                        name="dropoffAddress"
                        value={formData.dropoffAddress}
                        onChange={handleChange}
                        required
                        className="h-12"
                        placeholder={t("reservation.dropoffAddressPlaceholder") as string}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupDate" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {t("reservation.date")} <span className="text-red-500">{t("reservation.required")}</span>
                        </label>
                        <Input
                          id="pickupDate"
                          name="pickupDate"
                          type="date"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label htmlFor="pickupTime" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {t("reservation.time")} <span className="text-red-500">{t("reservation.required")}</span>
                        </label>
                        <Input
                          id="pickupTime"
                          name="pickupTime"
                          type="time"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="passengers" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {t("reservation.passengers")} <span className="text-red-500">{t("reservation.required")}</span>
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
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label htmlFor="luggage" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Luggage className="h-4 w-4" />
                          {t("reservation.luggage")}
                        </label>
                        <Input
                          id="luggage"
                          name="luggage"
                          type="number"
                          min="0"
                          value={formData.luggage}
                          onChange={handleChange}
                          className="h-12"
                        />
                      </div>
                    </div>

                    {formData.serviceType === "aeroport" && (
                      <div>
                        <label htmlFor="flightNumber" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          {t("reservation.flightNumber")}
                        </label>
                        <Input
                          id="flightNumber"
                          name="flightNumber"
                          value={formData.flightNumber}
                          onChange={handleChange}
                          className="h-12"
                          placeholder={t("reservation.flightNumberPlaceholder") as string}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="notes" className="block text-sm font-semibold text-foreground mb-2">
                        {t("reservation.notes")}
                      </label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t("reservation.notesPlaceholder") as string}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="border-t border-border pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                  {t("reservation.helpNeeded")}{" "}
                  <a href="tel:0658686548" className="text-primary hover:underline font-semibold">
                    <Phone className="h-4 w-4 inline mr-1" />
                    06 58 68 65 48
                  </a>
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold h-12 px-8"
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

      {/* Contact alternatif */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="bg-muted/50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">{t("reservation.preferContact")}</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="h-12">
              <a href="tel:0658686548" className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                {t("reservation.callNow")}
              </a>
            </Button>
            <Button variant="outline" asChild className="h-12">
              <a
                href="https://api.whatsapp.com/send?phone=33658686548&text=Bonjour%20je%20souhaite%20r%C3%A9server%20un%20taxi."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                  {t("cta.whatsapp")}
                </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ZonesContactPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      {/* Zones desservies Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
                {t("zonesContact.title")}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t("zonesContact.zones.local.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• {t("zonesContact.zones.local.motte")}</li>
                    <li>• {t("zonesContact.zones.local.chambery")}</li>
                    <li>• {t("zonesContact.zones.local.aix")}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t("zonesContact.zones.region.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• {t("zonesContact.zones.region.savoie")}</li>
                    <li>• {t("zonesContact.zones.region.tarentaise")}</li>
                    <li>• {t("zonesContact.zones.region.hauteTarentaise")}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t("zonesContact.zones.longDistance.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• {t("zonesContact.zones.longDistance.lyon")}</li>
                    <li>• {t("zonesContact.zones.longDistance.grenoble")}</li>
                    <li>• {t("zonesContact.zones.longDistance.france")}</li>
                    <li>• {t("zonesContact.zones.longDistance.suisse")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                {t("zonesContact.zones.note")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-3">{t("zonesContact.reservation.dateTime")}</h3>
                  <p className="text-sm text-muted-foreground">{t("zonesContact.reservation.dateTimeDesc")}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-3">{t("zonesContact.reservation.passengers")}</h3>
                  <p className="text-sm text-muted-foreground">{t("zonesContact.reservation.passengersDesc")}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-3">{t("zonesContact.reservation.special")}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {t("zonesContact.reservation.seat")}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mt-6">
                <p className="text-muted-foreground font-semibold">{t("zonesContact.reservation.service")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="contact" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center">{t("common.loading")}</div>}>
            <ReservationFormSection />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
