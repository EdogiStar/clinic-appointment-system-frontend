import api from "./api";

/**
 * Get appointments for the logged-in patient
 */
export const getAppointments = async () => {
  const response = await api.get("/appointments/patient");

  return response.data;
};

/**
 * Get appointments for a specific doctor
 */
export const getDoctorAppointments = async (doctorId) => {
  const response = await api.get(
    `/appointments/doctor/${doctorId}`
  );

  return response.data;
};

/**
 * Get a single appointment
 */
export const getAppointmentById = async (id) => {
  const response = await api.get(
    `/appointments/${id}`
  );

  return response.data;
};

/**
 * Create a new appointment
 */
export const createAppointment = async (
  appointmentData
) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

/**
 * Update appointment status
 */
export const updateAppointmentStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/appointments/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

/**
 * Cancel appointment
 */
export const cancelAppointment = async (id) => {
  return updateAppointmentStatus(
    id,
    "cancelled"
  );
};

/**
 * Get all appointments for admin
 */
export const getAllAppointments = async () => {
  const response = await api.get(
    "/appointments/admin"
  );

  return response.data;
};