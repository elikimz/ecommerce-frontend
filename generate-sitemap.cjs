const fs = require("fs");
const axios = require("axios");

const BASE_URL = "https://www.smartindoordecors.com";
const API_URL = "https://ecommerce-backend-yeq9.onrender.com/products";

const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/faq",
  "/shop",
  "/terms",
  "/privacy",
  "/services",
  "/contact",
  "/testimonials",
];

async function fetchAllProducts() {
  const allProducts = [];
  let skip = 0;
  const limit = 50;
  let hasMore = true;

  while (hasMore) {
    const url = `${API_URL}/?skip=${skip}&limit=${limit}`;
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data.length > 0) {
        allProducts.push(...data);
        skip += limit;
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("❌ Failed to fetch products:", err.message);
      hasMore = false;
    }
  }

  return allProducts;
}

async function generateSitemap() {
  try {
    const products = await fetchAllProducts();

    const staticUrls = staticRoutes
      .map(
        (route) => `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`
      )
      .join("");

    const productUrls = products
      .map(
        (product) => `
    <url>
      <loc>${BASE_URL}/product/${product.id}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${productUrls}
</urlset>`;

    fs.writeFileSync("./public/sitemap.xml", sitemap.trim());
    console.log("✅ Sitemap generated at public/sitemap.xml");
  } catch (error) {
    console.error("❌ Failed to generate sitemap:", error.message);
  }
}

generateSitemap();
