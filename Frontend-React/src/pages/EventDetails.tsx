import RsvpButton from '../components/Buttons/RsvpButton'

const EventDetails = () => {
    const goBack = () => {
        window.history.back();
    };


  return (
    <section>
        <aside>
            <div>
                <img src="" alt="" />
            </div>
        </aside>
        <aside>
            <div>
                <h1>Event Details</h1>
                <p>Event Name: Event 1</p>
                <p>Event Description: Event Description</p>
                <p>Event Date: Date</p>
                <p>Venue</p>
                <p>Location</p>
                <p>Time</p>
                <p>Dress code</p>
                <button className="w-full mt-8 text-center text-primary-100"
                onClick={goBack}>
                    Back
                </button>
                <button>
                    <RsvpButton />
                </button>
            </div>
        </aside>
    </section>
  )
}

export default EventDetails
