import { Link } from 'react-router-dom'

const ViewDetailsButton = () => {
  return (
    <Link to="/EventDetails" className="text-[0.95rem]  px-5 py-2 bg-primary-100 text-white rounded-md">
      View Event Details
    </Link>
  )
}
export default ViewDetailsButton
