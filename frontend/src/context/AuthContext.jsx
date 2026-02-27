import { createContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null)

  const login = (email) => {
    // Admin check logic
    const role = email === "admin@gmail.com" ? "admin" : "user"
    
    const userData = { 
      email, 
      role,
      loginTime: new Date().toLocaleString() 
    }
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
