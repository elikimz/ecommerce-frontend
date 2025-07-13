import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/seo/SEO";
import { createOrganizationSchema } from "../components/seo/schemas";

const About = () => {
  const organizationSchema = createOrganizationSchema();

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <SEO
        title="About Us | Smart Indoor Decors"
        description="Learn more about Smart Indoor Decors – your trusted online store for stylish and affordable home decor products in Kenya. Founded in Kenya with fast delivery."
        keywords="about Smart Indoor Decors, Kenya home decor, interior design company, home decor history, about us"
        structuredData={organizationSchema}
        canonical="https://www.smartindoordecors.com/about"
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
          About Smart Indoor Decors
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At <strong>Smart Indoor Decors</strong>, we believe your home should
          reflect your style — without breaking the bank. That’s why we offer a
          carefully curated selection of trendy, functional, and affordable
          decor products for every space in your home.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Founded in Kenya, our mission is to bring convenience and elegance
          into every home by providing top-quality indoor decor items,
          lightning-fast delivery, and unbeatable customer service.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Whether you're looking for stylish shelves, cozy lighting, artistic
          wall clocks, or other unique pieces — we’ve got something to match
          your taste.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          We’re proud to serve homes all across Kenya. Thank you for choosing
          Smart Indoor Decors!
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default About;
