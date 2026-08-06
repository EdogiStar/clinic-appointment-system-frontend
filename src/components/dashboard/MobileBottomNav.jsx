import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaCog,
  FaHome,
  FaUserMd,
} from "react-icons/fa";

function MobileBottomNav() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role?.toLowerCase();

  let navItems = [];

  if (role === "admin") {
    navItems = [
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
        name: "Settings",
        path: "/settings",
        icon: <FaCog />,
      },
    ];
  } else if (role === "doctor") {
    navItems = [
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
        name: "Availability",
        path: "/availability",
        icon: <FaClock />,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: <FaCog />,
      },
    ];
  } else {
    navItems = [
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
        name: "Settings",
        path: "/settings",
        icon: <FaCog />,
      },
    ];
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div className="grid grid-cols-4">
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