import { useContext, useState } from "react"
import { TicketContext } from "../context/TicketContext"
import { AuthContext } from "../context/AuthContext"
import TicketCard from "../components/TicketCard" // Wahi component use karenge
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const { tickets, updateStatus, deleteTicket } = useContext(TicketContext)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [filter, setFilter] = useState("All")

  const safeTickets = tickets || []
  const filteredTickets = filter === "All" 
    ? safeTickets 
    : safeTickets.filter(t => t.status === filter)

  return (
    <div className="container mt-4 pb-5">
      {/* Admin Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 animate-card">
        <div>
          <h2 className="fw-bold mb-0">Admin Control Center <i className="bi bi-shield-lock text-primary"></i></h2>
          <p className="text-muted small">Monitoring {safeTickets.length} total user requests</p>
        </div>
        <button className="btn btn-danger btn-sm rounded-pill px-4 shadow-sm" onClick={() => { logout(); navigate("/"); }}>
          Logout
        </button>
      </div>

      {/* Quick Stats Summary */}
      <div className="row mb-4 g-3 animate-card" style={{animationDelay: '0.1s'}}>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-dark text-white rounded-4">
            <small className="opacity-75 text-uppercase fw-bold" style={{fontSize: '10px'}}>Total Inflow</small>
            <h3 className="fw-bold mb-0">{safeTickets.length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-warning rounded-4">
            <small className="fw-bold text-dark text-uppercase" style={{fontSize: '10px'}}>Pending Action</small>
            <h3 className="fw-bold mb-0">{safeTickets.filter(t => t.status !== "Closed").length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-success text-white rounded-4">
            <small className="fw-bold text-uppercase" style={{fontSize: '10px'}}>Resolved Cases</small>
            <h3 className="fw-bold mb-0">{safeTickets.filter(t => t.status === "Closed").length}</h3>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4 animate-card bg-light rounded-4" style={{animationDelay: '0.2s'}}>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold"><i className="bi bi-funnel me-2"></i>Filter System</h6>
          <select className="form-select w-auto shadow-none border-0" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All User Tickets</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Admin Ticket List */}
      <div className="row">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-check-circle fs-1 text-muted opacity-25"></i>
            <p className="text-muted">No tickets to manage right now.</p>
          </div>
        ) : (
          filteredTickets.map((ticket, index) => (
            <div key={ticket.id} className="col-12 mb-3 animate-card" style={{animationDelay: `${(index + 3) * 0.1}s`}}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="row g-0 align-items-center">
                  <div className="col-md-8">
                    {/* Reuse TicketCard Component but only for UI */}
                    <TicketCard ticket={ticket} onClick={() => {}} /> 
                  </div>
                  <div className="col-md-4 p-3 border-start bg-light d-flex gap-2 align-items-center justify-content-end">
                    {/* Admin Exclusive Controls */}
                    <div className="input-group input-group-sm w-auto">
                      <select 
                        className="form-select border-primary-subtle fw-bold"
                        style={{fontSize: '11px', borderRadius: '8px'}}
                        value={ticket.status}
                        onChange={(e) => updateStatus(ticket.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <button className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" onClick={() => deleteTicket(ticket.id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminDashboard