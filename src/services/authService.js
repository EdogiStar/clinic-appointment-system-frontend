import api from "./api";

/**
 * Login user
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


/**
 * Register a patient or doctor
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post(
      "/auth/register",
      userData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Registration error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


/**
 * Sign out the current user
 */
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};