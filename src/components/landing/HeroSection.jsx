import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaUserMd,
} from "react-icons/fa";

function HeroSection() {
  return (
    <section className="overflow-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        {/* Hero Content */}
        <div className="min-w-0">
          {/* Badge */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <FaCalendarCheck className="shrink-0" />
            <span>Smart Healthcare Scheduling</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Manage Clinic Appointments with Ease.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            A modern clinic appointment system that helps administrators,
            doctors, and patients manage appointments efficiently through a
            secure and intuitive platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:text-base"
            >
              Get Started
              <FaArrowRight className="ml-2" />
            </Link>

            <button
              type="button"
              className="min-h-12 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:text-base"
            >
              Learn More
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Benefit
              icon={<FaCalendarCheck />}
              text="Easy Appointment Booking"
            />

            <Benefit
              icon={<FaUserMd />}
              text="Doctor Availability"
            />

            <Benefit
              icon={<FaClock />}
              text="Real-time Schedule"
            />
          </div>
        </div>

        {/* Appointment Preview */}
        <div className="mt-12 min-w-0 lg:mt-0">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
                  Today's Schedule
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Clinic Appointments
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Monday, October 14
                </p>
              </div>

              <button
                type="button"
                aria-label="Add appointment"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
              >
                <FaPlus />
              </button>
            </div>

            {/* Appointments */}
            <div className="mt-6 space-y-4">
              <AppointmentCard
                time="09:00 AM"
                patient="John Doe"
                doctor="Dr. Sarah Ahmed"
                status="Confirmed"
              />

              <AppointmentCard
                time="11:00 AM"
                patient="Aisha Bello"
                doctor="Dr. Sarah Ahmed"
                status="Checked In"
              />

              <AppointmentCard
                time="02:00 PM"
                patient="Michael James"
                doctor="Dr. John Smith"
                status="Pending"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Benefit Item */
function Benefit({ icon, text }) {
  return (
    <div className="flex min-w-0 items-center gap-3 text-gray-600">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
        <FaCheckCircle />
      </span>

      <span className="text-sm font-medium sm:text-base">
        {text}
      </span>
    </div>
  );
}

/* Appointment Card */
function AppointmentCard({
  time,
  patient,
  doctor,
  status,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm sm:p-5">
      {/* Mobile: Vertical layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Time */}
        <div className="shrink-0">
          <p className="text-lg font-bold text-gray-900 sm:text-base">
            {time}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {/* Timeline */}
          <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-blue-600" />

          {/* Patient & Doctor */}
          <div className="min-w-0">
            <p className="break-words font-semibold text-gray-900">
              {patient}
            </p>

            <p className="mt-1 break-words text-sm text-gray-500">
              {doctor}
            </p>
          </div>
        </div>

        {/* Status */}
        <span className="w-fit shrink-0 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
          {status}
        </span>
      </div>
    </div>
  );
}

export default HeroSection;