import { ChangeEvent, FormEvent, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import { FaSpinner } from 'react-icons/fa'

const NewPasswordComponent = () => {
  const navigate = useNavigate()
  const [seeNewPassword, setSeeNewPassword] = useState(false)
  const [seeConfirmNewPassword, setSeeConfirmNewPassword] = useState(false)
  const [passErrors, setPassErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordReset, setPasswordReset] = useState({
    resetCode: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordReset((prevState) => ({ ...prevState, [name]: value }))
  }

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    if (!passRegex.test(passwordReset.newPassword)) {
      setPassErrors(true)
      return
    }
    setPassErrors(false)

    if (passwordReset.newPassword !== passwordReset.confirmNewPassword) {
      setErrorMessage("Passwords don't match")
      return
    }

    setLoading(true)
    try {
      const email = localStorage.getItem('reset_email')
      if (!email) {
        setErrorMessage('Session expired. Please request a new reset code.')
        return
      }

      await axios.post(API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, {
        email: email,
        code: passwordReset.resetCode,
        new_password: passwordReset.newPassword,
        confirm_password: passwordReset.confirmNewPassword
      })

      localStorage.removeItem('reset_email')
      alert('Password reset successfully! Please login.')
      navigate('/login')
    } catch (error: unknown) {
      setErrorMessage(error.response?.data?.error || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen sm:h-[75vh] lg:h-screen">
      <section className="rounded-lg shadow-md bg-white h-[28rem] w-[min(90%,30rem)] flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-[80%] sm:w-3/4 sm:mx-auto">
          <h1 className="text-2xl font-bold mb-3 text-center sm:text-3xl">
            Setup New Password
          </h1>
          <p className="text-sm font-medium mb-2 text-center text-neutral-200 w-full px-4 sm:px-0">
            Do you know your password?{' '}
            <Link to="/login" className="text-primary-100">
              Sign In
            </Link>
          </p>

          <label
            htmlFor="resetCode"
            className="flex flex-col gap-1 w-full mb-5 mt-8"
          >
            <p className="flex gap-1 text-sm font-medium text-neutral-200">
              Reset Code <span className="text-red-600 font-bold">*</span>
            </p>
            <input
              type="text"
              name="resetCode"
              value={passwordReset.resetCode}
              onChange={handleChange}
              className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#faf6f6] px-4 py-2 placeholder:text-sm w-full"
              required
            />
          </label>

          <label
            htmlFor="newPassword"
            className="flex flex-col gap-1 w-full mb-5"
          >
            <p className="flex gap-1 text-sm font-medium text-neutral-200">
              New Password <span className="text-red-600 font-bold">*</span>
            </p>
            <aside className="relative flex">
              <input
                type={seeNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwordReset.newPassword}
                onChange={handleChange}
                className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#faf6f6] px-4 py-2 placeholder:text-sm w-full"
                // required
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                onClick={() => setSeeNewPassword(!seeNewPassword)}
              >
                {seeNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
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
            htmlFor="confirmNewPassword"
            className="flex flex-col gap-1 w-full mb-8"
          >
            <p className="flex gap-1 text-sm font-medium text-neutral-200">
              Repeat Password <span className="text-red-600 font-bold">*</span>
            </p>
            <aside className="relative flex">
              <input
                type={seeConfirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                value={passwordReset.confirmNewPassword}
                onChange={handleChange}
                className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#faf6f6] px-4 py-2 placeholder:text-sm w-full"
                // required
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none"
                onClick={() => setSeeConfirmNewPassword(!seeConfirmNewPassword)}
              >
                {seeConfirmNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </aside>
            {errorMessage && (
              <p className="text-red-600 text-xs mt-1">{errorMessage}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="py-2 rounded-md bg-primary-100 text-white font-semibold border-none outline-none w-full flex items-center justify-center min-h-[40px]"
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Submit'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default NewPasswordComponent
