import router from "@utils/router.util";
import { message } from "antd";
import axios from "axios";

const estoreApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout: 6000,
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
    if (error.response?.status === 401) {
      router.navigate("/login");
    }

    if (error.response?.status === 403) {
      message.error("權限不足");
    }

    if (error.response?.status === 500) {
      message.error("伺服器錯誤");
    }

    if (error.response?.data) {
      return Promise.reject({
        ...error.response.data,
        message: error.response.data.detail || error.response.data.message || error.response.data.errors?.[0]?.message,
      });
    }

    return Promise.reject(error);
  },
);

export default estoreApi;
