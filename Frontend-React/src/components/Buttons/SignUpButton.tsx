import { Link } from 'react-router-dom'

const SignUpButton = () => {
  return (
    <Link
      to="/signup"
      className="px-5 py-1 border-2 border-primary-100 text-neutral-200 text-[0.95rem] rounded-md font-medium"
    >
      Sign up
    </Link>
  )
}
export default SignUpButton
