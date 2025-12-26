"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Users, Plane, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { CreateReservationInput, ServiceType } from "@/types/reservation"
import { useI18n } from "@/lib/i18n/context"

function ReservationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t } = useI18n()
  
  const serviceTypes: { value: ServiceType; label: string; icon: typeof Plane }[] = [
    { value: "aeroport", label: t("services.serviceTypes.aeroport") as string, icon: Plane },
    { value: "ville", label: t("services.serviceTypes.ville") as string, icon: MapPin },
    { value: "longue-distance", label: t("services.serviceTypes.longue-distance") as string, icon: MapPin },
    { value: "evenement", label: t("services.serviceTypes.evenement") as string, icon: Users },
    { value: "express", label: t("services.serviceTypes.express") as string, icon: Clock },
    { value: "forfait", label: t("services.serviceTypes.forfait") as string, icon: Calendar },
  ]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState<CreateReservationInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: (searchParams.get("service") as ServiceType) || "ville",
    pickupAddress: "",
    dropoffAddress: "",
    pickupDate: "",
    pickupTime: "",
    passengers: 1,
    luggage: 0,
    flightNumber: "",
    notes: "",
  })

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam && serviceTypes.some(s => s.value === serviceParam)) {
      setFormData(prev => ({ ...prev, serviceType: serviceParam as ServiceType }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        throw new Error(data.error || t("reservation.errorCreating"))
      }

      setSubmitStatus("success")
      // Réinitialiser le formulaire après 3 secondes
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


  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-semibold text-primary">{t("reservation.title")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("reservation.title")}
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                {t("reservation.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("reservation.description")}
            </p>
          </div>

          {/* Message de succès */}
          {submitStatus === "success" && (
            <Card className="mb-8 border-green-500/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      {t("reservation.success")}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {t("reservation.successMessage")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message d'erreur */}
          {submitStatus === "error" && (
            <Card className="mb-8 border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-100">{t("reservation.error")}</p>
                    <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations client */}
            <Card className="border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{t("reservation.clientInfo")}</CardTitle>
                <CardDescription>{t("reservation.clientInfoDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-foreground">
                      {t("reservation.firstName")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="h-11"
                      placeholder={t("reservation.firstNamePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-foreground">
                      {t("reservation.lastName")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="h-11"
                      placeholder={t("reservation.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                      {t("reservation.email")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11"
                      placeholder={t("reservation.emailPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                      {t("reservation.phone")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-11"
                      placeholder={t("reservation.phonePlaceholder")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Détails de la réservation */}
            <Card className="border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{t("reservation.reservationDetails")}</CardTitle>
                <CardDescription>{t("reservation.reservationDetailsDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-foreground">
                    {t("reservation.serviceType")} <span className="text-red-500">{t("reservation.required")}</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-3 py-2 border border-input bg-background rounded-lg text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                  >
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="pickupAddress" className="block text-sm font-semibold text-foreground">
                    {t("reservation.pickupAddress")} <span className="text-red-500">{t("reservation.required")}</span>
                  </label>
                  <Input
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    className="h-11"
                    placeholder={t("reservation.pickupAddressPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dropoffAddress" className="block text-sm font-semibold text-foreground">
                    {t("reservation.dropoffAddress")} <span className="text-red-500">{t("reservation.required")}</span>
                  </label>
                  <Input
                    id="dropoffAddress"
                    name="dropoffAddress"
                    value={formData.dropoffAddress}
                    onChange={handleChange}
                    required
                    className="h-11"
                    placeholder={t("reservation.dropoffAddressPlaceholder")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="pickupDate" className="block text-sm font-semibold text-foreground">
                      {t("reservation.date")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pickupTime" className="block text-sm font-semibold text-foreground">
                      {t("reservation.time")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="passengers" className="block text-sm font-semibold text-foreground">
                      {t("reservation.passengers")} <span className="text-red-500">{t("reservation.required")}</span>
                    </label>
                    <Input
                      id="passengers"
                      name="passengers"
                      type="number"
                      min="1"
                      max="7"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="luggage" className="block text-sm font-semibold text-foreground">
                      {t("reservation.luggage")}
                    </label>
                    <Input
                      id="luggage"
                      name="luggage"
                      type="number"
                      min="0"
                      value={formData.luggage}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>
                </div>

                {formData.serviceType === "aeroport" && (
                  <div className="space-y-2">
                    <label htmlFor="flightNumber" className="block text-sm font-semibold text-foreground">
                      {t("reservation.flightNumber")}
                    </label>
                    <Input
                      id="flightNumber"
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleChange}
                      className="h-11"
                      placeholder={t("reservation.flightNumberPlaceholder")}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-sm font-semibold text-foreground">
                    {t("reservation.notes")}
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t("reservation.notesPlaceholder")}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bouton de soumission */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-12"
              >
                {t("reservation.cancel")}
              </Button>
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
          </form>
        </div>
      </div>
    </main>
  )
}

export default function ReservationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <ReservationForm />
    </Suspense>
  )
}

