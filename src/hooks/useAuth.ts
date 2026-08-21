import { store } from '../stores/store';

export function useAuth() {
  const token = store.getState().auth.accessToken;
  const user = store.getState().auth;

  return {
    isAuthenticated: !!token,
    user,
  };
}
