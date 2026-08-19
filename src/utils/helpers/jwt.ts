// utils/jwt.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};