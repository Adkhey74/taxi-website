/* eslint-disable react/no-unescaped-entities */
"use client"

import { Phone, Mail, MapPin } from "lucide-react"

export default function MentionsLegalesPage() {

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-foreground">
              Mentions légales
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Éditeur du site */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">1. Éditeur du site</h2>
                <div className="space-y-2 text-foreground/90">
                  <p><strong>Dénomination sociale :</strong> [Nom de l'entreprise]</p>
                  <p><strong>Forme juridique :</strong> [SARL / EURL / Auto-entrepreneur / etc.]</p>
                  <p><strong>Siège social :</strong> [Adresse complète du siège social]</p>
                  <p><strong>SIRET :</strong> [Numéro SIRET]</p>
                  <p><strong>RCS :</strong> [Numéro RCS et ville du greffe]</p>
                  <p><strong>Capital social :</strong> [Montant du capital social]</p>
                  <p><strong>TVA intracommunautaire :</strong> [Numéro de TVA si applicable]</p>
                </div>
              </section>

              {/* Directeur de publication */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Directeur de publication</h2>
                <div className="space-y-2 text-foreground/90">
                  <p><strong>Nom :</strong> [Nom du directeur de publication]</p>
                  <p><strong>Fonction :</strong> [Fonction]</p>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">3. Contact</h2>
                <div className="space-y-4 text-foreground/90">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Téléphone :</p>
                      <p>01 23 45 67 89</p>
                      <p>06 58 68 65 48</p>
                    </div>
                  </div>
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
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Zone de service :</p>
                      <p>Chambéry, Aix-les-Bains, La Motte-Servolex et région</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hébergeur */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">4. Hébergement</h2>
                <div className="space-y-2 text-foreground/90">
                  <p><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
                  <p><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
                  <p><strong>Téléphone :</strong> [Numéro de téléphone de l'hébergeur]</p>
                  <p><strong>Site web :</strong> [URL du site de l'hébergeur]</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Note : Si vous utilisez Railway, Vercel, ou un autre service d'hébergement, 
                    veuillez remplacer ces informations par les données de votre hébergeur.
                  </p>
                </div>
              </section>

              {/* Propriété intellectuelle */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">5. Propriété intellectuelle</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                    et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
                    documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                  <p>
                    La reproduction de tout ou partie de ce site sur un support électronique ou autre est formellement 
                    interdite sauf autorisation expresse du directeur de publication.
                  </p>
                  <p>
                    La reproduction des textes de ce site sur un support papier est autorisée, notamment dans un cadre 
                    pédagogique, sous réserve du respect des trois conditions suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>gratuité de la diffusion</li>
                    <li>respect de l'intégrité des documents reproduits (pas de modification ni altération)</li>
                    <li>citation claire et lisible de la source sous la forme : "Document issu du site Hern Taxi - 
                    [URL de la page concernée] - Droits de reproduction réservés et limités"</li>
                  </ul>
                </div>
              </section>

              {/* Protection des données personnelles */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">6. Protection des données personnelles</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement 
                    Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, 
                    de suppression et d'opposition aux données personnelles vous concernant.
                  </p>
                  <p>
                    <strong>Données collectées :</strong> Lors de l'utilisation du formulaire de réservation, nous 
                    collectons les informations suivantes : nom, prénom, adresse email, numéro de téléphone, adresse 
                    de départ, destination, date et heure de la course, nombre de passagers, bagages, et éventuellement 
                    le numéro de vol et des notes complémentaires.
                  </p>
                  <p>
                    <strong>Finalité :</strong> Ces données sont collectées uniquement dans le but de traiter votre 
                    demande de réservation de transport et de vous contacter pour confirmer votre réservation.
                  </p>
                  <p>
                    <strong>Conservation :</strong> Les données sont conservées pour une durée de [durée de conservation, 
                    ex: 3 ans] à compter de la dernière utilisation, conformément aux obligations légales et comptables.
                  </p>
                  <p>
                    <strong>Destinataires :</strong> Les données collectées sont destinées à Hern Taxi pour le traitement 
                    de votre demande. Elles ne sont en aucun cas transmises à des tiers à des fins commerciales.
                  </p>
                  <p>
                    <strong>Vos droits :</strong> Vous pouvez exercer vos droits d'accès, de rectification, de suppression 
                    et d'opposition en nous contactant à l'adresse suivante : 
                    <a href="mailto:contact@hern-taxi.fr" className="text-primary hover:underline ml-1">
                      contact@hern-taxi.fr
                    </a>
                  </p>
                  <p>
                    Pour plus d'informations détaillées, consultez notre 
                    <a href="/confidentialite" className="text-primary hover:underline ml-1">
                      politique de confidentialité
                    </a>.
                  </p>
                </div>
              </section>

              {/* Responsabilité */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">7. Responsabilité</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement 
                    remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                  </p>
                  <p>
                    Hern Taxi ne pourra être tenu responsable des dommages directs et indirects causés au matériel de 
                    l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant 
                    pas aux spécifications, soit de l'apparition d'un bug ou d'une incompatibilité.
                  </p>
                  <p>
                    Hern Taxi ne pourra également être tenu responsable des dommages indirects consécutifs à l'utilisation 
                    du site. Le formulaire de réservation en ligne permet aux utilisateurs de transmettre leurs demandes. 
                    Hern Taxi se réserve le droit de traiter ou de refuser toute demande qui ne respecterait pas les 
                    conditions d'utilisation ou qui contreviendrait à la législation applicable en France.
                  </p>
                  <p>
                    Les liens hypertextes mis en place dans le cadre du présent site en direction d'autres ressources 
                    présentes sur le réseau Internet ne sauraient engager la responsabilité de Hern Taxi.
                  </p>
                </div>
              </section>

              {/* Droit applicable */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">8. Droit applicable</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord 
                    amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                  </p>
                </div>
              </section>

              {/* Dernière mise à jour */}
              <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">9. Dernière mise à jour</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    Les présentes mentions légales ont été mises à jour le [date de mise à jour].
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

