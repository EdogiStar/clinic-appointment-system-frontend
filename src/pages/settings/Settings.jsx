import {
  FaUserCircle,
  FaUserMd,
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaStethoscope,
  FaEdit,
  FaLock,
} from "react-icons/fa";

function Settings() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role || "user";

  const formattedRole =
    role.charAt(0).toUpperCase() +
    role.slice(1);

  const getRoleIcon = () => {
    if (role === "admin") {
      return <FaUserShield />;
    }

    if (role === "doctor") {
      return <FaUserMd />;
    }

    return <FaUser />;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage your profile and account information.
        </p>
      </div>

      {/* Profile Header */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-blue-600 px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-blue-600 shadow-sm">
              <FaUserCircle />
            </div>

            {/* User Info */}
            <div className="text-center text-white sm:text-left">
              <h2 className="text-xl font-bold sm:text-2xl">
                {user?.full_name || "User"}
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-blue-100 sm:justify-start">
                <span className="text-base">
                  {getRoleIcon()}
                </span>

                <span>{formattedRole}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Profile Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your account details and personal information.
              </p>
            </div>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:flex"
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {/* Information Grid */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <ProfileItem
              icon={<FaUser />}
              label="Full Name"
              value={user?.full_name}
            />

            {/* Email */}
            <ProfileItem
              icon={<FaEnvelope />}
              label="Email Address"
              value={user?.email}
            />

            {/* Phone */}
            <ProfileItem
              icon={<FaPhone />}
              label="Phone Number"
              value={user?.phone}
            />

            {/* Role */}
            <ProfileItem
              icon={getRoleIcon()}
              label="Account Role"
              value={formattedRole}
            />

            {/* Doctor-specific information */}
            {role === "doctor" && (
              <>
                <ProfileItem
                  icon={<FaIdCard />}
                  label="License Number"
                  value={user?.license_number}
                />

                <ProfileItem
                  icon={<FaStethoscope />}
                  label="Specialty"
                  value={
                    user?.specialty?.name ||
                    user?.specialty_name
                  }
                />
              </>
            )}
          </div>

          {/* Mobile Edit Button */}
          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:hidden"
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Account Security */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FaLock />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-gray-900">
              Account Security
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Keep your account secure by managing your password
              and authentication settings.
            </p>

            <button
              type="button"
              className="mt-4 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Change Password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------- */
/* Profile Item */
/* ---------------------------------- */

function ProfileItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-blue-600 shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-gray-900">
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;