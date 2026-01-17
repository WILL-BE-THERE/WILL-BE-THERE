import React from 'react'
import { FaWallet } from 'react-icons/fa6'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

const revenueData = [
  {
    name: 'Total Revenue',
    icon: (
      <div className="bg-[#E8EEFF] text-primary-100 w-12 h-12 flex items-center justify-center">
        <FaWallet />
      </div>
    ),
    amount: 'NGN 43,000.00',
  },
  {
    name: 'Monthly Revenue',
    icon: (
      <div className="bg-[#f7efe7] text-[#AD6312] w-12 h-12 flex items-center justify-center">
        <FaWallet />
      </div>
    ),
    amount: 'NGN 200,000.00',
  },
  {
    name: 'Weekly Revenue',
    icon: (
      <div className="bg-[#E7EFF7] text-[#0B3C6C] w-12 h-12 flex items-center justify-center">
        <FaWallet />
      </div>
    ),
    amount: 'NGN 150,000.00',
  },
]

const Revenue = () => {
  const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'Revenue',
        data: ['70', '40', '60', '30', '80', '60', '90', '100'],
        backgroundColor: '#fff',
        borderColor: '#7A9BFE',
        pointBorderColor: '#7A9BFE',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-7">
        {revenueData.map((rev, i) => {
          return (
            <React.Fragment key={i}>
              <article className="flex gap-3 py-6 px-5 bg-white rounded-lg items-center">
                {rev.icon}
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-200 font-medium">
                    {rev.name}
                  </p>
                  <p className="font-semibold text-lg">{rev.amount}</p>
                </div>
              </article>
            </React.Fragment>
          )
        })}
      </div>

      <div className="w-full h-full bg-white rounded-lg px-12 py-14">
        <Line data={data}></Line>
      </div>
    </section>
  )
}
export default Revenue
