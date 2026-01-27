import { Link } from 'react-router-dom'

type ViewDetailsButtonProps = {
  id: string
}

const ViewDetailsButton = ({ id }: ViewDetailsButtonProps) => {
  return (
    <Link
      to={`/events/${id}`}
      className="text-[0.95rem] px-5 py-2 bg-primary-100 text-white rounded-md"
    >
      View Details
    </Link>
  )
}
export default ViewDetailsButton
