import { store } from '../stores/store';

export function useAuth() {
  const token = store.getState().auth.accessToken;
  const userId = store.getState().auth.userId;

  return {
    isAuthenticated: !!token,
    userId,
  };
}
