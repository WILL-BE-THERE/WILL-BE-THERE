import { Link } from 'react-router-dom'
import successfulIcon from '../assets/successful-icon.png'

const RegistrationSuccessful = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#B5B5B5]/80 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md h-[23rem] w-[20rem] flex flex-col items-center justify-center">
        <div className="w-1/2 mb-5">
          <img
            src={successfulIcon}
            alt="Icon for successful"
            className="w-full"
          />
        </div>
        <h1 className="text-xl font-semibold text-center mb-3">
          Your account registration was successful
        </h1>

        <Link
          to="/login"
          className="w-fit py-2 px-6 mt-5 bg-blue-700 text-white rounded-md text-sm"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
export default RegistrationSuccessful
