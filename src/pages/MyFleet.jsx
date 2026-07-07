import { useAuth } from '../auth/AuthContext.jsx'
import { fleetById, vehiclesByFleet, driversByFleet } from '../data/mockData.js'
import { PageHeader, StatCard } from '../components/ui.jsx'

export default function MyFleet() {
  const { user } = useAuth()
  const fleet = fleetById(user.fleetId)
  const myVehicles = vehiclesByFleet(user.fleetId)
  const myDrivers = driversByFleet(user.fleetId)

  if (!fleet) {
    return <PageHeader title="My Fleet" subtitle="No fleet assigned" />
  }

  const rows = [
    ['Owner', fleet.owner],
    ['Fleet ID', fleet.id],
    ['Base city', fleet.city],
  ]

  return (
    <>
      <PageHeader title={fleet.name} subtitle={`${fleet.city} • ${fleet.status}`} />
      <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Vehicles" value={myVehicles.length} />
        <StatCard label="Drivers" value={myDrivers.length} />
        <StatCard label="City" value={fleet.city} />
        <StatCard label="Status" value={fleet.status} />
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Fleet details
        </h2>
        <ul className="flex flex-col gap-3">
          {rows.map(([label, value]) => (
            <li
              key={label}
              className="flex justify-between border-b border-zinc-200 pb-2.5 last:border-b-0 dark:border-zinc-800"
            >
              <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
              <strong className="text-zinc-900 dark:text-zinc-50">{value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
