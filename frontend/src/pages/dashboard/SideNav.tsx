import logo from '../../assets/logo.png'
import { IoSettingsOutline, IoGridOutline } from 'react-icons/io5'
import {
  PiChartLineUp,
  PiChartPieSlice,
  PiCalendarX,
  PiUser,
} from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { useState } from 'react'
import LogoutModal from './../../pages/dashboard/LogoutModal'

const sideNavData = [
  { icon: <IoGridOutline />, text: 'Overview', link: '/dashboard' },
  { icon: <PiCalendarX />, text: 'Event', link: '/dashboard/event' },
  {
    icon: <PiChartLineUp />,
    text: 'Guest Metrics',
    link: '/dashboard/metrics',
  },
  { icon: <PiChartPieSlice />, text: 'Revenue', link: '/dashboard/revenue' },
] as const

const sideNavData2 = [
  {
    icon: <IoSettingsOutline />,
    text: 'Event',
    link: '/dashboard/eventSettings',
  },
  { icon: <PiUser />, text: 'User', link: '/dashboard/userInfo' },
] as const

const SideNav = () => {
  const [logOut, setLogOut] = useState(false)

  return (
    <>
      {logOut && <LogoutModal setLogOut={setLogOut} />}
      <div className="fixed w-72 h-[inherit] bg-white border-r-2 border-black/15 flex flex-col ">
        <aside className="w-28 ml-10 mb-10 mt-5">
          <img
            src={logo}
            alt="Will be there logo"
            className="w-full object-cover"
          />
        </aside>
        <section className="w-full">
          <h1 className="text-sm text-neutral-200 font-medium ml-5">
            Dashboard
          </h1>
          <ul className="dashboard flex flex-col justify-center items-center gap-2 text-[0.95rem] font-medium mt-3">
            {sideNavData.map((item, i) => (
              <li
                key={i}
                className="w-full"
                //   onClick={() => setIsSidebarOpen(false)}
              >
                <NavLink
                  to={item.link}
                  end
                  className={`${(isActive: boolean) => {
                    return isActive ? 'active' : ''
                  }} text-neutral-200 py-2 flex items-center pl-10 gap-3 font-medium transition-all`}
                >
                  <div className="text-lg font-semibold">{item.icon}</div>
                  <p>{item.text}</p>
                </NavLink>
              </li>
            ))}
          </ul>

          <h1 className="text-sm text-neutral-200 font-medium ml-5 mt-12">
            Settings
          </h1>
          <ul className="flex flex-col justify-center items-center gap-2 text-[0.95rem] font-medium mt-3 dashboard">
            {sideNavData2.map((item, i) => (
              <li
                key={i}
                className="w-full"
                //   onClick={() => setIsSidebarOpen(false)}
              >
                <NavLink
                  to={item.link}
                  className={`${(isActive: boolean) => {
                    return isActive ? 'active' : ''
                  }} text-neutral-200 py-2 flex items-center pl-10 gap-3 font-medium transition-all`}
                >
                  <div className="text-lg font-semibold">{item.icon}</div>
                  <p>{item.text}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          className="h-full w-fit pb-5 flex items-end gap-2 text-red-600 font-medium text-sm pl-5 group"
        >
          <MdLogout className="text-base" />
          <button
            type="button"
            onClick={() => setLogOut(true)}
            className=" group-hover:translate-x-2 transition-all"
          >
            Logout
          </button>
        </button>
      </div>
    </>
  )
}
export default SideNav
