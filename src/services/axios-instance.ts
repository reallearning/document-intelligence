import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://d062-223-185-129-150.ngrok-free.app",
  timeout: 300000,
  withCredentials: true, // Important for CORS with credentials
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
    // Remove any custom CORS headers from here - they should be set on the server
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("Request Error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
