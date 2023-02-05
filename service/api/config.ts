import axios from "axios";

// axios.defaults.baseURL = process.env.API_URL || "http://localhost:8000";
axios.defaults.baseURL = "https://unittestbe.onrender.com";

export function setToken(token: string) {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
}
