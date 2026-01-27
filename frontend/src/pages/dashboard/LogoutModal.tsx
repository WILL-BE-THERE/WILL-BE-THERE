import { useProjectContext } from './../../context/ProjectContext'
import logoutIcon from '../../assets/Frame 1171275239.png'
import axios from 'axios'
import generateApiHeaders from '../Headers'
import API_ENDPOINTS from '../../config/api'
import { useNavigate } from 'react-router-dom'
import { deleteCookie } from '../CookieUtils'

type LogoutModalProps = {
  setLogOut: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutModal = ({ setLogOut }: LogoutModalProps) => {
  const { setLoggedInUserInfo, setIsLoggedIn } = useProjectContext()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post(
        API_ENDPOINTS.AUTH.LOGOUT,
        {},
        { headers: generateApiHeaders() },
      )
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear cookies
      deleteCookie('Token')
      deleteCookie('id')
      deleteCookie('username')
      deleteCookie('email')
      deleteCookie('first_name')
      deleteCookie('last_name')

      // Clear local storage
      localStorage.clear()

      // Reset context state
      setLoggedInUserInfo({
        token: '',
        user: { id: '', username: '', email: '', first_name: '', last_name: '' }
      })
      setIsLoggedIn(false)
      setLogOut(false)

      // Redirect to login page
      navigate('/login')
    }
  }

  return (
    <section className="fixed z-50 bg-[#d2cdcdaf] h-screen w-screen flex justify-center items-center">
      <div className="h-fit w-96 flex flex-col items-center justify-center bg-white rounded-lg pb-10 pt-4">
        <div>
          <img src={logoutIcon} alt="Logout icon" />
        </div>
        <p className="text-base font-medium mb-6">
          Are you sure you want to logout?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={logout}
            className="bg-red-700 text-white rounded-md px-5 py-2"
          >
            Logout
          </button>
          <button
            type="button"
            onClick={() => setLogOut(false)}
            className="bg-neutral-700 text-white px-5 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  )
}
export default LogoutModal
