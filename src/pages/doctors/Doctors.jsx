import { useEffect, useMemo, useState } from "react";
import {
  FaUserMd,
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimes,
  FaBan,
  FaEye,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  getDoctors,
  activateDoctor,
  rejectDoctor,
} from "../../services/doctorService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role || "patient";

  const isAdmin = role === "admin";

  /**
   * Fetch doctors
   */
  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await getDoctors();

      setDoctors(response?.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch doctors:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load doctors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /**
   * Get doctor status
   */
  const getDoctorStatus = (doctor) => {
    return (
      doctor?.user?.status ||
      "pending"
    ).toLowerCase();
  };

  /**
   * Only admins can see all doctors.
   *
   * Patients and doctors can only see
   * active doctors.
   */
  const visibleDoctors = useMemo(() => {
    let filteredDoctors = doctors;

    // Non-admin users can ONLY see active doctors
    if (!isAdmin) {
      filteredDoctors =
        filteredDoctors.filter(
          (doctor) =>
            getDoctorStatus(doctor) ===
            "active"
        );
    }

    // Admin status filter
    if (
      isAdmin &&
      statusFilter !== "all"
    ) {
      filteredDoctors =
        filteredDoctors.filter(
          (doctor) =>
            getDoctorStatus(doctor) ===
            statusFilter
        );
    }

    // Search filter
    if (searchTerm.trim()) {
      const search =
        searchTerm.toLowerCase();

      filteredDoctors =
        filteredDoctors.filter(
          (doctor) => {
            const name =
              doctor?.user?.full_name ||
              "";

            const email =
              doctor?.user?.email ||
              "";

            const specialty =
              doctor?.specialty?.name ||
              "";

            const license =
              doctor?.license_number ||
              "";

            return (
              name
                .toLowerCase()
                .includes(search) ||
              email
                .toLowerCase()
                .includes(search) ||
              specialty
                .toLowerCase()
                .includes(search) ||
              license
                .toLowerCase()
                .includes(search)
            );
          }
        );
    }

    return filteredDoctors;
  }, [
    doctors,
    isAdmin,
    statusFilter,
    searchTerm,
  ]);

  /**
   * Admin statistics
   */
  const pendingDoctors = doctors.filter(
    (doctor) =>
      getDoctorStatus(doctor) ===
      "pending"
  );

  const activeDoctors = doctors.filter(
    (doctor) =>
      getDoctorStatus(doctor) ===
      "active"
  );

  const rejectedDoctors = doctors.filter(
    (doctor) =>
      getDoctorStatus(doctor) ===
      "rejected"
  );

  /**
   * Activate doctor
   */
  const handleActivate = async (
    doctorId
  ) => {
    try {
      setActionLoading(doctorId);

      await activateDoctor(doctorId);

      toast.success(
        "Doctor account activated successfully"
      );

      // Refresh doctors
      await fetchDoctors();
    } catch (error) {
      console.error(
        "Failed to activate doctor:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to activate doctor"
      );
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Reject doctor
   */
  const handleReject = async (
    doctorId
  ) => {
    try {
      setActionLoading(doctorId);

      await rejectDoctor(doctorId);

      toast.success(
        "Doctor account rejected successfully"
      );

      // Refresh doctors
      await fetchDoctors();
    } catch (error) {
      console.error(
        "Failed to reject doctor:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to reject doctor"
      );
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Deactivate doctor
   *
   * Backend action not implemented yet.
   */
  const handleDeactivate = () => {
    toast.info(
      "Doctor deactivation is not available yet."
    );
  };

  /**
   * View doctor profile
   */
  const handleViewProfile = (
    doctor
  ) => {
    // Temporary action
    // Replace with navigation/modal later
    toast.info(
      `Viewing ${doctor?.user?.full_name || "doctor"} profile`
    );
  };

  /**
   * Render doctor card
   */
  const renderDoctorCard = (
    doctor
  ) => {
    const status =
      getDoctorStatus(doctor);

    const isActionLoading =
      actionLoading === doctor.id;

    return (
      <div
        key={doctor.id}
        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUserMd className="text-blue-600 text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {doctor?.user?.full_name ||
                  "Unknown Doctor"}
              </h3>

              <p className="text-sm text-gray-500">
                {doctor?.specialty?.name ||
                  "No specialty"}
              </p>
            </div>
          </div>

          {isAdmin && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                status === "active"
                  ? "bg-green-100 text-green-700"
                  : status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        <div className="mt-5 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">
              Email:
            </span>{" "}
            {doctor?.user?.email ||
              "N/A"}
          </p>

          <p>
            <span className="font-medium">
              Phone:
            </span>{" "}
            {doctor?.user?.phone ||
              "N/A"}
          </p>

          <p>
            <span className="font-medium">
              License:
            </span>{" "}
            {doctor?.license_number ||
              "N/A"}
          </p>
        </div>

        {/* ================================= */}
        {/* ADMIN ACTIONS */}
        {/* ================================= */}

        {isAdmin && (
          <div className="mt-5 flex flex-wrap gap-2">
            {/* Pending doctor */}
            {status === "pending" && (
              <>
                <button
                  type="button"
                  disabled={isActionLoading}
                  onClick={() =>
                    handleActivate(
                      doctor.id
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  <FaCheck />

                  {isActionLoading
                    ? "Activating..."
                    : "Activate"}
                </button>

                <button
                  type="button"
                  disabled={isActionLoading}
                  onClick={() =>
                    handleReject(
                      doctor.id
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                >
                  <FaTimes />

                  {isActionLoading
                    ? "Processing..."
                    : "Reject"}
                </button>
              </>
            )}

            {/* Active doctor */}
            {status === "active" && (
              <button
                type="button"
                onClick={() =>
                  handleDeactivate()
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700"
              >
                <FaBan />
                Deactivate
              </button>
            )}

            {/* Rejected doctor */}
            {status === "rejected" && (
              <span className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg">
                Doctor application rejected
              </span>
            )}
          </div>
        )}

        {/* ================================= */}
        {/* PATIENT / DOCTOR ACTION */}
        {/* ================================= */}

        {!isAdmin &&
          status === "active" && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() =>
                  handleViewProfile(
                    doctor
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                <FaEye />
                View Profile
              </button>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Doctors
        </h1>

        <p className="text-gray-500 mt-1">
          {isAdmin
            ? "Manage doctor registrations and accounts"
            : "Browse available doctors"}
        </p>
      </div>

      {/* ================================= */}
      {/* ADMIN STATISTICS */}
      {/* ================================= */}

      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-700">
              Pending Doctors
            </p>

            <p className="text-2xl font-bold text-yellow-800">
              {pendingDoctors.length}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700">
              Active Doctors
            </p>

            <p className="text-2xl font-bold text-green-800">
              {activeDoctors.length}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700">
              Rejected Doctors
            </p>

            <p className="text-2xl font-bold text-red-800">
              {rejectedDoctors.length}
            </p>
          </div>
        </div>
      )}

      {/* ================================= */}
      {/* SEARCH AND FILTER */}
      {/* ================================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Admin status filter */}
          {isAdmin && (
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="w-full md:w-48 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">
                  All Doctors
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="active">
                  Active
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ================================= */}
      {/* DOCTOR LIST */}
      {/* ================================= */}

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : visibleDoctors.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <FaUserMd className="mx-auto text-4xl text-gray-300 mb-3" />

          <h3 className="text-lg font-semibold text-gray-700">
            No doctors found
          </h3>

          <p className="text-gray-500 mt-1">
            {isAdmin
              ? "There are no doctors matching your search or filter."
              : "There are currently no active doctors available."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleDoctors.map(
            renderDoctorCard
          )}
        </div>
      )}
    </div>
  );
}

export default Doctors;