import { Link, useNavigate, useParams } from 'react-router-dom'
import { eventPageData } from '../utils/local-data'
// import axios from 'axios'
// import { useEffect, useState } from 'react'

const EventDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  // const [eventData, setEventData] = useState(null)

  const data = eventPageData.find((item) => item.eventName === id)

  // useEffect(() => {
  //   const fetchEventData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://will-be-there-x5pq.onrender.com/api/events/event/id`,
  //       )
  //       setEventData(response.data)
  //     } catch (error) {
  //       console.error('error fetching events:', error)
  //     }
  //   }

  //   fetchEventData()
  // }, [id])

  const goBack = () => navigate(-1)

  // if (!eventData){
  //   return <div>Loading ...</div>;
  // }

  return (
    <section className="bg-white pt-12 pb-20">
      <div className="w-[90%] mx-auto flex flex-col items-center justify-center h-full sm:flex-row sm:h-[36rem] lg:h-full sm:w-[95%] lg:w-[85%]">
        <div className="w-full h-full sm:w-3/5 sm:mr-8 lg:mr-0 lg:w-1/2">
          <img
            src={data?.img}
            alt={`Image for the event ${data?.eventName}`}
            className="w-full h-full"
          />
        </div>

        <aside className="w-full ml-5 sm:ml-0 sm:w-2/5 lg:w-1/2 lg:ml-32">
          <h1 className="text-2xl font-semibold">Event details</h1>
          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">Event name:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {data?.eventName}
            </p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">About the event:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {data?.about}
            </p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">Date:</h1>
            <p className="text-sm text-neutral-200 font-medium">{data?.date}</p>
          </section>

          <section className="flex flex-col mt-5">
            <h1 className="font-semibold">RSVPs:</h1>
            <p className="text-sm text-neutral-200 font-medium">
              {data?.noOfRsvp}
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
