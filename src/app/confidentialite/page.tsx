/* eslint-disable react/no-unescaped-entities */
"use client"

import { Phone, Mail, Shield, Database, Mail as MailIcon } from "lucide-react"

export default function ConfidentialitePage() {

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-foreground">
              Politique de confidentialité
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Introduction */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                </div>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    La présente politique de confidentialité décrit la manière dont Hern Taxi collecte, utilise et 
                    protège vos données personnelles lorsque vous utilisez notre site web et notre service de réservation 
                    en ligne.
                  </p>
                  <p>
                    Nous nous engageons à respecter votre vie privée et à protéger vos données personnelles conformément 
                    au Règlement Général sur la Protection des Données (RGPD) et à la loi "Informatique et Libertés" 
                    du 6 janvier 1978 modifiée.
                  </p>
                </div>
              </section>

              {/* Données collectées */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">2. Données personnelles collectées</h2>
                </div>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Lors de l'utilisation de notre formulaire de réservation, nous collectons les données personnelles 
                    suivantes :
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Données d'identification :</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Nom</li>
                      <li>Prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Données de réservation :</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Adresse de départ</li>
                      <li>Adresse de destination</li>
                      <li>Date et heure de la course</li>
                      <li>Nombre de passagers</li>
                      <li>Nombre de bagages</li>
                      <li>Type de service demandé</li>
                      <li>Numéro de vol (si applicable)</li>
                      <li>Notes complémentaires (optionnel)</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Note :</strong> Aucune donnée n'est collectée automatiquement. Toutes les données sont 
                    fournies volontairement par l'utilisateur lors de la soumission du formulaire de réservation.
                  </p>
                </div>
              </section>

              {/* Finalité de la collecte */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">3. Finalité de la collecte</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Les données personnelles collectées sont utilisées exclusivement pour les finalités suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Traitement de votre demande de réservation :</strong> Pour traiter, confirmer et 
                    organiser votre course de taxi</li>
                    <li><strong>Communication :</strong> Pour vous contacter concernant votre réservation (confirmation, 
                    modifications, annulations)</li>
                    <li><strong>Envoi d'emails de confirmation :</strong> Pour vous envoyer un email de confirmation 
                    de votre demande de réservation</li>
                    <li><strong>Gestion de la relation client :</strong> Pour répondre à vos questions et assurer le 
                    suivi de votre réservation</li>
                    <li><strong>Obligations légales et comptables :</strong> Pour respecter nos obligations légales de 
                    conservation des données</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers à des 
                    fins commerciales.</strong>
                  </p>
                </div>
              </section>

              {/* Base légale */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Base légale du traitement</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Le traitement de vos données personnelles est fondé sur les bases légales suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Exécution d'un contrat :</strong> Le traitement est nécessaire pour l'exécution du contrat 
                    de transport que vous souhaitez conclure</li>
                    <li><strong>Consentement :</strong> Vous consentez à la collecte et au traitement de vos données en 
                    soumettant le formulaire de réservation</li>
                    <li><strong>Obligations légales :</strong> Le traitement est nécessaire pour respecter nos obligations 
                    légales et comptables</li>
                  </ul>
                </div>
              </section>

              {/* Conservation des données */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Durée de conservation des données</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Vos données personnelles sont conservées pour les durées suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Données de réservation :</strong> [Durée de conservation, ex: 3 ans] à compter de la 
                    dernière utilisation, conformément aux obligations légales et comptables</li>
                    <li><strong>Données de contact :</strong> Jusqu'à ce que vous exerciez votre droit de suppression 
                    ou jusqu'à la fin de la période de conservation légale</li>
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Note :</strong> Veuillez remplacer [Durée de conservation] par la durée réelle de conservation 
                    que vous avez définie (généralement 3 ans pour les obligations comptables).
                  </p>
                </div>
              </section>

              {/* Destinataires des données */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <MailIcon className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">6. Destinataires des données</h2>
                </div>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Vos données personnelles sont destinées à :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Hern Taxi :</strong> Pour le traitement de votre demande de réservation et la gestion 
                    de la relation client</li>
                    <li><strong>Prestataire d'envoi d'emails (SendGrid) :</strong> Pour l'envoi des emails de confirmation 
                    et de notification. SendGrid agit en tant que sous-traitant et est soumis à des obligations strictes 
                    de confidentialité</li>
                    <li><strong>Hébergeur de la base de données :</strong> [Nom de l'hébergeur, ex: Railway, Vercel, etc.] 
                    pour le stockage sécurisé de vos données</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Nous ne transmettons pas vos données à des tiers à des fins commerciales ou publicitaires.</strong>
                  </p>
                </div>
              </section>

              {/* Sécurité des données */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">7. Sécurité des données</h2>
                </div>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données 
                    personnelles contre :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>L'accès non autorisé</li>
                    <li>La perte ou la destruction accidentelle</li>
                    <li>La modification ou la divulgation non autorisée</li>
                  </ul>
                  <p className="mt-4">
                    Ces mesures incluent notamment :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chiffrement des données en transit (HTTPS)</li>
                    <li>Stockage sécurisé dans une base de données protégée</li>
                    <li>Accès restreint aux données personnelles aux seules personnes autorisées</li>
                    <li>Utilisation de services d'hébergement et d'envoi d'emails conformes aux standards de sécurité</li>
                  </ul>
                </div>
              </section>

              {/* Vos droits */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">8. Vos droits</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <div>
                      <p className="font-semibold">Droit d'accès :</p>
                      <p className="text-sm">Vous pouvez demander à accéder à toutes les données personnelles que nous 
                      détenons sur vous.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Droit de rectification :</p>
                      <p className="text-sm">Vous pouvez demander la correction de données inexactes ou incomplètes.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Droit à l'effacement :</p>
                      <p className="text-sm">Vous pouvez demander la suppression de vos données personnelles, sous réserve 
                      de nos obligations légales de conservation.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Droit à la limitation du traitement :</p>
                      <p className="text-sm">Vous pouvez demander la limitation du traitement de vos données dans certains cas.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Droit à la portabilité :</p>
                      <p className="text-sm">Vous pouvez demander à recevoir vos données dans un format structuré et 
                      couramment utilisé.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Droit d'opposition :</p>
                      <p className="text-sm">Vous pouvez vous opposer au traitement de vos données pour des motifs légitimes.</p>
                    </div>
                  </div>
                  <p className="mt-4">
                    Pour exercer ces droits, vous pouvez nous contacter :
                  </p>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-2">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Par email :</p>
                        <a href="mailto:contact@hern-taxi.fr" className="text-primary hover:underline">
                          contact@hern-taxi.fr
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Par téléphone :</p>
                        <p>01 23 45 67 89 ou 06 58 68 65 48</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Nous nous engageons à répondre à votre demande dans un délai d'un mois maximum.
                  </p>
                </div>
              </section>

              {/* Cookies et technologies similaires */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">9. Cookies et technologies similaires</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    <strong>Ce site n'utilise pas de cookies de suivi ou d'analyse.</strong>
                  </p>
                  <p>
                    Aucun cookie n'est déposé sur votre appareil lors de votre navigation sur ce site. Nous n'utilisons 
                    pas de services d'analyse (comme Google Analytics) ni de cookies publicitaires.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Si nous devions utiliser des cookies à l'avenir, cette politique sera mise à jour et vous en serez 
                    informé.
                  </p>
                </div>
              </section>

              {/* Modifications de la politique */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">10. Modifications de la politique de confidentialité</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. 
                    Toute modification sera publiée sur cette page avec une indication de la date de mise à jour.
                  </p>
                  <p>
                    Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance de toute 
                    modification.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">11. Contact</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou le traitement de vos données 
                    personnelles, vous pouvez nous contacter :
                  </p>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Email :</p>
                        <a href="mailto:contact@hern-taxi.fr" className="text-primary hover:underline">
                          contact@hern-taxi.fr
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Téléphone :</p>
                        <p>01 23 45 67 89</p>
                        <p>06 58 68 65 48</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dernière mise à jour */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">12. Dernière mise à jour</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    La présente politique de confidentialité a été mise à jour le [date de mise à jour].
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

