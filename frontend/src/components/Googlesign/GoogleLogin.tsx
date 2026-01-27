import { useEffect } from 'react'
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth'
//import { getCookie, setCookie } from 'pages/CookieUtils'; // Assuming you have set and getCookie methods in your CookieUtils

function Googlelogin() {
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((_result) => {
        // TODO: Send user credentials to backend and create/authenticate user
      })
      .catch((_error) => {
        // Error handling - log to monitoring service in production
      })
  }

  useEffect(() => {
    // TODO: Implement Google login integration with backend
  }, [])

  return (
    <div>
      <button onClick={handleClick}>Sign In with Google</button>
    </div>
  )
}

export default Googlelogin
