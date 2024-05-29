import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSync,
  faCircleNotch,
  faCog,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { getCookie } from './CookieUtils'
import generateApiHeaders from './headers'

interface TwoFactorAuth {
  email: string
  verificationCode: string
  timer: number
  onVerify?: () => void
  onResend?: () => void
}

function TwoFactorAuthComponent(props: TwoFactorAuth) {
  const [code, setCode] = React.useState('')
  const [countdown, setCountdown] = React.useState(props.timer)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(countdown - 1)
      if (countdown === 0) {
        setCountdown(0)
        clearInterval(intervalId)
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [countdown])

  const handleVerify = () => {
    if (props.onVerify) {
      props.onVerify()
    }

    axios
      .post('http://will-be-there-x5pq.onrender.com/api/account/verify/', {
        email: props.email,
        verificationCode: code,
      },
      {
        headers: generateApiHeaders(),
      }
      )
      .then((response) => {
        console.log(response.data)
        Promise.resolve(getCookie('Token'))
          .then((cookieData) => {
            console.log(cookieData)
          });
      })
      .catch((error) => {
        console.error(error)
      })

  }

  const handleResend = () => {
    if (props.onResend) {
      props.onResend()
      setCountdown(props.timer) // Reset timer on resend
    }

    axios
      .post(`http://127.0.0.1:8000/api/account/verify/`, {
        email: props.email,
        verificationCode: code,
      },
      {
        headers: generateApiHeaders(),
      })
      .then((response) => {
        console.log(response.data)
        Promise.resolve(getCookie('Token'))
          .then((cookieData) => { console.log(cookieData); });
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="flex justify-center items-center h-screen sm:h-[75vh] lg:h-screen">
      <section className="two-factor-auth rounded-lg shadow-md bg-white w-[min(90%,30rem)] py-12 px-10">
        <div className="w-full max-w-md">
          {/* Limit max width for responsiveness */}
          <div className="hidden">
            <FontAwesomeIcon icon={faSync} spin />{' '}
            {/* Add "spin" prop for animation */}
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <FontAwesomeIcon icon={faCog} spin />
            <FontAwesomeIcon
              icon={faCog}
              spin
              className="fa-spin-reverse justify-center"
            />{' '}
            {/* Reverse spin */}
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="fa-spin-pulse justify-center"
            />{' '}
            {/* Pulse animation */}
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="fa-spin-pulse fa-spin-reverse justify-center"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4 sm:text-3xl">
            Two Factor Authentication
          </h1>
          <p className="font-medium text-neutral-200 mb-2">
            Enter the verification code sent to
          </p>
          <p className="text-sm text-gray-500">{props.email}</p>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-md bg-[#fafafa] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleVerify}
            disabled={code.length !== 4}
            className="disabled:bg-gray-300 mt-4 py-2 px-4 text-sm font-medium text-center text-white rounded bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Verify
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Didn't get the code?{' '}
            {countdown === 0 && (
              <span
                onClick={handleResend}
                className="text-blue-500 cursor-pointer"
              >
                Resend
              </span>
            )}
          </p>
          {countdown !== 0 && (
            <p className="text-blue-500">
              ({countdown}s) {/* Countdown timer */}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default TwoFactorAuthComponent
