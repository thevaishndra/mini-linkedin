import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // important for sending cookies like JWT
});

