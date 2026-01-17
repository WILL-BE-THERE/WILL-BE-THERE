import { ChangeEvent, FormEvent, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const NewPasswordComponent = () => {
  const [seeNewPassword, setSeeNewPassword] = useState(false)
  const [seeConfirmNewPassword, setSeeConfirmNewPassword] = useState(false)
  const [passErrors, setPassErrors] = useState(false)
  const [passwordReset, setPasswordReset] = useState({
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordReset((prevState) => ({ ...prevState, [name]: value }))
  }

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      passwordReset.newPassword.match(passRegex) &&
      passwordReset.confirmNewPassword.match(passRegex)
    )
      setPasswordReset({
        newPassword: '',
        confirmNewPassword: '',
      })

    if (!passRegex.test(passwordReset.newPassword)) {
      setPassErrors(true)
    } else {
      setPassErrors(false)
    }

    setSeeNewPassword(false)
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
            htmlFor="Confirm Password"
            className="flex flex-col gap-1 w-full mb-5 mt-8"
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
            htmlFor="Confirm Password"
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
            {passwordReset.newPassword !== passwordReset.confirmNewPassword && (
              <p className="text-red-600 text-xs">Password doesn't match</p>
            )}
          </label>

          <button
            type="submit"
            className="py-2 rounded-md bg-primary-100 text-white font-semibold border-none outline-none w-full">
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}

export default NewPasswordComponent
