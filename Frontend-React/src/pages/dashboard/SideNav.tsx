import logo from '../../assets/logo.png'
import { VscBellDot } from 'react-icons/vsc'
import {
  IoSearchCircleOutline,
  IoSettingsOutline,
  IoGridOutline,
} from 'react-icons/io5'
import {
  PiChartLineUp,
  PiChartPieSlice,
  PiCalendarX,
  PiUser,
} from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

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

const SideNav = () => {
  return (
    <div className="fixed w-72 h-[inherit] bg-white border-r-2 border-black/15 flex flex-col ">
      <aside className="w-28 ml-10 mb-10 mt-5">
        <img
          src={logo}
          alt="Will be there logo"
          className="w-full object-cover"
        />
      </aside>
      <section className="w-full">
        <h1 className="text-base text-neutral-200 font-medium ml-5">
          Dashboard
        </h1>
        <ul className="flex flex-col justify-center items-center gap-2 text-[0.95rem] font-medium mt-5">
          {sideNavData.map((item, i) => (
            <li
              key={i}
              className="w-full"
              //   onClick={() => setIsSidebarOpen(false)}
            >
              <NavLink
                to={item.link}
                className={`${(isActive: boolean) => {
                  return isActive ? 'active' : ''
                }} text-neutral-200 py-2 flex items-center ml-16 gap-3 font-medium`}
              >
                {item.icon}
                <p>{item.text}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
export default SideNav
