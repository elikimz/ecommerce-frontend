



import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Blog = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Smart Indoor Decors Blog | Home Decor Ideas in Kenya</title>
        <meta
          name="description"
          content="Discover inspiring home decor tips, modern interior design ideas, and styling guides tailored for Kenyan homes. Read practical advice on decorating your living room, bedroom, and workspace using Smart Indoor Decors products."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Smart Indoor Decors Blog",
            url: "https://www.smartindoordecors.com/blog",
            description:
              "Inspiring home decor ideas, interior design tips, and lifestyle guides for Kenyan homes.",
            publisher: {
              "@type": "Organization",
              name: "Smart Indoor Decors",
              logo: {
                "@type": "ImageObject",
                url: "https://www.smartindoordecors.com/logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
          Smart Indoor Decors Blog: Transform Your Kenyan Home
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Welcome to our official blog — your trusted space for{" "}
          <strong>budget-friendly decor tips</strong>,{" "}
          <strong>furniture styling guides</strong>, and{" "}
          <strong>interior inspiration for Kenyan homes</strong>. Whether you're
          decorating a small apartment in Nairobi or renovating your family
          home, we have ideas for you.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Blog Post 1 */}
          <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <h2
              itemProp="headline"
              className="text-xl font-semibold text-orange-500 mb-2"
            >
              5 Affordable Ways to Upgrade Your Living Room in Kenya
            </h2>
            <p className="text-gray-600 text-sm mb-3" itemProp="description">
              Discover cost-effective ways to elevate your living space using
              accent chairs, scented candles, rugs, and throw pillows —
              available at Smart Indoor Decors.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Tags:{" "}
              <span className="text-orange-500">affordable decor Kenya</span>,{" "}
              <span className="text-orange-500">accent chairs Nairobi</span>,{" "}
              <span className="text-orange-500">living room design KE</span>
            </p>
            <a
              href="/shop"
              className="text-sm text-orange-600 font-medium hover:underline"
              itemProp="mainEntityOfPage"
            >
              Shop Living Room Products →
            </a>
          </article>

          {/* Blog Post 2 */}
          <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <h2
              itemProp="headline"
              className="text-xl font-semibold text-orange-500 mb-2"
            >
              How to Choose the Right Wall Clock for Your Kenyan Space
            </h2>
            <p className="text-gray-600 text-sm mb-3" itemProp="description">
              Wall clocks can enhance your home’s character. Learn how to select
              the right clock based on your wall color, room theme, and space.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Tags: <span className="text-orange-500">wall clocks Kenya</span>,{" "}
              <span className="text-orange-500">home accessories KE</span>,{" "}
              <span className="text-orange-500">Nairobi interior style</span>
            </p>
            <a
              href="/shop"
              className="text-sm text-orange-600 font-medium hover:underline"
              itemProp="mainEntityOfPage"
            >
              View Decorative Wall Clocks →
            </a>
          </article>

          {/* Blog Post 3 */}
          <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <h2
              itemProp="headline"
              className="text-xl font-semibold text-orange-500 mb-2"
            >
              Bedroom Glow-Up: Choosing Curtains, Bedding & Lighting
            </h2>
            <p className="text-gray-600 text-sm mb-3" itemProp="description">
              Your bedroom deserves more than plain curtains. Upgrade with
              blackout drapes, pendant lighting, and breathable bedding.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Tags:{" "}
              <span className="text-orange-500">bedroom makeover Kenya</span>,{" "}
              <span className="text-orange-500">blackout curtains Nairobi</span>
              , <span className="text-orange-500">home lighting ideas KE</span>
            </p>
            <a
              href="/shop"
              className="text-sm text-orange-600 font-medium hover:underline"
              itemProp="mainEntityOfPage"
            >
              Browse Bedroom Collection →
            </a>
          </article>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Why Follow Our Blog?
          </h3>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li>Stay up-to-date on seasonal decor trends in Kenya</li>
            <li>Get expert styling advice for small spaces and bedsitters</li>
            <li>
              Learn how to match Smart Indoor Decors products with your
              lifestyle
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
