import api from "./api";

/**
 * Get admin dashboard data
 */
export const getAdminDashboard = async () => {
  const response = await api.get(
    "/dashboard/admin"
  );

  return response.data;
};