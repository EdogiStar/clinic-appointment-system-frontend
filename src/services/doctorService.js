import api from "./api";

/**
 * Get all doctors
 *
 * Returns doctors with their linked user account,
 * including the account status:
 *
 * - active
 * - pending
 * - rejected
 */
export const getDoctors = async () => {
  const response = await api.get(
    "/doctors"
  );

  return response.data;
};


/**
 * Activate a doctor
 *
 * Changes the doctor's linked user status
 * from pending/rejected to active.
 *
 * @param {string} doctorId
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
 * Reject a doctor
 *
 * Changes the doctor's linked user status
 * to rejected.
 *
 * @param {string} doctorId
 */
export const rejectDoctor = async (
  doctorId
) => {
  const response = await api.patch(
    `/admin/doctors/${doctorId}/reject`
  );

  return response.data;
};