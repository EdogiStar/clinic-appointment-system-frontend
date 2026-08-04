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
export const getDoctorAppointments =
  async () => {
    const response = await api.get(
      "/appointments/doctor"
    );

    return response.data?.data || [];
  };

/**
 * Get all appointments
 *
 * Admin only
 */
export const getAllAppointments =
  async () => {
    const response = await api.get(
      "/appointments/admin"
    );

    return response.data?.data || [];
  };

/**
 * Get a single appointment by ID
 */
export const getAppointmentById =
  async (id) => {
    const response = await api.get(
      `/appointments/${id}`
    );

    return response.data?.data || null;
  };

/**
 * Create a new appointment
 *
 * Patient only
 *
 * @param {Object} appointmentData
 * @param {string} appointmentData.doctor_id
 * @param {string} appointmentData.appointment_date
 * @param {string} appointmentData.start_time
 * @param {string} appointmentData.end_time
 * @param {string} appointmentData.reason
 */
export const createAppointment =
  async (appointmentData) => {
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
 * - Can confirm
 * - Can complete
 * - Can cancel
 *
 * Admin:
 * - Can manage all appointments
 */
export const updateAppointmentStatus =
  async (id, status) => {
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
export const cancelAppointment =
  async (id) => {
    return updateAppointmentStatus(
      id,
      "cancelled"
    );
  };

/**
 * Get available appointment slots
 * for a doctor on a specific date
 *
 * The backend returns slots in this format:
 *
 * [
 *   {
 *     start_time: "09:00",
 *     end_time: "09:30"
 *   },
 *   {
 *     start_time: "09:30",
 *     end_time: "10:00"
 *   }
 * ]
 *
 * @param {string} doctorId
 * @param {string} date
 */
export const getAvailableSlots = async (
  doctorId,
  date
) => {
  if (!doctorId) {
    throw new Error(
      "Doctor ID is required"
    );
  }

  if (!date) {
    throw new Error(
      "Appointment date is required"
    );
  }

  const response = await api.get(
    `/slots/doctor/${doctorId}`,
    {
      params: {
        date,
      },
    }
  );

  return response.data?.data || [];
};