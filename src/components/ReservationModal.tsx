"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, Loader2, Calendar, Clock, MapPin, Users, Plane, Luggage, Phone } from "lucide-react"
import { CreateReservationInput, ServiceType } from "@/types/reservation"
import { useI18n } from "@/lib/i18n/context"
import { toast } from "sonner"
import { AddressAutocomplete } from "@/components/AddressAutocomplete"

interface ReservationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialServiceType?: ServiceType
}

export function ReservationModal({ open, onOpenChange, initialServiceType }: ReservationModalProps) {
  const { t } = useI18n()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState<CreateReservationInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: initialServiceType || "ville",
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
    if (initialServiceType) {
      setFormData(prev => ({ ...prev, serviceType: initialServiceType }))
    }
  }, [initialServiceType])

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          serviceType: initialServiceType || "ville",
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
        setErrorMessage("")
      }, 300)
    }
  }, [open, initialServiceType])

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
          serviceType: initialServiceType || "ville",
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
        onOpenChange(false)
      }, 2000)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : t("reservation.errorOccurred") as string
      setErrorMessage(errorMsg)
      setSubmitStatus("error")
      toast.error(t("reservation.errorTitle") as string, {
        description: errorMsg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceOptions = [
    { value: "aeroport", labelKey: "reservation.serviceTypes.aeroport", icon: Plane },
    { value: "ville", labelKey: "reservation.serviceTypes.ville", icon: MapPin },
    { value: "longue-distance", labelKey: "reservation.serviceTypes.longueDistance", icon: MapPin },
    { value: "evenement", labelKey: "reservation.serviceTypes.evenement", icon: Users },
    { value: "express", labelKey: "reservation.serviceTypes.express", icon: Clock },
    { value: "forfait", labelKey: "reservation.serviceTypes.forfait", icon: Calendar },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col p-0 h-full sm:h-auto sm:max-h-[95vh]">
        <DialogClose onClose={() => onOpenChange(false)} />
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0 border-b border-border bg-muted/30">
          <DialogTitle className="text-lg sm:text-2xl font-bold text-foreground">
            {t("reservation.bookingTitle")}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1.5">
            {t("reservation.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto flex-1 min-h-0">

        {/* Messages d'état */}
        {submitStatus === "success" && (
          <div className="p-3 sm:p-4 rounded-xl bg-green-50 border-2 border-green-200 dark:bg-green-950/30 mb-2.5 sm:mb-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm sm:text-base text-green-900 dark:text-green-100 mb-0.5 sm:mb-1">
                  {t("reservation.successTitle")}
                </p>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                  {t("reservation.successDescription")}
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 sm:p-4 rounded-xl bg-red-50 border-2 border-red-200 dark:bg-red-950/30 mb-2.5 sm:mb-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm sm:text-base text-red-900 dark:text-red-100 mb-0.5 sm:mb-1">{t("reservation.error")}</p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Type de service */}
          <div>
            <label className="block text-sm sm:text-base font-bold mb-3 sm:mb-4 text-foreground">
              {t("reservation.serviceType")}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {serviceOptions.map((service) => {
                const Icon = service.icon
                const isSelected = formData.serviceType === service.value
                return (
                  <button
                    key={service.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value as ServiceType }))}
                    className={`p-2.5 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                        : "border-border bg-background hover:border-primary/50 hover:bg-muted/50 hover:scale-105"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1.5 sm:mb-2" />
                    <div className="text-[10px] sm:text-xs font-semibold text-center leading-tight">{t(service.labelKey) as string}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Informations client */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              {t("reservation.clientInfo")}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="modal-firstName" className="block text-xs sm:text-sm font-semibold text-foreground">
                  {t("reservation.firstName")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="modal-firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 text-sm"
                  placeholder={t("reservation.firstNamePlaceholder") as string}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="modal-lastName" className="block text-xs sm:text-sm font-semibold text-foreground">
                  {t("reservation.lastName")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="modal-lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 text-sm"
                  placeholder={t("reservation.lastNamePlaceholder") as string}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="modal-email" className="block text-xs sm:text-sm font-semibold text-foreground">
                {t("reservation.email")} <span className="text-red-500">*</span>
              </label>
              <Input
                id="modal-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-10 sm:h-11 text-sm"
                placeholder={t("reservation.emailPlaceholder") as string}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="modal-phone" className="block text-xs sm:text-sm font-semibold text-foreground">
                {t("reservation.phone")} <span className="text-red-500">*</span>
              </label>
              <Input
                id="modal-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-10 sm:h-11 text-sm"
                placeholder={t("reservation.phonePlaceholder") as string}
              />
            </div>
          </div>

          {/* Détails de la réservation */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {t("reservation.reservationDetails")}
            </h3>
            
            <div className="space-y-1.5">
              <AddressAutocomplete
                id="modal-pickupAddress"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
                className="h-10 sm:h-11 text-sm"
                placeholder={t("reservation.pickupAddressPlaceholder") as string}
                label={t("reservation.pickupAddress") as string}
              />
            </div>

            <div className="space-y-1.5">
              <AddressAutocomplete
                id="modal-dropoffAddress"
                name="dropoffAddress"
                value={formData.dropoffAddress}
                onChange={handleChange}
                required
                className="h-10 sm:h-11 text-sm"
                placeholder={t("reservation.dropoffAddressPlaceholder") as string}
                label={t("reservation.dropoffAddress") as string}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="modal-pickupDate" className="block text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                  {t("reservation.date")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="modal-pickupDate"
                  name="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="modal-pickupTime" className="block text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  {t("reservation.time")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="modal-pickupTime"
                  name="pickupTime"
                  type="time"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="modal-passengers" className="block text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  {t("reservation.passengers")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="modal-passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max="8"
                  value={formData.passengers}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="modal-luggage" className="block text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Luggage className="h-4 w-4 text-primary" />
                  {t("reservation.luggage")}
                </label>
                <Input
                  id="modal-luggage"
                  name="luggage"
                  type="number"
                  min="0"
                  value={formData.luggage}
                  onChange={handleChange}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
            </div>

            {formData.serviceType === "aeroport" && (
              <div className="space-y-1.5">
                <label htmlFor="modal-flightNumber" className="block text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Plane className="h-4 w-4 text-primary" />
                  {t("reservation.flightNumber")}
                </label>
                <Input
                  id="modal-flightNumber"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  className="h-10 sm:h-11 text-sm"
                  placeholder={t("reservation.flightNumberPlaceholder") as string}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="modal-notes" className="block text-xs sm:text-sm font-semibold text-foreground">
                {t("reservation.notes")}
              </label>
              <Textarea
                id="modal-notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder={t("reservation.notesPlaceholder") as string}
                className="resize-none text-sm min-h-[100px] sm:min-h-[120px]"
              />
            </div>
          </div>

          {/* Footer du formulaire */}
          <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-border bg-muted/20 flex-shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {t("reservation.helpNeeded")}{" "}
              <a href="tel:0658686548" className="text-primary hover:underline font-semibold">
                06 58 68 65 48
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 sm:h-11 text-sm px-6 w-full sm:w-auto order-2 sm:order-1 border-2"
              >
                {t("reservation.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold h-11 sm:h-11 px-6 text-sm w-full sm:w-auto order-1 sm:order-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("reservation.sending")}
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {t("reservation.submit")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

