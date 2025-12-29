import axios from "axios";

/**
 * Axios instance configuration
 * - Uses Vite environment variable
 * - Automatically attaches JWT token
 * - Excludes auth headers for login & register
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://127.0.0.1:8000/api/
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 REQUEST INTERCEPTOR (Attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    // ❌ Do NOT attach token for auth endpoints
    if (
      token &&
      !config.url.includes("accounts/login") &&
      !config.url.includes("accounts/register")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ RESPONSE INTERCEPTOR (Optional – future ready)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout on token expiry (optional)
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized - Token expired or invalid");
      // localStorage.removeItem("access");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
