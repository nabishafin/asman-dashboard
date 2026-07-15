import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { attorneyAdmin, legalCases } from '../../../data/mockData.js'
import { DW_ATTORNEYS } from '../../../data/detentionWatchData.js'
import Icon from '../../../components/common/Icon.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { FilterSelect } from '../../../components/ui/FilterSelect.jsx'
import { FilterCard } from '../../../components/ui/FilterCard.jsx'
import OnboardAttorneyModal from '../../../components/OnboardAttorneyModal.jsx'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const isPublic = a.source === 'public'
  
  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  // Dynamically calculate win rate from Case Tracker (legalCases)
  const firstName = a.name.split(' ')[0]
  const casesHandled = legalCases.filter(c => c.attorney.name.includes(firstName) || c.attorney.name === a.name)
  const resolved = casesHandled.filter(c => c.lifecycleStatus === 'completed' || c.lifecycleStatus === 'failed')
  const won = resolved.filter(c => c.lifecycleStatus === 'completed').length

  // If we have resolved cases in the tracker, calculate the real win rate.
  // Otherwise, fallback to 'N/A' or their reported mock rate if we want to show it.
  const calculatedWinRate = resolved.length > 0 ? Math.round((won / resolved.length) * 100) + '%' : 'N/A'

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${isPublic ? 'from-teal-400 to-teal-500' : 'from-brand to-brand-dark'}`}
      />

      <div className="flex items-start justify-between">
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

        {/* 3-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <Icon name="moreVertical" size={18} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 w-32 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
              <button 
                onClick={() => { setMenuOpen(false); alert('Edit clicked (Placeholder)') }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <Icon name="edit" size={14} />
                Edit
              </button>
              <button 
                onClick={() => { setMenuOpen(false); onRemove(a.id) }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <Icon name="trash" size={14} />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Win Rate (Live)
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {calculatedWinRate}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Total Cases
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {a.cases?.toLocaleString() || '0'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {isPublic ? (
            a.specs.split(', ').map(spec => (
              <span key={spec} className="rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {spec}
              </span>
            ))
          ) : (
            a.languages.map(lang => (
              <span key={lang} className="flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {lang}
              </span>
            ))
          )}
        </div>

        {isPublic ? (
          <span className="flex-shrink-0 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            Public
          </span>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/attorneys/${a.id}`)}
            className="flex-shrink-0"
          >
            View Profile
          </Button>
        )}
      </div>
    </div>
  )
}

export default function Attorneys() {
  const [attorneys, setAttorneys] = useState([...attorneyAdmin, ...PUBLIC_RECORD_ATTORNEYS])
  const [modalOpen, setModalOpen] = useState(false)

  const [langFilter, setLangFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleRemove = (id) =>
    setAttorneys((prev) => prev.filter((a) => a.id !== id))

  const handleCreated = (newAttorney) =>
    setAttorneys((prev) => [...prev, newAttorney])

  // Derive unique options
  const allLangs = Array.from(new Set(attorneys.flatMap(a => a.languages || []))).sort()
  const statusOptions = ['Internal Roster', 'Public Record']

  // Filter logic
  const filteredAttorneys = attorneys.filter(a => {
    let match = true
    if (langFilter && (!a.languages || !a.languages.includes(langFilter))) {
      match = false
    }
    if (statusFilter === 'Public Record' && a.source !== 'public') match = false
    if (statusFilter === 'Internal Roster' && a.source === 'public') match = false
    return match
  })

  return (
    <div className="flex flex-col gap-5">
      {/* toolbar: filters & actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* left side: filters */}
        <FilterCard
          hasActiveFilters={!!langFilter || !!statusFilter}
          onClear={() => { setLangFilter(''); setStatusFilter(''); }}
        >
          <FilterSelect
            label="All Languages"
            value={langFilter}
            options={allLangs}
            onChange={setLangFilter}
          />
          <FilterSelect
            label="All Statuses"
            value={statusFilter}
            options={statusOptions}
            onChange={setStatusFilter}
          />
        </FilterCard>

        {/* right side: action */}
        <Button
          variant="primary"
          icon="userPlus"
          onClick={() => setModalOpen(true)}
        >
          Add Attorney
        </Button>
      </div>

      {/* grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAttorneys.map((a) => (
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
