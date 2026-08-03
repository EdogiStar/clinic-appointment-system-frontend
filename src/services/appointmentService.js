import api from "./api";

/**
 * Get appointments for the logged-in patient
 */
export const getAppointments = async () => {
  const response = await api.get(
    "/appointments/patient"
  );

  return response.data?.data || [];
};

/**
 * Get appointments for the logged-in doctor
 *
 * The backend identifies the doctor
 * from the authenticated user's account.
 */
export const getDoctorAppointments = async () => {
  const response = await api.get(
    "/appointments/doctor"
  );

  return response.data?.data || [];
};

/**
 * Get a single appointment by ID
 */
export const getAppointmentById = async (
  id
) => {
  const response = await api.get(
    `/appointments/${id}`
  );

  return response.data?.data || null;
};

/**
 * Create a new appointment
 *
 * Patient only
 */
export const createAppointment = async (
  appointmentData
) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data?.data || null;
};

/**
 * Update appointment status
 *
 * Patient:
 * - Can cancel their own appointment
 *
 * Doctor:
 * - Can confirm, complete, or cancel
 *   their assigned appointments
 *
 * Admin:
 * - Can manage all appointments
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

  return response.data?.data || null;
};

/**
 * Cancel an appointment
 */
export const cancelAppointment = async (
  id
) => {
  return updateAppointmentStatus(
    id,
    "cancelled"
  );
};

/**
 * Get all appointments
 *
 * Admin only
 */
export const getAllAppointments = async () => {
  const response = await api.get(
    "/appointments/admin"
  );

  return response.data?.data || [];
};