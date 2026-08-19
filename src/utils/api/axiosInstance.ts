// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // bắt buộc để cookie (refresh_token) được gửi/nhận
});

export default axiosInstance;