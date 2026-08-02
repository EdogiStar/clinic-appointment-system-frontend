import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaUserMd,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  getDoctorAppointments,
} from "../../services/appointmentService";

function DoctorDashboard({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) {
        setError("Doctor information is unavailable.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await getDoctorAppointments(user.id);

        const appointmentData =
          response?.data || response || [];

        setAppointments(
          Array.isArray(appointmentData)
            ? appointmentData
            : []
        );
      } catch (error) {
        console.error(
          "DOCTOR DASHBOARD ERROR:",
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
  }, [user?.id]);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todayAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.appointment_date === today
    );
  }, [appointments, today]);

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const status =
        appointment.status?.toLowerCase();

      return (
        appointment.appointment_date >= today &&
        ["pending", "confirmed"].includes(status)
      );
    });
  }, [appointments, today]);

  const uniquePatients = useMemo(() => {
    const patients = appointments.map(
      (appointment) =>
        appointment.patient_id
    );

    return new Set(
      patients.filter(Boolean)
    ).size;
  }, [appointments]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Doctor Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back, Dr.{" "}
          {user?.full_name || "Doctor"}. Here's your clinic overview.
        </p>
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Today's Appointments"
            value={todayAppointments.length}
            icon={<FaCalendarAlt />}
          />

          <StatCard
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            icon={<FaClock />}
          />

          <StatCard
            title="Patients"
            value={uniquePatients}
            icon={<FaUsers />}
          />

          <StatCard
            title="Availability"
            value="Manage"
            icon={<FaUserMd />}
          />
        </div>
      )}

      {/* Today's Appointments */}
      {!loading && !error && (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Today's Appointments
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your scheduled appointments for today.
          </p>

          <div className="mt-5 space-y-3">
            {todayAppointments.length > 0 ? (
              todayAppointments.map(
                (appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                  />
                )
              )
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <p className="text-sm font-medium text-gray-600">
                  No appointments scheduled for today.
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
            View My Appointments
          </button>

          <button className="rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            Manage Availability
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
/* Appointment Row */
/* ---------------------------------- */

function AppointmentRow({ appointment }) {
  const status =
    appointment.status?.toLowerCase() || "pending";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-gray-900">
          {appointment.patient?.full_name ||
            appointment.patient_name ||
            "Patient"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {appointment.start_time} -{" "}
          {appointment.end_time}
        </p>
      </div>

      <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
        {status}
      </span>
    </div>
  );
}

export default DoctorDashboard;