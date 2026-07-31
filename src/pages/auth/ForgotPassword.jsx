import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend password reset logic will be added later.
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <FaCalendarCheck />
            </div>

            <span className="text-base font-bold text-gray-900 sm:text-lg">
              Clinic Appointment System
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaEnvelope size={20} />
          </div>

          {/* Heading */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Forgot your password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              No worries. Enter your email address and we'll send you a link
              to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@yourclinic.com"
                required
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaPaperPlane size={14} />
              Send reset link
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-7 border-t border-gray-200 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <FaArrowLeft size={12} />
              Back to sign in
            </Link>
          </div>

          {/* Security Message */}
          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-xs leading-5 text-gray-500">
              For your security, we'll only send password reset instructions
              to an email address associated with a clinic account.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-xs text-gray-500">
        Need help? Contact your clinic workspace administrator.
      </footer>
    </div>
  );
}

export default ForgotPassword;