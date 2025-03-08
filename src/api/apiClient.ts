import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getToken, setToken, removeToken } from '../utils/storage';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:5000/api',
  timeout: 10000,
});

// Middleware xử lý request
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Middleware xử lý response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post('https://api.example.com/auth/refresh', {
          refresh_token: localStorage.getItem('refresh_token'),
        });
        setToken(refreshResponse.data.access_token);
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        removeToken();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
