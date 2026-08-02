import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Appointments from "../pages/appointments/Appointments";
import Doctors from "../pages/doctors/Doctors";
import Patients from "../pages/patients/Patients";
import Settings from "../pages/settings/Settings";


function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

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


      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />


      {/* Appointments */}

      <Route
        path="/appointments"
        element={
          <DashboardLayout>
            <Appointments />
          </DashboardLayout>
        }
      />


      {/* Doctors */}

      <Route
        path="/doctors"
        element={
          <DashboardLayout>
            <Doctors />
          </DashboardLayout>
        }
      />


      {/* Patients */}

      <Route
        path="/patients"
        element={
          <DashboardLayout>
            <Patients />
          </DashboardLayout>
        }
      />


      {/* Settings / Profile */}

      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />

    </Routes>
  );
}

export default AppRoutes;