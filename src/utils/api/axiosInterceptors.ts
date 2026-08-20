// axiosInterceptors.ts
import axios from 'axios';
import axiosInstance from './axiosInstance';
import { Subject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { store } from '../../stores/store';
import { clearAuth, setAccessToken } from '../../stores/slices/authSlice';

let isRefreshing = false;
const refreshedToken$ = new Subject<string>();

function waitForNewToken(): Observable<string> {
  return refreshedToken$.pipe(
    filter((t) => !!t),
    take(1)
  );
}

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        waitForNewToken().subscribe({
          next: (newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          },
          error: reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      store.dispatch(setAccessToken(data.accessToken));
      refreshedToken$.next(data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshErr) {
      store.dispatch(clearAuth());
      window.location.href = '/login';
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
