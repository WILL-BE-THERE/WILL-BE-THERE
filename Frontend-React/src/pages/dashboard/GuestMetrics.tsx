import { PieChart } from 'react-minimal-pie-chart'

import { guests } from '../../utils/local-data'
import { MdOutlineMessage } from 'react-icons/md'

const { totalConfirmed, totalPending } = guests.reduce(
  (total, item) => {
    let noOfConfirmed: number = 0
    let noOfPending: number = 0
    item.status === 'Confirmed' ? (noOfConfirmed += 1) : (noOfPending += 1)

    total.totalConfirmed += noOfConfirmed
    total.totalPending += noOfPending
    return total
  },
  { totalConfirmed: 0, totalPending: 0 },
)

const GuestMetrics = () => {
  return (
    <section className="flex gap-5">
      <div className="w-[70%] bg-white rounded-lg py-6 px-5">
        <h1 className="font-semibold mb-7">Guest Info</h1>
        <div className="grid grid-cols-4 items-center text-[13px] text-neutral-200 font-semibold mb-5 border-b-2 border-black/10 pb-2">
          <h1>No.</h1>
          <h1>Guest Name</h1>
          <h1>Registration Date</h1>
          <h1 className="text-center">Status</h1>
        </div>
        <ul className="text-[13px] font-semibold font-serrat flex flex-col gap-6 overflow-y-scroll no-scrollbar max-h-[30rem]">
          {guests.map((guestInfo, i) => {
            return (
              <li key={i} className="grid grid-cols-4">
                <p>{i + 1}</p>
                <p>{guestInfo.guestName}</p>
                <p>{guestInfo.regDate}</p>
                <div className="flex gap-2 items-center justify-start ml-12">
                  <section
                    className={`h-2 w-2 rounded-full ${guestInfo.status === 'Confirmed' ? 'bg-green-600' : 'bg-[#FDA341]'}`}
                  ></section>
                  <p
                    className={`text-center ${guestInfo.status === 'Confirmed' ? 'text-green-600' : 'text-[#FDA341]'}`}
                  >
                    {guestInfo.status}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="w-[30%] flex flex-col gap-5">
        <div className="h-[70%] w-full bg-white rounded-lg py-4 flex flex-col items-center gap-2">
          <h1 className="font-semibold">Graph Metrics</h1>
          <section className="relative w-40 h-40">
            <PieChart
              className="absolute w-full h-full cursor-pointer z-10"
              paddingAngle={3}
              data={[
                {
                  title: 'Pending Guests',
                  value: totalPending,
                  color: '#FED1A1',
                },
                {
                  title: 'Confirmed Guests',
                  value: totalConfirmed,
                  color: '#28AA4C',
                },
              ]}
            />
            <div className="w-20 bg-white h-20 rounded-full absolute left-1/2 right-1/2 -translate-x-1/2 top-1/2 bottom-1/2 -translate-y-1/2 z-20 flex items-center justify-center"></div>
          </section>

          <h1 className="text-primary-100 text-xs bg-[#E8EEFF] py-2 text-center w-3/5 mx-auto font-medium mt-4">
            Total Count for <br />
            Interested Guests
          </h1>

          <p className="text-[#798A9C] mt-2 text-sm">
            Confirmed Guest: {totalConfirmed}
          </p>

          <p className="text-[#798A9C] text-sm">
            Pending Guest: {totalPending}
          </p>

          <article className="flex items-center justify-between gap-8 mt-3">
            <section className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-[#28aa4c]"></div>
              <p className="text-xs text-primary-200 font-medium">Confirmed</p>
            </section>

            <section className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-[#FED1A1]"></div>
              <p className="text-xs text-primary-200 font-medium">Pending</p>
            </section>
          </article>
        </div>

        <div className="h-[30%] w-full bg-white rounded-lg flex flex-col gap-1 items-center justify-center">
          <aside className="text-primary-100 bg-[#E8EEFF] p-3 text-lg">
            <MdOutlineMessage />
          </aside>
          <p className="text-sm text-neutral-200 font-medium">
            Average response
          </p>
          <p className="text-xl text-neutral-400 font-medium">12m</p>
        </div>
      </aside>
    </section>
  )
}
export default GuestMetrics
