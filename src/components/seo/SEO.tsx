import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  structuredData?: object;
  canonical?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = "Smart Indoor Decors",
  description = "Discover trending home decor products at Smart Indoor Decors. Shop affordable, stylish items delivered across Kenya.",
  keywords = "home decor, interior design, furniture, Kenya, online shopping, smart decor",
  image = "https://www.smartindoordecors.com/logo.png",
  type = "website",
  structuredData,
  canonical,
  noIndex = false,
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://www.smartindoordecors.com${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  const fullTitle =
    title === "Smart Indoor Decors" ? title : `${title} | Smart Indoor Decors`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Smart Indoor Decors" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Smart Indoor Decors" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
