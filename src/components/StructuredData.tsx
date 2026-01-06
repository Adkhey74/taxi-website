export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.herntaxi.fr/#organization",
    "name": "Hern Taxi",
    "description": "Service de taxi fiable et professionnel pour tous vos déplacements. Aéroport, ville, transport médical, stations de ski. Disponible 24h/24 et 7j/7 à Chambéry, Aix-les-Bains et région Savoie.",
    "url": "https://www.herntaxi.fr",
    "logo": "https://www.herntaxi.fr/images/logo/logo%20hern%20(3).png",
    "image": "https://res.cloudinary.com/dufmpr5dh/image/upload/v1767287362/classv_jinqie.jpg",
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
            "name": "Transfert stations de ski",
            "description": "Service de transfert vers les stations de ski de Tarentaise et Haute-Tarentaise"
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

