import { guests } from './../../../src/utils/local-data'
import eventImg from '../../assets/Frame 1171275043.png'

const confirmedGuests = guests.filter((item) => item.status === 'Confirmed')
const pendingGuests = guests.filter((item) => item.status === 'Pending')

const Overview = () => {
  return (
    <section className="flex flex-col gap-6">
      <article className="w-full h-60 flex gap-6">
        <div className="w-[53%] h-full flex gap-5">
          <section className="w-[54%] h-full shadow-md rounded-lg">
            <img src={eventImg} alt="Event Image" className="w-full h-full" />
          </section>
          <section className="w-[46%] flex flex-col justify-between py-4 px-3 text-neutral-200 bg-white rounded-lg shadow-md">
            <div className="">
              <h1 className="font-semibold">Event Name</h1>
              <p className="text-[13px]">Euphoria Party</p>
            </div>
            <div className="">
              <h1 className="font-semibold">Location</h1>
              <p className="text-[13px]">Guratopp, Jos, Nigeria</p>
            </div>
            <div className="">
              <h1 className="font-semibold">Date</h1>
              <p className="text-[13px]">31 March 2024</p>
            </div>
            <div className="">
              <h1 className="font-semibold">Booking URL</h1>
              <a
                href="#eventlink"
                className="text-[13px] text-primary-100 bg-[#F5F7FA]"
              >
                willbethere22/euphoriaparty
              </a>
            </div>
          </section>
        </div>

        <div className="w-[47%] flex flex-col gap-6 text-neutral-200 text-sm">
          <aside className="flex gap-6 justify-between h-1/2 text-center">
            <div className="bg-white rounded-lg w-full shadow-md flex flex-col items-center justify-center gap-3">
              <p className="text-base leading-5">
                Confirmed <br /> Guest
              </p>
              <p className="text-[#FD901A] font-semibold">
                {confirmedGuests.length}
              </p>
            </div>
            <div className="bg-white rounded-lg w-full shadow-md flex flex-col items-center justify-center gap-3">
              <p className="text-base leading-5">
                Pending <br /> Guest
              </p>
              <p className="text-primary-100 font-semibold">
                {pendingGuests.length}
              </p>
            </div>
          </aside>

          <aside className="h-1/2 rounded-lg bg-white shadow-md flex flex-col items-center justify-center gap-3 font-medium">
            <p className="text-base">Event Timer</p>
            <p className="text-sm text-[#AD6312] font-semibold flex gap-5">
              23 hrs <span>:</span> 6 mins <span>:</span> 23 secs
            </p>
          </aside>
        </div>
      </article>

      <aside className="grid grid-cols-2 gap-6">
        <section className="bg-white rounded-lg py-5 px-6 flex flex-col shadow-md">
          <p className="font-semibold mb-5">Confirmed Guest</p>
          <div className="grid grid-cols-3 items-center text-[13px] text-neutral-200 font-semibold mb-5">
            <h1>No.</h1>
            <h1>Guest Name</h1>
            <h1 className="text-end">Registration Date</h1>
          </div>
          <ul className="text-[13px] font-semibold font-serrat flex flex-col gap-6 overflow-y-scroll no-scrollbar max-h-[20rem]">
            {confirmedGuests.map((guestInfo, i) => {
              return (
                <li key={i} className="grid grid-cols-3">
                  <p>{i + 1}</p>
                  <p>{guestInfo.guestName}</p>
                  <p className="text-end">{guestInfo.regDate}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="bg-white rounded-lg py-5 px-6 flex flex-col shadow-md">
          <p className="font-semibold mb-5">Pending Guest</p>
          <div className="grid grid-cols-3 items-center text-[13px] text-neutral-200 font-semibold mb-5">
            <h1>No.</h1>
            <h1>Guest Name</h1>
            <h1 className="text-end">Registration Date</h1>
          </div>
          <ul className="text-[13px] font-semibold font-serrat flex flex-col gap-6 overflow-y-scroll no-scrollbar max-h-[20rem]">
            {pendingGuests.map((guestInfo, i) => {
              return (
                <li key={i} className="grid grid-cols-3">
                  <p>{i + 1}</p>
                  <p>{guestInfo.guestName}</p>
                  <p className="text-end">{guestInfo.regDate}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </aside>
    </section>
  )
}
export default Overview
