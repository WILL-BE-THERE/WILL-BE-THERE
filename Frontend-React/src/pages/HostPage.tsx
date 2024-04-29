import { Link } from 'react-router-dom'
import createEventIcon from '../assets/create-event-icon.png'
import manageEventIcon from '../assets/manage-event-icon.png'

const HostPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white pt-20 pb-24">
      <Link
        to="/createevent"
        className="border-2 border-dashed border-neutral-400 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center h-56 w-80 sm:w-96"
      >
        <div className="mb-3">
          <img src={createEventIcon} alt="Create event icon" />
        </div>
        <h1 className="font-bold text-lg">Create an event</h1>
        <p className="text-sm text-neutral-200 font-medium">
          you've not uploaded any event yet
        </p>
      </Link>

      <Link
        to="/dashboard"
        className="border-2 border-dashed border-neutral-400 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center h-56 w-72 sm:w-80 mt-10"
      >
        <div className="mb-3">
          <img src={manageEventIcon} alt="Manage event icon" />
        </div>
        <h1 className="font-bold text-lg">Manage Event</h1>
        <p className="text-sm text-neutral-200 font-medium">
          Take control of your event
        </p>
      </Link>
    </div>
  )
}

export default HostPage
