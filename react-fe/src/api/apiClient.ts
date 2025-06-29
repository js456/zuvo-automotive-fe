import axios from "axios";
import { API_BASE_URL } from "../constants/ApiConstants";

const apiClient = axios.create({
  baseURL: API_BASE_URL, // your API base URL
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("📦 Retrieved token from localStorage:", token); // ← Debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default apiClient;
