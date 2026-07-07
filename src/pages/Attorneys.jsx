import { PageHeader, DataTable, StatusPill } from '../components/ui.jsx'

// Mock roster of on-call attorneys for detention / incident response.
const attorneys = [
  { id: 'a1', name: 'Sabrina Haque', firm: 'Haque & Associates', region: 'Dhaka', cases: 12, status: 'available' },
  { id: 'a2', name: 'Tanvir Ahmed', firm: 'Meridian Legal', region: 'Chittagong', cases: 7, status: 'on_trip' },
  { id: 'a3', name: 'Farah Karim', firm: 'Karim Law', region: 'Sylhet', cases: 3, status: 'off_duty' },
]

const columns = [
  { key: 'name', label: 'Attorney' },
  { key: 'firm', label: 'Firm' },
  { key: 'region', label: 'Region' },
  { key: 'cases', label: 'Open Cases' },
  { key: 'status', label: 'Status' },
]

export default function Attorneys() {
  return (
    <>
      <PageHeader
        title="Attorneys"
        subtitle="On-call legal response for detention and incidents"
      />
      <DataTable
        columns={columns}
        rows={attorneys}
        renderCell={(row, key) =>
          key === 'status' ? <StatusPill status={row.status} /> : row[key]
        }
      />
    </>
  )
}
