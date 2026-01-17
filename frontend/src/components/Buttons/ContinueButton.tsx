import { Link } from 'react-router-dom'

type ContinueButtonProps = {
  linkTo: string
}

const ContinueButton = ({ linkTo }: ContinueButtonProps) => {
  return (
    <Link
      to={linkTo === 'Guest' ? '/events' : '/signup'}
      className="w-[86%] py-2 bg-primary-100 text-white rounded-md text-center font-bold sm:w-[90%]"
    >
      Continue
    </Link>
  )
}
export default ContinueButton
