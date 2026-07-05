import { site, serviceAreas } from './site';
import { products, faqs, type Location } from './content';

const BID = `${site.url}/#business`;

// LocalBusiness / HomeAndConstructionBusiness — the core entity.
// `areaOverride` lets a suburb page emphasise that one location.
export function localBusiness(areaOverride?: string) {
  const areas = (areaOverride ? [areaOverride, ...serviceAreas] : serviceAreas)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((name) => ({ '@type': 'Place', name }));
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': BID,
    name: site.name,
    url: site.url,
    image: site.url + site.ogImage,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    foundingDate: site.founded,
    slogan: 'The mobile blinds showroom that comes to you.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      postalCode: site.postalCode,
      addressCountry: 'AU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areas,
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.ratingValue,
      reviewCount: site.reviewCount,
    },
    makesOffer: {
      '@type': 'Offer',
      name: 'Free in-home measure and quote',
      price: '0',
      priceCurrency: 'AUD',
    },
  };
}

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Blinds, shutters and curtains — supply and install',
    provider: { '@id': BID },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      geoRadius: String(site.serviceRadiusMetres),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Window furnishings',
      itemListElement: products.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.name },
      })),
    },
  };
}

export function faqSchema(items = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumb(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: site.url + t.url,
    })),
  };
}
