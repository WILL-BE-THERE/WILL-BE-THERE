import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import API_ENDPOINTS from '../config/api'
import generateApiHeaders from './Headers'

const EventDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setEventData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.EVENTS.LIST}${id}`,
          { headers: generateApiHeaders() }
        )
        setEventData(response.data)
      } catch (error) {
        console.error('error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchEventData()
  }, [id])

  const goBack = () => navigate(-1)

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold animate-pulse text-primary-100">Loading Event...</h1>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-red-600">Event not found</h1>
        <button onClick={goBack} className="mt-4 text-primary-100 underline">Go back</button>
      </div>
    )
  }

  const displayImg = data.picture || data.img
  const displayDate = data.dateOfEvent || data.date
  const displayAbout = data.generalInfo || data.about

  return (
    <section className="bg-white pt-12 pb-20">
      <div className="w-[90%] mx-auto flex flex-col items-center justify-center h-full sm:flex-row sm:h-[36rem] lg:h-full sm:w-[95%] lg:w-[85%]">
        <div className="w-full h-full sm:w-3/5 sm:mr-8 lg:mr-0 lg:w-1/2 overflow-hidden rounded-xl">
          <img
            src={displayImg}
            alt={`Image for the event ${data?.eventName}`}
            className="w-full h-full object-cover"
          />
        </div>

        <aside className="w-full ml-5 sm:ml-0 sm:w-2/5 lg:w-1/2 lg:ml-32">
          <h1 className="text-2xl font-semibold text-primary-100">Event details</h1>
          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">Event name:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {data?.eventName}
            </p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">About the event:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {displayAbout}
            </p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">Date:</h1>
            <p className="text-sm text-neutral-200 font-medium">{displayDate}</p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">RSVPs:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {data?.noOfRsvp || 0}
            </p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">Dress code:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {data?.dressCode}
            </p>
          </section>
          <div className="flex gap-7 items-center mt-8">
            <button
              type="button"
              className="px-5 py-1 border-2 border-primary-100 text-neutral-200 text-[0.95rem] rounded-md font-medium"
              onClick={goBack}
            >
              Back to events
            </button>
            <Link
              to={`/events/${id}/rsvp`}
              className="px-5 py-2 bg-primary-100 text-white text-[0.95rem] rounded-md"
            >
              RSVP
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default EventDetails
