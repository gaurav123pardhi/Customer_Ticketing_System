import { createContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage" // Naya hook import kiya

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Purane useState ki jagah ab hum custom hook use kar rahe hain
  // Ye 'user' ki detail ko browser mein hamesha save rakhega
  const [user, setUser] = useLocalStorage("user", null)

  const login = (email) => {
    // Admin check logic
    const role = email === "admin@gmail.com" ? "admin" : "user"
    
    const userData = { 
      email, 
      role,
      loginTime: new Date().toLocaleString() 
    }

    // setUser karte hi ye apne aap localStorage mein save ho jayega
    setUser(userData)
  }

  const logout = () => {
    // Ye localStorage se 'user' ko remove kar dega aur state null kar dega
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}