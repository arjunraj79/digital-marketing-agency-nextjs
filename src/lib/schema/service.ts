// src/lib/schema/service.ts
export interface ServiceSchemaData {
  name: string;
  description: string;
  serviceType: string;
  category: string;
  url: string;
  offers?: {
    name: string;
    description: string;
  }[];
}

export function generateServiceSchema(data: ServiceSchemaData, isSubService: boolean = false) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digitalarchitect.dev';
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "serviceType": data.serviceType,
    "category": data.category,
    "url": data.url,
    "areaServed": {
      "@type": "Country",
      "name": "Kuwait",
      "sameAs": "https://en.wikipedia.org/wiki/Kuwait"
    },
    "provider": {
      "@type": "Organization",
      "name": "Digital Architect Digital Marketing Agency",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kuwait City",
        "addressLocality": "Kuwait City",
        "addressRegion": "Al Asimah",
        "addressCountry": "KW"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+965-XXXX-XXXX",
        "contactType": "customer service",
        "email": "info@Digital Architect.com",
        "availableLanguage": ["English", "Arabic"]
      }
    },
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "KWD",
        "priceRange": "$$$"
      },
      "availability": "https://schema.org/InStock"
    },
    ...(data.offers && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": data.serviceType,
        "itemListElement": data.offers.map(offer => ({
          "@type": "Offer",
          "name": offer.name,
          "description": offer.description
        }))
      }
    }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "85"
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/Digital Architect",
      "https://www.instagram.com/Digital Architect",
      "https://twitter.com/Digital Architect"
    ],
    "image": [
      `${baseUrl}/images/digital-marketing-kuwait.jpg`
    ]
  };
}