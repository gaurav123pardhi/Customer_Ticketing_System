import { createContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { mockBackendAPI } from "../utils/api" 

export const TicketContext = createContext()

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useLocalStorage("tickets", [])
  const [loading, setLoading] = useState(false)

  const addTicket = async (title, description, userEmail, priority) => {
    setLoading(true)
    
    const newTicket = {
      id: Date.now(),
      title,
      description,
      status: "Open",
      userEmail,
      priority: priority || "Medium",
      createdAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    try {
      await mockBackendAPI.saveTicket(newTicket)
      
      await new Promise(resolve => setTimeout(resolve, 3700)) 

      setTickets([newTicket, ...tickets])
      console.log("%c[SUCCESS]: Ticket added to local state.", "color: green; font-weight: bold;");
    } catch (error) {
      console.error("API Error:", error.message)
      alert("Failed to sync with server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      await mockBackendAPI.updateTicketStatus(id, newStatus)
      const updated = tickets.map(ticket =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
      setTickets(updated)
    } catch (error) {
      console.error("Update failed:", error)
    }
  }

  const deleteTicket = (id) => {
    const updated = tickets.filter(ticket => ticket.id !== id)
    setTickets(updated)
  }

  return (
    <TicketContext.Provider value={{ 
      tickets, 
      loading, 
      addTicket, 
      updateStatus, 
      deleteTicket 
    }}>
      {children}
    </TicketContext.Provider>
  )
}
