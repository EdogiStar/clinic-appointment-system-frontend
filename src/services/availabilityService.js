import api from "./api";

/**
 * Get availability for the logged-in doctor
 */
export const getAvailability = async () => {
  const response = await api.get(
    "/availability"
  );

  return response.data.data;
};

/**
 * Create a new availability slot
 */
export const createAvailability = async (
  availabilityData
) => {
  const response = await api.post(
    "/availability",
    availabilityData
  );

  return response.data.data;
};

/**
 * Update an availability slot
 */
export const updateAvailability = async (
  availabilityId,
  availabilityData
) => {
  const response = await api.patch(
    `/availability/${availabilityId}`,
    availabilityData
  );

  return response.data.data;
};

/**
 * Delete an availability slot
 */
export const deleteAvailability = async (
  availabilityId
) => {
  const response = await api.delete(
    `/availability/${availabilityId}`
  );

  return response.data;
};

/**
 * Get availability for a specific doctor
 * Used when patients are booking appointments.
 */
export const getDoctorAvailability = async (
  doctorId
) => {
  const response = await api.get(
    `/availability/doctor/${doctorId}`
  );

  return response.data.data;
};