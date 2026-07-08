import { useAuth } from '../auth/AuthContext.jsx'
import { ROLES } from '../auth/roles.js'
import FleetSubscription from './FleetSubscription.jsx'
import SuperAdminSubscription from './SuperAdminSubscription.jsx'

export default function Subscription() {
  const { user } = useAuth()

  if (user.role === ROLES.SUPER_ADMIN) {
    return <SuperAdminSubscription />
  }

  return <FleetSubscription />
}
