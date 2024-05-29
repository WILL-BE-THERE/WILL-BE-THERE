import logo from '../assets/logo.png'
import NavLinks from './NavLinks'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useProjectContext } from '../context/project-context'
import GetStartedButton from './Buttons/GetStartedButton'

const Navbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useProjectContext()

  return (
    <nav
      className={`${location.pathname === '/host' && 'hidden'} bg-white h-20 flex items-center justify-center border-b border-black/10 `}
    >
      <section className="w-[90%] flex items-center justify-between m-auto sm:w-[95%] lg:w-[85%]">
        <button
          type="button"
          className="bg-[#E8EEFF] p-2 rounded-sm border-none outline-none text-primary-100 sm:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <img src={logo} alt="Project Logo" className="w-24" />
        <div className="items-center gap-x-8 font-medium hidden sm:flex">
          <NavLinks />
          <GetStartedButton />
        </div>
      </section>
    </nav>
  )
}
export default Navbar
