import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// ✅ Hook useAuth để sử dụng Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
