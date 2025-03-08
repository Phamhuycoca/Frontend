import { createContext } from 'react';

// ✅ Định nghĩa kiểu dữ liệu cho Context
interface AuthContextType {
  user: { token: string } | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// ✅ Tạo Context với giá trị mặc định là null
export const AuthContext = createContext<AuthContextType | null>(null);
