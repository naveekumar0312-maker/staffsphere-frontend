import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // 🔥 EXCLUDE auth for login & register
  if (
    token &&
    !config.url.includes("accounts/login") &&
    !config.url.includes("accounts/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
