import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaUserInjured,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  getPatients,
  getDoctorPatients,
} from "../../services/patientService";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  /*
   * Get logged-in user
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
   * Fetch patients after user is loaded
   */
  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  /*
   * Fetch patients based on role
   *
   * Admin:
   * GET /patients
   *
   * Doctor:
   * GET /patients/doctor
   */
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const role =
        user?.role?.toLowerCase();

      let response;

      if (role === "admin") {
        response = await getPatients();
      } else if (role === "doctor") {
        response =
          await getDoctorPatients();
      } else {
        setPatients([]);
        return;
      }

      const patientList = Array.isArray(
        response
      )
        ? response
        : response?.data ||
          response?.patients ||
          [];

      setPatients(patientList);
    } catch (error) {
      console.error(
        "Failed to fetch patients:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to load patients."
      );

      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Filter patients
   */
  const filteredPatients = useMemo(() => {
    const searchTerm =
      search.toLowerCase().trim();

    if (!searchTerm) {
      return patients;
    }

    return patients.filter(
      (patient) => {
        const name =
          patient.full_name?.toLowerCase() ||
          "";

        const email =
          patient.email?.toLowerCase() ||
          "";

        const phone =
          patient.phone?.toLowerCase() ||
          "";

        return (
          name.includes(searchTerm) ||
          email.includes(searchTerm) ||
          phone.includes(searchTerm)
        );
      }
    );
  }, [patients, search]);

  const role =
    user?.role?.toLowerCase();

  const pageDescription =
    role === "admin"
      ? "Manage and monitor registered clinic patients."
      : "View patients who have appointments with you.";

  return (
    <div className="space-y-6">
      {/* ================================== */}
      {/* Header */}
      {/* ================================== */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Patients
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          {pageDescription}
        </p>
      </div>

      {/* ================================== */}
      {/* Search */}
      {/* ================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-2xl">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

          <input
            type="text"
            placeholder="Search by patient name, email, or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="min-h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* ================================== */}
      {/* Patient List */}
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
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Registered
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
          ) : filteredPatients.length ===
            0 ? (
            <EmptyState search={search} />
          ) : (
            filteredPatients.map(
              (patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );

  /*
   * Desktop table content
   */
  function renderTableContent() {
    if (loading) {
      return (
        <tr>
          <td colSpan="5">
            <LoadingState />
          </td>
        </tr>
      );
    }

    if (
      filteredPatients.length === 0
    ) {
      return (
        <tr>
          <td colSpan="5">
            <EmptyState
              search={search}
            />
          </td>
        </tr>
      );
    }

    return filteredPatients.map(
      (patient) => (
        <PatientTableRow
          key={patient.id}
          patient={patient}
        />
      )
    );
  }
}

/* ---------------------------------- */
/* Desktop Patient Row */
/* ---------------------------------- */

function PatientTableRow({
  patient,
}) {
  return (
    <tr className="transition hover:bg-gray-50">
      {/* Patient */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <PatientAvatar
            name={
              patient.full_name
            }
          />

          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">
              {patient.full_name ||
                "Unknown Patient"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Patient
            </p>
          </div>
        </div>
      </td>

      {/* Email */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaEnvelope className="text-xs text-gray-400" />

          <span>
            {patient.email || "—"}
          </span>
        </div>
      </td>

      {/* Phone */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaPhone className="text-xs text-gray-400" />

          <span>
            {patient.phone || "—"}
          </span>
        </div>
      </td>

      {/* Registered */}

      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDate(
          patient.created_at
        )}
      </td>

      {/* Action */}

      <td className="px-6 py-4 text-right">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          <FaEye className="text-xs" />
          View
        </button>
      </td>
    </tr>
  );
}

/* ---------------------------------- */
/* Mobile Patient Card */
/* ---------------------------------- */

function PatientCard({
  patient,
}) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <PatientAvatar
            name={
              patient.full_name
            }
          />

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {patient.full_name ||
                "Unknown Patient"}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Patient
            </p>
          </div>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Active
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {/* Email */}

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <FaEnvelope className="shrink-0 text-gray-400" />

          <span className="truncate">
            {patient.email ||
              "No email"}
          </span>
        </div>

        {/* Phone */}

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <FaPhone className="shrink-0 text-gray-400" />

          <span>
            {patient.phone ||
              "No phone number"}
          </span>
        </div>

        {/* Registered */}

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <FaCalendarAlt className="shrink-0 text-gray-400" />

          <span>
            Registered{" "}
            {formatDate(
              patient.created_at
            )}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      >
        <FaEye />
        View Patient
      </button>
    </div>
  );
}

/* ---------------------------------- */
/* Patient Avatar */
/* ---------------------------------- */

function PatientAvatar({
  name,
}) {
  const initial =
    name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ||
    "P";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
      {initial}
    </div>
  );
}

/* ---------------------------------- */
/* Loading */
/* ---------------------------------- */

function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center p-6 text-sm text-gray-500">
      Loading patients...
    </div>
  );
}

/* ---------------------------------- */
/* Empty */
/* ---------------------------------- */

function EmptyState({
  search,
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
      <FaUserInjured className="text-3xl text-gray-300" />

      <h3 className="mt-3 font-semibold text-gray-700">
        No patients found
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {search
          ? "Try adjusting your search."
          : "There are no patients to display yet."}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Date Helper */
/* ---------------------------------- */

function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate =
    new Date(date);

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

export default Patients;