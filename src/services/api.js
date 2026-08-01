import axios from "axios";

const api = axios.create({
  baseURL: "YOUR_BACKEND_URL/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;