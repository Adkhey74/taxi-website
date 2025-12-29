"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { ServiceType } from "@/types/reservation"
import { ReservationModal } from "@/components/ReservationModal"

interface ReservationModalContextType {
  openModal: (serviceType?: ServiceType) => void
  closeModal: () => void
}

const ReservationModalContext = createContext<ReservationModalContextType | undefined>(undefined)

export function ReservationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [serviceType, setServiceType] = useState<ServiceType | undefined>(undefined)

  const openModal = (initialServiceType?: ServiceType) => {
    setServiceType(initialServiceType)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <ReservationModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ReservationModal 
        open={isOpen} 
        onOpenChange={setIsOpen}
        initialServiceType={serviceType}
      />
    </ReservationModalContext.Provider>
  )
}

export function useReservationModal() {
  const context = useContext(ReservationModalContext)
  if (context === undefined) {
    throw new Error("useReservationModal must be used within a ReservationModalProvider")
  }
  return context
}

