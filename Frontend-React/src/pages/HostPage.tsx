const HostPage = () => {
  return (
    <div className="items-center bg-white p-20">
        <section className="border  border-white rounded outline-dotted m-10 text-center">
            <h1 className="font-extrabold font-weight-800">Create an event</h1>
            <p>you've not uploaded any event yet</p>
        </section>
        <section className="border  rounded outline-dotted m-10 text-center">
            <h1 className="font-extrabold font-weight-800">Manage Event</h1>
            <p>Take control of your event</p>
        </section>
    </div>
  );
}

export default HostPage;