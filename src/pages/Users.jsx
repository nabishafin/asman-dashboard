import { users } from '../data/mockData.js'
import { ROLE_LABELS } from '../auth/roles.js'
import { PageHeader, DataTable } from '../components/ui.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'fleet', label: 'Fleet' },
]

export default function Users() {
  return (
    <>
      <PageHeader title="Users" subtitle="Manage admins and fleet owners" />
      <DataTable
        columns={columns}
        rows={users}
        renderCell={(row, key) =>
          key === 'role' ? (
            <span
              className={
                'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ' +
                (row.role === 'super_admin'
                  ? 'bg-brand/10 text-brand dark:text-brand-dark'
                  : 'bg-blue-500/15 text-blue-600 dark:text-blue-400')
              }
            >
              {ROLE_LABELS[row.role] || row.role}
            </span>
          ) : (
            row[key]
          )
        }
      />
    </>
  )
}
