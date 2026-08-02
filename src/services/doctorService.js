import api from "./api";

/**
 * Get all doctors
 */
export const getDoctors = async () => {
  const response = await api.get("/doctors");

  return response.data;
};