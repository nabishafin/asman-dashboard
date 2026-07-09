import { useState } from 'react'
import { legalCases } from '../data/mockData.js'
import Icon from './Icon.jsx'

const STAGES = ['filed', 'pending', 'decision']
const STAGE_LABELS = { filed: 'Filed', pending: 'Pending', decision: 'Decision' }

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

function StatusStepper({ stage, onChange }) {
  const activeIndex = STAGES.indexOf(stage)
  return (
    <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      {STAGES.map((s, i) => (
        <div key={s} className="flex flex-1 items-center last:flex-none">
          <button
            type="button"
            onClick={() => onChange(s)}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={
                'grid h-6 w-6 place-items-center rounded-full border-2 text-xs ' +
                (i < activeIndex
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : i === activeIndex
                    ? 'border-zinc-900 bg-white text-zinc-900 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-300 bg-white text-zinc-300 dark:border-zinc-600 dark:bg-zinc-900')
              }
            >
              {i < activeIndex && <Icon name="check" size={12} />}
              {i === activeIndex && <span className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />}
            </span>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {STAGE_LABELS[s]}
            </span>
          </button>
          {i < STAGES.length - 1 && (
            <span
              className={
                'mx-2 h-px flex-1 ' +
                (i < activeIndex ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-600')
              }
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function InitiateCaseModal({ open, onClose, onCreated }) {
  const [caseId, setCaseId] = useState('')
  const [driverName, setDriverName] = useState('')
  const [attorneyId, setAttorneyId] = useState('')
  const [court, setCourt] = useState('')
  const [hearingDate, setHearingDate] = useState('')
  const [stage, setStage] = useState('pending')
  const [overview, setOverview] = useState('')

  if (!open) return null

  const attorneyOptions = [...new Map(legalCases.map((c) => [c.attorney.name, c.attorney])).values()]

  const handleSubmit = (e) => {
    e.preventDefault()
    const attorney = attorneyOptions.find((a) => a.name === attorneyId) ?? attorneyOptions[0]
    onCreated({
      id: caseId.trim().replace(/^#?ASM-?/i, '') || `${Date.now()}`.slice(-5),
      stage,
      lifecycleStatus: 'active',
      court: court.trim() || 'Unassigned',
      hearingDate: hearingDate || 'TBD',
      jurisdiction: court.trim() || 'Unassigned',
      overview: overview.trim() || 'No summary provided yet.',
      documents: [],
      driver: {
        name: driverName.trim() || 'Unassigned Driver',
        photo: '/driver-marcus.jpg',
        fleetIdCode: '—',
        vehicle: '—',
      },
      attorney: attorney ?? {
        name: 'Unassigned',
        photo: '/attorney-david.jpg',
        firm: '—',
        barLicenseNumber: '—',
        phone: '—',
      },
    })
    setCaseId('')
    setDriverName('')
    setAttorneyId('')
    setCourt('')
    setHearingDate('')
    setStage('pending')
    setOverview('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-zinc-900"
      >
        <div className="flex items-start justify-between border-b border-zinc-100 p-6 pb-4 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Initiate New Case
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Enroll a new legal or logistical safety case into the ASMAN network.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={fieldLabel}>Case Identification</label>
              <input
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                placeholder="#ASM-82941"
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Driver Assignment</label>
              <div className="relative">
                <input
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="Search driver..."
                  className={fieldInput + ' pr-8'}
                />
                <Icon
                  name="search"
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className={fieldLabel}>Lead Attorney</label>
            <select
              value={attorneyId}
              onChange={(e) => setAttorneyId(e.target.value)}
              className={fieldInput}
            >
              <option value="">Select Attorney</option>
              {attorneyOptions.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name} — {a.firm}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={fieldLabel}>Court / Jurisdiction</label>
              <input
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                placeholder="e.g. Laredo North"
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Hearing Date</label>
              <input
                type="date"
                value={hearingDate}
                onChange={(e) => setHearingDate(e.target.value)}
                className={fieldInput}
              />
            </div>
          </div>

          <div>
            <label className={fieldLabel}>Case Status Tracker</label>
            <div className="mt-1.5">
              <StatusStepper stage={stage} onChange={setStage} />
            </div>
          </div>

          <div>
            <label className={fieldLabel}>Case Overview</label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={3}
              placeholder="Provide a brief summary of the case objectives and constraints..."
              className={fieldInput + ' resize-none'}
            />
          </div>

          <div>
            <label className={fieldLabel}>Attachments</label>
            <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-8 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
              <input type="file" className="hidden" />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand shadow-sm dark:bg-zinc-900 dark:text-brand-dark">
                <Icon name="upload" size={16} />
              </span>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                Upload Supporting Documents
              </p>
              <p className="text-xs text-zinc-400">
                Drag and drop or{' '}
                <span className="font-semibold text-brand dark:text-brand-dark">
                  browse files
                </span>{' '}
                (Max 50MB per file)
              </p>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-zinc-100 p-6 pt-4 dark:border-zinc-800">
          <p className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Icon name="lock" size={12} />
            Encryption active for legal compliance
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
            >
              Initiate Case
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
