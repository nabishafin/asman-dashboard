import { useAuth } from '../auth/AuthContext.jsx'
import { vehiclesByFleet } from '../data/mockData.js'
import { PageHeader, DataTable, StatusPill } from '../components/ui.jsx'

const columns = [
  { key: 'plate', label: 'Plate' },
  { key: 'model', label: 'Model' },
  { key: 'driver', label: 'Driver' },
  { key: 'status', label: 'Status' },
]

export default function Vehicles() {
  const { user } = useAuth()
  const rows = vehiclesByFleet(user.fleetId)

  return (
    <>
      <PageHeader title="Vehicles" subtitle="Vehicles in your fleet" />
      <DataTable
        columns={columns}
        rows={rows}
        renderCell={(row, key) =>
          key === 'status' ? <StatusPill status={row.status} /> : row[key]
        }
      />
    </>
  )
}
