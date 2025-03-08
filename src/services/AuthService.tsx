import apiClient from '../api/apiClient';
import { removeToken } from '../utils/storage';

class AuthService {
  static async login(username: string, password: string) {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  }

  static async logout() {
    removeToken();
    window.location.href = '/';
  }
}

export default AuthService;
