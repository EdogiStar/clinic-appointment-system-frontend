import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

function HeroSection() {
  const features = [
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      description:
        "Book appointments online in just a few clicks without long waiting times.",
    },
    {
      icon: <FaUserMd />,
      title: "Qualified Doctors",
      description:
        "Browse available doctors and schedule appointments based on their availability.",
    },
    {
      icon: <FaClock />,
      title: "Real-Time Scheduling",
      description:
        "View up-to-date appointment slots and avoid scheduling conflicts.",
    },
    {
      icon: <FaUsers />,
      title: "Role-Based Access",
      description:
        "Dedicated dashboards for administrators, doctors, and patients.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Register as a patient and securely access the appointment system.",
    },
    {
      number: "02",
      title: "Book an Appointment",
      description:
        "Choose your preferred doctor, date, and available time slot.",
    },
    {
      number: "03",
      title: "Meet Your Doctor",
      description:
        "Receive confirmation and attend your appointment on schedule.",
    },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-100">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <FaCalendarCheck />
              Smart Healthcare Platform
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Book Clinic Appointments
              <span className="block text-blue-600">
                Anytime, Anywhere.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              A modern clinic appointment system designed to help patients,
              doctors, and administrators manage appointments quickly,
              securely, and efficiently from any device.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
                <FaArrowRight className="ml-2" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Learn More
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Secure Platform
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Fast Booking
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Real-Time Availability
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://unsplash.com/photos/a-man-and-a-woman-talking-ThpS0DVkPBs"
              alt="Doctor checking a patient's blood pressure"
              className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <FaCheckCircle className="text-green-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Easy Booking
                    </p>

                    <p className="text-sm text-gray-500">
                      Online Appointments
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <FaUserMd className="text-blue-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Qualified Doctors
                    </p>

                    <p className="text-sm text-gray-500">
                      Experienced Specialists
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <FaClock className="text-yellow-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Quick Service
                    </p>

                    <p className="text-sm text-gray-500">
                      Save Time & Avoid Queues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="bg-white py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-semibold uppercase tracking-wider text-blue-600">
              Features
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need to Manage Clinic Appointments
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Designed to simplify healthcare scheduling for patients,
              doctors, and administrators.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="bg-gray-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-semibold uppercase tracking-wider text-blue-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Book an Appointment in Three Simple Steps
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Getting quality healthcare has never been easier.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-lg"
              >
                <div className="text-5xl font-extrabold text-blue-100">
                  {step.number}
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* ================= STATISTICS ================= */}
      <section className="bg-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-4xl font-bold text-white">50+</h3>
              <p className="mt-2 text-blue-100">Qualified Doctors</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">1,000+</h3>
              <p className="mt-2 text-blue-100">Appointments Booked</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">500+</h3>
              <p className="mt-2 text-blue-100">Registered Patients</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">99%</h3>
              <p className="mt-2 text-blue-100">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-semibold uppercase tracking-wider text-blue-600">
              Testimonials
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Trusted by Patients and Healthcare Professionals
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              See what our users have to say about their experience with
              the Clinic Appointment System.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "John Doe",
                role: "Patient",
                quote:
                  "Booking appointments has become incredibly easy. I can find available doctors and schedule visits in just a few minutes.",
              },
              {
                name: "Dr. Sarah Ahmed",
                role: "Doctor",
                quote:
                  "Managing appointments is now much simpler. My schedule is always organized, and I spend less time on administrative work.",
              },
              {
                name: "Clinic Administrator",
                role: "Administrator",
                quote:
                  "The platform has streamlined our daily operations and significantly reduced appointment scheduling conflicts.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition hover:shadow-lg"
              >
                <p className="leading-7 text-gray-600">
                  "{testimonial.quote}"
                </p>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-blue-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section
        id="faq"
        className="bg-gray-50 py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-semibold uppercase tracking-wider text-blue-600">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Find answers to common questions about using the platform.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                question: "How do I book an appointment?",
                answer:
                  "Create an account, sign in, choose your preferred doctor, select an available date and time, and confirm your appointment.",
              },
              {
                question: "Can I cancel my appointment?",
                answer:
                  "Yes. Patients can cancel appointments directly from their dashboard before the scheduled appointment time.",
              },
              {
                question: "Can doctors manage their availability?",
                answer:
                  "Yes. Doctors can update their availability and manage appointments from their dashboard.",
              },
            ].map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Take Control of Your Healthcare?
          </h2>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            Join our Clinic Appointment System today and experience
            smarter, faster, and more convenient appointment scheduling.
          </p>

          <Link
            to="/login"
            className="mt-10 inline-flex items-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Get Started
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default HeroSection;