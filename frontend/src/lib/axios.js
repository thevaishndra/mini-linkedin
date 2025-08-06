import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // important for sending cookies like JWT
});

