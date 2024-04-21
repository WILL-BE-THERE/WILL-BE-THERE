import { Link } from 'react-router-dom'

const GetStartedButton = () => {
  return (
    <Link
      to="/accounts"
      className="px-5 py-2 bg-primary-100 text-white text-[0.95rem] rounded-md"
    >
      Get Started
    </Link>
  )
}
export default GetStartedButton
