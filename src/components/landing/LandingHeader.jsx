import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaCalendarCheck,
  FaTimes,
} from "react-icons/fa";

function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="relative border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FaCalendarCheck />
            </div>

            {/* Desktop / Tablet Logo */}
            <span className="hidden text-lg font-bold text-gray-900 sm:block">
              Clinic Appointment System
            </span>

            {/* Small Mobile Logo */}
            <span className="text-lg font-bold text-gray-900 sm:hidden">
              Clinic
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-gray-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-gray-600 transition hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-gray-600 transition hover:text-blue-600"
          >
            Contact
          </a>
        </nav>

        {/* Right */}
        <Link
          to="/login"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t bg-white shadow-md md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            <a
              href="#features"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default LandingHeader;