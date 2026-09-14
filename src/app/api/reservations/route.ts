import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ReservationStatus, Prisma, Client } from '@prisma/client'

// Configuration Brevo
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

// Aucun champ du formulaire n'est obligatoire : les e-mails affichent explicitement ce qui manque
// plutôt qu'une ligne vide ou « hundefined ».
const NON_RENSEIGNE = 'Non renseigné'
const orNonRenseigne = (value: string | null | undefined) => value?.trim() || NON_RENSEIGNE

// Fonction pour formater la date en français
const formatDate = (date: Date | null) => {
  if (!date) return NON_RENSEIGNE
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Fonction pour formater l'heure
const formatTime = (time: string) => {
  if (!time) return NON_RENSEIGNE
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
  'medical': 'Transport médical',
  'ski': 'Transfert stations de ski',
}

// Fonction pour envoyer l'email de confirmation au client
async function sendReservationConfirmationEmail(
  reservation: {
    id: string
    serviceType: string
    pickupAddress: string
    dropoffAddress: string
    pickupDate: Date | null
    pickupTime: string
    passengers: number
    luggage: number
    flightNumber?: string | null
    notes?: string | null
    client: Client
  },
  client: Client
) {
  const clientEmail = client.email
  if (!clientEmail) {
    console.log('ℹ️ Pas d\'e-mail renseigné - confirmation client non envoyée')
    return
  }
  const fullName = `${client.firstName} ${client.lastName}`.trim()

  // Vérifier si Brevo est configuré
  if (!BREVO_API_KEY) {
    console.log('⚠️ Envoi d\'emails désactivé - BREVO_API_KEY non configurée')
    console.log('Email de confirmation à envoyer à:', clientEmail)
    return // Retourner sans erreur
  }

  const serviceType = serviceTypeLabels[reservation.serviceType] || reservation.serviceType
  const fromEmail = process.env.FROM_EMAIL || 'noreply@hern-taxi.fr'
  const fromName = process.env.FROM_NAME || 'Hern Taxi'
  const reservationId = reservation.id.slice(0, 8).toUpperCase()

  console.log('📧 Configuration email Brevo:', {
    from: fromEmail,
    fromName: fromName,
    to: client.email,
    apiKeyPresent: !!BREVO_API_KEY,
    apiKeyPrefix: BREVO_API_KEY?.substring(0, 10) + '...'
  })
  
  // Avertissement si FROM_EMAIL n'est pas configuré
  if (!process.env.FROM_EMAIL) {
    console.warn('⚠️ FROM_EMAIL non configuré - Utilisation de la valeur par défaut:', fromEmail)
    console.warn('⚠️ IMPORTANT: L\'email FROM doit être vérifié dans Brevo (Settings > Senders & IP)')
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: fromName,
          email: fromEmail,
        },
        to: [
          {
            email: clientEmail,
            ...(fullName ? { name: fullName } : {}),
          },
        ],
        subject: `Confirmation de demande de devis #${reservationId}`,
        htmlContent: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #000000; padding: 30px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">HERN TAXI</h1>
                        <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Service de transport professionnel</p>
                      </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 600;">Confirmation de votre demande de devis</h2>
                        <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">Bonjour${fullName ? ` <strong>${fullName}</strong>` : ''},</p>
                        <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px;">Votre demande de devis a bien été enregistrée. Nous vous contacterons rapidement pour confirmer votre réservation.</p>
                        
                        <!-- Reservation Details Card -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 25px;">
                              <h3 style="margin: 0 0 20px 0; color: #000000; font-size: 18px; font-weight: 600; border-bottom: 2px solid #000000; padding-bottom: 10px;">Détails de la réservation</h3>
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 140px;"><strong style="color: #000000;">Numéro :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px; font-weight: 600;">#${reservationId}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Service :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${serviceType}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Date :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${formatDate(reservation.pickupDate)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Heure :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${formatTime(reservation.pickupTime)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong style="color: #000000;">Départ :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${orNonRenseigne(reservation.pickupAddress)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong style="color: #000000;">Destination :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${orNonRenseigne(reservation.dropoffAddress)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Passagers :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.passengers}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Bagages :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.luggage}</td>
                                </tr>
                                ${reservation.flightNumber ? `
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Numéro de vol :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.flightNumber}</td>
                                </tr>
                                ` : ''}
                                ${reservation.notes ? `
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong style="color: #000000;">Notes :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.notes}</td>
                                </tr>
                                ` : ''}
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Contact Info -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 20px;">
                              <p style="margin: 0 0 12px 0; color: #000000; font-size: 14px; font-weight: 600;">Pour toute question, n'hésitez pas à nous contacter :</p>
                              <p style="margin: 8px 0; color: #000000; font-size: 16px;">
                                <strong style="display: inline-block; min-width: 140px;">📞 Téléphone :</strong>
                                <a href="tel:0952473625" style="color: #000000; text-decoration: none; font-weight: 600;">09 52 47 36 25</a>
                              </p>
                              <p style="margin: 8px 0; color: #000000; font-size: 16px;">
                                <strong style="display: inline-block; min-width: 140px;">📱 Mobile :</strong>
                                <a href="tel:0658686548" style="color: #000000; text-decoration: none; font-weight: 600;">06 58 68 65 48</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 0 0; color: #333333; font-size: 16px;">Cordialement,</p>
                        <p style="margin: 5px 0 0 0; color: #000000; font-size: 16px; font-weight: 600;">L'équipe Hern Taxi</p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
                        <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; font-weight: 600;">Hern Taxi</p>
                        <p style="margin: 0; color: #999999; font-size: 12px;">Service disponible 24h/24 et 7j/7</p>
                        <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px;">Chambéry, Aix-les-Bains et région Savoie</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('❌ Erreur Brevo API:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      })
      throw new Error(`Brevo API error: ${response.status} - ${JSON.stringify(data)}`)
    }

    console.log('✅ Email de confirmation envoyé avec succès à:', client.email)
    console.log('📧 Réponse Brevo:', data)
    console.log('📋 Détails:', {
      messageId: data.messageId,
      from: fromEmail,
      to: client.email,
      subject: `Confirmation de demande de devis #${reservationId}`
    })
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de confirmation:', error)
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
    pickupDate: Date | null
    pickupTime: string
    passengers: number
    luggage: number
    flightNumber?: string | null
    notes?: string | null
    client: Client
  },
  client: Client
) {
  // Vérifier si Brevo est configuré
  if (!BREVO_API_KEY) {
    console.log('⚠️ Envoi d\'emails désactivé - BREVO_API_KEY non configurée')
    console.log('Email de notification à envoyer à:', process.env.COMPANY_EMAIL || 'non configuré')
    return
  }

  // Vérifier si l'email de l'entreprise est configuré
  const companyEmail = process.env.COMPANY_EMAIL
  if (!companyEmail) {
    console.log('⚠️ COMPANY_EMAIL non configurée - Email de notification non envoyé')
    return
  }

  const serviceType = serviceTypeLabels[reservation.serviceType] || reservation.serviceType
  const fromEmail = process.env.FROM_EMAIL || 'noreply@hern-taxi.fr'
  const fromName = process.env.FROM_NAME || 'Hern Taxi'
  const reservationId = reservation.id.slice(0, 8).toUpperCase()

  // Gérer plusieurs emails (séparés par des virgules)
  const emailList = companyEmail.split(',').map(email => ({
    email: email.trim(),
  }))

  console.log('📧 Configuration email notification Brevo:', {
    from: fromEmail,
    fromName: fromName,
    to: emailList,
    apiKeyPresent: !!BREVO_API_KEY
  })
  
  // Avertissement si FROM_EMAIL n'est pas configuré
  if (!process.env.FROM_EMAIL) {
    console.warn('⚠️ FROM_EMAIL non configuré - Utilisation de la valeur par défaut:', fromEmail)
    console.warn('⚠️ IMPORTANT: L\'email FROM doit être vérifié dans Brevo (Settings > Senders & IP)')
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: fromName,
          email: fromEmail,
        },
        to: emailList,
        subject: `🆕 Nouvelle réservation #${reservationId} - ${serviceType}`,
        htmlContent: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #000000; padding: 30px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">HERN TAXI</h1>
                        <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Service de transport professionnel</p>
                      </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 600;">Nouvelle réservation reçue</h2>
                        
                        <!-- Alert Box -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 20px;">
                              <p style="margin: 0; color: #856404; font-size: 15px; font-weight: 600;">⚠️ Action requise : Une nouvelle réservation nécessite votre attention.</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Client Info Card -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 20px;">
                          <tr>
                            <td style="padding: 25px;">
                              <h3 style="margin: 0 0 20px 0; color: #000000; font-size: 18px; font-weight: 600; border-bottom: 2px solid #000000; padding-bottom: 10px;">Informations client</h3>
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 120px;"><strong style="color: #000000;">Nom :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px; font-weight: 600;">${orNonRenseigne(`${client.firstName} ${client.lastName}`)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Email :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">
                                    ${client.email ? `<a href="mailto:${client.email}" style="color: #000000; text-decoration: none; font-weight: 600;">${client.email}</a>` : NON_RENSEIGNE}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Téléphone :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px; font-weight: 600;">
                                    ${client.phone ? `<a href="tel:${client.phone.replace(/\s/g, '')}" style="color: #000000; text-decoration: none;">${client.phone}</a>` : NON_RENSEIGNE}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Reservation Details Card -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 25px;">
                              <h3 style="margin: 0 0 20px 0; color: #000000; font-size: 18px; font-weight: 600; border-bottom: 2px solid #000000; padding-bottom: 10px;">Détails de la réservation</h3>
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 140px;"><strong style="color: #000000;">Numéro :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px; font-weight: 600;">#${reservationId}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Service :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${serviceType}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Date :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${formatDate(reservation.pickupDate)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Heure :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${formatTime(reservation.pickupTime)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong style="color: #000000;">Départ :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${orNonRenseigne(reservation.pickupAddress)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong style="color: #000000;">Destination :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${orNonRenseigne(reservation.dropoffAddress)}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Passagers :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.passengers}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Bagages :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.luggage}</td>
                                </tr>
                                ${reservation.flightNumber ? `
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong style="color: #000000;">Numéro de vol :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.flightNumber}</td>
                                </tr>
                                ` : ''}
                                ${reservation.notes ? `
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong style="color: #000000;">Notes :</strong></td>
                                  <td style="padding: 8px 0; color: #000000; font-size: 14px;">${reservation.notes}</td>
                                </tr>
                                ` : ''}
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0; color: #666666; font-size: 13px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                          Cette notification a été envoyée automatiquement par le système de réservation.
                        </p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
                        <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; font-weight: 600;">Hern Taxi</p>
                        <p style="margin: 0; color: #999999; font-size: 12px;">Service disponible 24h/24 et 7j/7</p>
                        <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px;">Chambéry, Aix-les-Bains et région Savoie</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('❌ Erreur Brevo API:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      })
      // Ne pas faire échouer la création de réservation si l'email de notification échoue
      return
    }

    console.log('✅ Email de notification envoyé à:', companyEmail)
    console.log('📧 Réponse Brevo:', data)
    console.log('📋 Détails:', {
      messageId: data.messageId,
      from: fromEmail,
      to: emailList,
      subject: `🆕 Nouvelle réservation #${reservationId} - ${serviceType}`
    })
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de notification:', error)
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
// Aucun champ n'est obligatoire : une valeur absente est enregistrée vide (chaîne vide, ou null pour
// l'e-mail et la date, seules colonnes où le vide ne tient pas).
interface ReservationRequestBody {
  firstName?: unknown
  lastName?: unknown
  email?: unknown
  phone?: unknown
  serviceType?: unknown
  pickupAddress?: unknown
  dropoffAddress?: unknown
  pickupDate?: unknown
  pickupTime?: unknown
  passengers?: number
  luggage?: number
  flightNumber?: string | null
  notes?: string | null
  vehicleId?: string | null
}

