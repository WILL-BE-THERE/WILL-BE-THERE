import { Link } from 'react-router-dom'

const ViewDetailsButton = () => {
  return (
    <Link to="/EventDetails" className="text-[0.95rem] text-neutral-200">
      View Event Details
    </Link>
  )
}
export default ViewDetailsButton
