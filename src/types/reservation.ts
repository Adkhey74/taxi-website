import { ReservationStatus } from '@prisma/client'

export type ServiceType = 
  | 'aeroport'
  | 'ville'
  | 'express'
  | 'forfait'
  | 'medical'
  | 'ski'

export interface CreateReservationInput {
  // Informations client
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Détails de la réservation
  serviceType: ServiceType
  pickupAddress: string
  dropoffAddress: string
  pickupDate: string // ISO date string
  pickupTime: string // Format HH:mm
  passengers?: number
  luggage?: number
  
  // Informations supplémentaires
  flightNumber?: string
  notes?: string
  
  // Véhicule préféré (optionnel)
  vehicleId?: string
}

export interface UpdateReservationInput {
  status?: ReservationStatus
  vehicleId?: string
  driverId?: string
  estimatedPrice?: number
  finalPrice?: number
  notes?: string
}

export interface ReservationWithRelations {
  id: string
  client: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  vehicle?: {
    id: string
    name: string
    type: string
    capacity: number
  } | null
  driver?: {
    id: string
    firstName: string
    lastName: string
    phone: string
  } | null
  serviceType: ServiceType
  pickupAddress: string
  dropoffAddress: string
  pickupDate: Date
  pickupTime: string
  passengers: number
  luggage: number
  flightNumber?: string | null
  notes?: string | null
  status: ReservationStatus
  estimatedPrice?: number | null
  finalPrice?: number | null
  createdAt: Date
  updatedAt: Date
  confirmedAt?: Date | null
  completedAt?: Date | null
}

