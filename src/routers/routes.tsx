import { lazy } from 'react';
import { RouteConfig } from '../common/interfaces';
import UserList from '../modules/User/UserList';
import LoginPage from '../modules/Auth/Login';
import NotFound from '../components/pages/NotFound';
import AdminLayout from '../layouts/Admin/AdminLayout';
import { EspList } from '../modules/Categories';
const BadRequest = lazy(() => import('../components/pages/BadRequest'));
export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <BadRequest />,
    children: [
      {
        path: '/home',
        element: <BadRequest />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    protected: true,
    children: [
      {
        path: 'categories',
        element: <EspList />,
      },
    ],
  },
  {
    path: '/users',
    element: <UserList />,
    protected: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
