import { FaChevronRight, FaEdit } from 'react-icons/fa'
import { FaBriefcase, FaFaceSmile } from 'react-icons/fa6'

const CreateEvent = () => {
  return (
    <div className="items-center text-center bg-white">
      <div className=" w-[70%] mx-auto">
        <section className="pt-8 text-center">
          <h1 className="font-bold text-3xl">Create Event</h1>
          <p className="font-medium text-sm text-neutral-200 mt-1 mb-8">
            Craft your event and indulge in arefreshing new approach to register
            your event
          </p>
        </section>

        <section className="flex items-center justify-between gap-12 border-b-[3.5px] border-primary-100 py-4 w-[65%] mx-auto px-8">
          <div className="flex justify-between items-center text-xs text-neutral-500 font-medium w-full">
            <p className="flex gap-2 items-center">
              <FaEdit />
              General Information
            </p>
            <FaChevronRight />
          </div>
          <div className="flex justify-center items-center text-xs gap-12 text-neutral-500 font-medium w-full">
            <p className="flex gap-2 items-center">
              <FaBriefcase /> Payment Info
            </p>
            <FaChevronRight />
          </div>
          <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">
            <p className="flex gap-2 items-center">
              <FaFaceSmile />
              Socials
            </p>
          </div>
        </section>

        <section className=" mt-8 items-center text-lg w-[65%] mx-auto">
          <h1 className="font-bold mb-1">Event Image</h1>
          <p className="text-neutral-200 text-sm font-medium">
            Upload a captivating image that will attract attendees to your event
          </p>

          <form className=" outline-dashed m-2 rounded-sm p-4 text-center">
            <div>
              <label htmlFor="eventimage"></label>
              <input
                type="file"
                id="eventimage"
                name="eventimage"
                className=" file:opacity-0"
              />
            </div>
            <button type="submit">Upload Image</button>
          </form>
        </section>

        <section className="border-2 border-dashed rounded-xl border-black/30 mt-10 py-5 w-[75%] mx-auto px-12 text-start">
          <h1 className="font-bold mb-1 text-lg mt-4">General Information</h1>
          <p className="text-neutral-200 text-sm font-medium">
            The essential details regarding your event, encompassing its
            location and additional information
          </p>
          <form className="grid grid-cols-2 grid-gap-4">
            <div className=" outline-2 shadow-md mt-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
            </div>
            <div className=" outline-2 shadow-md mt-4">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firsname"
                name="firstname"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
            </div>
            <div className=" outline-2 shadow-md mt-4">
              <label htmlFor="event date">Date of Event</label>
              <input
                type="date"
                id="eventdate"
                name="eventdate"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
            </div>
            <div className=" outline-2 shadow-md mt-4">
              <label htmlFor="eventclosingdate">Event Closing Date</label>
              <input
                type="date"
                id="eventclosingdate"
                name="eventclosingdate"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
            </div>
            <div className=" outline-2 shadow-md mt-4">
              <label htmlFor="Time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              ></input>
            </div>
            <div className="  outline-2 rounded shadow-md mt-4 flex-auto">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
              <label htmlFor="city">City</label>
              <select
                id="city"
                name="city"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
            </div>
            <div className=" outline-2 shadow-md mt-4">
              <label htmlFor="street">Street</label>
              <p>
                Enter the street address below, select from the auto complete
                options and verify that the location appears correctly on the
                map
              </p>
              <input
                type="text"
                id="street"
                name="street"
                className=" outline-none m-2 rounded-sm bg-gray-200"
              />
            </div>
          </form>
          <div>{/* google map */}</div>
        </section>
        <section>
          <button>
            <a href="/HostPage">Back</a>
          </button>
          <button>
            <a href="/CreateEventPayInfo">Next</a>
          </button>
        </section>
      </div>
    </div>
  )
}
export default CreateEvent
