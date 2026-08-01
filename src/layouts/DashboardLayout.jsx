import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import MobileBottomNav from "../components/dashboard/MobileBottomNav";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 md:hidden">
            <Sidebar onClose={() => setSidebarOpen(false)} mobile />
          </div>
        </>
      )}

      {/* Main */}
      <div className="md:ml-64">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 pb-24 md:p-6">
          {children}
        </main>
      </div>

      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}

export default DashboardLayout;