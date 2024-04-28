import { useNavigate } from 'react-router-dom'
import { useProjectContext } from '../context/project-context'
// import Dashboard from '../pages/dashboard/Dashboard'
import { PropsWithChildren, useEffect } from 'react'

type ProtectedRoutesProps = PropsWithChildren

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { loggedInUserInfo, isLoggedIn } = useProjectContext()
  const navigate = useNavigate()

  localStorage.setItem('token', loggedInUserInfo.token)
  localStorage.setItem('id', loggedInUserInfo.user.id)
  localStorage.setItem('username', loggedInUserInfo.user.username)
  localStorage.setItem('email', loggedInUserInfo.user.email)
  localStorage.setItem('first_name', loggedInUserInfo.user.first_name)
  localStorage.setItem('last_name', loggedInUserInfo.user.last_name)

  useEffect(() => {
    if (!loggedInUserInfo.token && !isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [loggedInUserInfo.token, isLoggedIn, navigate])

  return children
}
export default ProtectedRoutes
