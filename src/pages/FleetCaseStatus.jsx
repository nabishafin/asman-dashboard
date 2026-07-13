import { legalCases, driverDirectory } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const STAGE_STYLES = {
  filed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  decision: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
}
const STAGE_LABELS = { filed: 'Filed', pending: 'Pending', decision: 'Decision' }
const STAGE_ACCENT = {
  filed: 'from-emerald-400 to-emerald-500',
  pending: 'from-blue-400 to-blue-500',
  decision: 'from-pink-400 to-pink-500',
}

function CaseStatusCard({ driver, caseRecord }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${STAGE_ACCENT[caseRecord.stage]}`} />

      <div className="flex items-start justify-between gap-2 p-5 pb-3">
        <div className="flex items-center gap-3">
          <img
            src={driver.photo}
            alt={driver.name}
            className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-4 ring-brand/10 transition group-hover:scale-105"
          />
          <div>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">{driver.name}</p>
            <p className="text-xs text-zinc-400">ID: {driver.employeeId}</p>
          </div>
        </div>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STAGE_STYLES[caseRecord.stage]}`}
        >
          {STAGE_LABELS[caseRecord.stage]}
        </span>
      </div>

      <div className="flex flex-col gap-2 border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Icon name="building" size={13} className="flex-shrink-0 text-zinc-400" />
          {caseRecord.court}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Icon name="calendar" size={13} className="flex-shrink-0 text-zinc-400" />
          Hearing: {caseRecord.hearingDate}
        </p>
      </div>
    </div>
  )
}

export default function FleetCaseStatus() {
  // Fleet managers see only their own drivers + whichever cases are linked
  // to them — no attorney names, no firm info, no case management actions.
  // Attorneys are handled entirely offline by the legal team.
  const rows = legalCases
    .map((c) => ({ case: c, driver: driverDirectory.find((d) => d.id === c.driverId) }))
    .filter((r) => r.driver)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ case: c, driver }) => (
          <CaseStatusCard key={c.id} driver={driver} caseRecord={c} />
        ))}

        {rows.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-zinc-400">
            No open cases for your drivers right now.
          </p>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-brand/10 text-brand dark:text-brand-dark">
          <Icon name="info" size={15} />
        </span>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Case status updates automatically when our legal team updates a
          driver&apos;s case — no action needed on your end.
        </p>
      </div>
    </div>
  )
}
