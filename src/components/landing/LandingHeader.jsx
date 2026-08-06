import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaCalendarCheck,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={closeMenu}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <FaCalendarCheck size={18} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Clinic Appointment
            </h1>
            <p className="hidden text-xs text-gray-500 sm:block">
              Smart Healthcare Scheduling
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Sign In
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FaTimes size={20} />
          ) : (
            <FaBars size={20} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="block rounded-lg border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Sign In
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
                className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default LandingHeader;