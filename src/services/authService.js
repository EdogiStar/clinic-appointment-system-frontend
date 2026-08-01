import api from "./api";

/**
 * Login user
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    console.log("SUCCESS:", response);

    return response.data;
  } catch (error) {
    console.log("ERROR OBJECT:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Request setup error:", error.message);
    }

    throw error;
  }
};