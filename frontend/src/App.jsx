import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Pages Import
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTicket from "./pages/CreateTicket";

// Components Import
import Header from "./components/Header";

function App() {
  const { user } = useContext(AuthContext);

  // Protected Route Logic: Agar user login nahi hai toh Login page par bhej do
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Admin Route Logic: Sirf admin hi access kar sake
  const AdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  return (
    <div className="app-container">
      {/* Header har page par dikhega (Login/Register ko chhod kar handle kiya ja sakta hai Header.jsx ke andar) */}
      <Header />

      <main className="py-3">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? "/admin" : "/dashboard"} /> : <Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes (Protected) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-ticket" 
            element={
              <ProtectedRoute>
                <CreateTicket />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes (Highly Protected) */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;