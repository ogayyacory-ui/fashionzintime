import { createContext, useState } from 'react'
import { login as loginRequest, logout as logoutRequest } from '../services/authService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fashionzintime-user')) } catch { return null }
  })

  async function login(credentials) {
    const result = await loginRequest(credentials)
    localStorage.setItem('fashionzintime-token', result.access_token || result.token)
    localStorage.setItem('fashionzintime-user', JSON.stringify(result.user))
    setUser(result.user)
  }

  function logout() {
    logoutRequest()
    localStorage.removeItem('fashionzintime-user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, setUser }}>{children}</AuthContext.Provider>
}