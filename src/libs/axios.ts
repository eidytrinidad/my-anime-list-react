import axios from "axios";
import { useAuthStore } from "../store/authStore";
const apiUrl = import.meta.env.VITE_API_URL;
const authApi = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default authApi;
