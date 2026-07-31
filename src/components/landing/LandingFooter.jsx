import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

function LandingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <FaCalendarCheck />
              </div>

              <span className="text-lg font-bold text-gray-900">
                Clinic Appointment System
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
              Manage clinic appointments with ease. A simple and modern
              platform designed to help healthcare teams coordinate
              appointments and provide better patient experiences.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <SocialLink
                icon={<FaFacebook />}
                label="Facebook"
              />

              <SocialLink
                icon={<FaTwitter />}
                label="Twitter"
              />

              <SocialLink
                icon={<FaInstagram />}
                label="Instagram"
              />

              <SocialLink
                icon={<FaLinkedin />}
                label="LinkedIn"
              />
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Platform
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <a
                  href="#features"
                  className="transition hover:text-blue-600"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition hover:text-blue-600"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Account
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-blue-600"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-blue-600"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Clinic Appointment System. All
            rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-gray-900"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-gray-900"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-blue-100 hover:text-blue-600"
    >
      {icon}
    </a>
  );
}

export default LandingFooter;