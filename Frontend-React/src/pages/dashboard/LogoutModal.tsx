import { useProjectContext } from './../../context/project-context'
import logoutIcon from '../../assets/Frame 1171275239.png'

type LogoutModalProps = {
  setLogOut: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutModal = ({ setLogOut }: LogoutModalProps) => {
  const { loggedInUserInfo, setIsLoggedIn } = useProjectContext()

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
            onClick={() => {
              localStorage.clear()
              loggedInUserInfo.token = ''
              setIsLoggedIn(false)
              setLogOut(false)
            }}
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
