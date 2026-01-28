import { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api'
import generateApiHeaders from '../Headers'
import { MdOutlineMessage, MdCheckCircle, MdCancel } from 'react-icons/md'
import { FaSpinner, FaSearch } from 'react-icons/fa'

const GuestMetrics = () => {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string | number>('')
  const [guests, setGuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [checkInToken, setCheckInToken] = useState('')
  const [checkInLoading, setCheckInLoading] = useState(false)
  const [checkInMsg, setCheckInMsg] = useState({ text: '', type: '' })

  // Fetch Host's Events
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.MY_EVENTS, {
          headers: generateApiHeaders()
        })
        setEvents(response.data)
        if (response.data.length > 0) {
          setSelectedEventId(response.data[0].id)
        }
      } catch (error) {
        console.error('Error fetching my events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMyEvents()
  }, [])

  // Fetch Guests for Selected Event
  useEffect(() => {
    const fetchGuests = async () => {
      if (!selectedEventId) return
      setLoading(true)
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.GUESTS(selectedEventId), {
          headers: generateApiHeaders()
        })
        setGuests(response.data)
      } catch (error) {
        console.error('Error fetching guests:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGuests()
  }, [selectedEventId])

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkInToken) return
    setCheckInLoading(true)
    setCheckInMsg({ text: '', type: '' })
    try {
      const response = await axios.post(API_ENDPOINTS.EVENTS.CHECK_IN, {
        token: checkInToken
      }, {
        headers: generateApiHeaders()
      })
      setCheckInMsg({ text: response.data.message, type: 'success' })
      setCheckInToken('')
      // Refresh guest list
      const updatedGuests = await axios.get(API_ENDPOINTS.EVENTS.GUESTS(selectedEventId), {
        headers: generateApiHeaders()
      })
      setGuests(updatedGuests.data)
    } catch (error: any) {
      setCheckInMsg({ text: error.response?.data?.error || 'Check-in failed', type: 'error' })
    } finally {
      setCheckInLoading(false)
    }
  }

  const confirmedGuests = guests.filter(g => g.checked_in)
  const pendingGuests = guests.filter(g => !g.checked_in)

  if (loading && events.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg">
        <FaSpinner className="animate-spin text-primary-100 text-3xl" />
      </div>
    )
  }

  return (
    <section className="flex flex-col lg:flex-row gap-5">
      <div className="w-full lg:w-[70%] bg-white rounded-lg py-6 px-5 shadow-sm">
        <div className="flex justify-between items-center mb-7">
          <h1 className="font-bold text-xl text-gray-800">Guest Management</h1>
          <select 
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm font-medium focus:ring-2 focus:ring-primary-100 outline-none"
          >
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.eventName}</option>
            ))}
          </select>
        </div>

        {/* Check-in Tool */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Verification Tool</h2>
          <form onSubmit={handleCheckIn} className="flex gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Enter unique RSVP token or scan code..." 
                value={checkInToken}
                onChange={(e) => setCheckInToken(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary-100 outline-none text-sm transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              disabled={checkInLoading}
              className="bg-primary-100 text-white px-6 py-3 rounded-lg font-bold text-sm shadow-lg shadow-primary-100/20 hover:bg-primary-200 transition-all disabled:opacity-50"
            >
              {checkInLoading ? <FaSpinner className="animate-spin" /> : 'Verify Guest'}
            </button>
          </form>
          {checkInMsg.text && (
            <div className={`mt-3 flex items-center gap-2 text-sm font-semibold ${checkInMsg.type === 'success' ? 'text-green-600' : 'text-red-600'} animate-in slide-in-from-top-2 duration-300`}>
              {checkInMsg.type === 'success' ? <MdCheckCircle /> : <MdCancel />}
              {checkInMsg.text}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 items-center text-[13px] text-neutral-200 font-bold mb-5 border-b border-gray-100 pb-3">
          <h1>Registration Date</h1>
          <h1>Guest Name</h1>
          <h1>Plus Ones</h1>
          <h1 className="text-center">Status</h1>
        </div>
        
        <ul className="text-[13px] font-semibold flex flex-col gap-4 overflow-y-auto max-h-[30rem] pr-2">
          {guests.length === 0 && !loading && (
            <div className="py-20 text-center text-gray-400 font-medium">No guests have RSVP'd yet.</div>
          )}
          {guests.map((guestInfo) => (
            <li key={guestInfo.rsvp_token} className="grid grid-cols-4 items-center p-3 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-100">
              <p className="text-gray-400">{new Date(guestInfo.created_at).toLocaleDateString()}</p>
              <div className="flex flex-col">
                <p className="text-gray-800 font-bold">{guestInfo.guestName}</p>
                <p className="text-[10px] text-gray-400 font-mono truncate">{guestInfo.guestEmail}</p>
              </div>
              <p className="text-gray-600 px-4">{guestInfo.plus_ones?.length || 0}</p>
              <div className="flex items-center justify-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${guestInfo.checked_in ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {guestInfo.checked_in ? 'Checked In' : 'Pending'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="w-full lg:w-[30%] flex flex-col gap-5">
        <div className="bg-white rounded-lg py-6 flex flex-col items-center gap-2 shadow-sm">
          <h1 className="font-bold text-gray-800">Attendance Overview</h1>
          <section className="relative w-40 h-40 mt-4">
            <PieChart
              className="absolute w-full h-full cursor-pointer z-10"
              paddingAngle={3}
              data={[
                {
                  title: 'Pending Guests',
                  value: pendingGuests.length || 0.1, // Small value to show chart if zero
                  color: '#FED1A1',
                },
                {
                  title: 'Checked-in Guests',
                  value: confirmedGuests.length,
                  color: '#28AA4C',
                },
              ]}
              lineWidth={25}
              rounded
              animate
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <p className="text-2xl font-bold text-gray-700">{guests.length}</p>
            </div>
          </section>

          <h1 className="text-primary-100 text-[10px] bg-[#E8EEFF] px-4 py-2 text-center rounded-full font-bold mt-6 mb-4">
            Total RSVPs
          </h1>

          <div className="w-full px-6 space-y-3">
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#28AA4C]"></div>
                   <span className="text-gray-500 font-medium">Checked-in</span>
                </div>
                <span className="font-bold text-gray-800">{confirmedGuests.length}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#FED1A1]"></div>
                   <span className="text-gray-500 font-medium">Pending</span>
                </div>
                <span className="font-bold text-gray-800">{pendingGuests.length}</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 flex flex-col gap-3 items-center justify-center shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">
            <MdOutlineMessage />
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Efficiency</p>
            <p className="text-xl text-gray-800 font-bold mt-1">98%</p>
            <p className="text-[10px] text-gray-400 mt-1">Guest response rate</p>
          </div>
        </div>
      </aside>
    </section>
  )
}
export default GuestMetrics
