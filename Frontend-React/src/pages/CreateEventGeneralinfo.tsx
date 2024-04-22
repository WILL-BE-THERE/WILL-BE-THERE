const CreateEvent = () => {
    return (
        <div className="items-center text-center bg-white">
            <section>
                <h1 className="font-extrabold">CREATE EVENT</h1>
                <p className="font-large">Craft your event and indulge in arefreshing new approach to register your event</p>
            </section>
            <section className="border">
                <p>General Information</p>
                <p>payment information</p>
                <p>socials</p>
            </section>
            <section className="border m-10 items-center">
                <h1 className="font-extrabold">Event Image</h1>
                <p>Upload a captivating image that will attract attendees to your event</p>
                <form className="border outline-dashed m-2 rounded-sm p-4 text-center">
                    <div>
                        <label htmlFor="eventimage"></label>
                        <input type="file" id="eventimage" name="eventimage" />
                    </div>
                    <button type="submit">Upload Image</button>
                </form>
            </section>
            <section className="border outline-dotted rounded m-10">
                <h1 className="font-extrabold">General Information</h1>
                <p>The essential details regarding your event, encompassing its location and additional information</p>
                <form className="grid grid-cols-2 grid-gap-4">
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firsname" name="firstname"className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="event date">Date of Event</label>
                        <input type="date" id="eventdate" name="eventdate" className="border outline-none m-2 rounded-sm bg-gray-200"/>
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="eventclosingdate">Event Closing Date</label>
                        <input type="date" id="eventclosingdate" name="eventclosingdate" className="border outline-none m-2 rounded-sm bg-gray-200"/>
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="Time">Time</label>
                        <input type="time" id="time" name="time"className="border outline-none m-2 rounded-sm bg-gray-200"></input>
                    </div>
                    <div className=" border outline-2 rounded shadow-md mt-4 flex-auto">
                        <label htmlFor="country">Country</label>
                        <select id="country" name="country"className="border outline-none m-2 rounded-sm bg-gray-200" />
                        <label htmlFor="state">State</label>
                        <select id="state" name="state"className="border outline-none m-2 rounded-sm bg-gray-200" />
                        <label htmlFor="city">City</label>
                        <select id="city" name="city"className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="street">Street</label>
                        <p>Enter the street address below, select from the auto complete options and verify that the location appears correctly on the map</p>
                        <input type="text" id="street" name="street" className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                </form>
                <div>
                    {/* google map */}
                </div>
            </section>
            <section>
                <button>
                    <a href="/HostPage">
                        Back
                    </a>
                </button>
                <button>
                    <a href="/CreateEventPayInfo">
                        Next 
                    </a>
                </button>
            </section>
        </div>
    );
}
export default CreateEvent