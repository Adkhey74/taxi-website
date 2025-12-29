import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateReservationInput } from '@/types/reservation'
import { ReservationStatus, Prisma, Client } from '@prisma/client'
import sgMail from '@sendgrid/mail'

// Fonction pour formater la date en français
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Fonction pour formater l'heure
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  return `${hours}h${minutes}`
}

// Labels des types de service
const serviceTypeLabels: Record<string, string> = {
  'aeroport': 'Taxi aéroport',
  'ville': 'Transport en ville',
  'longue-distance': 'Longue distance',
  'evenement': 'Événement',
  'express': 'Service express',
  'forfait': 'Forfait journée',
}

// Fonction pour envoyer l'email de confirmation au client
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
    flightNumber?: string | null
    notes?: string | null
    client: Client
  },
  client: Client
) {
  // Vérifier si SendGrid est configuré
  if (!process.env.SENDGRID_API_KEY) {
    console.error('⚠️ SENDGRID_API_KEY non configurée dans les variables d\'environnement')
    console.log('Email de confirmation à envoyer à:', client.email)
    throw new Error('SENDGRID_API_KEY non configurée')
  }

  // Initialiser SendGrid
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const serviceType = serviceTypeLabels[reservation.serviceType] || reservation.serviceType
  const fromEmail = process.env.FROM_EMAIL || 'adil.apple74@gmail.com'
  const reservationId = reservation.id.slice(0, 8).toUpperCase()

  console.log('📧 Configuration email SendGrid:', {
    from: fromEmail,
    to: client.email,
    apiKeyPresent: !!process.env.SENDGRID_API_KEY
  })

  try {
    const msg = {
      to: client.email,
      from: {
        email: fromEmail,
        name: 'Hern Taxi'
      },
      subject: `Confirmation de réservation #${reservationId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
            Confirmation de votre réservation
          </h2>
          <p>Bonjour ${client.firstName} ${client.lastName},</p>
          <p>Votre réservation a bien été enregistrée. Nous vous contacterons rapidement pour confirmer votre réservation.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Détails de la réservation :</h3>
            <p><strong>Numéro de réservation :</strong> #${reservationId}</p>
            <p><strong>Service :</strong> ${serviceType}</p>
            <p><strong>Date :</strong> ${formatDate(reservation.pickupDate)}</p>
            <p><strong>Heure :</strong> ${formatTime(reservation.pickupTime)}</p>
            <p><strong>Départ :</strong> ${reservation.pickupAddress}</p>
            <p><strong>Destination :</strong> ${reservation.dropoffAddress}</p>
            <p><strong>Passagers :</strong> ${reservation.passengers}</p>
            <p><strong>Bagages :</strong> ${reservation.luggage}</p>
            ${reservation.flightNumber ? `<p><strong>Numéro de vol :</strong> ${reservation.flightNumber}</p>` : ''}
            ${reservation.notes ? `<p><strong>Notes :</strong> ${reservation.notes}</p>` : ''}
          </div>
          
          <p>Pour toute question, n'hésitez pas à nous contacter :</p>
          <p>
            📞 <strong>01 23 45 67 89</strong><br>
            📱 <strong>06 58 68 65 48</strong>
          </p>
          
          <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe Hern Taxi</strong></p>
        </div>
      `,
    }

    const [response] = await sgMail.send(msg)
    console.log('✅ Email de confirmation envoyé avec succès à:', client.email)
    console.log('📧 Réponse SendGrid:', {
      statusCode: response?.statusCode,
      headers: response?.headers,
      body: response?.body
    })
  } catch (error: unknown) {
    const sendGridError = error as { message?: string; code?: string; response?: { statusCode?: number; body?: { errors?: Array<{ message?: string }> } } }
    console.error('❌ Erreur lors de l\'envoi de l\'email de confirmation:', error)
    console.error('📋 Détails:', {
      message: sendGridError?.message,
      code: sendGridError?.code,
      statusCode: sendGridError?.response?.statusCode,
      body: sendGridError?.response?.body
    })
    
    // Vérifier si c'est une erreur de vérification d'email
    if (sendGridError?.response?.body?.errors) {
      sendGridError.response.body.errors.forEach((err) => {
        console.error('❌ Erreur SendGrid:', err.message)
        if (err.message?.includes('verified') || err.message?.includes('sender')) {
          console.error('⚠️ IMPORTANT: Vous devez vérifier votre email d\'envoi dans SendGrid')
          console.error('📧 Allez sur https://app.sendgrid.com/settings/sender_auth/senders/new')
        }
      })
    }
    
    throw error
  }
}

