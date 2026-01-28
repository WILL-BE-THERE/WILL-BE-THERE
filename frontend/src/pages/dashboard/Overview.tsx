import { useEffect, useState } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api'
import generateApiHeaders from '../Headers'
import { FaSpinner, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Overview = () => {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.DASHBOARD_SUMMARY, {
          headers: generateApiHeaders()
        })
        setSummary(response.data)
      } catch (error) {
        console.error('Error fetching dashboard summary:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <FaSpinner className="animate-spin text-primary-100 text-4xl" />
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Host!</h1>
          <p className="text-gray-400 text-sm mt-1">Here's what's happening with your events today.</p>
        </div>
        <Link
          to="/createevent"
          className="bg-primary-100 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary-100/20 hover:scale-105 transition-all"
        >
          + Create New Event
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaCalendarAlt />}
          title="Total Events"
          value={summary?.total_events || 0}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={<FaUsers />}
          title="Total RSVPs"
          value={summary?.total_rsvps || 0}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Total Revenue"
          value={`${summary?.total_revenue?.toLocaleString() || 0}`}
          color="bg-green-50 text-green-600"
          isRevenue
        />
        <StatCard
          icon={<FaUsers />}
          title="Checked In"
          value={summary?.checked_in_count || 0}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Registrations</h2>
            <Link to="/dashboard/metrics" className="text-primary-100 text-xs font-bold hover:underline flex items-center gap-1">
              View all <FaArrowRight />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] text-gray-400 uppercase tracking-widest font-bold border-b border-gray-50 pb-3">
                  <th className="py-3 px-2">Guest</th>
                  <th className="py-3 px-2">Event</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {summary?.recent_activity?.length === 0 ? (
                  <tr><td colSpan={4} className="py-10 text-center text-gray-400 font-medium italic">No recent registrations yet.</td></tr>
                ) : (
                  summary?.recent_activity?.map((activity: any, i: number) => (
                    <tr key={i} className="border-b border-gray-50/50 hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-2">
                        <div className="font-bold text-gray-800 group-hover:text-primary-100 transition-colors">{activity.guestName}</div>
                        <div className="text-[10px] text-gray-400">{activity.guestEmail}</div>
                      </td>
                      <td className="py-4 px-2 text-gray-500 font-medium truncate max-w-[150px]">
                        {activity.event_name || 'Event'}
                      </td>
                      <td className="py-4 px-2 text-gray-500 font-medium">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${activity.payment_status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                          {activity.payment_status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right text-gray-400 font-medium">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Event Breakdown List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <h2 className="text-lg font-bold text-gray-800 mb-6 font-serrat">Your Active Events</h2>
          <div className="flex flex-col gap-4">
            {summary?.event_breakdown?.length === 0 ? (
              <p className="py-10 text-center text-gray-400 font-medium italic">You haven't created any events yet.</p>
            ) : (
              summary?.event_breakdown?.map((event: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-primary-100/10 text-primary-100 flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-sm font-bold text-gray-800 truncate">{event.name}</h3>
                    <p className="text-[10px] text-gray-400 font-medium">{event.rsvps} RSVPs</p>
                  </div>
                  <Link to={`/events/${event.id}`} className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary-100 hover:text-white transition-all">
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const StatCard = ({ icon, title, value, color, isRevenue }: any) => (
  <article className="bg-white p-6 rounded-2xl flex flex-col gap-4 shadow-sm border border-gray-50 hover:translate-y-[-4px] transition-all">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        {isRevenue && <span className="text-xs font-bold text-gray-400">GHS</span>}
        <p className="text-2xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  </article>
)

export default Overview
