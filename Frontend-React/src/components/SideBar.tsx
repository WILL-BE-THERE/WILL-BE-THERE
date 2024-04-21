import { AnimatePresence, motion } from 'framer-motion'
import { menuData } from '../utils/local-data'
import { NavLink } from 'react-router-dom'
import { useProjectContext } from '../context/project-context'
import GetStartedButton from './Buttons/GetStartedButton'

const SideBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useProjectContext()
  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.div
          key="parent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-20 bg-black/40 h-[calc(100vh-5rem)] w-full z-50 overflow-hidden sm:hidden"
        >
          <motion.section
            key="sidebarAnimate"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring' }}
            className="fixed w-3/5 h-[inherit] bg-white border-t-2 border-black/30 flex flex-col justify-between py-14"
          >
            <ul className="flex flex-col justify-center items-center gap-2 text-[0.95rem] font-medium">
              {menuData.map((item, i) => (
                <li
                  key={i}
                  className="w-full text-center"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <NavLink
                    to={item.link}
                    className={`${(isActive: boolean) => {
                      return isActive ? 'active' : ''
                    }} text-neutral-200 py-3 block`}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className=" flex flex-col gap-2 text-center px-8">
              <GetStartedButton />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default SideBar
