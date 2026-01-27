import ViewDetailsButton from './Buttons/ViewDetailsButton'

const SingleEvent = (props: any) => {
  const { picture, eventName, dateOfEvent, noOfRsvp, img, date, id } = props
  const displayImg = picture || img
  const displayDate = dateOfEvent || date
  const displayRsvp = noOfRsvp || 0

  return (
    <div className="bg-white rounded-lg drop-shadow-xl shadow-lg shadow-black/10 pb-10 sm:pb-8">
      <article className="flex flex-col">
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img src={displayImg} alt={`${eventName} Image`} className="w-full h-full object-cover" />
        </div>
        <h1 className="font-semibold px-3 mt-3 mb-2 text-xl sm:text-base truncate">
          {eventName}
        </h1>
        <div className="flex items-center gap-6 px-3 text-neutral-200 font-medium mb-6 lg:text-[0.82rem]">
          <p>{displayDate}</p>
          <p>{displayRsvp} rsvp'd</p>
        </div>
        <div className="px-3">
          <ViewDetailsButton id={id || eventName} />
        </div>
      </article>
    </div>
  )
}
export default SingleEvent
