import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)

  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const submit = () => navigate('/newpassword')

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.match(emailRegex)) {
      setEmail('')
      submit()
    }
    if (!emailRegex.test(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  return (
    <div className="flex  shadow- justify-center items-center h-screen sm:h-[75vh] lg:h-screen">
      <section className="rounded-lg shadow-md bg-white h-[25rem] w-[min(90%,30rem)] flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-[80%] sm:w-3/4 sm:mx-auto">
          <h1 className="text-2xl font-bold mb-3 text-center sm:text-3xl">
            Forgot Password?
          </h1>
          <p className="text-sm font-medium mb-2 text-center text-neutral-200 w-full px-4 sm:px-0">
            Enter your email to reset your password
          </p>
          <label
            htmlFor="email"
            className="flex flex-col gap-1 w-full mb-8 mt-8"
          >
            <p className="flex gap-1 text-sm font-medium text-neutral-200">
              Email <span className="text-red-600 font-bold">*</span>
            </p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#faf6f6] px-4 py-2 placeholder:text-sm w-full"
              // required
            />
            {emailError && (
              <p className="text-red-600 text-xs">Enter valid email</p>
            )}
          </label>
          <button
            type="submit"
            className="py-2 rounded-md bg-primary-100 text-white font-semibold border-none outline-none w-full text-center mb-5"
          >
            Submit
          </button>
        </form>
        <button
          type="button"
          className="w-full mt-8 text-center text-primary-100"
          onClick={goBack}
        >
          Back
        </button>
      </section>
    </div>
  )
}

export default ForgotPasswordComponent
