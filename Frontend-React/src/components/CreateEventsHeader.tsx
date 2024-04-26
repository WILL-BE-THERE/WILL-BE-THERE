import { FaBriefcase, FaChevronRight, FaEdit } from 'react-icons/fa'
import { FaFaceSmile } from 'react-icons/fa6'

type CreateEventsHeaderProps = {
  textColor: string
}

const CreateEventsHeader = ({ textColor }: CreateEventsHeaderProps) => {
  return (
    <>
      <section className="pt-8 text-center">
        <h1 className="font-bold text-3xl">Create Event</h1>
        <p className="font-medium text-base text-neutral-200 mt-1">
          Craft your event and indulge in a refreshing new approach to register
          your event
        </p>
      </section>

      <section className="flex items-center justify-between gap-12 border-b-[3.5px] border-primary-100 py-4 w-[65%] mx-auto px-8 mt-8">
        <div
          className={`flex justify-between items-center text-xs ${textColor === '/createevent' ? 'text-primary-100' : 'text-neutral-200'} font-medium w-full`}
        >
          <p className="flex gap-2 items-center">
            <FaEdit />
            General Information
          </p>
          <FaChevronRight />
        </div>
        <div
          className={`flex justify-center items-center text-xs gap-12 ${textColor === '/createeventpayinfo' ? 'text-primary-100' : 'text-neutral-200'} font-medium w-full`}
        >
          <p className="flex gap-2 items-center">
            <FaBriefcase /> Payment Info
          </p>
          <FaChevronRight />
        </div>
        <div
          className={`flex justify-between items-center text-xs ${textColor === '/createeventsocials' ? 'text-primary-100' : 'text-neutral-200'} font-medium`}
        >
          <p className="flex gap-2 items-center">
            <FaFaceSmile />
            Socials
          </p>
        </div>
      </section>
    </>
  )
}
export default CreateEventsHeader
