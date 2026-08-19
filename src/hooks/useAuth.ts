export function useAuth() {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  return {
    isAuthenticated: !!token,
    user,
  }
}