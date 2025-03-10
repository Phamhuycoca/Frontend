import { removeToken } from '../utils/storage';
import apiClient from './api/apiClient';

class AuthService {
  static async login(username: string, password: string) {
    const response = await apiClient.post('/auth/login', { username, password });
    return response;
  }

  static async logout() {
    removeToken();
    window.location.href = '/login';
  }
}

export default AuthService;
