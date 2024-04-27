import { useNavigate } from 'react-router-dom'
import { useProjectContext } from '../context/project-context'
// import Dashboard from '../pages/dashboard/Dashboard'
import { PropsWithChildren, useEffect } from 'react'

type ProtectedRoutesProps = PropsWithChildren

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isLoggedIn } = useProjectContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, navigate])

  return children
}
export default ProtectedRoutes