const clean = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

export async function POST(request: NextRequest) {
  try {
    const body: ReservationRequestBody = await request.json()

    const firstName = clean(body.firstName)
    const lastName = clean(body.lastName)
    const email = clean(body.email) || null
    const phone = clean(body.phone)
    const pickupDate = clean(body.pickupDate)
    const pickupTime = clean(body.pickupTime)

    // L'e-mail est la seule clé qui identifie un client. Sans lui, on crée toujours un nouveau client :
    // rattacher toutes les demandes anonymes au même client écraserait ses coordonnées.
    const existingClient = email
      ? await prisma.client.findUnique({ where: { email } })
      : null

    const client = existingClient
      ? await prisma.client.update({
          where: { id: existingClient.id },
          // Un champ laissé vide cette fois-ci n'efface pas ce que le client avait donné avant.
          data: {
            ...(firstName ? { firstName } : {}),
            ...(lastName ? { lastName } : {}),
            ...(phone ? { phone } : {}),
          },
        })
      : await prisma.client.create({
          data: { firstName, lastName, email, phone },
        })

    // Combiner date et heure pour créer un DateTime complet ; sans date, rien à combiner
    const combined = pickupDate
      ? new Date(pickupTime ? `${pickupDate}T${pickupTime}:00` : pickupDate)
      : null
    const pickupDateTime = combined && !Number.isNaN(combined.getTime()) ? combined : null

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        clientId: client.id,
        vehicleId: body.vehicleId || null,
        serviceType: clean(body.serviceType) || 'ville',
        pickupAddress: clean(body.pickupAddress),
        dropoffAddress: clean(body.dropoffAddress),
        pickupDate: pickupDateTime,
        pickupTime,
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
