import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { attorneyNetwork } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const PAGE_SIZE = 3

const STATUS_STYLES = {
  available: 'bg-green-500 text-white',
  active: 'bg-brand text-white',
  on_leave: 'bg-red-500 text-white',
}
const STATUS_LABELS = {
  available: 'Available',
  active: 'Active',
  on_leave: 'On Leave',
}

function FilterSelect({ label, icon }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-brand/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      {icon && <Icon name={icon} size={14} className="text-amber-400" />}
      {label}
      <Icon name="chevronDown" size={14} className="text-zinc-400" />
    </button>
  )
}

function AttorneyCard({ a }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="relative">
          <img
            src={a.photo}
            alt={a.name}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <span
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow ${STATUS_STYLES[a.status]}`}
          >
            {STATUS_LABELS[a.status]}
          </span>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1 text-sm font-bold text-zinc-900 dark:text-zinc-50">
            <Icon name="star" size={13} className="text-amber-400" />
            {a.rating}
          </p>
          <p className="text-[11px] text-zinc-400">{a.reviews} reviews</p>
        </div>
      </div>

      <p className="mt-4 font-bold text-zinc-900 dark:text-zinc-50">{a.name}</p>
      <p className="text-xs text-zinc-400">
        {a.role} · {a.location}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {a.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-medium text-brand dark:text-brand-dark"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Active Cases
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {String(a.activeCases).padStart(2, '0')}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Success Rate
          </p>
          <p className="font-bold text-green-600 dark:text-green-400">
            {a.successRate}%
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/attorneys/${a.id}`)}
        className="mt-4 w-full rounded-lg bg-[#0f2a3d] py-2.5 text-sm font-semibold text-white transition hover:brightness-125"
      >
        View Full Profile
      </button>
    </div>
  )
}

export default function Attorneys() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const results = attorneyNetwork.filter((a) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      a.name.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.specialties.some((s) => s.toLowerCase().includes(q))
    )
  })

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-zinc-400">Network</span>
        <Icon name="chevronRight" size={14} className="text-zinc-300" />
        <span className="font-semibold text-brand dark:text-brand-dark">
          Directory
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Attorney Network
        </h1>
        <p className="mt-1 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
          Manage and deploy our verified network of institutional legal
          experts specialized in fleet logistics and safety compliance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            <Icon name="search" size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search by name, firm, or specialty..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>
        <FilterSelect label="Specialty" />
        <FilterSelect label="State" />
        <FilterSelect label="Rating" icon="star" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageResults.map((a) => (
          <AttorneyCard key={a.id} a={a} />
        ))}
        {results.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-zinc-400">
            No attorneys match your search.
          </p>
        )}
      </div>

      {results.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs text-zinc-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, results.length)} of {results.length}
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
      )}
    </div>
  )
}
