import router from "@/router";
import axios from "axios";

const estoreApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 6000,
});

// add authorization header to every request
estoreApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

// handle common errors
estoreApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error :>> ", error);
    if (error.response?.status === 401) {
      router.navigate("/login");
    }

    if (error.response?.status === 403) {
      router.navigate("/unauthorized");
    }

    return Promise.reject(error);
  },
);

export default estoreApi;
