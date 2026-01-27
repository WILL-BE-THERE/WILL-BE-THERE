import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSync,
  faCircleNotch,
  faCog,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import generateApiHeaders from './Headers'
import API_ENDPOINTS from '../config/api'

interface TwoFactorAuthProps {
  email?: string
  verificationCode?: string
  timer?: number
  onVerify?: () => void
  onResend?: () => void
}

function TwoFactorAuthComponent(props: TwoFactorAuthProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // Get email from props or location state
  const email = props.email || location.state?.email || ''
  const initialTimer = props.timer || 60

  const [code, setCode] = React.useState('')
  const [countdown, setCountdown] = React.useState(initialTimer)
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')

  React.useEffect(() => {
    if (!email) {
      console.error('No email provided for verification')
      // Optional: navigate back if no email
    }
  }, [email])

  React.useEffect(() => {
    let intervalId: any
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [countdown])

  const handleVerify = async () => {
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)

    try {
      await axios.post(
        API_ENDPOINTS.AUTH.VERIFY,
        {
          email: email,
          verification_code: code,
        },
        {
          headers: generateApiHeaders(),
        },
      )

      setSuccessMessage('Email verified successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)

    try {
      await axios.post(
        API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
        {
          email: email,
        },
        {
          headers: generateApiHeaders(),
        },
      )
      setSuccessMessage('Verification code resent!')
      setCountdown(initialTimer)
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Failed to resend code')
    } finally {
      setLoading(false)
    }
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
          <p className="text-sm text-gray-500">{email}</p>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            maxLength={4}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-md bg-[#fafafa] px-3 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          {errorMessage && (
            <p className="text-red-600 text-xs mt-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-xs mt-2">{successMessage}</p>
          )}
          <button
            onClick={handleVerify}
            disabled={code.length !== 4 || loading}
            className="disabled:bg-gray-300 mt-4 py-2 px-4 text-sm font-medium text-center text-white rounded bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full flex justify-center items-center"
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Verify'}
          </button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Didn't get the code?{' '}
            {countdown === 0 ? (
              <span
                onClick={handleResend}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Resend
              </span>
            ) : (
              <span className="text-gray-400">Resend in ({countdown}s)</span>
            )}
          </p>
        </div>
      </section>
    </div>
  )
}

export default TwoFactorAuthComponent
