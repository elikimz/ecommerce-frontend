
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Privacy Policy | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Understand how Smart Indoor Decors collects, uses, and protects your personal data. Your privacy and trust are important to us."
        />
        <link
          rel="canonical"
          href="https://www.smartindoordecors.com/privacy"
        />
      </Helmet>

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow text-gray-700">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="mb-4 text-sm text-gray-500 italic text-center">
          Last Updated: June 21, 2025
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            This Privacy Policy explains how Smart Indoor Decors collects, uses,
            discloses, and protects your personal information when you visit our
            website or use our services.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6">
            <li>
              <strong>Personal Information:</strong> Name, phone number, email
              address, and delivery details when you place an order or register.
            </li>
            <li>
              <strong>Payment Details:</strong> M-Pesa or mobile payment
              confirmation (we do not store card or sensitive payment data).
            </li>
            <li>
              <strong>Device & Usage Info:</strong> IP address, browser type,
              pages visited, and usage patterns.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6">
            <li>To fulfill orders and provide customer support</li>
            <li>To improve our site and product offerings</li>
            <li>To send updates, offers, or respond to inquiries</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            3. Data Protection
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data from unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">4. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience. You can adjust
            your browser settings to reject cookies, but this may affect some
            functionality of the site.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            5. Sharing Your Data
          </h2>
          <p>
            We do not sell or trade your personal information. We may share data
            with trusted service providers for delivery, marketing, or analytics
            purposes – all under strict confidentiality agreements.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            6. Your Rights
          </h2>
          <p>
            You have the right to request access, correction, or deletion of
            your personal data. To make such a request, contact us using the
            details below.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            7. Third-Party Links
          </h2>
          <p>
            Our site may contain links to external websites. We are not
            responsible for the privacy practices or content of those sites.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy to reflect changes in our
            practices. Updates will be posted on this page with a revised
            effective date.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">9. Contact Us</h2>
          <p>
            If you have questions about this policy or how we handle your data:
          </p>
          <ul className="ml-6 list-disc">
            <li>
              Email:{" "}
              <a
                href="mailto:smartindoordecors@gmail.com"
                className="text-orange-600 hover:underline"
              >
                smartindoordecors@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+254741769787"
                className="text-orange-600 hover:underline"
              >
                +254 741 769 787
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
