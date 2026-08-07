import { useEffect, useMemo, useState } from "react";
import { 
    Link
 } from "react-router-dom";
import {
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaFilter,
  FaClock,
  FaUserMd,
  FaTimes,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  getAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";

function Appointments() {

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState(null);

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);

  const [user, setUser] =
    useState(null);

  /*
   * ==========================================
   * Load authenticated user
   * ==========================================
   */

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error(
        "Failed to parse stored user:",
        error
      );

      toast.error(
        "Unable to load user information."
      );

      setLoading(false);
    }
  }, []);

  /*
   * ==========================================
   * Fetch appointments when user is available
   * ==========================================
   */

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  /*
   * ==========================================
   * Fetch appointments based on user role
   *
   * Admin:
   * GET /appointments/admin
   *
   * Doctor:
   * GET /appointments/doctor
   *
   * Patient:
   * GET /appointments/patient
   * ==========================================
   */

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const role =
        user?.role?.toLowerCase();

      let response;

      if (role === "admin") {
        response =
          await getAllAppointments();
      } else if (role === "doctor") {
        response =
          await getDoctorAppointments();
      } else if (role === "patient") {
        response =
          await getAppointments();
      } else {
        setAppointments([]);
        return;
      }

      const appointmentList =
        Array.isArray(response)
          ? response
          : response?.data ||
            response?.appointments ||
            [];

      setAppointments(
        appointmentList
      );
    } catch (error) {
      console.error(
        "Failed to fetch appointments:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to load appointments."
      );

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ==========================================
   * Filter appointments
   * ==========================================
   */

  const filteredAppointments =
    useMemo(() => {
      return appointments.filter(
        (appointment) => {
          const searchTerm =
            search
              .toLowerCase()
              .trim();

          const patientName =
            getPatientName(
              appointment
            );

          const doctorName =
            getDoctorName(
              appointment
            );

          const matchesSearch =
            patientName
              .toLowerCase()
              .includes(
                searchTerm
              ) ||
            doctorName
              .toLowerCase()
              .includes(
                searchTerm
              );

          const appointmentStatus =
            appointment.status?.toLowerCase() ||
            "";

          const matchesStatus =
            status === "all" ||
            appointmentStatus ===
              status.toLowerCase();

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      appointments,
      search,
      status,
    ]);

  /*
   * ==========================================
   * Update appointment status
   * ==========================================
   */

  const handleStatusUpdate =
    async (
      appointmentId,
      newStatus
    ) => {
      try {
        setUpdatingStatus(true);

        await updateAppointmentStatus(
          appointmentId,
          newStatus
        );

        toast.success(
          `Appointment ${formatStatus(
            newStatus
          ).toLowerCase()} successfully.`
        );

        setSelectedAppointment(
          null
        );

        await fetchAppointments();
      } catch (error) {
        console.error(
          "Failed to update appointment:",
          error
        );

        toast.error(
          error.response?.data
            ?.error ||
            error.response?.data
              ?.message ||
            "Unable to update appointment status."
        );
      } finally {
        setUpdatingStatus(false);
      }
    };

  /*
   * ==========================================
   * Render
   * ==========================================
   */

  return (
    <div className="space-y-6">
      {/* ================================== */}
      {/* Header */}
      {/* ================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {user?.role?.toLowerCase() ===
            "admin"
              ? "Manage and monitor all clinic appointments."
              : user?.role?.toLowerCase() ===
                "doctor"
              ? "View and manage appointments assigned to you."
              : "View and manage your appointments."}
          </p>
        </div>


        {user?.role?.toLowerCase() ===
  "patient" && (
  <Link
    to="/appointments/book"
    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
  >
    <FaPlus />
    Book Appointment
  </Link>
)}

      </div>

      {/* ================================== */}
      {/* Filters */}
      {/* ================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}

          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

            <input
              type="text"
              placeholder="Search by patient or doctor..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="min-h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status Filter */}

          <div className="relative lg:w-52">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="min-h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                All Statuses
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* Appointment List */}
      {/* ================================== */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Desktop Table */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Doctor
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Time
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {renderTableContent()}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="divide-y divide-gray-100 md:hidden">
          {loading ? (
            <LoadingState />
          ) : filteredAppointments.length ===
            0 ? (
            <EmptyState />
          ) : (
            filteredAppointments.map(
              (appointment) => (
                <AppointmentCard
                  key={
                    appointment.id
                  }
                  appointment={
                    appointment
                  }
                  onView={() =>
                    setSelectedAppointment(
                      appointment
                    )
                  }
                />
              )
            )
          )}
        </div>
      </div>

      {/* ================================== */}
      {/* Appointment Details Modal */}
      {/* ================================== */}

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={
            selectedAppointment
          }
          user={user}
          updatingStatus={
            updatingStatus
          }
          onClose={() =>
            setSelectedAppointment(
              null
            )
          }
          onStatusUpdate={
            handleStatusUpdate
          }
        />
      )}
    </div>
  );

  /*
   * ==========================================
   * Desktop Table Content
   * ==========================================
   */

  function renderTableContent() {
    if (loading) {
      return (
        <tr>
          <td colSpan="6">
            <LoadingState />
          </td>
        </tr>
      );
    }

    if (
      filteredAppointments.length ===
      0
    ) {
      return (
        <tr>
          <td colSpan="6">
            <EmptyState />
          </td>
        </tr>
      );
    }

    return filteredAppointments.map(
      (appointment) => (
        <AppointmentTableRow
          key={appointment.id}
          appointment={
            appointment
          }
          onView={() =>
            setSelectedAppointment(
              appointment
            )
          }
        />
      )
    );
  }
}

