import { useState } from 'react'
import { users as initialUsers } from '../data/mockData.js'
import { ROLE_LABELS } from '../auth/roles.js'
import { PageHeader, DataTable } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import AddFleetOwnerModal from '../components/AddFleetOwnerModal.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'fleet', label: 'Fleet' },
]

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage admins and fleet owners"
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <Icon name="userPlus" size={16} />
            Add Fleet Owner
          </button>
        }
      />
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

      <AddFleetOwnerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(newUser) => setUsers((prev) => [...prev, newUser])}
      />
    </>
  )
}
