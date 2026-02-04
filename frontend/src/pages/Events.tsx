import React, { useEffect } from 'react'
import SingleEvent from '../components/SingleEvent'
import SignUpButton from '../components/Buttons/SignUpButton'
import LoginButton from '../components/Buttons/LoginButton'
import axios from 'axios'

import API_ENDPOINTS from '../config/api'

const fetchALLEvents = async () => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.EVENTS.LIST
    )
    // Check if response is paginated (has results array) or flat array
    if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results
    }
    return response.data
  } catch (error) {
    console.error('error fetching events:', error)
    return []
  }
}

const Events = () => {
  const [events, setEvents] = React.useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchALLEvents()
      setEvents(data || [])
    }
    fetchData()
  }, [])

  return (
    <div className="bg-white pb-12">
      <section className="w-[90%] mx-auto pt-5 lg:w-[85%]">
        <h1 className="font-medium mb-8 text-3xl">Upcoming Events</h1>
        <div className="grid gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {events.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <SingleEvent {...item} />
              </React.Fragment>
            )
          })}
        </div>
      </section>

      <section className="h-[30rem] bg-white flex items-center justify-center sm:h-[25rem] mt-16">
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
          <div className="mt-10 flex items-center justify-center gap-6">
            <SignUpButton />
            <LoginButton />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
