import api from "./api";

/**
 * Get the logged-in patient's dashboard
 *
 * Patient only
 */
export const getPatientDashboard = async () => {
  const response = await api.get(
    "/patients/dashboard"
  );

  return response.data?.data || null;
};

/**
 * Get all patients
 *
 * Admin only
 */
export const getPatients = async () => {
  const response = await api.get(
    "/patients"
  );

  return response.data?.data || [];
};

/**
 * Get patients who have appointments
 * with the logged-in doctor
 *
 * Doctor only
 */
export const getDoctorPatients = async () => {
  const response = await api.get(
    "/patients/doctor"
  );

  return response.data?.data || [];
};

/**
 * Get all active doctors
 *
 * Patient only
 */
export const getDoctors = async () => {
  const response = await api.get(
    "/patients/doctors"
  );

  return response.data?.data || [];
};

/**
 * Get availability for a specific doctor
 *
 * Patient only
 */
export const getDoctorAvailability = async (
  doctorId
) => {
  const response = await api.get(
    `/patients/doctors/${doctorId}/availability`
  );

  return response.data?.data || [];
};

/**
 * Get available time slots for a specific doctor
 * on a specific date
 *
 * Patient only
 */
export const getDoctorSlots = async (
  doctorId,
  date
) => {
  const response = await api.get(
    `/patients/doctors/${doctorId}/slots`,
    {
      params: {
        date,
      },
    }
  );

  return response.data?.data || {
    date,
    slots: [],
  };
};