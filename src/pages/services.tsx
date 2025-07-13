import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Truck, Headset, Star, Boxes } from "lucide-react";

const services = [
  {
    icon: <Truck className="w-10 h-10 text-orange-500" />,
    title: "Nationwide Delivery",
    description:
      "We deliver to all parts of Kenya quickly and safely. Enjoy reliable shipping whether you're in Nairobi or a remote town.",
  },
  {
    icon: <Boxes className="w-10 h-10 text-orange-500" />,
    title: "Wide Product Variety",
    description:
      "From home décor to fashion and electronics — we stock quality items across multiple categories to meet your lifestyle needs.",
  },
  {
    icon: <Star className="w-10 h-10 text-orange-500" />,
    title: "Top Quality Guarantee",
    description:
      "We carefully select all products to ensure durability, style, and value for money. Satisfaction is our top priority.",
  },
  {
    icon: <Headset className="w-10 h-10 text-orange-500" />,
    title: "Customer Support",
    description:
      "Need help with an order, product info, or returns? Our support team is here to help via email or phone.",
  },
];

// ✅ Schema markup
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "E-commerce Services",
  provider: {
    "@type": "Organization",
    name: "Smart Indoor Decors",
    url: "https://www.smartindoordecors.com",
    logo: "https://www.smartindoordecors.com/logo.png", // Make sure this exists
  },
  areaServed: {
    "@type": "Country",
    name: "Kenya",
  },
  description:
    "Nationwide delivery, quality product selection, customer support, and affordable home decor services by Smart Indoor Decors.",
};

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Our Services | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Explore the range of services offered by Smart Indoor Decors — including nationwide delivery, product variety, and support."
        />
        <link
          rel="canonical"
          href="https://www.smartindoordecors.com/services"
        />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-10">
          What We Offer
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
