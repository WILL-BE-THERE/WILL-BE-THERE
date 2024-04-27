import { Outlet } from 'react-router-dom'
import SideNav from './SideNav'
import TopNav from './TopNav'

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex">
      <SideNav />

      <section className="w-full ml-72 overflow-x-hidden overflow-y-scroll no-scrollbar">
        <TopNav />
        <aside className="w-[calc(100vw-18rem)] pt-24 pb-12">
          <div className="w-[92%] mx-auto pt-6">
            <Outlet />
          </div>
        </aside>
      </section>
    </div>
  )
}
export default Dashboard
