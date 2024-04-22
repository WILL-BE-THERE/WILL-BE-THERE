import shape1 from '../assets/shape1.png'
import shape2 from '../assets/shape2.png'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useProjectContext } from '../context/project-context'
import { FaPencil } from 'react-icons/fa6'

const Rsvp = () => {
  const { eventName } = useProjectContext()

  const initialDetails = {
    eventName: '',
    guestName: '',
    guestEmail: '',
    isAttending: 'yes',
    isFriendsComing: 'yes',
    message: '',
  }

  const [userDetails, setUserDetails] = useState(initialDetails)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
    console.log(userDetails.isAttending)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <section className="h-[50rem] w-full bg-white relative flex">
      <img
        src={shape2}
        alt="icon"
        className="absolute -right-14 top-1/4 w-36"
      />
      <img
        src={shape2}
        alt="icon"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-44"
      />
      <img
        src={shape1}
        alt="icon"
        className="absolute left-[22%] top-1/2 -translate-y-1/2 -translate-x-[22%] w-52"
      />
      <aside className="bg-primary-100/[50%] w-1/2 h-full relative z-[2] backdrop-filter backdrop-blur-[15px] grid place-items-center">
        <div className="w-[45%] h-fit text-white text-center">
          <h1 className="text-3xl mb-2 font-bold">Don't be left behind</h1>
          <p className="text-sm mb-8 font-light">
            RSVP to secure a spot and avoid missing out on the next big event
          </p>
        </div>
      </aside>
      <aside className="w-1/2 h-full relative z-[2] grid py-12">
        <div className="w-[75%] h-fit text-black px-14">
          <h1 className="text-2xl mb-2 font-bold">Confirm your attendace</h1>
          <p className="text-sm mb-1 font-light">
            Please fill in the information below to confirm your attendance and
            get added to the guest list
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <label
              htmlFor="Enter Password"
              className="flex flex-col gap-1 w-full"
            >
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Event
              </p>
              <aside className="relative flex">
                <input
                  type="text"
                  name="eventName"
                  value={eventName}
                  disabled
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                  // required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                >
                  <FaPencil />
                </button>
              </aside>
            </label>

            <label
              htmlFor="Enter Password"
              className="flex flex-col gap-1 w-full"
            >
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Name
              </p>
              <aside className="relative flex">
                <input
                  type="text"
                  name="guestName"
                  value={userDetails.guestName}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                  // required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                >
                  <FaPencil />
                </button>
              </aside>
            </label>

            <label
              htmlFor="Enter Password"
              className="flex flex-col gap-1 w-full"
            >
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Email
              </p>
              <aside className="relative flex">
                <input
                  type="text"
                  name="guestEmail"
                  value={userDetails.guestEmail}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                  // required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                >
                  <FaPencil />
                </button>
              </aside>
            </label>

            <div className="">
              <p className="font-light"> will you be attending? </p>
              <input
                type="radio"
                name="isAttending"
                value="yes"
                onChange={handleChange}
                className="mr-3"
              />
              <label htmlFor="yes" className="mr-3">
                Yes
              </label>
              <input
                type="radio"
                name="isAttending"
                value="no"
                className="mr-3"
              />
              <label htmlFor="no">No</label>
            </div>
            <div className="">
              <p className="font-light"> will you be coming with a guest? </p>
              <input
                type="radio"
                name="guest"
                id="yes"
                value="yes"
                className="mr-3"
              />
              <label htmlFor="yes" className="mr-3">
                Yes
              </label>
              <input
                type="radio"
                name="guest"
                id="no"
                value="no"
                className="mr-3"
              />
              <label htmlFor="no">No</label>
            </div>
            <textarea
              placeholder="send a congratulatory message"
              rows={4}
              cols={50}
              className="border border-black rounded"
            ></textarea>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="py-2 px-8 mt-5 bg-blue-700 text-white rounded"
              >
                RSVP
              </button>
            </div>
          </form>
        </div>
      </aside>
    </section>
  )
}

export default Rsvp
