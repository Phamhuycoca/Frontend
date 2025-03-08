import { lazy } from 'react';
import { RouteConfig } from '../common/interfaces';
import UserList from '../modules/User/UserList';
import LoginPage from '../modules/Auth/Login';
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
    path: '/users',
    element: <UserList />,
    protected: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];
