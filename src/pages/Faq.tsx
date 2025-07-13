import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import SEO from "../components/seo/SEO";
import { createFAQSchema } from "../components/seo/schemas";

const faqs = [
  {
    question: "What kind of products do you sell?",
    answer:
      "We offer a wide range of products including electronics, fashion, beauty, accessories, furniture, and home decor — all tailored for modern Kenyan lifestyles.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse our shop, click 'Add to Cart' on the product you want, and proceed to checkout. You can order as a guest or by creating a free account.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We support M-Pesa, debit/credit cards (Visa, Mastercard), and bank transfers. Your data is encrypted to ensure secure payments.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Nairobi are delivered in 1–2 business days. Deliveries outside Nairobi typically arrive in 2–4 business days.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes. You may return or exchange items within 7 days if unused and in original packaging. Contact our customer support team to get started.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once you place an order, we'll send SMS and email notifications with tracking links and delivery updates.",
  },
  {
    question: "Do you offer discounts or promotions?",
    answer:
      "Absolutely! Look out for seasonal sales, flash deals, and subscriber-only promos. Follow us on Instagram or sign up for our newsletter to stay updated.",
  },
  {
    question: "Is it safe to shop on your website?",
    answer:
      "Yes. Our site uses SSL encryption and secure payment gateways, ensuring that your personal and financial information stays protected.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = createFAQSchema(faqs);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <SEO
        title="FAQs | Smart Indoor Decors Kenya"
        description="Get instant answers to the most common questions about orders, delivery, payments, returns, and shopping securely with Smart Indoor Decors."
        keywords="FAQ, frequently asked questions, Smart Indoor Decors help, Kenya delivery, returns policy, payment methods"
        structuredData={faqSchema}
        canonical="https://www.smartindoordecors.com/faq"
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Need help? We’ve got answers. Below are some of the most frequently
          asked questions about shopping on{" "}
          <strong>Smart Indoor Decors Kenya</strong>. Can’t find what you’re
          looking for?{" "}
          <a
            href="/contact"
            className="text-orange-600 underline hover:text-orange-700"
          >
            Contact our support team
          </a>
          .
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition font-medium text-gray-800"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 bg-white text-gray-700 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
