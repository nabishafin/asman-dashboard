import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ROUTE_ACCESS } from '../../../features/auth/utils/roles.js'

// Guards a route: redirects to /login if not authenticated, and to the
// dashboard if the current role is not allowed on this route.
export default function RequireAuth({ children }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const allowed = ROUTE_ACCESS[location.pathname]
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
