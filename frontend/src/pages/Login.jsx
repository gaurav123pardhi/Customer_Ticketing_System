import { useNavigate, Link } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    // LocalStorage se users ki list check karna
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || []

    // 1. Admin Login (Special Access)
    if (email === "admin@gmail.com" && password === "admin123") {
      login(email)
      navigate("/admin")
    } 
    else {
      // 2. Normal User Check
      const validUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      )

      if (validUser) {
        login(email)
        alert("Login Successful!")
        navigate("/dashboard")
      } else {
        alert("Invalid Email or Password! Pehle Register karein.")
      }
    }
  }

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "420px", width: "100%", borderRadius: "25px" }}>
        
        {/* Modern Circular Logo Section */}
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center mb-3 shadow" 
            style={{ 
              width: "85px", 
              height: "85px", 
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", 
              borderRadius: "50%", 
              border: "5px solid #ffffff" 
            }}
          >
            {/* Professional Support Icon */}
            <i className="bi bi-headset text-white fs-1"></i>
          </div>
          <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-1px" }}>SupportDesk</h3>
          <p className="text-muted small fw-medium">Customer Ticketing Portal</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <div className="input-group" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <span className="input-group-text bg-white border-0"><i className="bi bi-envelope text-muted"></i></span>
              <input 
                type="email" 
                className="form-control border-0 shadow-none py-2" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">Password</label>
            <div className="input-group" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <span className="input-group-text bg-white border-0"><i className="bi bi-lock text-muted"></i></span>
              <input 
                type="password" 
                className="form-control border-0 shadow-none py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button 
            className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
            style={{ borderRadius: "12px", background: "linear-gradient(to right, #4f46e5, #3b82f6)", border: "none" }}
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            Account nahi hai? <Link to="/register" className="text-primary fw-bold text-decoration-none">Naya account banayein</Link>
          </p>
        </div>

        {/* Admin Login Help Box */}
        <div className="mt-4 p-3 rounded-4 text-center" style={{ background: "#f8fafc", border: "1px dashed #cbd5e1" }}>
          <p className="mb-1 fw-bold small text-uppercase text-secondary" style={{ fontSize: "10px", letterSpacing: "1px" }}>Admin Access</p>
          <div className="small text-muted">
            admin@gmail.com | admin123
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login