/* ================================== */
/* Helpers */
/* ================================== */

function getDoctorName(
  appointment
) {
  return (
    appointment.doctor
      ?.users?.full_name ||
    appointment.doctor
      ?.user?.full_name ||
    appointment.doctor
      ?.full_name ||
    appointment.doctor?.name ||
    appointment.doctor_name ||
    "Unknown Doctor"
  );
}

function getPatientName(
  appointment
) {
  return (
    appointment.patient
      ?.full_name ||
    appointment.patient?.name ||
    appointment.patient_name ||
    "Unknown Patient"
  );
}

function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate =
    new Date(
      `${date}T00:00:00`
    );

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function formatTime(time) {
  if (!time) {
    return "—";
  }

  const [
    hours,
    minutes,
  ] = time.split(":");

  const date = new Date();

  date.setHours(
    Number(hours),
    Number(minutes)
  );

  return date.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

function formatStatus(status) {
  if (!status) {
    return "";
  }

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
}

/* ================================== */
/* Desktop Appointment Row */
/* ================================== */

function AppointmentTableRow({
  appointment,
  onView,
}) {
  const patientName =
    getPatientName(
      appointment
    );

  const doctorName =
    getDoctorName(
      appointment
    );

  return (
    <tr className="transition hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-semibold text-gray-900">
          {patientName}
        </div>

        <div className="mt-1 text-xs text-gray-400">
          {appointment.patient
            ?.email || ""}
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {doctorName}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDate(
          appointment.appointment_date
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {formatTime(
          appointment.start_time
        )}
      </td>

      <td className="px-6 py-4">
        <StatusBadge
          status={
            appointment.status
          }
        />
      </td>

      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={onView}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View
        </button>
      </td>
    </tr>
  );
}

/* ================================== */
/* Mobile Appointment Card */
/* ================================== */

function AppointmentCard({
  appointment,
  onView,
}) {
  const patientName =
    getPatientName(
      appointment
    );

  const doctorName =
    getDoctorName(
      appointment
    );

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FaCalendarAlt />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {patientName}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <FaUserMd className="text-xs" />

              <span className="truncate">
                {doctorName}
              </span>
            </p>
          </div>
        </div>

        <StatusBadge
          status={
            appointment.status
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-2">
          <FaCalendarAlt />

          {formatDate(
            appointment.appointment_date
          )}
        </span>

        <span className="flex items-center gap-2">
          <FaClock />

          {formatTime(
            appointment.start_time
          )}
        </span>
      </div>

      <button
        type="button"
        onClick={onView}
        className="mt-4 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
      >
        View Appointment
      </button>
    </div>
  );
}
/* ================================== */
/* Appointment Details Modal */
/* ================================== */

function AppointmentDetailsModal({
  appointment,
  user,
  updatingStatus,
  onClose,
  onStatusUpdate,
}) {
  const patientName =
    getPatientName(
      appointment
    );

  const doctorName =
    getDoctorName(
      appointment
    );

  const role =
    user?.role?.toLowerCase();

  const isAdmin =
    role === "admin";

  const isDoctor =
    role === "doctor";

  const isPatient =
    role === "patient";

  const status =
    appointment.status?.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* ================================== */}
        {/* Modal Header */}
        {/* ================================== */}

        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Appointment Details
            </h2>


          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* ================================== */}
        {/* Appointment Details */}
        {/* ================================== */}

        <div className="space-y-5 p-5">
          {/* Status */}

          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
            <span className="text-sm font-medium text-gray-500">
              Status
            </span>

            <StatusBadge
              status={
                appointment.status
              }
            />
          </div>

          {/* Appointment Information */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Appointment Information
            </h3>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                label="Date"
                value={formatDate(
                  appointment.appointment_date
                )}
              />

              <InfoItem
                label="Time"
                value={`${formatTime(
                  appointment.start_time
                )} - ${formatTime(
                  appointment.end_time
                )}`}
              />
            </div>
          </div>

          {/* Patient Information */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Patient
            </h3>

            <div className="mt-3 rounded-xl border border-gray-200 p-4">
              <p className="font-semibold text-gray-900">
                {patientName}
              </p>

              {appointment.patient
                ?.email && (
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <FaEnvelope className="text-xs" />

                  {
                    appointment
                      .patient.email
                  }
                </p>
              )}

              {appointment.patient
                ?.phone && (
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <FaPhone className="text-xs" />

                  {
                    appointment
                      .patient.phone
                  }
                </p>
              )}
            </div>
          </div>

          {/* Doctor Information */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Doctor
            </h3>

            <div className="mt-3 rounded-xl border border-gray-200 p-4">
              <p className="font-semibold text-gray-900">
                {doctorName}
              </p>

              {appointment.doctor
                ?.users?.email && (
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <FaEnvelope className="text-xs" />

                  {
                    appointment
                      .doctor.users.email
                  }
                </p>
              )}

              {appointment.doctor
                ?.users?.phone && (
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <FaPhone className="text-xs" />

                  {
                    appointment
                      .doctor.users.phone
                  }
                </p>
              )}
            </div>
          </div>

          {/* Reason for Visit */}

          {appointment.reason && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Reason for Visit
              </h3>

              <p className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                {appointment.reason}
              </p>
            </div>
          )}

          {/* ================================== */}
          {/* Admin Actions */}
          {/* ================================== */}

          {isAdmin && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Appointment Actions
              </h3>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                {/* Confirm */}

                {status ===
                  "pending" && (
                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      onStatusUpdate(
                        appointment.id,
                        "confirmed"
                      )
                    }
                    className="min-h-10 flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Confirm"}
                  </button>
                )}

                {/* Complete */}

                {status ===
                  "confirmed" && (
                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      onStatusUpdate(
                        appointment.id,
                        "completed"
                      )
                    }
                    className="min-h-10 flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Mark Completed"}
                  </button>
                )}

                {/* Cancel */}

                {status !==
                  "cancelled" &&
                  status !==
                    "completed" && (
                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      onStatusUpdate(
                        appointment.id,
                        "cancelled"
                      )
                    }
                    className="min-h-10 flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Cancel"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================================== */}
          {/* Doctor Actions */}
          {/* ================================== */}

          {isDoctor && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Appointment Actions
              </h3>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                {/* Confirm */}

                {status ===
                  "pending" && (
                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      onStatusUpdate(
                        appointment.id,
                        "confirmed"
                      )
                    }
                    className="min-h-10 flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Confirm"}
                  </button>
                )}

                {/* Complete */}

                {status ===
                  "confirmed" && (
                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      onStatusUpdate(
                        appointment.id,
                        "completed"
                      )
                    }
                    className="min-h-10 flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Mark Completed"}
                  </button>
                )}

                {/* Cancel */}

                {status !==
                  "cancelled" &&
                  status !==
                    "completed" && (
                  <button
                    type="button"
                    disabled={
                      updatingStatus
                    }
                    onClick={() =>
                      onStatusUpdate(
                        appointment.id,
                        "cancelled"
                      )
                    }
                    className="min-h-10 flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updatingStatus
                      ? "Updating..."
                      : "Cancel"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================================== */}
          {/* Patient Cancel Action */}
          {/* ================================== */}

          {isPatient &&
            status !==
              "cancelled" &&
            status !==
              "completed" && (
            <div>
              <button
                type="button"
                disabled={
                  updatingStatus
                }
                onClick={() =>
                  onStatusUpdate(
                    appointment.id,
                    "cancelled"
                  )
                }
                className="min-h-10 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingStatus
                  ? "Cancelling..."
                  : "Cancel Appointment"}
              </button>
            </div>
          )}
        </div>

        {/* ================================== */}
        {/* Modal Footer */}
        {/* ================================== */}

        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================== */
/* Info Item */
/* ================================== */

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

/* ================================== */
/* Status Badge */
/* ================================== */

function StatusBadge({
  status,
}) {
  const normalizedStatus =
    status?.toLowerCase();

  const styles = {
    confirmed:
      "bg-blue-100 text-blue-700",

    pending:
      "bg-yellow-100 text-yellow-700",

    completed:
      "bg-green-100 text-green-700",

    cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[
          normalizedStatus
        ] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
}

/* ================================== */
/* Loading State */
/* ================================== */

function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center p-6 text-sm text-gray-500">
      Loading appointments...
    </div>
  );
}

/* ================================== */
/* Empty State */
/* ================================== */

function EmptyState() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
      <FaCalendarAlt className="text-3xl text-gray-300" />

      <h3 className="mt-3 font-semibold text-gray-700">
        No appointments found
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filter.
      </p>
    </div>
  );
}

export default Appointments;