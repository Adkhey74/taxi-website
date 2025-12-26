import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UpdateReservationInput } from '@/types/reservation'
import { Prisma } from '@prisma/client'

// GET - Récupérer une réservation par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        vehicle: true,
        driver: true,
      },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({ reservation }, { status: 200 })
  } catch (error) {
    console.error('Error fetching reservation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la réservation' },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour une réservation
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateReservationInput = await request.json()

    // Vérifier que la réservation existe
    const existingReservation = await prisma.reservation.findUnique({
      where: { id: params.id },
    })

    if (!existingReservation) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      )
    }

    // Préparer les données de mise à jour
    const updateData: Prisma.ReservationUpdateInput = {}

    if (body.status) {
      updateData.status = body.status
      
      // Mettre à jour les dates selon le statut
      if (body.status === 'CONFIRMED' && !existingReservation.confirmedAt) {
        updateData.confirmedAt = new Date()
      }
      if (body.status === 'COMPLETED' && !existingReservation.completedAt) {
        updateData.completedAt = new Date()
      }
    }

    if (body.vehicleId !== undefined) {
      updateData.vehicleId = body.vehicleId
    }

    if (body.driverId !== undefined) {
      updateData.driverId = body.driverId
    }

    if (body.estimatedPrice !== undefined) {
      updateData.estimatedPrice = body.estimatedPrice
    }

    if (body.finalPrice !== undefined) {
      updateData.finalPrice = body.finalPrice
    }

    if (body.notes !== undefined) {
      updateData.notes = body.notes
    }

    const reservation = await prisma.reservation.update({
      where: { id: params.id },
      data: updateData,
      include: {
        client: true,
        vehicle: true,
        driver: true,
      },
    })

    return NextResponse.json(
      {
        reservation,
        message: 'Réservation mise à jour avec succès',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la réservation' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une réservation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: params.id },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      )
    }

    await prisma.reservation.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: 'Réservation supprimée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la réservation' },
      { status: 500 }
    )
  }
}

