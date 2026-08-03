import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";
import { toast } from "sonner";

import { logoutUser } from "../../services/authService";

const allMenuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
    roles: ["admin", "doctor", "patient"],
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaCalendarAlt />,
    roles: ["admin", "doctor", "patient"],
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: <FaUserMd />,
    roles: ["admin", "doctor", "patient"],
  },
  {
    name: "Patients",
    path: "/patients",
    icon: <FaUserInjured />,
    roles: ["admin", "doctor"],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
    roles: ["admin", "doctor", "patient"],
  },
];

function Sidebar({ mobile = false, onClose }) {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error(
      "Failed to parse stored user:",
      error
    );
  }

  const role = user?.role?.toLowerCase();

  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    logoutUser();

    if (mobile && onClose) {
      onClose();
    }

    toast.success(
      "You have been signed out successfully."
    );

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside
      className={`flex h-screen max-h-screen w-64 flex-col overflow-hidden border-r border-gray-200 bg-white ${
        mobile
          ? "fixed inset-y-0 left-0 z-50"
          : "fixed left-0 top-0"
      }`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FaCalendarCheck />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-gray-900">
              Clinic Appointment
            </h1>

            <p className="text-xs text-gray-500">
              Management System
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={
                mobile ? onClose : undefined
              }
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-11 w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt className="text-base" />

          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;