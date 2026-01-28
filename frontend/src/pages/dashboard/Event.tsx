import { useEffect, useState } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api'
import generateApiHeaders from '../Headers'
import { FaSpinner, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EventList = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.MY_EVENTS, {
          headers: generateApiHeaders()
        })
        setEvents(response.data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return
    try {
      await axios.delete(API_ENDPOINTS.EVENTS.DELETE(id), {
        headers: generateApiHeaders()
      })
      setEvents(events.filter(e => e.id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event')
    }
  }

  const getStatus = (date: string) => {
    const eventDate = new Date(date)
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    if (eventDate.getTime() === now.getTime()) return { text: 'Live', color: 'bg-green-100 text-green-700' }
    if (eventDate < now) return { text: 'Past', color: 'bg-gray-100 text-gray-700' }
    return { text: 'Upcoming', color: 'bg-blue-100 text-blue-700' }
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <FaSpinner className="animate-spin text-primary-100 text-4xl" />
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Event Management</h1>
          <p className="text-sm text-gray-400">Total {events.length} events created</p>
        </div>
        <Link
          to="/createevent"
          className="bg-primary-100 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary-200 transition-all"
        >
          + New Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium">You haven't created any events yet.</p>
            <Link to="/createevent" className="text-primary-100 font-bold mt-2 block hover:underline">Create your first event</Link>
          </div>
        ) : (
          events.map((event) => {
            const status = getStatus(event.dateOfEvent)
            return (
              <article key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-50 flex flex-col">
                <div className="h-40 bg-gray-100 relative">
                  {event.picture ? (
                    <img src={event.picture} alt={event.eventName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FaCalendarAlt size={40} />
                    </div>
                  )}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
                    {status.text}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg truncate mb-1">{event.eventName}</h2>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                      <FaMapMarkerAlt className="text-primary-100" />
                      <span className="truncate">{event.city}, {event.state}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-y border-gray-50">
                    <div className="text-center flex-1 border-r border-gray-50">
                       <p className="text-[10px] text-gray-400 font-bold uppercase">RSVPs</p>
                       <p className="text-sm font-bold text-gray-700">{event.noOfRsvp}</p>
                    </div>
                    <div className="text-center flex-1">
                       <p className="text-[10px] text-gray-400 font-bold uppercase">Price</p>
                       <p className="text-sm font-bold text-gray-700">
                         {event.is_paid ? `${event.currency} ${event.price}` : 'FREE'}
                       </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 bg-gray-50 text-gray-500 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                    >
                      <FaEye /> View
                    </Link>
                    <button
                      onClick={() => alert('Edit feature coming soon to specialized editor')}
                      className="flex-1 bg-primary-100/10 text-primary-100 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-100 hover:text-white transition-all"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="w-10 bg-red-50 text-red-500 py-2 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </article>
            )
          })
        )}
      </div>
    </section>
  )
}

export default EventList
