import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Faith Wanjiku",
    feedback:
      "Amazing service! I ordered indoor décor and got it delivered to Nakuru in just 2 days. Quality was top notch!",
    location: "Nakuru, Kenya",
  },
  {
    name: "Kevin Otieno",
    feedback:
      "Very easy-to-use website, and the support team helped me choose the right furniture. Highly recommend!",
    location: "Kisumu, Kenya",
  },
  {
    name: "Aisha Mohammed",
    feedback:
      "I love the product variety! Ordered fashion and home items all in one checkout. The delivery was fast too.",
    location: "Mombasa, Kenya",
  },
  {
    name: "James Mwangi",
    feedback:
      "Great customer service, and the prices are very fair. Will definitely shop again!",
    location: "Thika, Kenya",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Customer Testimonials | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Read what our happy customers say about shopping with Smart Indoor Decors. Real reviews from across Kenya."
        />
        <link
          rel="canonical"
          href="https://www.smartindoordecors.com/testimonial"
        />
      </Helmet>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-10">
          What Our Customers Say
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <Quote className="text-orange-500 w-6 h-6 mb-4" />
              <p className="text-gray-700 italic mb-4">"{item.feedback}"</p>
              <h3 className="text-md font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonial;
