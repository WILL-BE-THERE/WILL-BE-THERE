const Events = () => {
  return (
    <section className="bg-white">
      <div className="ml-2">
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
      </div>
      <div className="border shadow- shadow-2xl p-10 place-items-center">
        <div className="items-center p-5 mt-3 ">
          <p className="font-bold ">Ready to Take your Events to the Next Level?</p>
          <p className="font-light">Join thousands of organizers and attendees who trust <em className="font-bold">WILL BE THERE</em> for seamless Event management and unforgettable experiences. Whether you're planning an event or looking for your next great gathering, we've got you covered</p>
          <button className="px-5 py-2 rounded-md bg-white text-black text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none m-6">
            SignUp
            </button>
          <button className="px-5 py-2 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 w-fit transition-all border-none outline-none m-6">
            LogIn
            </button>
        </div>
      </div>
    </section>
  )
}

export default Events;
