"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, Loader2, Calendar, Clock, MapPin, Users, Plane, Luggage } from "lucide-react"
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
    { value: "ville", labelKey: "reservation.serviceTypes.ville", icon: MapPin },
    { value: "aeroport", labelKey: "reservation.serviceTypes.aeroport", icon: Plane },
    { value: "longue-distance", labelKey: "reservation.serviceTypes.longueDistance", icon: MapPin },
    { value: "evenement", labelKey: "reservation.serviceTypes.evenement", icon: Users },
    { value: "express", labelKey: "reservation.serviceTypes.express", icon: Clock },
    { value: "forfait", labelKey: "reservation.serviceTypes.forfait", icon: Calendar },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] flex flex-col p-0">
        <DialogClose onClose={() => onOpenChange(false)} />
        <DialogHeader className="px-5 pt-5 pb-3 flex-shrink-0 border-b border-border">
          <DialogTitle className="text-xl font-bold">
            {t("reservation.bookingTitle")}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t("reservation.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 py-4 overflow-y-auto flex-1">

        {/* Messages d'état */}
        {submitStatus === "success" && (
          <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200 dark:bg-green-950/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-900 dark:text-green-100 mb-1">
                  {t("reservation.successTitle")}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {t("reservation.successDescription")}
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 dark:bg-red-950/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900 dark:text-red-100 mb-1">{t("reservation.error")}</p>
                <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type de service */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-foreground">
              {t("reservation.serviceType")}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {serviceOptions.map((service) => {
                const Icon = service.icon
                const isSelected = formData.serviceType === service.value
                return (
                  <button
                    key={service.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value as ServiceType }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1.5" />
                    <div className="text-xs font-semibold text-center leading-tight">{t(service.labelKey) as string}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Colonne gauche - Informations client */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground mb-2">{t("reservation.clientInfo")}</h3>
              
              <div>
                <label htmlFor="modal-firstName" className="block text-xs font-semibold text-foreground mb-1">
                  {t("reservation.firstName")}
                </label>
                <Input
                  id="modal-firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-9 text-sm"
                  placeholder={t("reservation.firstNamePlaceholder") as string}
                />
              </div>

              <div>
                <label htmlFor="modal-lastName" className="block text-xs font-semibold text-foreground mb-1">
                  {t("reservation.lastName")}
                </label>
                <Input
                  id="modal-lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-9 text-sm"
                  placeholder={t("reservation.lastNamePlaceholder") as string}
                />
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-semibold text-foreground mb-1">
                  {t("reservation.email")}
                </label>
                <Input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-9 text-sm"
                  placeholder={t("reservation.emailPlaceholder") as string}
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-xs font-semibold text-foreground mb-1">
                  {t("reservation.phone")}
                </label>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-9 text-sm"
                  placeholder={t("reservation.phonePlaceholder") as string}
                />
              </div>
            </div>

            {/* Colonne droite - Détails de la réservation */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground mb-2">{t("reservation.reservationDetails")}</h3>
              
              <div>
                <AddressAutocomplete
                  id="modal-pickupAddress"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  required
                  className="h-9 text-sm"
                  placeholder={t("reservation.pickupAddressPlaceholder") as string}
                  label={t("reservation.pickupAddress") as string}
                />
              </div>

              <div>
                <AddressAutocomplete
                  id="modal-dropoffAddress"
                  name="dropoffAddress"
                  value={formData.dropoffAddress}
                  onChange={handleChange}
                  required
                  className="h-9 text-sm"
                  placeholder={t("reservation.dropoffAddressPlaceholder") as string}
                  label={t("reservation.dropoffAddress") as string}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="modal-pickupDate" className="block text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {t("reservation.date")}
                  </label>
                  <Input
                    id="modal-pickupDate"
                    name="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="modal-pickupTime" className="block text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {t("reservation.time")}
                  </label>
                  <Input
                    id="modal-pickupTime"
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="modal-passengers" className="block text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {t("reservation.passengers")}
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
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="modal-luggage" className="block text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    <Luggage className="h-3.5 w-3.5" />
                    {t("reservation.luggage")}
                  </label>
                  <Input
                    id="modal-luggage"
                    name="luggage"
                    type="number"
                    min="0"
                    value={formData.luggage}
                    onChange={handleChange}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {formData.serviceType === "aeroport" && (
                <div>
                  <label htmlFor="modal-flightNumber" className="block text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
                    <Plane className="h-3.5 w-3.5" />
                    {t("reservation.flightNumber")}
                  </label>
                  <Input
                    id="modal-flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    className="h-9 text-sm"
                    placeholder={t("reservation.flightNumberPlaceholder") as string}
                  />
                </div>
              )}

              <div>
                <label htmlFor="modal-notes" className="block text-xs font-semibold text-foreground mb-1">
                  {t("reservation.notes")}
                </label>
                <Textarea
                  id="modal-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder={t("reservation.notesPlaceholder") as string}
                  className="resize-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Footer du formulaire */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-border flex-shrink-0">
            <div className="text-xs text-muted-foreground text-center sm:text-left">
              {t("reservation.helpNeeded")}{" "}
              <a href="tel:0658686548" className="text-primary hover:underline font-semibold">
                06 58 68 65 48
              </a>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-9 text-sm px-4"
              >
                {t("reservation.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold h-9 px-5 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    {t("reservation.sending")}
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-3.5 w-3.5" />
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

