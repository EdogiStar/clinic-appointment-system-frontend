import { NavLink } from "react-router-dom";
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
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role;

  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <aside
      className={`flex h-screen w-64 flex-col border-r border-gray-200 bg-white ${
        mobile ? "" : "fixed left-0 top-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FaCalendarCheck />
          </div>

          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Clinic Appointment
            </h1>

            <p className="text-xs text-gray-500">
              Management System
            </p>
          </div>
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={mobile ? onClose : undefined}
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

            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;