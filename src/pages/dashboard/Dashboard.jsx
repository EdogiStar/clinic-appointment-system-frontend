import { FaCalendarAlt, FaClock, FaUserMd, FaUsers } from "react-icons/fa";

function Dashboard() {
  const stats = [
    {
      title: "Today's Appointments",
      value: 18,
      icon: <FaCalendarAlt />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Doctors Available",
      value: 6,
      icon: <FaUserMd />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Patients",
      value: 124,
      icon: <FaUsers />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending",
      value: 4,
      icon: <FaClock />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back. Here's today's clinic overview.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${item.color}`}
            >
              {item.icon}
            </div>

            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4">
          <h2 className="font-semibold">
            Recent Appointments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4">John Doe</td>
                <td className="p-4">Dr. Sarah Ahmed</td>
                <td className="p-4">09:00 AM</td>
                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Confirmed
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Aisha Bello</td>
                <td className="p-4">Dr. John Smith</td>
                <td className="p-4">11:00 AM</td>
                <td className="p-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Michael James</td>
                <td className="p-4">Dr. Sarah Ahmed</td>
                <td className="p-4">02:00 PM</td>
                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    Checked In
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;