import api from "./api";

/**
 * Get all doctors
 *
 * Returns doctors with their linked user account
 * and specialty information.
 */
export const getDoctors = async () => {
  try {
    const response = await api.get(
      "/doctors"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch doctors:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};


/**
 * Get only active doctors
 *
 * Used by patients when booking
 * an appointment.
 */
export const getActiveDoctors = async () => {
  try {
    const response = await api.get(
      "/doctors"
    );

    const data =
      response.data;

    /*
     * Handle possible API response formats
     */
    const doctorList =
      Array.isArray(data)
        ? data
        : Array.isArray(
            data?.data
          )
        ? data.data
        : Array.isArray(
            data?.doctors
          )
        ? data.doctors
        : [];

    /*
     * Only return doctors whose
     * linked user account is active.
     *
     * Backend structure:
     *
     * doctor.user.status
     */
    return doctorList.filter(
      (doctor) =>
        doctor?.user?.status?.toLowerCase() ===
        "active"
    );
  } catch (error) {
    console.error(
      "Failed to fetch active doctors:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
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
  const response =
    await api.patch(
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
  const response =
    await api.patch(
      `/admin/doctors/${doctorId}/reject`
    );

  return response.data;
};