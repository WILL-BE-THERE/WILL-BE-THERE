import shape1 from '../assets/shape1.png'
import shape2 from '../assets/shape2.png'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { FaPencil } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import PlusOneForm from '../components/PlusOneForm'
import RsvpSuccessful from '../components/RsvpSuccessful'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import { FaSpinner } from 'react-icons/fa'
import { BsPhone } from 'react-icons/bs'

interface TicketType {
  id: number
  name: string
  description: string
  price: string
  currency: string
  quantity: number
  sold: number
}

const Rsvp = () => {
  const { id } = useParams()

  const initialDetails = {
    event: id,
    guestName: '',
    guestEmail: '',
    isAttending: 'Yes',
    isFriendsComing: 'No',
    message: '',
  }

  const [userDetails, setUserDetails] = useState(initialDetails)
  const [eventName, setEventName] = useState('')
  const [friendsNames, setFriendsNames] = useState<string[]>([])
  const [comingWithFriends, setComingWithFriends] = useState(false)
  const [rsvpSuccessful, setRsvpSuccessful] = useState(false)
  const [rsvpData, setRsvpData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  
  // Ticket System State
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([])
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  
  // Payment State
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showMpesaModal, setShowMpesaModal] = useState(false)
  const [, setCheckoutRequestId] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.GET(id!))
        setEventName(response.data.eventName)
        if (response.data.ticket_types && Array.isArray(response.data.ticket_types)) {
            setTicketTypes(response.data.ticket_types)
        }
      } catch (error) {
        console.error('Error fetching event name:', error)
        setEventName('this event')
      }
    }
    if (id) fetchEvent()
  }, [id])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
  }

  const submitRsvp = async (details: typeof initialDetails, friends: string[]) => {
    setLoading(true)
    try {
      const payload = {
        ...details,
        event: parseInt(id || '0'),
        ticket_type: selectedTicketId,
        plus_ones: friends,
        phone_number: phoneNumber // M-Pesa Phone Number
      }

      const response = await axios.post(API_ENDPOINTS.EVENTS.RSVP_CREATE, payload)

      if (response.data.checkout_request_id) {
          setCheckoutRequestId(response.data.checkout_request_id)
          setShowMpesaModal(true)
      } else {
          setRsvpData(response.data)
          setRsvpSuccessful(true)
      }
    } catch (error: any) {
      console.error('Error submitting RSVP:', error)
      alert(error.response?.data?.message || 'Failed to submit RSVP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userDetails.isFriendsComing === 'Yes' && friendsNames.length === 0) {
      setComingWithFriends(true)
      return
    }
    
    // Validate M-Pesa Requirements
    if (selectedTicketId) {
        const ticket = ticketTypes.find(t => t.id === selectedTicketId)
        if (ticket && parseFloat(ticket.price) > 0 && !phoneNumber) {
            alert("Please enter a phone number for M-Pesa payment.")
            return
        }
    }

    await submitRsvp(userDetails, friendsNames)
  }

  const handleFriendsSubmit = (names: string[]) => {
    setFriendsNames(names)
    setComingWithFriends(false)
    // Auto-submit now that we have names
    submitRsvp(userDetails, names)
  }

  return (
    <>
      {comingWithFriends && (
        <PlusOneForm
          setComingWithFriends={setComingWithFriends}
          setFriendsNames={handleFriendsSubmit}
        />
      )}

      {rsvpSuccessful && <RsvpSuccessful eventName={eventName} rsvpData={rsvpData} />}
      
      {rsvpSuccessful && <RsvpSuccessful eventName={eventName} rsvpData={rsvpData} />}
      
      {/* M-Pesa Modal */}
      {showMpesaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-2xl text-center">
                 <div className="mb-4 flex justify-center text-green-600 text-5xl">
                     <BsPhone />
                 </div>
                 <h2 className="text-xl font-bold mb-2">Check your phone</h2>
                 <p className="text-gray-600 mb-6">
                     An M-Pesa prompt has been sent to <b>{phoneNumber}</b>. Please enter your PIN to complete the transaction.
                 </p>
                 <button 
                    onClick={() => {
                        setShowMpesaModal(false)
                        setRsvpSuccessful(true) // Optimistically show success or check status
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                 >
                    I have paid
                 </button>
             </div>
        </div>
      )}

      <section className="h-[60rem] w-full bg-white relative flex overflow-hidden">
        <img
          src={shape2}
          alt="icon"
          className="absolute -right-14 top-1/4 w-36 hidden sm:block"
        />
        <img
          src={shape2}
          alt="icon"
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-44 hidden sm:block"
        />
        <img
          src={shape1}
          alt="icon"
          className="absolute left-[22%] top-1/2 -translate-y-1/2 -translate-x-[22%] w-52 hidden sm:block"
        />
        <aside className="bg-primary-100/[50%] w-1/2 h-full relative z-[2] backdrop-filter backdrop-blur-[15px] place-items-center hidden sm:grid">
          <div className="w-[55%] h-fit text-white text-center lg:w-[45%]">
            <h1 className="text-xl mb-2 font-bold sm:text-2xl lg:text-3xl">
              Don't be left behind
            </h1>
            <p className="text-sm mb-8 font-light">
              RSVP to secure a spot and avoid missing out on {eventName ? `"${eventName}"` : 'the next big event'}
            </p>
          </div>
        </aside>
        <aside className="w-full h-full relative z-[2] grid py-12 sm:w-1/2">
          <div className="w-full h-fit text-black px-5 sm:px-14 lg:w-[75%]">
            <h1 className="text-2xl mb-2 font-bold">Confirm your attendance</h1>
            <p className="text-sm mb-1 font-medium text-neutral-200">
              Please fill in the information below to confirm your attendance
              at {eventName ? `"${eventName}"` : 'the event'} and get added to the guest list
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <label htmlFor="eventName" className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium text-neutral-200">Event</p>
                <aside className="relative flex">
                  <input
                    type="text"
                    name="event"
                    value={eventName || `Event #${id}`}
                    disabled
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 w-full disabled:bg-gray-100 disabled:cursor-not-allowed disabled:font-semibold disabled:text-primary-100"
                  />
                </aside>
              </label>

              {/* Ticket Selection */}
              {ticketTypes.length > 0 && (
                 <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-neutral-200">Select Ticket</p>
                    <div className="grid gap-3">
                        {ticketTypes.map(ticket => (
                            <label key={ticket.id} className={`border rounded-md p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${selectedTicketId === ticket.id ? 'border-primary-100 bg-blue-50' : 'border-[#d6d6d6]'}`}>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="radio" 
                                        name="ticket_type" 
                                        value={ticket.id}
                                        checked={selectedTicketId === ticket.id}
                                        onChange={() => setSelectedTicketId(ticket.id)}
                                        className="w-4 h-4 text-primary-100"
                                    />
                                    <div>
                                        <p className="font-semibold">{ticket.name}</p>
                                        {ticket.description && <p className="text-xs text-gray-500">{ticket.description}</p>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary-100">
                                        {parseFloat(ticket.price) > 0 ? `${ticket.currency} ${ticket.price}` : 'Free'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {ticket.quantity - ticket.sold > 0 ? `${ticket.quantity - ticket.sold} left` : 'Sold Out'}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                 </div>
              )}
        
              {/* M-Pesa Phone Input */}
              {selectedTicketId && ticketTypes.find(t => t.id === selectedTicketId && parseFloat(t.price) > 0) && (
                  <label htmlFor="phoneNumber" className="flex flex-col gap-1 w-full animate-in fade-in slide-in-from-top-2">
                    <p className="flex gap-1 text-sm font-medium text-neutral-200">
                      M-Pesa Phone Number
                    </p>
                    <aside className="relative flex">
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="2547..."
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                        required
                      />
                    </aside>
                    <p className="text-xs text-gray-500">Format: 2547XXXXXXXX</p>
                  </label>
              )}

              <label htmlFor="guestName" className="flex flex-col gap-1 w-full">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Name
                </p>
                <aside className="relative flex">
                  <input
                    type="text"
                    name="guestName"
                    value={userDetails.guestName}
                    onChange={handleChange}
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                  >
                    <FaPencil />
                  </button>
                </aside>
              </label>

              <label
                htmlFor="guestEmail"
                className="flex flex-col gap-1 w-full"
              >
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Email
                </p>
                <aside className="relative flex">
                  <input
                    type="email"
                    name="guestEmail"
                    value={userDetails.guestEmail}
                    onChange={handleChange}
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                  >
                    <FaPencil />
                  </button>
                </aside>
              </label>

              <div className="">
                <p className="font-medium text-sm text-neutral-200 mb-2 mt-2">
                  {' '}
                  Will you be attending?{' '}
                </p>
                <input
                  type="radio"
                  name="isAttending"
                  id="yes"
                  value="Yes"
                  onChange={handleChange}
                  checked={userDetails.isAttending === 'Yes'}
                  className="mr-3 cursor-pointer"
                />
                <label htmlFor="Yes" className="mr-16 text-sm font-semibold">
                  Yes
                </label>
                <input
                  type="radio"
                  name="isAttending"
                  id="no"
                  value="No"
                  onChange={handleChange}
                  checked={userDetails.isAttending === 'No'}
                  className="mr-3 cursor-pointer"
                />
                <label htmlFor="No" className=" text-sm font-semibold">
                  No
                </label>
              </div>
              <div className="">
                <p className="font-medium text-sm text-neutral-200 mb-2 mt-2">
                  {' '}
                  Will your friends accompany you?{' '}
                </p>
                <input
                  type="radio"
                  name="isFriendsComing"
                  id="yesFriendsComing"
                  value="Yes"
                  onChange={handleChange}
                  checked={userDetails.isFriendsComing === 'Yes'}
                  className="mr-3 cursor-pointer"
                />
                <label htmlFor="Yes" className="mr-16 text-sm font-semibold">
                  Yes
                </label>
                <input
                  type="radio"
                  name="isFriendsComing"
                  id="noFriendsComing"
                  value="No"
                  onChange={handleChange}
                  checked={userDetails.isFriendsComing === 'No'}
                  className="mr-3 cursor-pointer"
                />
                <label htmlFor="No" className=" text-sm font-semibold">
                  No
                </label>
              </div>
              <article className="flex flex-col gap-2 mt-4">
                <p className="text-sm font-medium text-neutral-200">
                  Send a congratulatory message (
                  <span className="text-xs text-neutral-400">optional</span>)
                </p>
                <textarea
                  name="message"
                  rows={5}
                  value={userDetails.message}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full resize-none"
                />
              </article>
              <button
                type="submit"
                disabled={loading}
                className="w-fit py-2 px-8 mt-5 bg-blue-700 text-white rounded flex items-center justify-center min-w-[100px]"
              >
                {loading ? <FaSpinner className="animate-spin" /> : 'Submit'}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </>
  )
}

export default Rsvp
