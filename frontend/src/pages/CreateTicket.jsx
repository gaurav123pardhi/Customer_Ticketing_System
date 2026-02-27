import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { TicketContext } from "../context/TicketContext"
import { AuthContext } from "../context/AuthContext"

function CreateTicket() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")

  const { addTicket, loading } = useContext(TicketContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert("Please fill all fields")
      return
    }

    await addTicket(title, description, user?.email, priority)
    navigate("/dashboard")
  }

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className={`card p-4 shadow-lg border-0 animate-card ${loading ? 'opacity-75' : ''}`} 
           style={{ 
             maxWidth: "500px", 
             width: "100%", 
             borderRadius: "20px",
             cursor: loading ? "wait" : "default",
             position: "relative" // Back button ki position ke liye
           }}>
        
        {!loading && (
          <button 
            onClick={() => navigate("/dashboard")} 
            className="btn btn-light rounded-circle shadow-sm position-absolute" 
            style={{ top: "20px", left: "20px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
            title="Go Back"
          >
            <i className="bi bi-arrow-left fs-5 fw-bold text-dark"></i>
          </button>
        )}

        <div className="text-center mb-4 mt-3">
          <div className="bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3 shadow" 
               style={{ width: "60px", height: "60px", borderRadius: "50%" }}>
            <i className="bi bi-file-earmark-plus-fill fs-3"></i>
          </div>
          <h3 className="fw-bold">Raise a Ticket</h3>
          {loading ? (
            <div className="text-primary fw-bold small">
              <span className="spinner-border spinner-border-sm me-2"></span>
              Syncing with server...
            </div>
          ) : (
            <p className="text-muted small">Fill the details below</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Issue Title</label>
            <input
              type="text"
              className="form-control border-0 bg-light p-2 shadow-sm"
              placeholder="Summary of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Priority Level</label>
            <select 
              className="form-select border-0 bg-light p-2 shadow-sm" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              disabled={loading}
            >
              <option value="Low">Low (General Inquiry)</option>
              <option value="Medium">Medium (Technical Bug)</option>
              <option value="High">High (Urgent Help)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">Full Description</label>
            <textarea
              className="form-control border-0 bg-light p-2 shadow-sm"
              rows="4"
              placeholder="Provide more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="d-grid gap-2">
            <button 
              type="submit" 
              className={`btn py-2 fw-bold shadow-sm ${loading ? 'btn-secondary' : 'btn-primary'}`} 
              style={{ borderRadius: "12px" }}
              disabled={loading}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <span className="spinner-grow spinner-grow-sm me-2 text-info" role="status"></span>
                  Processing Ticket...
                </div>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket
