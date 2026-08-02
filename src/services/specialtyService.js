import api from "./api";

/**
 * Get all specialties
 */
export const getSpecialties = async () => {
  try {
    const response = await api.get(
      "/specialties"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch specialties:",
      error.response?.data || error.message
    );

    throw error;
  }
};