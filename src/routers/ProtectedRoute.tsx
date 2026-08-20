import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode;
  isPrivate?: boolean;
  roles?: string[];
};

export default function ProtectedRoute({ children, isPrivate, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isPrivate) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}
