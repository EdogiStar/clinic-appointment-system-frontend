import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "sonner";

import { getAppointments } from "../../services/appointmentService";

function PatientDashboard({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAppointments();

        const appointmentData =
          response?.data || response || [];

        setAppointments(
          Array.isArray(appointmentData)
            ? appointmentData
            : []
        );
      } catch (error) {
        console.error(
          "PATIENT DASHBOARD ERROR:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load your appointments."
        );

        toast.error(
          error.response?.data?.message ||
            "Unable to load your appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((appointment) =>
      ["pending", "confirmed"].includes(
        appointment.status?.toLowerCase()
      )
    );
  }, [appointments]);

  const pendingAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status?.toLowerCase() ===
        "pending"
    );
  }, [appointments]);

  const completedAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status?.toLowerCase() ===
        "completed"
    );
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    if (upcomingAppointments.length === 0) {
      return null;
    }

    return [...upcomingAppointments].sort(
      (a, b) => {
        const dateA = new Date(
          `${a.appointment_date}T${a.start_time}`
        );

        const dateB = new Date(
          `${b.appointment_date}T${b.start_time}`
        );

        return dateA - dateB;
      }
    )[0];
  }, [upcomingAppointments]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Welcome back, {user?.full_name || "Patient"}.
          </p>
        </div>

        <button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
          <FaPlus />
          Book Appointment
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading your appointments...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Stats */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            icon={<FaCalendarAlt />}
          />

          <StatCard
            title="Pending Appointments"
            value={pendingAppointments.length}
            icon={<FaClock />}
          />

          <StatCard
            title="Completed Appointments"
            value={completedAppointments.length}
            icon={<FaCheckCircle />}
          />
        </div>
      )}

      {/* Next Appointment */}
      {!loading && !error && (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Next Appointment
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your next scheduled clinic visit.
              </p>
            </div>

            <FaCalendarAlt className="text-xl text-blue-600" />
          </div>

          <div className="mt-5">
            {nextAppointment ? (
              <AppointmentCard
                appointment={nextAppointment}
              />
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <FaCalendarAlt className="mx-auto text-2xl text-gray-300" />

                <p className="mt-3 text-sm font-medium text-gray-600">
                  You don't have any upcoming appointments.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Book an appointment with a doctor to get started.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Appointment History */}
      {!loading && !error && (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Appointments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest appointment activity.
              </p>
            </div>

            <button className="hidden items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex">
              View All
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {appointments.length > 0 ? (
              appointments
                .slice(0, 5)
                .map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <p className="text-sm font-medium text-gray-600">
                  No appointments found.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button className="rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            Book an Appointment
          </button>

          <button className="rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            View Appointment History
          </button>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------- */
/* Stat Card */
/* ---------------------------------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Appointment Card */
/* ---------------------------------- */

function AppointmentCard({ appointment }) {
  const status =
    appointment.status?.toLowerCase() || "pending";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900">
          {appointment.doctor?.full_name ||
            appointment.doctor_name ||
            "Doctor"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {appointment.appointment_date} ·{" "}
          {appointment.start_time}
        </p>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
          status === "confirmed"
            ? "bg-green-100 text-green-700"
            : status === "completed"
            ? "bg-blue-100 text-blue-700"
            : status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export default PatientDashboard;