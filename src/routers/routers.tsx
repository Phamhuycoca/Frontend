import { App } from '@/App';
import type { AppRoute } from '../types/router';
export const publicRoutes: AppRoute[] = [
  { path: 'login', element: 'Đăng nhập', private: false },
  { path: '/',index: true, element: <App />, private: false },
];

export const adminRoutes: AppRoute[] = [
  { path: 'users', element: 'Người dùng', private: true },
  // ... các route riêng cho admin
];