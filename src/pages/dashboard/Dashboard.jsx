import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

function Dashboard() {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
  }

  const role = user?.role?.toLowerCase();

  if (role === "admin") {
    return <AdminDashboard user={user} />;
  }

  if (role === "doctor") {
    return <DoctorDashboard user={user} />;
  }

  if (role === "patient") {
    return <PatientDashboard user={user} />;
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Unable to Load Dashboard
        </h2>

        <p className="mt-2 text-sm text-red-600">
          Your account role could not be determined. Please log in again.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;