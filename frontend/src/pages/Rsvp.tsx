import shape1 from '../assets/shape1.png'
import shape2 from '../assets/shape2.png'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import PlusOneForm from '../components/PlusOneForm'
import RsvpSuccessful from '../components/RsvpSuccessful'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import generateApiHeaders from './Headers'
import { FaSpinner } from 'react-icons/fa'

const Rsvp = () => {
  const { id } = useParams()

  const initialDetails = {
    event: id,
    guestName: '',
    guestEmail: '',
    isAttending: 'Yes',
    isFriendsComing: 'Yes',
    message: '',
  }

  const [userDetails, setUserDetails] = useState(initialDetails)
  const [friendsNames, setFriendsNames] = useState<string[]>([])
  const [comingWithFriends, setComingWithFriends] = useState(false)
  const [rsvpSuccessful, setRsvpSuccessful] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userDetails.isFriendsComing === 'Yes' && friendsNames.length === 0) {
      setComingWithFriends(true)
      return
    }

    setLoading(true)
    try {
      const payload = {
        ...userDetails,
        event: parseInt(id || '0'),
        message: userDetails.message + (friendsNames.length > 0 ? `\nFriends: ${friendsNames.join(', ')}` : '')
      }

      await axios.post(API_ENDPOINTS.EVENTS.RSVP_CREATE, payload, {
        headers: generateApiHeaders()
      })

      setRsvpSuccessful(true)
      setUserDetails(initialDetails)
      setFriendsNames([])
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Failed to submit RSVP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {comingWithFriends && (
        <PlusOneForm
          setComingWithFriends={setComingWithFriends}
          setFriendsNames={setFriendsNames}
        />
      )}

      {rsvpSuccessful && <RsvpSuccessful />}
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
              RSVP to secure a spot and avoid missing out on the next big event
            </p>
          </div>
        </aside>
        <aside className="w-full h-full relative z-[2] grid py-12 sm:w-1/2">
          <div className="w-full h-fit text-black px-5 sm:px-14 lg:w-[75%]">
            <h1 className="text-2xl mb-2 font-bold">Confirm your attendace</h1>
            <p className="text-sm mb-1 font-medium text-neutral-200">
              Please fill in the information below to confirm your attendance
              and get added to the guest list
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <label htmlFor="eventName" className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium text-neutral-200">Event</p>
                <aside className="relative flex">
                  <input
                    type="text"
                    name="event"
                    value={userDetails.event}
                    onChange={handleChange}
                    disabled
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 w-full disabled:bg-gray-200 disabled:cursor-not-allowed disabled:font-medium disabled:text-neutral-200"
                  />
                </aside>
              </label>

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
