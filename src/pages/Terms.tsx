
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Terms and Conditions | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for shopping at Smart Indoor Decors – your trusted source for fashion, lifestyle, and decor products in Kenya."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/terms" />
      </Helmet>

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow text-gray-700">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="mb-4 text-sm text-gray-500 italic text-center">
          Effective Date: June 21, 2025
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Welcome to <strong>Smart Indoor Decors</strong>. By using our
            website (
            <a
              href="https://www.smartindoordecors.com"
              className="text-orange-600 hover:underline"
            >
              smartindoordecors.com
            </a>
            ), you agree to these Terms and Conditions. If you do not accept
            them, please do not use our site or services.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            1. Use of Our Website
          </h2>
          <ul className="list-disc ml-6">
            <li>Use the site for lawful purposes only.</li>
            <li>No automated scraping or hacking attempts.</li>
            <li>You agree not to harm, misuse, or exploit the site.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            2. Product Information
          </h2>
          <p>
            While we strive for accuracy, we do not guarantee that all product
            descriptions, images, or pricing are error-free. We reserve the
            right to correct any errors.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            3. Orders & Payments
          </h2>
          <p>
            Orders are confirmed upon successful payment. We accept M-Pesa and
            selected mobile payment options.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            4. Shipping & Delivery
          </h2>
          <p>
            Orders are delivered within 1–5 business days in Kenya. Delivery
            delays may occur due to external factors.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            5. Returns & Refunds
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Returns accepted within 7 days for damaged or incorrect items.
            </li>
            <li>Refunds processed within 5–10 business days upon approval.</li>
            <li>Items must be unused and in original packaging.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            6. Intellectual Property
          </h2>
          <p>
            All website content is the property of Smart Indoor Decors. Do not
            copy, reuse, or redistribute without permission.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            7. Limitation of Liability
          </h2>
          <p>
            We are not responsible for indirect damages, delays, or third-party
            service failures.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            8. Privacy Policy
          </h2>
          <p>
            See our{" "}
            <a href="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </a>{" "}
            for how we use your personal data.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            9. Changes to Terms
          </h2>
          <p>
            We may update these Terms at any time. Continued use of our site
            means you accept the latest version.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            10. Contact Us
          </h2>
          <p>
            Email:{" "}
            <a
              href="mailto:smartindoordecors@gmail.com"
              className="text-orange-600 hover:underline"
            >
              smartindoordecors@gmail.com
            </a>
            <br />
            Phone:{" "}
            <a
              href="tel:+254741769787"
              className="text-orange-600 hover:underline"
            >
              +254 741 769 787
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
