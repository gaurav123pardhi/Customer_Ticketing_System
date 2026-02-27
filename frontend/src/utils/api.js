const BASE_URL = "https://api.supportdesk.com/v1"; 

export const mockBackendAPI = {

  request: async (endpoint, options = {}) => {
    console.log(`%c[API CALL]: ${options.method || 'GET'} -> ${endpoint}`, "color: #007bff; font-weight: bold; background: #f0f7ff; padding: 2px 5px; border-radius: 3px;");
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.05; 
        
        if (isSuccess) {
          console.log(`%c[API SUCCESS]: Data synced successfully.`, "color: #28a745; font-weight: bold;");
          resolve({ 
            status: 200, 
            data: options.body || null,
            timestamp: new Date().toISOString()
          });
        } else {
          console.error(`[API ERROR]: Connection timed out at ${endpoint}`);
          reject({ 
            status: 500, 
            message: "Internal Server Error: Could not connect to database." 
          });
        }
      }, 800);
    });
  },

  saveTicket: async (ticketData) => {
    return await mockBackendAPI.request(`${BASE_URL}/tickets/create`, {
      method: "POST",
      body: ticketData
    });
  },

  updateTicketStatus: async (id, status) => {
    return await mockBackendAPI.request(`${BASE_URL}/tickets/update/${id}`, {
      method: "PATCH",
      body: { status }
    });
  },

  loginUser: async (credentials) => {
    return await mockBackendAPI.request(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: credentials
    });
  },

  getStoredTickets: () => {
    const data = localStorage.getItem("tickets");
    return data ? JSON.parse(data) : [];
  }
};
