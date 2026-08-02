import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserPlus,
  FaUserMd,
} from "react-icons/fa";
import { toast } from "sonner";

import { registerUser } from "../../services/authService";
import { getSpecialties } from "../../services/specialtyService";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [specialties, setSpecialties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSpecialties, setLoadingSpecialties] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialty_id: "",
    license_number: "",
    bio: "",
  });


  /**
   * Fetch specialties when
   * doctor role is selected
   */
  useEffect(() => {
    if (role !== "doctor") {
      return;
    }

    const fetchSpecialties = async () => {
      try {
        setLoadingSpecialties(true);

        const response =
          await getSpecialties();

        /*
         * Supports:
         * { data: [...] }
         * or
         * [...]
         */
        const specialtyData =
          response?.data || response;

        setSpecialties(
          Array.isArray(specialtyData)
            ? specialtyData
            : []
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load specialties."
        );
      } finally {
        setLoadingSpecialties(false);
      }
    };

    fetchSpecialties();
  }, [role]);


  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /**
   * Handle role change
   */
  const handleRoleChange = (e) => {
    const selectedRole =
      e.target.value;

    setRole(selectedRole);

    // Clear doctor-specific fields
    // when switching back to patient
    if (selectedRole === "patient") {
      setFormData((prev) => ({
        ...prev,
        specialty_id: "",
        license_number: "",
        bio: "",
      }));
    }
  };


  /**
   * Submit registration
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );

      return;
    }

    // Check doctor specialty
    if (
      role === "doctor" &&
      !formData.specialty_id
    ) {
      toast.error(
        "Please select your specialty."
      );

      return;
    }

    try {
      setLoading(true);

      const registrationData = {
        full_name:
          formData.full_name.trim(),

        email:
          formData.email.trim(),

        phone:
          formData.phone.trim(),

        password:
          formData.password,

        role,
      };


      // Add doctor fields only
      // for doctor registration
      if (role === "doctor") {
        registrationData.specialty_id =
          formData.specialty_id;

        registrationData.license_number =
          formData.license_number.trim();

        registrationData.bio =
          formData.bio.trim();
      }


      const response =
        await registerUser(
          registrationData
        );


      if (role === "doctor") {
        toast.success(
          "Registration successful! Your doctor account is pending admin approval."
        );
      } else {
        toast.success(
          "Registration successful! You can now sign in."
        );
      }


      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <FaCalendarCheck />
            </div>

            <span className="text-base font-bold text-gray-900 sm:text-lg">
              Clinic Appointment System
            </span>
          </Link>

          <p className="hidden text-sm text-gray-500 sm:block">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>

        </div>
      </header>


      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12">

        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaUserPlus size={20} />
          </div>


          {/* Heading */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Register to manage your clinic appointments and access healthcare services.
            </p>
          </div>


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Account Type */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Account type
              </label>

              <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                disabled={loading}
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="patient">
                  Patient
                </option>

                <option value="doctor">
                  Doctor
                </option>
              </select>
            </div>


            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full name
              </label>

              <input
                id="full_name"
                name="full_name"
                type="text"
                value={
                  formData.full_name
                }
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>


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
                value={
                  formData.email
                }
                onChange={handleChange}
                placeholder="name@example.com"
                required
                disabled={loading}
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>


            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={
                  formData.phone
                }
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={loading}
                className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>


            {/* Doctor Fields */}
            {role === "doctor" && (
              <div className="space-y-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">

                <div className="flex items-center gap-2">
                  <FaUserMd className="text-blue-600" />

                  <h2 className="text-sm font-bold text-gray-800">
                    Doctor information
                  </h2>
                </div>


                {/* Specialty */}
                <div>
                  <label
                    htmlFor="specialty_id"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Specialty
                  </label>

                  <select
                    id="specialty_id"
                    name="specialty_id"
                    value={
                      formData.specialty_id
                    }
                    onChange={handleChange}
                    required
                    disabled={
                      loading ||
                      loadingSpecialties
                    }
                    className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="">
                      {loadingSpecialties
                        ? "Loading specialties..."
                        : "Select your specialty"}
                    </option>

                    {specialties.map(
                      (specialty) => (
                        <option
                          key={
                            specialty.id
                          }
                          value={
                            specialty.id
                          }
                        >
                          {specialty.name}
                        </option>
                      )
                    )}
                  </select>
                </div>


                {/* License Number */}
                <div>
                  <label
                    htmlFor="license_number"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    License number
                    <span className="ml-1 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="license_number"
                    name="license_number"
                    type="text"
                    value={
                      formData.license_number
                    }
                    onChange={handleChange}
                    placeholder="Enter your medical license number"
                    disabled={loading}
                    className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>


                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Professional bio
                    <span className="ml-1 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={
                      formData.bio
                    }
                    onChange={handleChange}
                    placeholder="Tell us briefly about your professional experience..."
                    disabled={loading}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>

              </div>
            )}


            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.password
                  }
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  disabled={loading}
                  className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-400 transition hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>


            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-400 transition hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>


            {/* Doctor Approval Notice */}
            {role === "doctor" && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-6 text-amber-800">
                  Doctor registrations require admin approval.
                  Your account will remain inactive until an administrator
                  reviews and activates it.
                </p>
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                (role === "doctor" &&
                  loadingSpecialties)
              }
              className="min-h-11 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Creating account..."
                : role === "doctor"
                ? "Register as Doctor"
                : "Create Patient Account"}
            </button>

          </form>


          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>

        </section>
      </main>


      {/* Footer */}
      <footer className="px-4 py-6 text-center text-xs text-gray-500">
        Your information is securely handled by the clinic appointment system.
      </footer>

    </div>
  );
}

export default Register;