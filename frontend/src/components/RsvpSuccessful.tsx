import { Link } from 'react-router-dom'
import successfulIcon from '../assets/successful-icon.png'

const RsvpSuccessful = ({ eventName }: { eventName?: string }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#B5B5B5]/80 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md h-[28rem] w-[22rem] flex flex-col items-center justify-center">
        <div className="w-1/2 mb-5">
          <img
            src={successfulIcon}
            alt="Icon for successful"
            className="w-full"
          />
        </div>
        <h1 className="text-xl font-semibold">RSVP Successful</h1>
        <p className="text-center text-sm text-neutral-200 font-medium mt-3 mb-8 px-4">
          RSVP to {eventName ? `"${eventName}"` : 'the event'} was successful.
          An email with the event details was sent to your email. See you there!
        </p>

        <Link
          to="/events"
          className="w-fit py-2 px-8 mt-5 bg-blue-700 text-white rounded-md text-sm font-medium transition-all hover:bg-blue-800"
        >
          Back to events
        </Link>
      </div>
    </div>
  )
}
export default RsvpSuccessful
