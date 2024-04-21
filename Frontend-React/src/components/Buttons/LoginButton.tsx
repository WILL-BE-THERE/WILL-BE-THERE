import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link
      to="/login"
      className="px-5 py-2 bg-primary-100 text-white text-[0.95rem] rounded-md"
    >
      LogIn
    </Link>
  )
}
export default LoginButton
