import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { attorneyAdmin } from '../data/mockData.js'
import { DW_ATTORNEYS } from '../data/detentionWatchData.js'
import Icon from '../components/Icon.jsx'
import OnboardAttorneyModal from '../components/OnboardAttorneyModal.jsx'

// Real, publicly documented HC attorneys (PACER/AILA/CLINIC) — kept distinct
// from the internal ASMAN roster: no fabricated photo, no fabricated profile
// page, and not editable via "View Profile" (there's no real bio on file).
const PUBLIC_RECORD_ATTORNEYS = DW_ATTORNEYS.map((a) => ({
  id: `dw-${a.id}`,
  name: a.name,
  photo: null,
  firm: a.firm,
  winRate: a.rate,
  cases: a.total,
  languages: [],
  source: 'public',
  pacer: a.pacer,
  specs: a.specs,
}))

function FilterSelect({ label }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-brand/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      {label}
      <Icon name="chevronDown" size={14} className="text-zinc-400" />
    </button>
  )
}

function initials(name) {
  return name
    .replace(/^Hon\.\s*/, '')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function AttorneyCard({ a, onRemove }) {
  const navigate = useNavigate()
  const isPublic = a.source === 'public'
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${isPublic ? 'from-teal-400 to-teal-500' : 'from-brand to-brand-dark'}`}
      />

      <div className="flex items-center gap-3">
        {a.photo ? (
          <img
            src={a.photo}
            alt={a.name}
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-4 ring-brand/10 transition group-hover:scale-105"
          />
        ) : (
          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand ring-4 ring-brand/10 transition group-hover:scale-105 dark:text-brand-dark">
            {initials(a.name)}
          </span>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-bold text-zinc-900 dark:text-zinc-50">{a.name}</p>
            {isPublic && (
              <span
                title="Publicly documented (PACER/AILA/CLINIC) — not an ASMAN-managed profile"
                className="flex-shrink-0 rounded-full bg-teal-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400"
              >
                Public Record
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400">{a.firm}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Win Rate
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {a.winRate}%
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Cases
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {a.cases.toLocaleString()}
          </p>
        </div>
      </div>

      {isPublic ? (
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{a.specs}</p>
      ) : (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Icon name="globe" size={13} className="text-brand dark:text-brand-dark" />
          {a.languages.join(', ')}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        {isPublic ? (
          <span className="flex flex-1 items-center justify-center rounded-lg bg-zinc-100 py-2 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            PACER Ref: {a.pacer}
          </span>
        ) : (
          <button
            onClick={() => navigate(`/attorneys/${a.id}`)}
            className="flex-1 rounded-lg bg-zinc-900 py-2 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
          >
            View Profile
          </button>
        )}
        <button
          onClick={() => onRemove(a.id)}
          className="flex-1 rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default function Attorneys() {
  const [attorneys, setAttorneys] = useState([...attorneyAdmin, ...PUBLIC_RECORD_ATTORNEYS])
  const [modalOpen, setModalOpen] = useState(false)

  const handleRemove = (id) =>
    setAttorneys((prev) => prev.filter((a) => a.id !== id))

  const handleCreated = (newAttorney) =>
    setAttorneys((prev) => [...prev, newAttorney])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-zinc-400">Admin</span>
        <Icon name="chevronRight" size={14} className="text-zinc-300" />
        <span className="font-semibold text-brand dark:text-brand-dark">
          Attorney Network
        </span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="userPlus" size={16} />
          Onboard Attorney
        </button>
      </div>

      {/* filters */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            <Icon name="filter" size={14} />
            Filters
          </span>
          <FilterSelect label="All Circuits" />
          <FilterSelect label="All Languages" />
          <FilterSelect label="All Statuses" />
          <FilterSelect label="Any" />
          <button className="ml-auto text-sm font-semibold text-brand hover:underline dark:text-brand-dark">
            Clear All
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {attorneys.map((a) => (
          <AttorneyCard key={a.id} a={a} onRemove={handleRemove} />
        ))}

        <button
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 py-10 text-center transition hover:border-brand/40 dark:border-zinc-700"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
            <Icon name="plus" size={18} />
          </span>
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Add New Practitioner
          </span>
          <span className="text-xs text-zinc-400">
            Manual enrollment or batch invite
          </span>
        </button>
      </div>

      <OnboardAttorneyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  )
}
