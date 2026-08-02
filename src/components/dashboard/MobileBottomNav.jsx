import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCog,
  FaHome,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

const allNavItems = [
  {
    name: "Home",
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

function MobileBottomNav() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role;

  const navItems = allNavItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div
        className={`grid ${
          navItems.length === 4
            ? "grid-cols-4"
            : "grid-cols-5"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-3 text-xs transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
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
  );
}

export default MobileBottomNav;