import { App } from "../App"
import type { AppRoute } from "../types/router"
export const routes: AppRoute[] = [
  { path: '/login', element: 'Đăng nhập', private: false },
  { path: '/', element: <App/>, private: false },
  { path: '/users', element: 'Người dùng', private: true },
  { path: '/admin', element: 'Trang quản trị', private: true, roles: ['admin'] },
]