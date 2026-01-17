import { Link } from 'react-router-dom'
import googleIcon from '../../assets/google-icon.png'
import appleIcon from '../../assets/apple-icon.png'
import fbIcon from '../../assets/fb-icon.png'

const SocialLoginButtons = () => {
  return (
    <>
      <p className="text-center">or signup via</p>

      <div className="flex w-full items-center justify-center gap-6">
        <Link to="/googleloginpage">
          <img src={googleIcon} alt="google icon" className="w-6" />
        </Link>
        <a href="#">
          <img src={appleIcon} alt="apple icon" className="w-6" />
        </a>
        <a href="#">
          <img src={fbIcon} alt="facebook icon" className="w-6" />
        </a>
      </div>
    </>
  )
}

export default SocialLoginButtons
