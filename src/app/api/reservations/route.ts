import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateReservationInput } from '@/types/reservation'
import { ReservationStatus, Prisma } from '@prisma/client'

// GET - Récupérer toutes les réservations ou filtrer
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    const date = searchParams.get('date')

    const where: Prisma.ReservationWhereInput = {}
    
    if (status) {
      where.status = status as ReservationStatus
    }
    
    if (clientId) {
      where.clientId = clientId
    }
    
    if (date) {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      
      where.pickupDate = {
        gte: startOfDay,
        lte: endOfDay,
      }
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        client: true,
        vehicle: true,
        driver: true,
      },
      orderBy: {
        pickupDate: 'asc',
      },
    })

    return NextResponse.json({ reservations }, { status: 200 })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réservations' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle réservation
export async function POST(request: NextRequest) {
  try {
    const body: CreateReservationInput = await request.json()

    // Validation des champs requis
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Les informations client sont requises' },
        { status: 400 }
      )
    }

    if (!body.serviceType || !body.pickupAddress || !body.dropoffAddress || !body.pickupDate || !body.pickupTime) {
      return NextResponse.json(
        { error: 'Les détails de la réservation sont requis' },
        { status: 400 }
      )
    }

    // Vérifier ou créer le client
    let client = await prisma.client.findUnique({
      where: { email: body.email },
    })

    if (!client) {
      client = await prisma.client.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
        },
      })
    } else {
      // Mettre à jour les informations si nécessaire
      client = await prisma.client.update({
        where: { id: client.id },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
        },
      })
    }

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        clientId: client.id,
        vehicleId: body.vehicleId || null,
        serviceType: body.serviceType,
        pickupAddress: body.pickupAddress,
        dropoffAddress: body.dropoffAddress,
        pickupDate: new Date(body.pickupDate),
        pickupTime: body.pickupTime,
        passengers: body.passengers || 1,
        luggage: body.luggage || 0,
        flightNumber: body.flightNumber || null,
        notes: body.notes || null,
        status: ReservationStatus.PENDING,
      },
      include: {
        client: true,
        vehicle: true,
        driver: true,
      },
    })

    return NextResponse.json(
      { 
        reservation,
        message: 'Réservation créée avec succès' 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réservation' },
      { status: 500 }
    )
  }
}

