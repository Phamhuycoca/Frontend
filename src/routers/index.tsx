// routes/index.tsx
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import type { AppRoute } from '../types/router';
import { adminRoutes, publicRoutes } from './routers';
import Forbidden from '../shared/pages/Forbidden';
import NotFound from '../shared/pages/NotFound';
import { AdminDashboardLayout } from '@/features/layouts/Dashboard/AdminDashboardLayout';
import { MainLayout } from '@/shared/components/Layout/MainLayout';

function buildRoutes(routeList: AppRoute[]): RouteObject[] {
  return routeList.map((route): RouteObject => {
    const element = (
      <ProtectedRoute isPrivate={route.private} roles={route.roles}>
        {route.element}
      </ProtectedRoute>
    );

    if (route.index) {
      return {
        index: true,
        element,
      };
    }

    // nhánh route thường
    return {
      path: route.path,
      element,
      children: route.children ? buildRoutes(route.children) : undefined,
    };
  });
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [...buildRoutes(publicRoutes)],
  },
  {
    path: 'admin',
    element: <AdminDashboardLayout />,
    children: [...buildRoutes(adminRoutes)],
  },
  { path: '403', element: <Forbidden /> },
  { path: '*', element: <NotFound /> },
]);
