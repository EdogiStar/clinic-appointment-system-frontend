import api from "./api";

/**
 * Get all patients
 * Admin only
 */
export const getPatients = async () => {
  const response = await api.get("/patients");

  return response.data;
};