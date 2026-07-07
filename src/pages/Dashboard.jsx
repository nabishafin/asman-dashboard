import { useAuth } from '../auth/AuthContext.jsx'
import { ROLES } from '../auth/roles.js'
import { fleets, users, vehicles, drivers } from '../data/mockData.js'
import { PageHeader, StatCard } from '../components/ui.jsx'
import FleetDashboard from './FleetDashboard.jsx'

export default function Dashboard() {
  const { user } = useAuth()

  // Fleet owner sees the rich "Fleet Intelligence" dashboard.
  if (user.role === ROLES.FLEET_OWNER) {
    return <FleetDashboard />
  }

  // Super admin: platform-wide overview.
  return (
    <>
      <PageHeader
        title={`Welcome, ${user.name}`}
        subtitle="Platform overview across all fleets"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Fleets" value={fleets.length} />
        <StatCard label="Total Vehicles" value={vehicles.length} />
        <StatCard label="Total Drivers" value={drivers.length} />
        <StatCard label="Total Users" value={users.length} />
      </div>
    </>
  )
}
