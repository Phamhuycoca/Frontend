import { useEffect, useState } from 'react';
import { getToken, removeToken, setRefreshToken, setToken } from '../utils/storage';
import AuthService from '../services/AuthService';
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login(username, password);
      setIsAuthenticated(true);
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    AuthService.logout();
    removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};

export default useAuth;
