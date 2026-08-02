import { useEffect, useMemo, useState } from "react";
import {
  FaUserMd,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaEye,
  FaPowerOff,
} from "react-icons/fa";
import { toast } from "sonner";

import { getDoctors } from "../../services/doctorService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await getDoctors();

      const doctorList = Array.isArray(response)
        ? response
        : response?.data || response?.doctors || [];

      setDoctors(doctorList);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load doctors."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get unique specialties
  const specialties = useMemo(() => {
    const values = doctors
      .map((doctor) => getSpecialtyName(doctor))
      .filter(Boolean);

    return [...new Set(values)];
  }, [doctors]);

  // Search and filter
  const filteredDoctors = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return doctors.filter((doctor) => {
      const doctorName =
        getDoctorName(doctor).toLowerCase();

      const doctorSpecialty =
        getSpecialtyName(doctor).toLowerCase();

      const licenseNumber =
        doctor.license_number?.toLowerCase() || "";

      const matchesSearch =
        doctorName.includes(searchTerm) ||
        doctorSpecialty.includes(searchTerm) ||
        licenseNumber.includes(searchTerm);

      const matchesSpecialty =
        specialty === "all" ||
        doctorSpecialty === specialty.toLowerCase();

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, search, specialty]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Doctors
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {role === "admin"
              ? "Manage and monitor doctors in your clinic."
              : "View doctors and their available information."}
          </p>
        </div>

        {/* Admin Only */}
        {role === "admin" && (
          <button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
            <FaPlus />
            Add Doctor
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

            <input
              type="text"
              placeholder="Search by doctor, specialty, or license number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Specialty */}
          <div className="relative lg:w-60">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="min-h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                All Specialties
              </option>

              {specialties.map((item) => (
                <option
                  key={item}
                  value={item.toLowerCase()}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Doctor
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Specialty
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  License Number
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Contact
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
              {loading ? (
                <tr>
                  <td colSpan="6">
                    <LoadingState />
                  </td>
                </tr>
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doctor) => (
                  <DoctorTableRow
                    key={doctor.id}
                    doctor={doctor}
                    role={role}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {loading ? (
            <LoadingState />
          ) : filteredDoctors.length === 0 ? (
            <EmptyState />
          ) : (
            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                role={role}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Doctor Name */
/* ---------------------------------- */

function getDoctorName(doctor) {
  return (
    doctor.users?.full_name ||
    doctor.user?.full_name ||
    doctor.full_name ||
    doctor.name ||
    "Unknown Doctor"
  );
}

/* ---------------------------------- */
/* Specialty Name */
/* ---------------------------------- */

function getSpecialtyName(doctor) {
  return (
    doctor.specialties?.name ||
    doctor.specialty?.name ||
    doctor.specialty_name ||
    "General Practice"
  );
}

/* ---------------------------------- */
/* Desktop Row */
/* ---------------------------------- */

function DoctorTableRow({ doctor, role }) {
  const doctorName = getDoctorName(doctor);
  const specialtyName = getSpecialtyName(doctor);

  const email =
    doctor.users?.email ||
    doctor.user?.email ||
    doctor.email ||
    "—";

  const phone =
    doctor.users?.phone ||
    doctor.user?.phone ||
    doctor.phone ||
    "—";

  return (
    <tr className="transition hover:bg-gray-50">
      {/* Doctor */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FaUserMd />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {doctorName}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {email}
            </p>
          </div>
        </div>
      </td>

      {/* Specialty */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {specialtyName}
      </td>

      {/* License */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {doctor.license_number || "—"}
      </td>

      {/* Contact */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">
          {phone}
        </p>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge doctor={doctor} />
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            title="View Doctor"
          >
            <FaEye />
          </button>

          {/* Admin Only */}
          {role === "admin" && (
            <>
              <button
                className="text-sm font-semibold text-gray-500 transition hover:text-gray-700"
                title="Edit Doctor"
              >
                <FaEdit />
              </button>

              <button
                className="text-sm font-semibold text-red-500 transition hover:text-red-700"
                title="Activate / Deactivate"
              >
                <FaPowerOff />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ---------------------------------- */
/* Mobile Card */
/* ---------------------------------- */

function DoctorCard({ doctor, role }) {
  const doctorName = getDoctorName(doctor);
  const specialtyName = getSpecialtyName(doctor);

  const email =
    doctor.users?.email ||
    doctor.user?.email ||
    doctor.email ||
    "—";

  const phone =
    doctor.users?.phone ||
    doctor.user?.phone ||
    doctor.phone ||
    "—";

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FaUserMd />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {doctorName}
            </h3>

            <p className="mt-1 truncate text-sm text-gray-500">
              {specialtyName}
            </p>
          </div>
        </div>

        <StatusBadge doctor={doctor} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <p>
          <span className="font-medium text-gray-700">
            License:
          </span>{" "}
          {doctor.license_number || "—"}
        </p>

        <p>
          <span className="font-medium text-gray-700">
            Email:
          </span>{" "}
          {email}
        </p>

        <p>
          <span className="font-medium text-gray-700">
            Phone:
          </span>{" "}
          {phone}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
          <FaEye />
          View
        </button>

        {/* Admin Only */}
        {role === "admin" && (
          <>
            <button className="flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700">
              <FaEdit />
            </button>

            <button className="flex items-center justify-center rounded-lg border border-red-100 px-4 py-2.5 text-red-500 transition hover:bg-red-50 hover:text-red-700">
              <FaPowerOff />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Status Badge */
/* ---------------------------------- */

function StatusBadge({ doctor }) {
  const isActive =
    doctor.is_active !== false &&
    doctor.status !== "inactive";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

/* ---------------------------------- */
/* Loading */
/* ---------------------------------- */

function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center p-6 text-sm text-gray-500">
      Loading doctors...
    </div>
  );
}

/* ---------------------------------- */
/* Empty */
/* ---------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
      <FaUserMd className="text-3xl text-gray-300" />

      <h3 className="mt-3 font-semibold text-gray-700">
        No doctors found
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or specialty filter.
      </p>
    </div>
  );
}

export default Doctors;