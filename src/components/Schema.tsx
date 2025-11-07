// src/components/Schema.tsx
'use client';

import { 
  Organization, 
  WebSite, 
  LocalBusiness, 
  WithContext, 
  Graph 
} from 'schema-dts';

interface SchemaProps {
  type: ('Organization' | 'WebSite' | 'LocalBusiness')[];
  locale: string;
}

export default function Schema({ type, locale }: SchemaProps) {
  const isArabic = locale === 'ar';
  const baseUrl = 'https://digitalarchitect.dev';

  const graph: WithContext<Graph> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: isArabic ? 'موصلنين' : 'Digital Architect Digital Marketing Agency',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}/#logo`,
          url: `${baseUrl}/logo.png`,
          contentUrl: `${baseUrl}/logo.png`,
          width: 112,
          height: 112,
          caption: isArabic ? 'شعار موصلنين' : 'Digital Architect Logo'
        },
        sameAs: [
          'https://www.facebook.com/Digital Architect',
          'https://twitter.com/Digital Architect',
          'https://www.instagram.com/Digital Architect',
          'https://www.linkedin.com/company/Digital Architect'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+965-XXXX-XXXX',
          contactType: 'customer service',
          areaServed: 'KW',
          availableLanguage: ['English', 'Arabic']
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: isArabic ? 'موصلنين' : 'Digital Architect Digital Marketing Agency',
        description: isArabic 
          ? 'وكالة التسويق الرقمي الرائدة في الكويت'
          : "Kuwait's Leading Digital Marketing Agency",
        publisher: {
          '@id': `${baseUrl}/#organization`
        },
        inLanguage: ['en', 'ar']
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#localbusiness`,
        name: isArabic ? 'موصلنين' : 'Digital Architect Digital Marketing Agency',
        url: baseUrl,
        logo: {
          '@id': `${baseUrl}/#logo`
        },
        parentOrganization: {
          '@id': `${baseUrl}/#organization`
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kuwait City',
          addressLocality: 'Kuwait City',
          addressRegion: 'Al Asimah',
          postalCode: '12345',
          addressCountry: 'KW'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 29.3759,
          longitude: 47.9774
        },
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00'
        }],
        priceRange: '$$$$'
      }
    ]
  };

  // Filter graph based on requested types
  const filteredGraph = {
    ...graph,
    '@graph': graph['@graph'].filter(item => 
      type.includes(item['@type'] as ('Organization' | 'WebSite' | 'LocalBusiness'))
    )
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(filteredGraph)
      }}
    />
  );
}