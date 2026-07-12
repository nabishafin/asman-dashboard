import { useState } from 'react'
import { userDirectory } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'
import UserDetailModal from '../components/UserDetailModal.jsx'

const PAGE_SIZE = 6

const STATUS_STYLES = {
  pending: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
  suspended: 'bg-red-500/15 text-red-600 dark:text-red-400',
  active: 'bg-green-500/15 text-green-600 dark:text-green-400',
}
const STATUS_LABELS = { pending: 'Pending', suspended: 'Suspended', active: 'Active' }
const STATUS_ACCENT = {
  active: 'from-green-400 to-green-500',
  pending: 'from-amber-400 to-amber-500',
  suspended: 'from-red-400 to-red-500',
}

const STAT_TILES = [
  { key: 'total', label: 'Total Users', icon: 'users', tone: 'bg-brand/10 text-brand dark:text-brand-dark' },
  { key: 'active', label: 'Active', icon: 'check', tone: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
  { key: 'pending', label: 'Pending', icon: 'clock', tone: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  { key: 'suspended', label: 'Suspended', icon: 'ban', tone: 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400' },
]

function UserCard({ user, status, onView, onToggleSuspend }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${STATUS_ACCENT[status]}`} />

      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <img
            src={user.photo}
            alt={user.name}
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-4 ring-brand/10"
          />
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">{user.name}</p>
            <p className="text-xs text-zinc-400">Joined {user.joinedDate}</p>
          </div>
        </div>
        <span
          className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className="flex flex-col gap-2 px-5 pb-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand dark:text-brand-dark">
          <Icon name="badge" size={12} />
          {user.role}
        </span>
        <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Icon name="mail" size={13} className="flex-shrink-0 text-zinc-400" />
          <span className="truncate">{user.email}</span>
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-zinc-100 p-3 dark:border-zinc-800">
        <button
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Icon name="eye" size={14} />
          View
        </button>
        <button
          onClick={onToggleSuspend}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-zinc-600 transition hover:bg-red-50 hover:text-red-500 dark:text-zinc-300 dark:hover:bg-red-500/10"
        >
          <Icon name="ban" size={14} />
          {status === 'suspended' ? 'Reactivate' : 'Suspend'}
        </button>
        <button
          title="Delete"
          className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
        >
          <Icon name="trash" size={14} />
        </button>
      </div>
    </div>
  )
}

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

  const statusCounts = Object.values(statuses).reduce(
    (acc, s) => ({ ...acc, [s]: (acc[s] ?? 0) + 1 }),
    { active: 0, pending: 0, suspended: 0 }
  )
  const statValues = { total: userDirectory.length, ...statusCounts }

  const handleSuspend = (user) => {
    setStatuses((prev) => ({ ...prev, [user.id]: 'suspended' }))
    setDetailUser(null)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-dark p-6 text-white shadow-lg">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, white 0, transparent 35%), radial-gradient(circle at 85% 80%, white 0, transparent 40%)',
          }}
        />
        <div className="relative flex items-center gap-4">
          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Icon name="users" size={24} />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="mt-0.5 text-sm text-white/80">
              Manage institutional personnel and access control.
            </p>
          </div>
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_TILES.map((s) => (
          <div
            key={s.key}
            className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl transition group-hover:scale-110 ${s.tone}`}>
              <Icon name={s.icon} size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {s.label}
              </p>
              <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                {statValues[s.key]}
              </p>
            </div>
          </div>
        ))}
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

      {/* user cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageRows.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            status={statuses[u.id]}
            onView={() => setDetailUser(u)}
            onToggleSuspend={() =>
              setStatuses((prev) => ({
                ...prev,
                [u.id]: prev[u.id] === 'suspended' ? 'active' : 'suspended',
              }))
            }
          />
        ))}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900">
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

      <UserDetailModal
        open={!!detailUser}
        user={detailUser}
        onClose={() => setDetailUser(null)}
        onSuspend={handleSuspend}
      />
    </div>
  )
}
