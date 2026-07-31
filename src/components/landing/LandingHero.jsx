import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function LandingHero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        {/* Left Content */}
        <div className="min-w-0">
          {/* Badge */}
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:text-sm">
            <FaCheckCircle className="shrink-0" />
            <span>Simple and reliable clinic scheduling</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Manage Clinic Appointments with Ease.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            A simple and modern platform that helps clinics manage
            appointments, doctors, patients, and daily schedules from one
            convenient workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Get Started
              <FaArrowRight className="text-sm" />
            </Link>

            <a
              href="#features"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>

          {/* Benefits */}
          <div className="mt-8 flex flex-col gap-3 text-sm text-gray-600 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="shrink-0 text-emerald-500" />
              <span>Easy appointment management</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="shrink-0 text-emerald-500" />
              <span>Organized patient records</span>
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="min-w-0">
          <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:p-4">
            <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
              {/* Preview Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Today's Schedule
                  </p>

                  <h2 className="mt-1 truncate text-lg font-bold text-gray-900 sm:text-xl">
                    Clinic Appointments
                  </h2>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <FaCalendarCheck />
                </div>
              </div>

              {/* Appointment List */}
              <div className="mt-5 space-y-3">
                {/* Appointment 1 */}
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                  <div className="w-14 shrink-0 text-center">
                    <p className="text-sm font-bold text-gray-900">09:00</p>
                    <p className="mt-1 text-xs text-gray-500">AM</p>
                  </div>

                  <div className="h-10 w-1 shrink-0 rounded-full bg-blue-600" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      John Doe
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      Dr. Sarah Ahmed · Consultation
                    </p>
                  </div>

                  <span className="hidden shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 sm:block">
                    Confirmed
                  </span>
                </div>

                {/* Appointment 2 */}
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                  <div className="w-14 shrink-0 text-center">
                    <p className="text-sm font-bold text-gray-900">10:30</p>
                    <p className="mt-1 text-xs text-gray-500">AM</p>
                  </div>

                  <div className="h-10 w-1 shrink-0 rounded-full bg-emerald-500" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      Mary Johnson
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      Dr. Michael · Follow-up visit
                    </p>
                  </div>

                  <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 sm:block">
                    Checked in
                  </span>
                </div>

                {/* Appointment 3 */}
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                  <div className="w-14 shrink-0 text-center">
                    <p className="text-sm font-bold text-gray-900">01:00</p>
                    <p className="mt-1 text-xs text-gray-500">PM</p>
                  </div>

                  <div className="h-10 w-1 shrink-0 rounded-full bg-blue-600" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      David Williams
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      Dr. Sarah Ahmed · Care review
                    </p>
                  </div>

                  <span className="hidden shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 sm:block">
                    Pending
                  </span>
                </div>
              </div>

              {/* Bottom Summary */}
              <div className="mt-4 flex flex-col gap-3 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Upcoming appointments
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      12 appointments today
                    </p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-emerald-600">
                  4 available slots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;