import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  getAdminDashboard,
} from "../../services/dashboardService";

function AdminDashboard({ user }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminDashboard();

        setDashboard(
          response?.data || null
        );
      } catch (error) {
        console.error(
          "ADMIN DASHBOARD ERROR:",
          error
        );

        const message =
          error.response?.data?.message ||
          "Unable to load admin dashboard.";

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = dashboard?.stats || {};

  const todayAppointments =
    dashboard?.todayAppointments || [];

  const upcomingAppointments =
    dashboard?.upcomingAppointments || [];

  /* ---------------------------------- */
  /* Loading State */
  /* ---------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------- */
  /* Error State */
  /* ---------------------------------- */

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to Load Dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ---------------------------------- */}
      {/* Page Header */}
      {/* ---------------------------------- */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Welcome back,{" "}
            {user?.full_name || "Admin"}. Here's today's clinic overview.
          </p>
        </div>

      </div>

      {/* ---------------------------------- */}
      {/* Stats */}
      {/* ---------------------------------- */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Appointments Today"
          value={
            stats.appointmentsToday || 0
          }
          icon={<FaCalendarAlt />}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Doctors Available"
          value={
            stats.doctorsAvailable || 0
          }
          icon={<FaUserMd />}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Total Patients"
          value={
            stats.totalPatients || 0
          }
          icon={<FaUsers />}
          color="bg-yellow-100 text-yellow-600"
        />

        <StatCard
          title="Pending Appointments"
          value={
            stats.pendingAppointments || 0
          }
          icon={<FaClock />}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* ---------------------------------- */}
      {/* Main Content */}
      {/* ---------------------------------- */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Today's Appointments */}

        <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 xl:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Today's Appointments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Scheduled appointments for today.
              </p>
            </div>

            <button className="hidden items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex">
              View All
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {todayAppointments.length >
            0 ? (
              todayAppointments.map(
                (appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    time={
                      appointment.start_time
                    }
                    patient={
                      appointment.patient
                        ?.full_name ||
                      "Patient"
                    }
                    doctor={
                      appointment.doctor
                        ?.users
                        ?.full_name ||
                      "Doctor"
                    }
                    status={
                      appointment.status
                    }
                  />
                )
              )
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <FaCalendarAlt className="mx-auto text-2xl text-gray-300" />

                <p className="mt-3 text-sm font-medium text-gray-600">
                  No appointments scheduled for today.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Today's appointments will appear here.
                </p>
              </div>
            )}
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:hidden">
            View All Appointments
            <FaArrowRight className="text-xs" />
          </button>
        </section>

        {/* Quick Actions */}

        <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quickly access common clinic tasks.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
            
            <QuickButton text="View Doctors" />

            <QuickButton text="Appointment History" />
          </div>
        </section>
      </div>

      {/* ---------------------------------- */}
      {/* Additional Overview */}
      {/* ---------------------------------- */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Appointments */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your next scheduled clinic appointments.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              Next Appointments
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {upcomingAppointments.length >
            0 ? (
              upcomingAppointments
                .slice(0, 5)
                .map((appointment) => (
                  <SimpleAppointment
                    key={appointment.id}
                    date={
                      appointment.appointment_date
                    }
                    time={
                      appointment.start_time
                    }
                    patient={
                      appointment.patient
                        ?.full_name ||
                      "Patient"
                    }
                    doctor={
                      appointment.doctor
                        ?.users
                        ?.full_name ||
                      "Doctor"
                    }
                  />
                ))
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <FaCalendarAlt className="mx-auto text-2xl text-gray-300" />

                <p className="mt-3 text-sm font-medium text-gray-600">
                  No upcoming appointments.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Upcoming appointments will appear here.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Clinic Summary */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Clinic Summary
          </h2>

          <div className="mt-5 space-y-5">
            <ProgressItem
              label="Appointments Completed Today"
              value={`${stats.completedToday || 0}`}
              progress={
                stats.appointmentsToday > 0
                  ? `${
                      (stats.completedToday /
                        stats.appointmentsToday) *
                      100
                    }%`
                  : "0%"
              }
            />

            <ProgressItem
              label="Doctors Available"
              value={`${stats.doctorsAvailable || 0} / ${
                stats.totalDoctors || 0
              }`}
              progress={
                stats.totalDoctors > 0
                  ? `${
                      (stats.doctorsAvailable /
                        stats.totalDoctors) *
                      100
                    }%`
                  : "0%"
              }
            />

            <ProgressItem
              label="Pending Appointments"
              value={`${stats.pendingAppointments || 0}`}
              progress="0%"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Stat Card */
/* ---------------------------------- */

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Appointment Row */
/* ---------------------------------- */

function AppointmentRow({
  time,
  patient,
  doctor,
  status,
}) {
  const normalizedStatus =
    status?.toLowerCase() || "pending";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-blue-200 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-gray-900">
          {patient}
        </h3>

        <p className="mt-1 truncate text-sm text-gray-500">
          {doctor}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="text-sm font-medium text-gray-600">
          {time}
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            normalizedStatus ===
            "confirmed"
              ? "bg-green-100 text-green-700"
              : normalizedStatus ===
                "completed"
              ? "bg-blue-100 text-blue-700"
              : normalizedStatus ===
                "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {normalizedStatus}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Quick Button */
/* ---------------------------------- */

function QuickButton({ text }) {
  return (
    <button className="flex min-h-11 w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
      {text}

      <FaArrowRight className="text-xs" />
    </button>
  );
}

/* ---------------------------------- */
/* Simple Appointment */
/* ---------------------------------- */

function SimpleAppointment({
  date,
  time,
  patient,
  doctor,
}) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-lg border border-gray-200 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <FaCalendarAlt />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="truncate text-sm font-semibold text-gray-900">
            {patient}
          </p>

          <span className="text-xs font-medium text-gray-500">
            {date} · {time}
          </span>
        </div>

        <p className="mt-1 truncate text-xs text-gray-500">
          {doctor}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Progress Item */
/* ---------------------------------- */

function ProgressItem({
  label,
  value,
  progress,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-gray-600">
          {label}
        </span>

        <span className="text-sm font-semibold text-gray-900">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: progress,
          }}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;