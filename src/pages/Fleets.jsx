import { fleets } from '../data/mockData.js'
import { PageHeader, DataTable, StatusPill } from '../components/ui.jsx'

const columns = [
  { key: 'name', label: 'Fleet' },
  { key: 'owner', label: 'Owner' },
  { key: 'city', label: 'City' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'status', label: 'Status' },
]

export default function Fleets() {
  return (
    <>
      <PageHeader title="All Fleets" subtitle="Every fleet on the platform" />
      <DataTable
        columns={columns}
        rows={fleets}
        renderCell={(row, key) =>
          key === 'status' ? <StatusPill status={row.status} /> : row[key]
        }
      />
    </>
  )
}
