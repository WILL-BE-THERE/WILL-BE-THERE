import { Link, useParams } from 'react-router-dom'
import successfulIcon from '../assets/successful-icon.png'

const RsvpSuccessful = () => {
  const { id } = useParams()
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#B5B5B5]/80 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md h-[28rem] w-[20rem] flex flex-col items-center justify-center">
        <div className="w-1/2 mb-5">
          <img
            src={successfulIcon}
            alt="Icon for successful"
            className="w-full"
          />
        </div>
        <h1 className="text-xl font-semibold">RSVP Successful</h1>
        <p className="text-center text-sm text-neutral-200 font-medium mt-3 mb-8">
          RSVP to the {id} was successful. An email with the event details was
          sent to the provided email. See you there.
        </p>

        <Link
          to="/events"
          className="w-fit py-2 px-6 mt-5 bg-blue-700 text-white rounded-md text-sm"
        >
          Back to events
        </Link>
      </div>
    </div>
  )
}
export default RsvpSuccessful
