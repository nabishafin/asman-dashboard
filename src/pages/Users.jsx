import { useState } from 'react'
import { userDirectory } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'
import UserDetailModal from '../components/UserDetailModal.jsx'

const PAGE_SIZE = 10

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

// Table layout is now inline


export default function Users() {
  const [detailUser, setDetailUser] = useState(null)
  const [page, setPage] = useState(1)
  const [statuses, setStatuses] = useState(
    Object.fromEntries(userDirectory.map((u) => [u.id, u.status]))
  )

  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = userDirectory.filter((u) => {
    const s = statuses[u.id]
    const matchesTab = activeTab === 'all' || s === activeTab
    const q = searchQuery.toLowerCase()
    const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.licensePlate && u.licensePlate.toLowerCase().includes(q))
    return matchesTab && matchesSearch
  })

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const pageRows = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
      {/* stat tiles */}

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
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {statValues[s.key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* filters & search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-2 pr-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-1 overflow-x-auto p-1">
          {['all', 'active', 'pending', 'suspended'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPage(1); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition ${
                activeTab === tab
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            <Icon name="search" size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search users..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
      </div>

      {/* user table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <tr>
              <th className="px-5 py-4 font-semibold text-zinc-900 dark:text-zinc-300">Fleet No.</th>
              <th className="px-5 py-4 font-semibold text-zinc-900 dark:text-zinc-300">User</th>
              <th className="px-5 py-4 font-semibold text-zinc-900 dark:text-zinc-300">Email</th>
              <th className="px-5 py-4 font-semibold text-zinc-900 dark:text-zinc-300">Phone</th>
              <th className="px-5 py-4 font-semibold text-zinc-900 dark:text-zinc-300">Status</th>
              <th className="px-5 py-4 font-semibold text-zinc-900 dark:text-zinc-300">Joined</th>
              <th className="px-5 py-4 text-right font-semibold text-zinc-900 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {pageRows.map((u) => {
              const status = statuses[u.id];
              return (
                <tr key={u.id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      {u.licensePlate}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.photo}
                        alt={u.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-brand/10"
                      />
                      <p className="font-bold text-zinc-900 dark:text-zinc-50">{u.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-zinc-500">{u.email}</td>
                  <td className="px-5 py-4 text-zinc-500">{u.phone || 'N/A'}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {STATUS_LABELS[status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-zinc-500">{u.joinedDate}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setDetailUser(u)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        title="View"
                      >
                        <Icon name="eye" size={16} />
                      </button>
                      <button
                        onClick={() => setStatuses((prev) => ({ ...prev, [u.id]: prev[u.id] === 'suspended' ? 'active' : 'suspended' }))}
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-500"
                        title={status === 'suspended' ? 'Reactivate' : 'Suspend'}
                      >
                        <Icon name="ban" size={16} />
                      </button>
                      <button
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                        title="Delete"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs text-zinc-400">
          Showing {filteredUsers.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
          {Math.min(page * PAGE_SIZE, filteredUsers.length)} of{' '}
          {filteredUsers.length} entries
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
