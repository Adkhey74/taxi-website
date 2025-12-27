import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateReservationInput } from '@/types/reservation'
import { ReservationStatus, Prisma, Client } from '@prisma/client'

// Fonction pour envoyer l'email de confirmation
async function sendReservationConfirmationEmail(
  reservation: {
    id: string
    serviceType: string
    pickupAddress: string
    dropoffAddress: string
    pickupDate: Date
    pickupTime: string
    passengers: number
    luggage: number
    client: Client
  },
  client: Client
) {
  // Format de date en français
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    return `${hours}h${minutes}`
  }

  const serviceTypeLabels: Record<string, string> = {
    'aeroport': 'Taxi aéroport',
    'ville': 'Transport en ville',
    'longue-distance': 'Longue distance',
    'evenement': 'Événement',
    'express': 'Service express',
    'forfait': 'Forfait journée',
  }

  const serviceType = serviceTypeLabels[reservation.serviceType] || reservation.serviceType

  // Pour l'instant, on utilise mailto car nous n'avons pas de service d'email configuré
  // En production, vous devriez utiliser Resend, SendGrid, ou un autre service d'email
  // Exemple avec Resend (à configurer):
  /*
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'Hern Taxi <reservations@hern-taxi.fr>',
    to: client.email,
    subject: `Confirmation de réservation #${reservation.id.slice(0, 8)}`,
    html: `
      <h2>Confirmation de votre réservation</h2>
      <p>Bonjour ${client.firstName} ${client.lastName},</p>
      <p>Votre réservation a bien été enregistrée.</p>
      <h3>Détails de la réservation :</h3>
      <ul>
        <li><strong>Service :</strong> ${serviceType}</li>
        <li><strong>Date :</strong> ${formatDate(reservation.pickupDate)}</li>
        <li><strong>Heure :</strong> ${formatTime(reservation.pickupTime)}</li>
        <li><strong>Départ :</strong> ${reservation.pickupAddress}</li>
        <li><strong>Destination :</strong> ${reservation.dropoffAddress}</li>
        <li><strong>Passagers :</strong> ${reservation.passengers}</li>
        <li><strong>Bagages :</strong> ${reservation.luggage}</li>
      </ul>
      <p>Nous vous contacterons rapidement pour confirmer votre réservation.</p>
      <p>Cordialement,<br>L'équipe Hern Taxi</p>
    `,
  })
  */

  // Pour l'instant, on log juste l'email qui serait envoyé
  console.log('Email de confirmation à envoyer à:', client.email)
  console.log('Réservation ID:', reservation.id)
  
  // TODO: Configurer un service d'email réel (Resend, SendGrid, etc.)
  // et décommenter le code ci-dessus
}

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

    // Combiner date et heure pour créer un DateTime complet
    const pickupDateTime = body.pickupDate && body.pickupTime
      ? new Date(`${body.pickupDate}T${body.pickupTime}:00`)
      : new Date(body.pickupDate)

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        clientId: client.id,
        vehicleId: body.vehicleId || null,
        serviceType: body.serviceType,
        pickupAddress: body.pickupAddress,
        dropoffAddress: body.dropoffAddress,
        pickupDate: pickupDateTime,
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

    // Envoyer un email de confirmation (de manière asynchrone, ne pas bloquer la réponse)
    try {
      await sendReservationConfirmationEmail(reservation, client)
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Ne pas faire échouer la création de réservation si l'email échoue
    }

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

