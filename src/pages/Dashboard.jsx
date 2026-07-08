import { useAuth } from '../auth/AuthContext.jsx'
import { ROLES } from '../auth/roles.js'
import FleetDashboard from './FleetDashboard.jsx'
import SuperAdminDashboard from './SuperAdminDashboard.jsx'

export default function Dashboard() {
  const { user } = useAuth()

  if (user.role === ROLES.FLEET_OWNER) {
    return <FleetDashboard />
  }

  return <SuperAdminDashboard />
}
