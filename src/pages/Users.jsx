import { useState } from 'react'
import { userDirectory } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'
import UserDetailModal from '../components/UserDetailModal.jsx'

const PAGE_SIZE = 3

const STATUS_STYLES = {
  pending: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
  suspended: 'bg-red-500/15 text-red-600 dark:text-red-400',
  active: 'bg-green-500/15 text-green-600 dark:text-green-400',
}
const STATUS_LABELS = { pending: 'Pending', suspended: 'Suspended', active: 'Active' }

function FilterSelect({ label }) {
  return (
    <div className="flex-1 min-w-[140px]">
      <label className="block text-[11px] font-medium text-zinc-400">{label}</label>
      <button className="mt-1 flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 transition hover:border-brand/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        All {label}s
        <Icon name="chevronDown" size={14} className="text-zinc-400" />
      </button>
    </div>
  )
}

export default function Users() {
  const [detailUser, setDetailUser] = useState(null)
  const [page, setPage] = useState(1)
  const [statuses, setStatuses] = useState(
    Object.fromEntries(userDirectory.map((u) => [u.id, u.status]))
  )

  const pageCount = Math.max(1, Math.ceil(userDirectory.length / PAGE_SIZE))
  const pageRows = userDirectory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSuspend = (user) => {
    setStatuses((prev) => ({ ...prev, [user.id]: 'suspended' }))
    setDetailUser(null)
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          User Management
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage institutional personnel and access control.
        </p>
      </div>

      {/* filters */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-1.5 pb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            <Icon name="filter" size={14} />
            Filters
          </div>
          <FilterSelect label="Role" />
          <FilterSelect label="Status" />
          <FilterSelect label="Plan" />
          <button className="pb-2 text-sm font-semibold text-brand hover:underline dark:text-brand-dark">
            Clear All
          </button>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Name
              </th>
              <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Email
              </th>
              <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Status
              </th>
              <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((u) => {
              const status = statuses[u.id]
              return (
                <tr
                  key={u.id}
                  className="border-t border-zinc-100 dark:border-zinc-800"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.photo}
                        alt={u.name}
                        className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                          {u.name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          Joined {u.joinedDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">
                    {u.email}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {STATUS_LABELS[status]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setDetailUser(u)}
                        title="View"
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-brand dark:hover:bg-zinc-800"
                      >
                        <Icon name="eye" size={15} />
                      </button>
                      <button
                        onClick={() =>
                          setStatuses((prev) => ({
                            ...prev,
                            [u.id]: prev[u.id] === 'suspended' ? 'active' : 'suspended',
                          }))
                        }
                        title="Suspend"
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                      >
                        <Icon name="ban" size={15} />
                      </button>
                      <button
                        title="Delete"
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
          <p className="text-xs text-zinc-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, userDirectory.length)} of{' '}
            {userDirectory.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="grid h-7 w-7 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <Icon name="chevronRight" size={14} className="rotate-180" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={
                  'grid h-7 w-7 place-items-center rounded-lg text-xs font-semibold transition ' +
                  (p === page
                    ? 'bg-brand text-white'
                    : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800')
                }
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="grid h-7 w-7 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <Icon name="chevronRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      <UserDetailModal
        open={!!detailUser}
        user={detailUser}
        onClose={() => setDetailUser(null)}
        onSuspend={handleSuspend}
      />
    </div>
  )
}
