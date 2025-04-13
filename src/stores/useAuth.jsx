import { createContext, useContext, useState, useEffect } from 'react'
import authApi from '../apis/authApi'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.getme()
        setUser(res.data.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
