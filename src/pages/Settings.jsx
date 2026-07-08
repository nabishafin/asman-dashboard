import { useAuth } from '../auth/AuthContext.jsx'
import { ROLES } from '../auth/roles.js'
import FleetSettings from './FleetSettings.jsx'
import SuperAdminSettings from './SuperAdminSettings.jsx'

export default function Settings() {
  const { user } = useAuth()

  if (user.role === ROLES.SUPER_ADMIN) {
    return <SuperAdminSettings />
  }

  return <FleetSettings />
}
