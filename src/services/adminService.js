import api from "./api";

/**
 * Get all doctors for admin
 */
export const getAdminDoctors = async () => {
  const response = await api.get("/admin/doctors");

  return response.data;
};


/**
 * Activate a pending doctor
 */
export const activateDoctor = async (
  doctorId
) => {
  const response = await api.patch(
    `/admin/doctors/${doctorId}/activate`
  );

  return response.data;
};


/**
 * Reject a pending doctor
 */
export const rejectDoctor = async (
  doctorId
) => {
  const response = await api.patch(
    `/admin/doctors/${doctorId}/reject`
  );

  return response.data;
};