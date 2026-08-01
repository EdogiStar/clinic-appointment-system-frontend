import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCog,
  FaHome,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

const navItems = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaCalendarAlt />,
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: <FaUserMd />,
  },
  {
    name: "Patients",
    path: "/patients",
    icon: <FaUserInjured />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div className="grid grid-cols-5">
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
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileBottomNav;