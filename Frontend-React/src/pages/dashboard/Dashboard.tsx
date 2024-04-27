import { Outlet } from 'react-router-dom'
import SideNav from './SideNav'
import TopNav from './TopNav'

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex">
      <SideNav />

      <section className="w-full ml-72">
        <TopNav />
        <Outlet />
      </section>
    </div>
  )
}
export default Dashboard
