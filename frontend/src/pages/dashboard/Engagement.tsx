import { useState, useEffect } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api'
import generateApiHeaders from '../Headers'
import { FaSpinner, FaPaperPlane, FaBullhorn } from 'react-icons/fa'

const Engagement = () => {
  const [events, setEvents] = useState<unknown[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string | number>('')
  const [message, setMessage] = useState('')
  const [announcements, setAnnouncements] = useState<unknown[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [status, setStatus] = useState({ text: '', type: '' })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.MY_EVENTS, {
          headers: generateApiHeaders()
        })
        setEvents(response.data)
        if (response.data.length > 0) {
          setSelectedEventId(response.data[0].id)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      if (!selectedEventId) return
      setFetching(true)
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.ANNOUNCEMENT_GET(selectedEventId))
        setAnnouncements(response.data)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setFetching(false)
      }
    }
    fetchAnnouncements()
  }, [selectedEventId])

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message || !selectedEventId) return
    setLoading(true)
    setStatus({ text: '', type: '' })
    try {
      await axios.post(API_ENDPOINTS.EVENTS.ANNOUNCEMENT_CREATE, {
        event: selectedEventId,
        message: message
      }, {
        headers: generateApiHeaders()
      })
      setStatus({ text: 'Announcement posted successfully!', type: 'success' })
      setMessage('')
      // Refresh list
      const response = await axios.get(API_ENDPOINTS.EVENTS.ANNOUNCEMENT_GET(selectedEventId))
      setAnnouncements(response.data)
    } catch (error: unknown) {
      setStatus({ text: error.response?.data?.error || 'Failed to post', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-white rounded-lg p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary-100/10 text-primary-100 rounded-lg flex items-center justify-center text-xl">
                <FaBullhorn />
             </div>
             <h1 className="text-xl font-bold text-gray-800">Engagement Tool</h1>
          </div>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="border border-gray-200 rounded-lg p-2 text-sm font-medium focus:ring-2 focus:ring-primary-100 outline-none"
          >
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.eventName}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handlePost} className="flex flex-col gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write an update to all your registered guests..."
            className="w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary-100 outline-none text-sm resize-none transition-all"
            required
          />
          <div className="flex justify-between items-center">
            {status.text && (
              <p className={`text-sm font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {status.text}
              </p>
            )}
            <button
              disabled={loading || !message}
              className="bg-primary-100 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-100/20 hover:bg-primary-200 transition-all ml-auto flex items-center gap-2"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <><FaPaperPlane /> Post Announcement</>}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Past Announcements</h2>
        {fetching ? (
          <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-primary-100 text-2xl" /></div>
        ) : announcements.length === 0 ? (
          <p className="text-center py-10 text-gray-400 font-medium italic">No announcements posted for this event yet.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {announcements.map((ann) => (
              <li key={ann.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    {new Date(ann.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{ann.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Engagement
