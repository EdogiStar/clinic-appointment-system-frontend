import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "sonner";

import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await loginUser(formData);

    toast.success("Welcome back! Login successful.");

    console.log(data);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);

    if (!error.response) {
      toast.error(
        "Unable to reach the server. Please check your internet connection."
      );
    } else if (error.response.status === 401) {
      toast.error("Invalid email or password.");
    } else if (error.response.status === 403) {
      toast.error("Your account is not authorized.");
    } else if (error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    } else {
      toast.error(
        error.response.data?.message || "Login failed. Please try again."
      );
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <FaCalendarCheck />
            </div>

            <span className="text-base font-bold text-gray-900 sm:text-lg">
              Clinic Appointment System
            </span>
          </Link>

          <p className="hidden text-sm text-gray-500 sm:block">
            New to the system?{" "}
            <button
              type="button"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Request access
            </button>
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaLock size={20} />
          </div>

          {/* Heading */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage your clinic appointments and coordinate
              patient care.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@yourclinic.com"
                required
                disabled={loading}
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-500">
              <input
                type="checkbox"
                disabled={loading}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <span>Keep me signed in</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="min-h-11 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in to workspace"}
            </button>
          </form>

          {/* Security Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-[10px] font-semibold tracking-wider text-gray-400">
              SECURE CLINIC ACCESS
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Security Message */}
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex gap-3">
              <FaShieldAlt className="mt-0.5 shrink-0 text-lg text-emerald-500" />

              <p className="text-xs leading-5 text-gray-500">
                Your account is protected with secure authentication designed
                to keep clinic and patient information safe.
              </p>
            </div>
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

export default Login;