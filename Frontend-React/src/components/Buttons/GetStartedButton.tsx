import { Link } from 'react-router-dom'

type GetStartedButtonProps = {
  isLoggedIn: boolean
}

const GetStartedButton = ({ isLoggedIn }: GetStartedButtonProps) => {
  return (
    <Link
      to={`${isLoggedIn ? '/dashboard' : '/accounts'}`}
      className="px-5 py-2 bg-primary-100 text-white text-[0.95rem] rounded-md"
    >
      {!isLoggedIn ? 'Get Started' : 'Go to dashboard'}
    </Link>
  )
}
export default GetStartedButton
