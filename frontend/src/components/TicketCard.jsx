import React from 'react';

function TicketCard({ ticket, onClick }) {
  return (
    <div 
      className="card shadow-sm border-0 rounded-4 mb-3 ticket-card-hover animate-card" 
      onClick={() => onClick(ticket)} 
      style={{ 
        cursor: 'pointer', 
        transition: 'all 0.3s ease',
        background: '#ffffff'
      }}
    >
      <div className="card-body p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {/* Priority Icon based on level */}
          <div className={`rounded-3 p-2 me-3 d-flex align-items-center justify-content-center ${ticket.priority === 'High' ? 'bg-danger-subtle text-danger' : 'bg-primary-subtle text-primary'}`} style={{ width: '48px', height: '48px' }}>
            <i className={`bi ${ticket.priority === 'High' ? 'bi-fire' : 'bi-lightning-charge'} fs-4`}></i>
          </div>
          
          <div>
            <h6 className="mb-0 fw-bold text-dark">{ticket.title}</h6>
            <div className="d-flex gap-2 align-items-center mt-1">
              <small className="text-muted" style={{ fontSize: '11px' }}>
                <i className="bi bi-clock me-1"></i>{ticket.createdAt}
              </small>
              <span className={`badge border ${ticket.priority === 'High' ? 'border-danger text-danger' : 'border-primary text-primary'}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                {ticket.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <span className={`badge rounded-pill px-3 py-2 ${ticket.status === 'Open' ? 'bg-warning text-dark' : (ticket.status === 'Closed' ? 'bg-success text-white' : 'bg-info text-white')}`}>
            {ticket.status}
          </span>
          <i className="bi bi-chevron-right ms-3 text-muted opacity-50"></i>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;