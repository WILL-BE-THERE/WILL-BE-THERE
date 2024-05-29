import { Link, useNavigate } from 'react-router-dom'
import shape1 from '../assets/shape1.png'
import shape2 from '../assets/shape2.png'
import shape3 from '../assets/shape3.png'
import googleIcon from '../assets/google-icon.png'
import appleIcon from '../assets/apple-icon.png'
import fbIcon from '../assets/fb-icon.png'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import { useProjectContext } from './../../src/context/project-context'
import { FaSpinner } from 'react-icons/fa'
import LoginSuccessful from '../../src/components/LoginSuccessful'
import generateApiHeaders from './headers'
import { getCookie } from './CookieUtils'

const LoginPage = () => {
  const {
    setIsLoggedIn,
    setLoginUserInfo,
    setLoggedInUserInfo,
    loginUserInfo,
  } = useProjectContext()

  const [seePassword, setSeePassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wrongInfoLogin, setWrongInfoLogin] = useState(false)

  const navigate = useNavigate()
  const login = () => navigate('/host')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginUserInfo((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(
        'http://will-be-there-x5pq.onrender.com/api/account/login/',
        loginUserInfo,
        {
          headers: generateApiHeaders(),
        },
      )
      setLoggedInUserInfo(response.data)
      setIsLoggedIn(true)
      setWrongInfoLogin(false)
      setLoginSuccess(true)
      setTimeout(() => {
        login()
      }, 3000)
      setLoading(false)

      getCookie('Token')
    } catch (error) {
      console.log(error)
      setWrongInfoLogin(true)
      setLoading(false)
    }
    setLoginUserInfo((prevInfo) => ({ ...prevInfo, password: '' }))
    setSeePassword(false)
    setTimeout(() => {
      setLoginSuccess(false)
    }, 3000)
  }

  return (
    <>
      {loginSuccess && <LoginSuccessful />}
      <section className="h-[40rem] w-full bg-white relative flex lg:h-screen">
        <img
          src={shape1}
          alt="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-36 hidden sm:block"
        />
        <img
          src={shape2}
          alt="icon"
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-44 hidden sm:block"
        />
        <img
          src={shape3}
          alt="icon"
          className="absolute left-[22%] top-1/2 -translate-y-1/2 -translate-x-[22%] w-52 hidden sm:block"
        />
        <aside className="bg-primary-100/[50%] w-1/2 h-full relative z-[2] backdrop-filter backdrop-blur-[15px] place-items-center hidden sm:grid">
          <div className="w-[55%] h-fit text-white text-center lg:w-[35%]">
            <h1 className="text-3xl mb-2 font-bold">Stay in the loop</h1>
            <p className="text-sm mb-8 font-light">
              Create an account to keep upto date with local and global events
            </p>
            <Link
              to="/signup"
              className="text-sm px-5 py-2 font-light border-2 border-white/30 rounded-md hover:bg-primary-200 hover:text-white transition-all"
            >
              Create your account
            </Link>
          </div>
        </aside>

        <div className="w-full h-full sm:w-1/2">
          <form
            className="w-[80%] ml-[3rem] mt-20 flex flex-col gap-6 lg:ml-[6.8rem] lg:w-[65%] relative z-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl mb-2 font-bold lg:text-4xl">Login</h1>

            {wrongInfoLogin && (
              <p className="text-xs text-red-600 font-medium my-3">
                Email or password incorrect
              </p>
            )}

            <label htmlFor="Email" className="flex flex-col gap-1 w-full">
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Email <span className="text-red-600 font-bold">*</span>
              </p>
              <input
                type="email"
                name="email"
                value={loginUserInfo.email}
                onChange={handleChange}
                className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                required
              />
            </label>

            <label
              htmlFor="Enter Password"
              className="flex flex-col gap-1 w-full"
            >
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Enter Password <span className="text-red-600 font-bold">*</span>
              </p>
              <aside className="relative flex">
                <input
                  type={seePassword ? 'text' : 'password'}
                  name="password"
                  value={loginUserInfo.password}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                  required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                  onClick={() => setSeePassword(!seePassword)}
                >
                  {seePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </aside>
            </label>

            <Link
              to="/forgotpassword"
              className="text-primary-100 text-[0.812rem] font-medium"
            >
              Forgot password?
            </Link>

            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="w-24 h-10 rounded-md bg-primary-100 text-white text-sm hover:scale-110 active:scale-105 transition-all border-none outline-none flex items-center justify-center"
              >
                {loading ? <FaSpinner className="animate-spin" /> : 'Login'}
              </button>
            </div>

            <p className="text-center">or signup via</p>

            <div className="flex w-full items-center justify-center gap-6">
              <Link to="/googlelogin">
                <img src={googleIcon} alt="google icon" className="w-6" />
              </Link>
              <a href="#">
                <img src={appleIcon} alt="apple icon" className="w-6" />
              </a>
              <a href="#">
                <img src={fbIcon} alt="facebook icon" className="w-6" />
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default LoginPage
