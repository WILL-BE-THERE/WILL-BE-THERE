import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import { useProjectContext } from './context/project-context'

const Layout = () => {
  const { isSidebarOpen } = useProjectContext()

  return (
    <div className={`${isSidebarOpen && 'fixed w-full'}`}>
      <ScrollRestoration />
      <Navbar />
      <SideBar />
      <Outlet />
      <Footer />
    </div>
  )
}
export default Layout
