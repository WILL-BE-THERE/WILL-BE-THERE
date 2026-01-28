import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import API_ENDPOINTS from '../config/api'

const EventDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setEventData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINTS.EVENTS.GET(id!)
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

  let displayImg = data.picture || data.img
  // Ensure image URL is absolute
  if (displayImg && !displayImg.startsWith('http')) {
    const baseUrl = API_ENDPOINTS.AUTH.LOGIN.split('/api')[0]
    displayImg = `${baseUrl}${displayImg.startsWith('/') ? '' : '/'}${displayImg}`
  }
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
              {data?.dressCode || 'Not specified'}
            </p>
          </section>

          {data?.is_paid && (
            <section className="flex flex-col mt-5 p-4 bg-primary-100/5 rounded-lg border border-primary-100/20">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-primary-100 uppercase text-xs tracking-wider">Admission</h1>
                {data.is_redeemable && (
                  <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Redeemable
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold mt-1">
                {data.currency} {data.price}
              </p>
              {data.inclusions && (
                <div className="mt-3">
                  <h2 className="text-xs font-semibold text-neutral-400 uppercase">What's included:</h2>
                  <p className="text-sm text-neutral-200 mt-1 italic">
                    {data.inclusions}
                  </p>
                </div>
              )}
            </section>
          )}

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
