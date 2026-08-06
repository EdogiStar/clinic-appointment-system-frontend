import { Navigate, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Appointments from "../pages/appointments/Appointments";
import BookAppointment from "../pages/appointments/BookAppointment";
import Doctors from "../pages/doctors/Doctors";
import Patients from "../pages/patients/Patients";
import Settings from "../pages/settings/Settings";
import Availability from "../pages/availability/Availability";

/**
 * Get the currently logged-in user
 */
function getStoredUser() {
  try {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error(
      "Failed to parse stored user:",
      error
    );

    return null;
  }
}

/**
 * Protect authenticated routes
 */
function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("access_token");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

/**
 * Protect routes based on user role
 */
function RoleProtectedRoute({
  children,
  allowedRoles,
}) {
  const user = getStoredUser();

  const role =
    user?.role?.toLowerCase();

  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ================================== */}
      {/* Public Routes */}
      {/* ================================== */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* ================================== */}
      {/* Dashboard */}
      {/* ================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Appointments */}
      {/* ================================== */}

      {/*
        Admin:
        - View all appointments
        - Manage appointment status

        Doctor:
        - View their own appointments
        - Manage their assigned appointments

        Patient:
        - View their own appointments
        - Cancel their own appointments
      */}

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "admin",
                "doctor",
                "patient",
              ]}
            >
              <DashboardLayout>
                <Appointments />
              </DashboardLayout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Book Appointment */}
      {/* ================================== */}

      {/*
        Patient only:
        - Select doctor
        - Select appointment date
        - Select available time slot
        - Enter reason for visit
        - Create appointment
      */}

      <Route
        path="/appointments/book"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "patient",
              ]}
            >
              <DashboardLayout>
                <BookAppointment />
              </DashboardLayout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Availability */}
      {/* ================================== */}

      {/*
        Doctor only:
        - View availability slots
        - Add availability
        - Delete availability
      */}

      <Route
        path="/availability"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "doctor",
              ]}
            >
              <DashboardLayout>
                <Availability />
              </DashboardLayout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Doctors */}
      {/* ================================== */}

      {/*
        Admin:
        - Can access doctor management page

        Patient:
        - Can view active doctors
        - Can view doctor profiles

        Doctor:
        - Can view doctors page
        - Actions should be hidden by Doctors.jsx
      */}

      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "admin",
                "doctor",
                "patient",
              ]}
            >
              <DashboardLayout>
                <Doctors />
              </DashboardLayout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Patients */}
      {/* ================================== */}

      {/*
        Admin:
        - Can view all registered patients

        Doctor:
        - Can view patients who have
          appointments with them

        Patient:
        - Cannot access the patient
          management page
      */}

      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "admin",
                "doctor",
              ]}
            >
              <DashboardLayout>
                <Patients />
              </DashboardLayout>
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Settings */}
      {/* ================================== */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ================================== */}
      {/* Fallback */}
      {/* ================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;