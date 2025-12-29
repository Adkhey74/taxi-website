"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageCircle, CheckCircle, AlertCircle, Loader2, Calendar, Clock, MapPin, Users, Plane, Luggage } from "lucide-react"
import { CreateReservationInput, ServiceType } from "@/types/reservation"
import { useI18n } from "@/lib/i18n/context"
import { toast } from "sonner"

function ReservationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t } = useI18n()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

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

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam) {
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
        throw new Error(data.error || t("reservation.errorCreating") as string)
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
    { value: "longue-distance", labelKey: "reservation.serviceTypes.longueDistance", icon: MapPin },
    { value: "evenement", labelKey: "reservation.serviceTypes.evenement", icon: Users },
    { value: "express", labelKey: "reservation.serviceTypes.express", icon: Clock },
    { value: "forfait", labelKey: "reservation.serviceTypes.forfait", icon: Calendar },
  ]

  return (
    <main className="min-h-screen bg-muted/30 py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* En-tête simplifié */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">
              {t("reservation.bookingTitle")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("reservation.description")}
            </p>
          </div>

          {/* Messages d'état */}
          {submitStatus === "success" && (
            <div className="mb-6 p-5 rounded-xl bg-green-50 border-2 border-green-200 dark:bg-green-950/30">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-900 dark:text-green-100 text-lg mb-1">
                    {t("reservation.successTitle")}
                  </p>
                  <p className="text-green-700 dark:text-green-300">
                    {t("reservation.successDescription")}
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                            {t("reservation.firstName")}
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
                            {t("reservation.lastName")}
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
                            {t("reservation.email")}
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
                            {t("reservation.phone")}
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
                            {t("reservation.pickupAddress")}
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
                            {t("reservation.dropoffAddress")}
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
                              {t("reservation.date")}
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
                              {t("reservation.time")}
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
                              {t("reservation.passengers")}
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
                          rows={3}
                          placeholder={t("reservation.notesPlaceholder") as string}
                          className="resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer du formulaire */}
              <div className="bg-muted/50 px-8 lg:px-10 py-6 border-t border-border">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.back()}
                      className="h-11"
                    >
                      {t("reservation.cancel")}
                    </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="text-sm text-muted-foreground text-center sm:text-right">
                      {t("reservation.helpNeeded")}{" "}
                      <a href="tel:0658686548" className="text-primary hover:underline font-semibold">
                        06 58 68 65 48
                      </a>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold h-11 px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("reservation.sending")}
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          {t("reservation.submit")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Contact rapide */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">{t("reservation.preferContact")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild className="h-11">
                <a href="tel:0658686548" className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  {t("reservation.callNow")}
                </a>
              </Button>
              <Button variant="outline" asChild className="h-11">
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
    </main>
  )
}

export default function ReservationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-muted/30 py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
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
