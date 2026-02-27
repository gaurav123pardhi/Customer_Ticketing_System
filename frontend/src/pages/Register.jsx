import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    // Password matching check
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || []
    const userExists = existingUsers.find((user) => user.email === email)

    if (userExists) {
      alert("User already exists! Please login.")
      return
    }

    const newUser = {
      email: email,
      password: password,
      role: "user"
    }

    const updatedUsers = [...existingUsers, newUser]
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    alert("Registration Successful! Please login.")
    navigate("/") 
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f0f4f8" }}>
      <div className="card p-4 shadow-lg border-0 animate-card" style={{ maxWidth: "420px", width: "100%", borderRadius: "24px" }}>
        
        {/* Circular Logo Section */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3 logo-pulse" 
            style={{ 
              width: "80px", 
              height: "80px", 
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)", 
              borderRadius: "50%", 
              border: "4px solid white" 
            }}>
            <i className="bi bi-person-plus-fill text-white fs-1"></i>
          </div>
          <h3 className="fw-bold">Create Account</h3>
          <p className="text-muted small">Join our support community today</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Email field */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <div className="input-group border rounded-3 overflow-hidden">
              <span className="input-group-text bg-white border-0"><i className="bi bi-envelope text-muted"></i></span>
              <input 
                type="email" 
                className="form-control border-0 shadow-none py-2" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Password</label>
            <div className="input-group border rounded-3 overflow-hidden">
              <span className="input-group-text bg-white border-0"><i className="bi bi-lock text-muted"></i></span>
              <input 
                type="password" 
                className="form-control border-0 shadow-none py-2"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">Confirm Password</label>
            <div className="input-group border rounded-3 overflow-hidden">
              <span className="input-group-text bg-white border-0"><i className="bi bi-check-circle text-muted"></i></span>
              <input 
                type="password" 
                className="form-control border-0 shadow-none py-2"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 py-2 fw-bold shadow-sm" style={{ borderRadius: "12px", background: "linear-gradient(to right, #4f46e5, #3b82f6)", border: "none" }}>
            Register Now
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            Pehle se account hai? <Link to="/" className="text-primary fw-bold text-decoration-none">Login Karein</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register