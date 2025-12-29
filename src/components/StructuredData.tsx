export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "[NOUVEAU_DOMAINE]/#organization", // À remplir après changement de domaine
    "name": "Hern Taxi",
    "description": "Service de taxi fiable et professionnel pour tous vos déplacements. Aéroport, ville, longue distance. Disponible 24h/24 et 7j/7.",
    "url": "[NOUVEAU_DOMAINE]", // À remplir après changement de domaine
    "logo": "[NOUVEAU_DOMAINE]/images/logo/logo.png", // À remplir après changement de domaine
    "image": "https://res.cloudinary.com/dufmpr5dh/image/upload/f_auto,q_auto,w_1200,h_630,c_limit/v1766938705/aeroport_i3lxia.jpg",
    "telephone": "+33658686548",
    "email": "contact@hern-taxi.fr",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chambéry",
      "addressRegion": "Savoie",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "[latitude]",
      "longitude": "[longitude]"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Chambéry"
      },
      {
        "@type": "City",
        "name": "Aix-les-Bains"
      },
      {
        "@type": "City",
        "name": "La Motte-Servolex"
      },
      {
        "@type": "State",
        "name": "Savoie"
      }
    ],
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "sameAs": [
      // Ajoutez vos liens réseaux sociaux ici si vous en avez
      // "https://www.facebook.com/hern-taxi",
      // "https://www.instagram.com/hern-taxi",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de transport",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Taxi aéroport",
            "description": "Service de transport vers et depuis l'aéroport"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport en ville",
            "description": "Service de transport en ville"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport médical",
            "description": "Transport médical conventionné CPAM"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Longue distance",
            "description": "Service de transport longue distance"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

