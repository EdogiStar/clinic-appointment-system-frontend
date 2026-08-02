import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";

function Topbar({ onMenuClick }) {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const fullName = user?.full_name || "User";

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() +
      user.role.slice(1)
    : "User";

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
            aria-label="Open sidebar"
          >
            <FaBars size={20} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="hidden text-sm text-gray-500 sm:block">
              Welcome back, {fullName}.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Notifications"
          >
            <FaBell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <button className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-gray-100">
            <FaUserCircle
              size={34}
              className="text-blue-600"
            />

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-gray-900">
                {fullName}
              </p>

              <p className="text-xs text-gray-500">
                {role}
              </p>
            </div>

            <FaChevronDown className="hidden text-xs text-gray-500 md:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;