import { useProjectContext } from '../../context/project-context'
import userImg from '../../assets/Frame 1171275068.png'
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5'
import { VscBellDot } from 'react-icons/vsc'

const TopNav = () => {
  const { loggedInUserInfo } = useProjectContext()
  // const timeOfDay = () => {
  //   if (Date.now)
  // }

  const currentHour = new Date().getHours()
  const timeOfDay =
    currentHour >= 0 && currentHour < 12 ? 'Morning' : 'Afternoon'

  const greet = `Good ${timeOfDay}, ${loggedInUserInfo.user.first_name}`

  return (
    <nav className="fixed h-24 w-[calc(100vw-18rem)] mx-auto bg-white">
      <header className="h-full w-[92%] mx-auto flex items-center justify-between">
        <h1 className="text-lg font-semibold">{greet}</h1>
        <section className="flex items-center gap-5">
          <label
            htmlFor="search"
            className="flex items-center gap-4 py-3 px-5 rounded-full bg-[#F5F7FA] text-sm text-neutral-400 font-light"
          >
            <IoSearchOutline className="text-xl font-medium" />
            <input
              type="search"
              name="search"
              placeholder="Search for something"
              className="bg-transparent w-full text-sm"
            />
          </label>

          <div className="bg-[#F5F7FA] rounded-full p-3">
            <IoSettingsOutline />
          </div>

          <div className="bg-[#F5F7FA] rounded-full p-3 text-primary-100">
            <VscBellDot />
          </div>

          <div className="w-10">
            <img src={userImg} alt="UserImg" className="w-full" />
          </div>
        </section>
      </header>
    </nav>
  )
}
export default TopNav