// Fonction pour envoyer une notification à l'entreprise
async function sendReservationNotificationEmail(
  reservation: {
    id: string
    serviceType: string
    pickupAddress: string
    dropoffAddress: string
    pickupDate: Date
    pickupTime: string
    passengers: number
    luggage: number
    flightNumber?: string | null
    notes?: string | null
    client: Client
  },
  client: Client
) {
  // Vérifier si SendGrid est configuré
  if (!process.env.SENDGRID_API_KEY) {
    console.log('⚠️ SENDGRID_API_KEY non configurée - Email de notification non envoyé')
    return
  }

  // Vérifier si l'email de l'entreprise est configuré
  const companyEmail = process.env.COMPANY_EMAIL
  if (!companyEmail) {
    console.log('⚠️ COMPANY_EMAIL non configurée - Email de notification non envoyé')
    return
  }

  // Initialiser SendGrid
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const serviceType = serviceTypeLabels[reservation.serviceType] || reservation.serviceType
  const fromEmail = process.env.FROM_EMAIL || 'adil.apple74@gmail.com'
  const reservationId = reservation.id.slice(0, 8).toUpperCase()

  try {
    const msg = {
      to: companyEmail,
      from: {
        email: fromEmail,
        name: 'Système de réservation'
      },
      subject: `🆕 Nouvelle réservation #${reservationId} - ${serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
            Nouvelle réservation reçue
          </h2>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0;"><strong>⚠️ Action requise :</strong> Une nouvelle réservation nécessite votre attention.</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Informations client :</h3>
            <p><strong>Nom :</strong> ${client.firstName} ${client.lastName}</p>
            <p><strong>Email :</strong> ${client.email}</p>
            <p><strong>Téléphone :</strong> ${client.phone}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Détails de la réservation :</h3>
            <p><strong>Numéro de réservation :</strong> #${reservationId}</p>
            <p><strong>Service :</strong> ${serviceType}</p>
            <p><strong>Date :</strong> ${formatDate(reservation.pickupDate)}</p>
            <p><strong>Heure :</strong> ${formatTime(reservation.pickupTime)}</p>
            <p><strong>Départ :</strong> ${reservation.pickupAddress}</p>
            <p><strong>Destination :</strong> ${reservation.dropoffAddress}</p>
            <p><strong>Passagers :</strong> ${reservation.passengers}</p>
            <p><strong>Bagages :</strong> ${reservation.luggage}</p>
            ${reservation.flightNumber ? `<p><strong>Numéro de vol :</strong> ${reservation.flightNumber}</p>` : ''}
            ${reservation.notes ? `<p><strong>Notes :</strong> ${reservation.notes}</p>` : ''}
          </div>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Cette notification a été envoyée automatiquement par le système de réservation.
          </p>
        </div>
      `,
    }

    const [response] = await sgMail.send(msg)
    console.log('✅ Email de notification envoyé à:', companyEmail)
    console.log('📧 Réponse SendGrid:', {
      statusCode: response?.statusCode,
      headers: response?.headers,
      body: response?.body
    })
  } catch (error: unknown) {
    const sendGridError = error as { message?: string; code?: string; response?: { statusCode?: number; body?: { errors?: Array<{ message?: string }> } } }
    console.error('❌ Erreur lors de l\'envoi de l\'email de notification:', error)
    console.error('📋 Détails:', {
      message: sendGridError?.message,
      code: sendGridError?.code,
      statusCode: sendGridError?.response?.statusCode,
      body: sendGridError?.response?.body
    })
    
    // Vérifier si c'est une erreur de vérification d'email
    if (sendGridError?.response?.body?.errors) {
      sendGridError.response.body.errors.forEach((err) => {
        console.error('❌ Erreur SendGrid:', err.message)
        if (err.message?.includes('verified') || err.message?.includes('sender')) {
          console.error('⚠️ IMPORTANT: Vous devez vérifier votre email d\'envoi dans SendGrid')
          console.error('📧 Allez sur https://app.sendgrid.com/settings/sender_auth/senders/new')
        }
      })
    }
    // Ne pas faire échouer la création de réservation si l'email de notification échoue
  }
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

    // Envoyer les emails (de manière indépendante pour que l'un ne bloque pas l'autre)
    // Email de confirmation au client
    console.log('📧 Début envoi email de confirmation au client:', client.email)
    sendReservationConfirmationEmail(reservation, client)
      .then(() => {
        console.log('✅ Email de confirmation au client envoyé avec succès')
      })
      .catch((error) => {
        console.error('❌ ERREUR lors de l\'envoi de l\'email de confirmation au client:', error)
        console.error('Détails de l\'erreur:', error?.message || error)
        if (error?.response) {
          console.error('Réponse Resend:', error.response)
        }
      })
    
    // Email de notification à l'entreprise
    console.log('📧 Début envoi email de notification à l\'entreprise')
    sendReservationNotificationEmail(reservation, client)
      .then(() => {
        console.log('✅ Email de notification à l\'entreprise envoyé avec succès')
      })
      .catch((error) => {
        console.error('❌ ERREUR lors de l\'envoi de l\'email de notification à l\'entreprise:', error)
        console.error('Détails de l\'erreur:', error?.message || error)
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

