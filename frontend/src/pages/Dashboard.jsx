import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { TicketContext } from "../context/TicketContext"
import TicketCard from "../components/TicketCard"
import { useNavigate, Link } from "react-router-dom"

function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const { tickets, deleteTicket } = useContext(TicketContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const navigate = useNavigate()

  const myTickets = tickets.filter(t => t.userEmail === user?.email)

  const filteredTickets = myTickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || t.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mt-4 pb-5">

      <div className="d-flex justify-content-between align-items-center mb-4 animate-card">
        <div>
          <h2 className="fw-bold mb-0 text-dark">Hi, {user?.email?.split('@')[0]} 👋</h2>
          <p className="text-muted small mb-0"><i className="bi bi-calendar3 me-2"></i>Track your active support requests</p>
        </div>
        <button className="btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm" onClick={() => { logout(); navigate("/"); }}>
          <i className="bi bi-power me-1"></i> Logout
        </button>
      </div>

      <div className="row mb-4 g-3 animate-card" style={{animationDelay: '0.1s'}}>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-white" style={{background: 'linear-gradient(135deg, #4f46e5, #3b82f6)', borderRadius: '15px'}}>
            <small className="opacity-75 text-uppercase fw-bold" style={{fontSize: '10px'}}>Total Tickets</small>
            <h2 className="fw-bold mb-0">{myTickets.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{borderRadius: '15px', borderLeft: '5px solid #ffc107'}}>
            <small className="text-muted text-uppercase fw-bold" style={{fontSize: '10px'}}>Active Issues</small>
            <h2 className="fw-bold mb-0 text-warning">{myTickets.filter(t => t.status !== "Closed").length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{borderRadius: '15px', borderLeft: '5px solid #198754'}}>
            <small className="text-muted text-uppercase fw-bold" style={{fontSize: '10px'}}>Resolved Cases</small>
            <h2 className="fw-bold mb-0 text-success">{myTickets.filter(t => t.status === "Closed").length}</h2>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4 animate-card" style={{animationDelay: '0.2s'}}>
        <div className="col-md-6">
          <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white px-2">
            <span className="input-group-text bg-white border-0"><i className="bi bi-search text-muted"></i></span>
            <input type="text" className="form-control border-0 shadow-none py-2" placeholder="Search issues..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select border-0 shadow-sm rounded-pill py-2 px-3" onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="col-md-3">
          <Link to="/create-ticket" className="btn btn-dark w-100 rounded-pill py-2 shadow-sm">
            <i className="bi bi-plus-lg me-1"></i> New Request
          </Link>
        </div>
      </div>

      <div className="row mb-5">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm animate-card">
            <i className="bi bi-inbox fs-1 text-muted opacity-25"></i>
            <h5 className="mt-3 text-muted small">No tickets found.</h5>
          </div>
        ) : (
          filteredTickets.map((ticket, index) => (
            <div key={ticket.id} className="col-12 animate-card" style={{animationDelay: `${(index + 3) * 0.1}s`}}>
              <TicketCard ticket={ticket} onClick={(t) => setSelectedTicket(t)} />
            </div>
          ))
        )}
      </div>

      <hr className="my-5 opacity-25" />

      <div className="extra-content animate-card" style={{animationDelay: '0.4s'}}>
        <div className="row g-4 mt-2">

          <div className="col-md-7">
            <h5 className="fw-bold mb-4">Helpful Information <i className="bi bi-info-circle ms-1"></i></h5>
            <div className="accordion border-0 shadow-sm" id="faqAccordion" style={{borderRadius: '15px', overflow: 'hidden'}}>
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-white fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    How long does it take to get a reply?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted small">
                    Our team reviews all "Open" tickets and usually responds within 24 hours. High-priority cases are handled on priority basis.
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0 border-top">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed bg-white fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    What should I do if my issue is urgent?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted small">
                    Please mark the priority as "High" while creating the ticket. You can also reach out via our direct support email.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card border-0 bg-primary text-white p-4 shadow h-100" style={{borderRadius: '20px'}}>
              <h6 className="fw-bold mb-3"><i className="bi bi-headset me-2"></i>Dedicated Support</h6>
              <p style={{fontSize: '13px'}} className="opacity-75">Facing technical difficulties? Our emergency support team is available for premium assistance.</p>
              <div className="mt-auto">
                <p className="small mb-1"><i className="bi bi-envelope me-2"></i> help@supportdesk.com</p>
                <p className="small mb-0"><i className="bi bi-telephone me-2"></i> +91 800-456-7890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 pt-4 text-center">
           <div className="col-md-4 mb-4">
              <div className="bg-light rounded-circle d-inline-flex p-3 mb-3 text-primary shadow-sm"><i className="bi bi-send fs-4"></i></div>
              <h6 className="fw-bold">Step 1: Submit</h6>
              <p className="small text-muted">Explain your issue and set priority.</p>
           </div>
           <div className="col-md-4 mb-4">
              <div className="bg-light rounded-circle d-inline-flex p-3 mb-3 text-warning shadow-sm"><i className="bi bi-person-gear fs-4"></i></div>
              <h6 className="fw-bold">Step 2: Assign</h6>
              <p className="small text-muted">Admin reviews and starts the work.</p>
           </div>
           <div className="col-md-4 mb-4">
              <div className="bg-light rounded-circle d-inline-flex p-3 mb-3 text-success shadow-sm"><i className="bi bi-patch-check fs-4"></i></div>
              <h6 className="fw-bold">Step 3: Resolve</h6>
              <p className="small text-muted">Get your solution and close the ticket.</p>
           </div>
        </div>
      </div>

      <footer className="mt-5 pt-5 text-center text-muted border-top">
        <p className="small mb-0">&copy; 2026 Ticket-Pro Ticketing System. Team Build for Mentor Demo.</p>
      </footer>

      {selectedTicket && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0 bg-light">
                <h5 className="fw-bold mb-0">Ticket Information</h5>
                <button className="btn-close" onClick={() => setSelectedTicket(null)}></button>
              </div>
              <div className="modal-body p-4">
                <small className="text-muted fw-bold">SUBJECT</small>
                <p className="fs-5 fw-bold text-dark">{selectedTicket.title}</p>
                <small className="text-muted fw-bold mt-3 d-block">DETAILS</small>
                <div className="p-3 bg-light rounded-3 mt-1 text-secondary" style={{fontSize: '14px'}}>{selectedTicket.description}</div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-outline-danger btn-sm border-0 me-auto" onClick={() => { deleteTicket(selectedTicket.id); setSelectedTicket(null); }}>
                  <i className="bi bi-trash me-1"></i>Delete Request
                </button>
                <button className="btn btn-secondary btn-sm rounded-pill px-4" onClick={() => setSelectedTicket(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
