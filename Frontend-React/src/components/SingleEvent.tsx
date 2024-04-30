// import { eventPageData } from '../utils/local-data'
import { eventPageData } from 'utils/local-data'
import ViewDetailsButton from './Buttons/ViewDetailsButton'

// type SingleEventProps = (typeof eventPageData)[number]
type SingleEventProps = (typeof eventPageData)[number]

const SingleEvent = (props: SingleEventProps) => {
  const { img, eventName, date, noOfRsvp } = props
  return (
    <div className="bg-white rounded-lg drop-shadow-xl shadow-lg shadow-black/10 pb-10 sm:pb-8">
      <article className="flex flex-col">
        <div className="w-full">
          <img src={img} alt={`${eventName} Image`} className="w-full" />
        </div>
        <h1 className="font-semibold px-3 mb-2 text-xl sm:text-base">
          {eventName}
        </h1>
        <div className="flex items-center gap-6 px-3 text-neutral-200 font-medium mb-6 lg:text-[0.82rem]">
          <p>{date}</p>
          <p>{noOfRsvp} rsvp'd</p>
        </div>
        <div className="px-3">
          <ViewDetailsButton id={eventName} />
        </div>
      </article>
    </div>
  )
}
export default SingleEvent
