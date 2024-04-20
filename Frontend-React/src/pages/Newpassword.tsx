import React from 'react'
import { BiCheckboxChecked } from 'react-icons/bi'

interface NewPassword {
  heading: string
  subheading: string
  password: string
  confirmPassword: string
}

const NewPasswordComponent: React.FC = () => {
  const data: NewPassword = {
    heading: 'Setup New Password',
    subheading: 'Enter your new password below and retype it ',
    password: '',
    confirmPassword: '',
  }

  const handleConfirmPasswordChange = (value: string) => {
    data.confirmPassword = value
  }

  return (
    <div className="flex  shadow- justify-center items-center h-screen bg-gray-200">
      <section className="forgot-password p-20 rounded shadow-2xl bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {data.heading}
          </h1>
          <p className="text-base mb-4">{data.subheading}</p>
          <div className="flex justify-center rounded shadow">
            <section>
              <div className="mt-3">
                <input
                  type="password"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  placeholder="Password*"
                  style={{ backgroundColor: '#fffbeb' }}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                {!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  data.confirmPassword,
                ) && (
                  <p>
                    <small className="text-red-500">
                      Password must contain at least one lowercase letter, one
                      uppercase letter, one number, one special character, and
                      be at least 8 characters long
                    </small>
                  </p>
                )}
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  placeholder="Confirm Password*"
                  style={{ backgroundColor: '#fffbeb' }}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                {data.password !== data.confirmPassword && (
                  <p>
                    <small className="text-red-500">
                      Password does not match
                    </small>
                  </p>
                )}
              </div>
              <div className="mt-3">
                <button className="w-full p-2 bg-blue-700 text-white rounded">
                  <a href="">submit</a>
                </button>
              </div>
              <div className="flex">
                <BiCheckboxChecked className="text-blue-500" />
                <p
                  className="text-center mt-3"
                  style={{ color: '#4b5563', fontSize: '14px' }}
                >
                  I agree to the Terms & conditions
                </p>
              </div>
              <div>
                <p className="text-center mt-3">
                  <a href="/login" className="text-blue-500">
                    Back to Login
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewPasswordComponent
