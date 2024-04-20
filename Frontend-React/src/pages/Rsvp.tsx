import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import shape3 from "../assets/shape3.png";
import { FormEvent } from "react";

const Rsvp = () => {
  return (
    <section className="h-screen w-full bg-white relative flex">
      <img
        src={shape1}
        alt="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-36"
      />
      <img
        src={shape2}
        alt="icon"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-44"
      />
      <img
        src={shape3}
        alt="icon"
        className="absolute left-[22%] top-1/2 -translate-y-1/2 -translate-x-[22%] w-52"
      />
      <aside className="bg-primary-100/[50%] w-1/2 h-full relative z-[2] backdrop-filter backdrop-blur-[15px] grid place-items-center">
        <div className="w-[35%] h-fit text-white text-center">
          <h1 className="text-3xl mb-2 font-bold">Don't be left behind</h1>
          <p className="text-sm mb-8 font-light">
            RSVP to secure a spot and avoid missing out on the next big event
          </p>
        </div>
      </aside>
        <aside className="w-1/2 h-full relative z-[2] grid ">
            <div className="w-[35%] h-fit text-black p-5">
                <h1 className="text-3xl mb-2 font-bold">RSVP</h1>
                <p className="text-sm mb-1 font-light p-2">
                Confirm your attendace by filling in the information below to confirm your attendance and get added to the guest list</p>
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    }}
                    className="flex flex-col gap-3"
                    >
                        <input type="text" placeholder="Event" className="w-full p-2 border border-gray-300 rounded bg-orange-50 box-decoration-slice text-black"/>
                        <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 rounded bg-orange-50 box-decoration-slice text-black"/>
                        <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded bg-orange-50 box-decoration-slice text-black"/>
                        <input type="tel" placeholder="Phone" className="w-full p-2 border border-gray-300 rounded bg-orange-50 box-decoration-slice text-black"/>
                        <div className="">
                            <p className="font-light"> will you be attending? </p>
                            <input type="radio" name="attending" id="yes" value="yes" className="mr-3"/>
                            <label htmlFor="yes" className="mr-3">Yes</label>
                            <input type="radio" name="attending" id="no" value="no" className="mr-3"/>
                            <label htmlFor="no">No</label>
                        </div>
                        <div className="">
                            <p className="font-light"> will you be coming with a guest? </p>
                            <input type="radio" name="guest" id="yes" value="yes" className="mr-3"/>
                            <label htmlFor="yes" className="mr-3">Yes</label>
                            <input type="radio" name="guest" id="no" value="no" className="mr-3"/>
                            <label htmlFor="no">No</label>
                        </div>
                        <textarea placeholder="send a congratulatory message" rows={4} cols={50} className="border border-black rounded"></textarea>                   
                        <label htmlFor="quantity" className="font">number of guests</label>
                        <input type="number" id="quantity" name="quantity" min={0} max={100} step={1} className="border border-black rounded" />
                        <textarea placeholder="Guest Names" rows={4} cols={50} className="border border-black rounded"></textarea>                   
                        <button className="w-full p-2 bg-blue-700 text-white rounded">RSVP</button>
                </form>
            </div>
        </aside>
    </section>
  );
}

export default Rsvp;