export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: { name: string };
  warranty?: string;
  image_url: string;
  rating?: number;
  reviewCount?: number;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Smart Indoor Decors",
  url: "https://www.smartindoordecors.com",
  logo: "https://www.smartindoordecors.com/logo.png",
  description:
    "Leading provider of trendy home decor and interior design products in Kenya",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254-XXX-XXXX",
    contactType: "customer service",
    availableLanguage: ["English", "Swahili"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
    addressLocality: "Nairobi",
  },
  sameAs: [
    "https://www.instagram.com/smartindoordecors",
    "https://www.facebook.com/smartindoordecors",
  ],
});

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Smart Indoor Decors",
  url: "https://www.smartindoordecors.com",
  description: "Shop trending home decor products online in Kenya",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.smartindoordecors.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const createProductSchema = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description:
    product.description ||
    "Quality home decor product from Smart Indoor Decors",
  image: product.image_url,
  sku: `SID-${product.id}`,
  brand: {
    "@type": "Brand",
    name: "Smart Indoor Decors",
  },
  category: product.category?.name || "Home Decor",
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "KES",
    availability: `https://schema.org/${product.availability || "InStock"}`,
    seller: {
      "@type": "Organization",
      name: "Smart Indoor Decors",
    },
  },
  ...(product.rating && {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 1,
      bestRating: 5,
      worstRating: 1,
    },
  }),
});

export const createBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createFAQSchema = (
  faqs: Array<{ question: string; answer: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
