import { useState, useEffect } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import { Link } from 'react-router-dom'
import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa'
import shape1 from '../assets/shape1.png'
import shape2 from '../assets/shape2.png'

interface Ticket {
  id: number
  event: {
    id: number
    eventName: string
    dateOfEvent: string
    time: string
    street: string
    city: string
    picture: string
  }
  ticket_type_details: {
    name: string
    price: string
    currency: string
  }
  rsvp_token: string
  payment_status: string
  isAttending: string
  checkout_request_id: string
  mpesa_receipt_number: string
  created_at: string
}

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.MY_TICKETS)
        // Handle pagination
        if (response.data.results && Array.isArray(response.data.results)) {
           setTickets(response.data.results)
        } else {
           setTickets(response.data)
        }
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100'
      case 'Pending': return 'text-yellow-600 bg-yellow-100'
      case 'Cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <FaCheckCircle />
      case 'Pending': return <FaHourglassHalf />
      case 'Cancelled': return <FaTimesCircle />
      default: return null
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 relative overflow-hidden pb-10">
        {/* Background Shapes */}
        <img src={shape2} alt="" className="absolute -right-14 top-1/4 w-36 opacity-50 hidden sm:block" />
        <img src={shape1} alt="" className="absolute left-[5%] top-1/2 w-40 opacity-50 hidden sm:block" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <FaTicketAlt className="text-primary-100" /> My Tickets
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-100"></div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tickets found</h3>
            <p className="text-gray-500 mb-6">You haven't RSVP'd to any events yet.</p>
            <Link to="/events" className="bg-primary-100 text-white px-6 py-2 rounded-md hover:bg-primary-200 transition">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                <div className="relative h-48 bg-gray-200">
                    <img 
                        src={ticket.event.picture} 
                        alt={ticket.event.eventName} 
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Event' }}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(ticket.payment_status)}`}>
                        {getStatusIcon(ticket.payment_status)}
                        {ticket.payment_status}
                    </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{ticket.event.eventName}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary-100" />
                        <span>{ticket.event.dateOfEvent} • {ticket.event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary-100" />
                        <span>{ticket.event.city}, {ticket.event.street}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-500">Ticket Type</span>
                          <span className="font-semibold text-gray-800">{ticket.ticket_type_details?.name || 'General Admission'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">Price</span>
                          <span className="font-bold text-primary-100">
                              {ticket.ticket_type_details && parseFloat(ticket.ticket_type_details.price) > 0 
                                ? `${ticket.ticket_type_details.currency} ${ticket.ticket_type_details.price}` 
                                : 'Free'}
                          </span>
                      </div>
                      {ticket.mpesa_receipt_number && (
                          <div className="flex justify-between items-center mt-1 border-t pt-1 border-gray-200">
                              <span className="text-xs text-gray-400">Ref ID</span>
                              <span className="text-xs font-mono text-gray-600">{ticket.mpesa_receipt_number}</span>
                          </div>
                      )}
                  </div>
                  
                  <Link to={`/events/${ticket.event.id}`} className="block w-full text-center border border-primary-100 text-primary-100 py-2 rounded-md hover:bg-primary-50 transition font-medium">
                      View Event Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyTickets
