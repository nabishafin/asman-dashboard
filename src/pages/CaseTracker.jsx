import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { legalCases, driverDirectory } from '../data/mockData.js'
import { DW_HC_CASES, DW_JUDGES, dwJudgeColor } from '../data/detentionWatchData.js'
import Icon from '../components/Icon.jsx'
import InitiateCaseModal from '../components/InitiateCaseModal.jsx'

const STATUS_FILTERS = ['All', 'Filed', 'Pending', 'Decision']

const HC_OUTCOME_STYLES = {
  granted: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
  denied: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  appealed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
}

const STAGE_STYLES = {
  filed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  decision: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
}
const STAGE_LABELS = { filed: 'Filed', pending: 'Pending', decision: 'Decision' }

function StatTile({ icon, tone, label, value }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`grid h-9 w-9 place-items-center rounded-lg ${tone}`}>
        <Icon name={icon} size={16} />
      </span>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <p className="mt-0.5 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
    </div>
  )
}

export default function CaseTracker() {
  const navigate = useNavigate()
  const [cases, setCases] = useState(legalCases)
  const [modalOpen, setModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')

  const handleCreated = (newCase) => setCases((prev) => [newCase, ...prev])

  const visibleCases =
    statusFilter === 'All'
      ? cases
      : cases.filter((c) => STAGE_LABELS[c.stage] === statusFilter)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Case Status
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monitoring high-priority immigration and logistical safety protocols.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="plus" size={16} />
          Add New Case
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          icon="clipboard"
          tone="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          label="Active Cases"
          value={cases.length.toLocaleString()}
        />
        <StatTile
          icon="check"
          tone="bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
          label="Completed Cases"
          value="3,892"
        />
        <StatTile
          icon="calendar"
          tone="bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
          label="Upcoming Hearings"
          value="24"
        />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 p-5 pb-4 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
            Active Case Directory
          </h3>
          <div className="flex rounded-lg bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={
                  'rounded-md px-3 py-1.5 font-semibold transition ' +
                  (statusFilter === s
                    ? 'bg-white text-brand shadow-sm dark:bg-zinc-700 dark:text-brand-dark'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Case ID
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Driver
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Attorney <span className="normal-case text-zinc-300">(internal)</span>
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Status
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Court
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Hearing Date
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleCases.map((c) => {
                const driver = driverDirectory.find((d) => d.id === c.driverId)
                return (
                <tr key={c.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => navigate(`/case-tracker/${c.id}`)}
                      className="font-semibold text-brand hover:underline dark:text-brand-dark"
                    >
                      #{c.id}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={driver?.photo}
                        alt={driver?.name}
                        className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                      />
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {driver?.name ?? 'Unknown driver'}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    <span title="Handled offline by legal counsel — internal reference only">
                      {c.attorney.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STAGE_STYLES[c.stage]}`}
                    >
                      {STAGE_LABELS[c.stage]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    {c.court}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    {c.hearingDate}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>

          {visibleCases.length === 0 && (
            <p className="py-10 text-center text-sm text-zinc-400">
              No active cases.
            </p>
          )}
        </div>
      </div>

      {/* federal habeas corpus docket (real, public PACER data) */}
      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 p-5 pb-4 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
            Federal Habeas Corpus Docket
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            Nationwide federal district court HC writs · PACER, ACLU, NIP · A-numbers anonymized per FRAP Rule 25
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr>
                {['Case No.', 'A-Number', 'Respondent', 'Court', 'Judge', 'Filed', 'Outcome', 'Counsel'].map((h) => (
                  <th
                    key={h}
                    className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DW_HC_CASES.map((c) => (
                <tr key={c.cs} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-5 py-3 font-mono text-xs text-brand dark:text-brand-dark">{c.cs}</td>
                  <td className="px-5 py-3 font-mono text-xs text-zinc-400">{c.a}</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">{c.resp}</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">{c.court}</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">{c.judge}</td>
                  <td className="px-5 py-3 font-mono text-xs text-zinc-400">{c.filed}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${HC_OUTCOME_STYLES[c.out]}`}>
                      {c.out.charAt(0).toUpperCase() + c.out.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">{c.atty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* immigration judges reference */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Immigration Judges Reference</h3>
        <p className="mt-1 text-xs text-zinc-400">Grant/denial rates by court · TRAC Immigration (Syracuse)</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DW_JUDGES.map((j) => (
            <div key={j.id} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">{j.name}</p>
                <span className="flex-shrink-0 text-xs font-bold" style={{ color: dwJudgeColor(j.approve) }}>
                  {j.approve}%
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {j.court} · {j.circuit} Circuit
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${j.approve}%`, background: dwJudgeColor(j.approve) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <InitiateCaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  )
}
