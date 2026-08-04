import api from "./api";

/**
 * Get a doctor's availability
 *
 * Returns the doctor's weekly
 * availability schedule.
 *
 * @param {string} doctorId
 */
export const getDoctorAvailability = async (
  doctorId
) => {
  const response = await api.get(
    `/availability/doctor/${doctorId}`
  );

  return response.data?.data || [];
};