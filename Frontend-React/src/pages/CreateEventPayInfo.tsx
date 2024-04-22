const CreateEventPayInfo = () => {
    return (
        <div className="text-center bg-white p-4">
            <section>
                <h1 className="font-extrabold">CREATE EVENT</h1>
                <p className="font-large">Craft your event and indulge in arefreshing new approach to register your event</p>
            </section>
            <section className="border">
                <p>General Information</p>
                <p>payment information</p>
                <p>socials</p>
            </section>
            <section className="border outline-dotted rounded m-20 p-20">
                <h1 className="font-extrabold">Banking Information</h1>
                <p>Enter the payment details for your event</p>
                <form className="align-l">
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="eventname">Event Name</label>
                        <input type="text" id="eventname" name="eventname" className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="eventprice">Event Price</label>
                        <input type="number" id="eventprice" name="eventprice" className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="eventcurrency">Currency</label>
                        <select id="eventcurrency" name="eventcurrency" className="border outline-none m-2 rounded-sm bg-gray-200" />                 
            
                        <label htmlFor="eventpaymentmethod">Payment Method</label>
                        <select id="eventpaymentmethod" name="eventpaymentmethod" className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="eventpaymentdescription">Payment Description</label>
                        <input type="text" id="eventpaymentdescription" name="eventpaymentdescription" className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                    <div className="border outline-2 shadow-md mt-4">
                        <label htmlFor="eventpaymentterms">Payment Terms</label>
                        <input type="text" id="eventpaymentterms" name="eventpaymentterms" className="border outline-none m-2 rounded-sm bg-gray-200" />
                    </div>
                </form>
            </section>
            <section>
                <button>
                    <a href="/CreateEventGeneralinfo">
                        Back
                    </a>
                </button>
                <button>
                    <a href="/CreateEventSocials">
                        Next
                    </a>
                </button>
            </section>
        </div>
    )
}

export default CreateEventPayInfo