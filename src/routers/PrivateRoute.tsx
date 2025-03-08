// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Nếu chưa đăng nhập, chuyển hướng đến trang Login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Nếu đã đăng nhập, hiển thị các children
  return <Outlet />;
};

export default PrivateRoute;
