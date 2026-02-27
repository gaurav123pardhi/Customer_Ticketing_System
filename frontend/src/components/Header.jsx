import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm py-3">
      <Link className="navbar-brand fw-bold d-flex align-items-center" to={user?.role === 'admin' ? "/admin" : "/dashboard"}>
        <div className="bg-primary rounded-circle p-2 me-2 d-inline-flex">
          <i className="bi bi-headset text-white"></i>
        </div>
        SupportDesk
      </Link>

      <div className="ms-auto d-flex align-items-center">
        {!user ? (
          <>
            <Link to="/" className="btn btn-outline-light btn-sm me-2">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <span className="text-light me-3 small d-none d-md-block">
              Logged in as: <strong>{user.email}</strong>
            </span>
            <button className="btn btn-danger btn-sm rounded-pill px-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header