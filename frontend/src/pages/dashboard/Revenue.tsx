import { useEffect, useState } from 'react'
import { FaWallet, FaSpinner, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api'
import generateApiHeaders from '../Headers'
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler)

const Revenue = () => {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.EVENTS.DASHBOARD_SUMMARY, {
          headers: generateApiHeaders()
        })
        setSummary(response.data)
      } catch (error) {
        console.error('Error fetching revenue stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue Trend',
        data: [12000, 19000, 3000, 5000, 20000, 30000, summary?.total_revenue || 0],
        fill: true,
        backgroundColor: 'rgba(122, 155, 254, 0.1)',
        borderColor: '#7A9BFE',
        pointBorderColor: '#7A9BFE',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false } },
    }
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <FaSpinner className="animate-spin text-primary-100 text-4xl" />
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Financial Overview</h1>
          <p className="text-sm text-gray-400 font-medium">Tracking revenue from all ticketed events</p>
        </div>
        <button className="bg-primary-100/10 text-primary-100 px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary-100 hover:text-white transition-all">
          Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueCard
          title="Total Earnings"
          value={summary?.total_revenue || 0}
          icon={<FaWallet />}
          trend="+12.5%"
          isPositive
        />
        <RevenueCard
          title="Avg. Ticket Price"
          value={summary?.total_revenue / (summary?.total_rsvps || 1)}
          icon={<FaChartLine />}
          trend="+3.2%"
          isPositive
        />
        <RevenueCard
          title="Refunds"
          value={0}
          icon={<FaArrowDown />}
          trend="0.0%"
          isPositive={false}
        />
      </div>

      <div className="w-full h-[400px] bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue Growth</h2>
        <div className="w-full h-full pb-8">
          <Line data={data} options={options}></Line>
        </div>
      </div>
    </section>
  )
}

const RevenueCard = ({ title, value, icon, trend, isPositive }: any) => (
  <article className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary-100 text-lg">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-gray-400'}`}>
        {isPositive ? <FaArrowUp /> : <FaArrowDown />} {trend}
      </div>
    </div>
    <div>
      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-xs font-bold text-gray-400">GHS</span>
        <p className="text-2xl font-black text-gray-800">{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  </article>
)

export default Revenue
