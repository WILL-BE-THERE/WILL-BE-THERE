import { Link } from 'react-router-dom'
import shape1 from '../assets/shape1.png'
import shape2 from '../assets/shape2.png'
import shape3 from '../assets/shape3.png'
import googleIcon from '../assets/google-icon.png'
import appleIcon from '../assets/apple-icon.png'
import fbIcon from '../assets/fb-icon.png'
import { FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa6'
import { ChangeEvent, FormEvent, useState } from 'react'
import RegistrationSuccessful from '../components/RegistrationSuccessful'
import axios from 'axios'
import { useProjectContext } from './../../src/context/project-context'
import { setCookie } from './CookieUtils'
import generateApiHeaders from './headers'

const SignUpPage = () => {
  const { setSignUpUserInfo, signUpUserInfo, initSignup } = useProjectContext()

  const [seePassword, setSeePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
  const [emailExist, setEmailExist] = useState({ exist: false, msg: '' })
  const [errors, setErrors] = useState(false)
  const [passErrors, setPassErrors] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [regSuccessFull, setRegSuccessful] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignUpUserInfo((prevState) => ({ ...prevState, [name]: value }))
  }

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim
  const phoneRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  const passRegex = /[\s\S]*/s

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if (
    //   signUpUserInfo.email.match(emailRegex) &&
    //   signUpUserInfo.first_name &&
    //   signUpUserInfo.last_name &&
    //   signUpUserInfo.phone_number.match(phoneRegex) &&
    //   signUpUserInfo.password.match(passRegex) &&
    //   signUpUserInfo.confirm_password.match(passRegex)
    // ) {
    //   initSignup()
    // }

    if (!emailRegex.test(signUpUserInfo.email)) {
      setErrors(true)
    } else {
      setErrors(false)
    }

    if (!phoneRegex.test(signUpUserInfo.phone_number)) {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }

    if (!passRegex.test(signUpUserInfo.password)) {
      setPassErrors(true)
    } else {
      setPassErrors(false)
    }

    setSeePassword(false)
    setSeeConfirmPassword(false)
    setLoading(true)

    try {
      const response = await axios.post(
        'http://will-be-there-x5pq.onrender.com/api/account/signup/',
        signUpUserInfo,
        {
          headers: generateApiHeaders(),
        },
      )
      console.log(response.data)
      setEmailExist({ exist: false, msg: '' })
      setRegSuccessful(true)
      setLoading(false)
      initSignup()
      // setSignUpUserInfo(response.data)

      setCookie('Token', response.data.token, 7)
      console.log(response)
    } catch (error) {
      console.log(error)
      setEmailExist({ exist: true, msg: error.response.data.email[0] })
      setRegSuccessful(false)
      setLoading(false)
    }
  }

  return (
    <>
      {regSuccessFull && <RegistrationSuccessful />}
      <section className="h-[50rem] w-full bg-white relative flex">
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
            <h1 className="text-3xl mb-2 font-bold">Welcome back!</h1>
            <p className="text-sm mb-8 font-light">
              To stay in the loop please Login with your personal info.
            </p>
            <Link
              to="/login"
              className="text-sm px-5 py-2 font-light border-2 border-white/30 rounded-md hover:bg-primary-200 hover:text-white transition-all"
            >
              Login
            </Link>
          </div>
        </aside>

        <div className="w-full h-full sm:w-1/2">
          <form
            method="POST"
            className="w-[80%] ml-[3rem] mt-20 flex flex-col gap-6 lg:ml-[6.8rem] lg:w-[65%] relative z-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl mb-2 font-bold lg:text-4xl">
              Create your account
            </h1>

            <div className="flex gap-3 w-full">
              <label htmlFor="first_name" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  First Name <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="first_name"
                  value={signUpUserInfo.first_name}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  // required
                />
              </label>

              <label htmlFor="last_name" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Last Name <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="last_name"
                  value={signUpUserInfo.last_name}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  // required
                />
              </label>
            </div>

            <label htmlFor="Email" className="flex flex-col gap-1 w-full">
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Email <span className="text-red-600 font-bold">*</span>
              </p>
              <input
                type="text"
                name="email"
                value={signUpUserInfo.email}
                onChange={handleChange}
                className={`border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] ${
                  errors ? 'focus:outline-red-600' : 'focus:outline-primary-100'
                } rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full`}
                // required
              />
              {errors && (
                <p className="text-red-600 text-xs">Enter valid email</p>
              )}
            </label>

            <label
              htmlFor="Phone_number"
              className="flex flex-col gap-1 w-full"
            >
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Phone Number <span className="text-red-600 font-bold">*</span>
              </p>
              <input
                type="number"
                name="phone_number"
                value={signUpUserInfo.phone_number}
                onChange={handleChange}
                className={`border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] ${
                  errors ? 'focus:outline-red-600' : 'focus:outline-primary-100'
                } rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full`}
                // required
              />
              {phoneError && (
                <p className="text-red-600 text-xs">Enter valid phone number</p>
              )}
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
                  value={signUpUserInfo.password}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                  // required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                  onClick={() => setSeePassword(!seePassword)}
                >
                  {seePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </aside>
              {passErrors && (
                <p className="text-red-600 text-xs">
                  Password must be 8 characters long containing at least 1
                  uppercase, 1 lowercase, 1 special character, and 1 number
                </p>
              )}
            </label>

            <label
              htmlFor="Confirm_password"
              className="flex flex-col gap-1 w-full"
            >
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Confirm Password{' '}
                <span className="text-red-600 font-bold">*</span>
              </p>
              <aside className="relative flex">
                <input
                  type={seeConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  value={signUpUserInfo.confirm_password}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full"
                  // required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                  onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                >
                  {seeConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </aside>
              {signUpUserInfo.password !== signUpUserInfo.confirm_password && (
                <p className="text-red-600 text-xs">Password doesn't match</p>
              )}
            </label>

            {emailExist.exist && (
              <p className="text-xs font-medium text-red-600 my-3">
                {emailExist.msg}
              </p>
            )}

            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="w-28 h-10 rounded-md bg-primary-100 text-white text-sm border-none outline-none hover:scale-110 active:scale-105 transition-all flex items-center justify-center"
              >
                {loading ? <FaSpinner className=" animate-spin" /> : 'Sign Up'}
              </button>
            </div>

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
          </form>
        </div>
      </section>
    </>
  )
}
export default SignUpPage
