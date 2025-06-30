
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8 w-full font-sans">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About / Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Smart Indoor Decors
          </h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for electronics, fashion, home appliances, and
            more. Experience fast delivery and excellent service.
          </p>
          <div className="flex gap-4 mt-5">
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Offers
              </a>
            </li>
            <li>
              <a href="/register" className="hover:underline">
                My Account
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get the latest deals and product updates.
          </p>
          <form className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-12 pt-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between items-center text-sm text-gray-400 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Smart Indoor Decors. All rights
            reserved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>support@Smar.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+254 700 123456</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
