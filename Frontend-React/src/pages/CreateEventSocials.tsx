const CreateEventSocials = () => {
    return (
        <div className="text-center p-4">
            <section>
                <h1 className="font-extrabold">CREATE EVENT</h1>
                <p className="font-large">Craft your event and indulge in arefreshing new approach to register your event</p>
            </section>
            <section className="border">
                <p>General Information</p>
                <p>payment information</p>
                <p>socials</p>
            </section>
            <section className="text-center">
                <div className="border outline-dotted rounded p-4">
                    <div>
                        <h1 className="font-bold">Socials</h1>
                        <p className="font-medium">Add your social media links to your event page</p>
                    </div>
                    <form action="submit" className="grid grid-cols-2 grid-gap-4 border shadow-sm outline-none">
                        <div>
                            <label htmlFor="instragram">Instagram</label>
                            <input type="url" name="instagram" id="instagram" />
                        </div>
                        <div>
                            <label htmlFor="facebook">Facebook</label>
                            <input type="url" name="facebook" id="facebook" />
                        </div>
                        <div>
                            <label htmlFor="twitter">Twitter</label>
                            <input type="url" name="twitter" id="twitter" />
                        </div>
                        <div>
                            <label htmlFor="linkedin">LinkedIn</label>
                            <input type="url" name="linkedin" id="linkedin" />
                        </div>
                        <div>
                            <label htmlFor="website">Website</label>
                            <input type="url" name="website" id="website" />
                        </div>
                    </form>
                </div>
            </section>
            <section>
                <div>
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">By clicking next, you agree to our terms and conditions</label>
                </div>
            </section>
            <section>
                <button>
                <a href="/CreateEventPayInfo">
                    Back
                </a>
                </button>
                <button>
                    <a href="/CreateEventMessage">
                        Next
                    </a>
                </button>
            </section>
        </div>
    );
}

export default CreateEventSocials