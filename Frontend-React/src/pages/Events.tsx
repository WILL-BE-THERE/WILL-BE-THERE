import LoginButton from '../components/Buttons/LoginButton'
import SignUpButton from '../components/Buttons/SignUpButton'

const Events = () => {
  return (
    <div className="bg-white">
      <section className="ml-2">
        <h1 className="font-bold">Upcoming Events</h1>
        <p>Here is a list of all the events that are happening in the near future.</p>
        <div className=" border bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="border rounded-lg shadow-md">
            <img src="" alt="" />
            <h3>Event 1</h3>
            <p>Event Description</p>
            <p>Date</p>
            <button className="px-5 py-2 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none">
              <a href="#">View Details</a>
            </button>
          </div>
          <div className="border rounded-lg shadow-md">
            <img src="" alt="" />
            <h3>Event 2</h3>
            <p>Event Description</p>
            <p>Date</p>
            <button className="px-5 py-2 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none">
              <a href="#">View Details</a>
            </button>
          </div>
          <div className="border rounded-lg shadow-md">
            <img src="" alt="" />
            <h3>Event 3</h3>
            <p>Event Description</p>
            <p>Date</p>
            <button className="px-5 py-2 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none">
              <a href="#">View Details</a>
            </button>
          </div>
          <div className="border rounded-lg shadow-md">
            <img src="" alt="" />
            <h3>Event 4</h3>
            <p>Event Description</p>
            <p>Date</p>
            <button className="px-5 py-2 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none">
              <a href="#">View Details</a>
            </button>
          </div>
          <div className="border rounded-lg shadow-md">
            <img src="" alt="" />
            <h3>Event 5</h3>
            <p>Event Description</p>
            <p>Date</p>
            <button className="px-5 py-2 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none">
              <a href="#">View Details</a>
            </button>
          </div>
        </div>
      </section>
      <section className="h-[30rem] bg-white flex items-center justify-center sm:h-[25rem]">
        <div className="w-[90%] mx-auto flex flex-col text-center lg:w-[60%]">
          <h1 className="text-2xl font-semibold">
            Ready to take your <br />
            events to the next level?
          </h1>
          <p className="text-sm text-neutral-200 font-medium w-full mx-auto mt-5 sm:w-4/5">
            Join thousands of event organizers and attendees who trust us for
            seamless event management an unforgettable experiences. Whether you
            are planning an event or looking for your next great gathering,
            we've got you covered.
          </p>
          <div className="mt-10">
            <button>
              <SignUpButton />
              <LoginButton />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Events;
