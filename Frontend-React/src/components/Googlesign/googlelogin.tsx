import { useEffect, useState } from 'react'
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth'
//import { getCookie, setCookie } from 'pages/CookieUtils'; // Assuming you have set and getCookie methods in your CookieUtils

function Googlelogin() {
  const [value, setValue] = useState('')
  console.log(value)

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setValue(result.user.email + ' ' + result.user.displayName)
        // setCookie('email', result.user.email); // Set cookie here
        console.log(result)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    // setValue(getCookie('email'));
  }, [])

  return (
    <div>
      <button onClick={handleClick}>Sign In with Google</button>
    </div>
  )
}

export default Googlelogin
