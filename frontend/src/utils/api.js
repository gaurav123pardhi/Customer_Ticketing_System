/**
 * SupportDesk API Utility
 * Yeh file frontend aur backend ke beech ka bridge hai.
 * Future mein jab real backend aayega, tab sirf BASE_URL change karna hoga.
 */

const BASE_URL = "https://api.supportdesk.com/v1"; // Future Backend Endpoint

export const mockBackendAPI = {
  /**
   * 1. Internal Request Wrapper
   * Sabhi API calls isi function ke through jayengi.
   */
  request: async (endpoint, options = {}) => {
    // Console mein professional blue color ka log dikhane ke liye
    console.log(`%c[API CALL]: ${options.method || 'GET'} -> ${endpoint}`, "color: #007bff; font-weight: bold; background: #f0f7ff; padding: 2px 5px; border-radius: 3px;");
    
    return new Promise((resolve, reject) => {
      // Simulate Network Latency (0.8 seconds) taaki loader ka feel aaye
      setTimeout(() => {
        // 95% Success probability simulation
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

  /**
   * 2. Ticket Operations
   */
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

  /**
   * 3. Auth Operations
   */
  loginUser: async (credentials) => {
    return await mockBackendAPI.request(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: credentials
    });
  },

  /**
   * 4. Local Storage Fallback (Data Persistence)
   */
  getStoredTickets: () => {
    const data = localStorage.getItem("tickets");
    return data ? JSON.parse(data) : [];
  }
};