import { Link } from 'react-router-dom'
import icon from '../assets/Frame.png'

const CreateEventMessage = () => {
  return (
    <div className="bg-white pt-8">
      <section className="w-[60%] mx-auto flex flex-col gap-3 justify-center items-center text-center text-neutral-200 font-medium">
        <h1 className="text-2xl font-semibold mb-1">
          CONRATULATIONS🥳!!! <br />
          YOU'VE SUCCESSFULLY CREATED YOUR EVENT.
        </h1>
        <p>
          Head to the Admin Dashboard now to efficiently manage your events and
          ensure everything is perfectly tailored to your vision
        </p>
        <img
          src={icon}
          alt="Image showing successful creation of events"
          className="w-80 mt-12"
        />
        <Link
          to="/dashboard"
          className="mb-32 mt-12 bg-primary-100 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-200 transition-all"
        >
          Manage Events
        </Link>
      </section>
    </div>
  )
}

export default CreateEventMessage
