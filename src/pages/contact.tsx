import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Contact Us | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Get in touch with Smart Indoor Decors. Call or email us for support, orders, or business inquiries across Kenya."
        />
        <link
          rel="canonical"
          href="https://www.smartindoordecors.com/contact"
        />
      </Helmet>

      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-8">
          We're here to help! Reach out through the contacts below for
          questions, orders, or partnerships.
        </p>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Call or WhatsApp
            </h2>
            <a
              href="tel:+254741769787"
              className="text-orange-600 text-xl hover:underline"
            >
              +254 741 769 787
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <a
              href="mailto:smartdoordecors@gmail.com"
              className="text-orange-600 text-lg hover:underline"
            >
              smartdoordecors@gmail.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
