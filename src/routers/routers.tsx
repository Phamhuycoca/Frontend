import type { AppRoute } from "../types/router"
export const routes: AppRoute[] = [
  { path: '/login', element: 'Đăng nhập', private: false },
  { path: '/', element: 'Trang chủ', private: true },
  { path: '/users', element: 'Người dùng', private: true },
  { path: '/admin', element: 'Trang quản trị', private: true, roles: ['admin'] },
]