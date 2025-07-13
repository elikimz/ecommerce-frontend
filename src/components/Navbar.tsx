



import { useState } from "react";
import TopBar from "./TopBar";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow font-sans w-full bg-white z-50">
      {/* Promo bar */}
      <TopBar />

      {/* Navigation Links - Moved to the top */}
      <nav className="md:flex flex-col md:flex-row justify-center gap-3 text-sm font-medium py-2 border-b border-gray-200 px-4 text-gray-700 hidden">
        <a href="/" className="cursor-pointer hover:text-orange-500">
          Home
        </a>
        <a href="/shop" className="cursor-pointer hover:text-orange-500">
          Shop
        </a>
        <a href="/about" className="cursor-pointer hover:text-orange-500">
          About Us
        </a>
        <a href="/contact" className="cursor-pointer hover:text-orange-500">
          Contact
        </a>
        <a href="/blog" className="cursor-pointer hover:text-orange-500">
          Blog
        </a>
        <a href="/faq" className="cursor-pointer hover:text-orange-500">
          FAQ
        </a>
        <a href="/services" className="cursor-pointer hover:text-orange-500">
          Services
        </a>
        <a
          href="/testimonials"
          className="cursor-pointer hover:text-orange-500"
        >
          Testimonials
        </a>
      </nav>

      {/* Mobile Navigation Links - Conditionally rendered based on menuOpen state */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col justify-center gap-3 text-sm font-medium py-2 border-b border-gray-200 px-4 text-gray-700">
          <a href="/" className="cursor-pointer hover:text-orange-500">
            Home
          </a>
          <a href="/shop" className="cursor-pointer hover:text-orange-500">
            Shop
          </a>
          <a href="/about" className="cursor-pointer hover:text-orange-500">
            About Us
          </a>
          <a href="/contact" className="cursor-pointer hover:text-orange-500">
            Contact
          </a>
          <a href="/blog" className="cursor-pointer hover:text-orange-500">
            Blog
          </a>
          <a href="/faq" className="cursor-pointer hover:text-orange-500">
            FAQ
          </a>
          <a href="/services" className="cursor-pointer hover:text-orange-500">
            Services
          </a>
          <a
            href="/testimonials"
            className="cursor-pointer hover:text-orange-500"
          >
            Testimonials
          </a>
        </nav>
      )}

      {/* Main Header */}
      <div className="flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://ik.imagekit.io/tfldedf0z/WhatsApp%20Image%202025-06-17%20at%2010.15.25_097a022b.jpg?updatedAt=1750151265388"
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
          <h1 className="text-xl md:text-3xl font-bold text-orange-500">
            Smart Indoor Decors
          </h1>
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            className="flex items-center gap-1 text-sm focus:outline-none"
          >
            👤 <ChevronDownIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Login Section (Desktop) */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            className="flex items-center gap-1 text-sm focus:outline-none"
          >
            👤 <span>Login</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {showLoginDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-36 z-50">
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Login Dropdown */}
      {showLoginDropdown && (
        <div className="block md:hidden px-4 pb-2">
          <div className="bg-white shadow-md border rounded-md w-full z-40">
            <a
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
