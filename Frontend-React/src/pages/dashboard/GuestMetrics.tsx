import { PieChart } from 'react-minimal-pie-chart'

const GuestMetrics = () => {
  return (
    <div className="w-28 bg-white h-28 rounded-full relative flex items-center justify-center">
      <PieChart
        className="absolute w-56 h-56 -z-[1]"
        paddingAngle={2}
        data={[
          { title: 'One', value: 10, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
        ]}
      />
    </div>
  )
}
export default GuestMetrics
