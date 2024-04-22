import { Link, useNavigate, useParams } from 'react-router-dom'
import { eventPageData } from '../utils/local-data'
import { useProjectContext } from '../context/project-context'

const EventDetails = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const { id } = useParams()
  const { setEventName } = useProjectContext()

  const data = eventPageData.find((item) => item.eventName === id)
  return (
    <section className="bg-white pt-12 pb-20">
      <div className="w-[90%] mx-auto flex items-center justify-center lg:w-[85%]">
        <div className="w-1/2">
          <img
            src={data?.img}
            alt={`Image for the event ${data?.eventName}`}
            className="w-full"
          />
        </div>

        <aside className="w-1/2 ml-32">
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
              to="/rsvp"
              className="px-5 py-2 bg-primary-100 text-white text-[0.95rem] rounded-md"
              onClick={() => setEventName(data?.eventName || '')}
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
