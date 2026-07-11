import { legalCases, driverDirectory } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const STAGE_STYLES = {
  filed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  decision: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
}
const STAGE_LABELS = { filed: 'Filed', pending: 'Pending', decision: 'Decision' }

export default function FleetCaseStatus() {
  // Fleet managers see only their own drivers + whichever cases are linked
  // to them — no attorney names, no firm info, no case management actions.
  // Attorneys are handled entirely offline by the legal team.
  const rows = legalCases
    .map((c) => ({ case: c, driver: driverDirectory.find((d) => d.id === c.driverId) }))
    .filter((r) => r.driver)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Case Status
        </h1>
        <p className="mt-1 max-w-lg text-sm text-zinc-500 dark:text-zinc-400">
          Live status for your drivers&apos; open legal cases. Legal counsel is
          managed directly by our compliance team — reach out to support for
          case details or updates.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 p-5 pb-4 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
            Driver Case Status
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Driver
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
              {rows.map(({ case: c, driver }) => (
                <tr key={c.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={driver.photo}
                        alt={driver.name}
                        className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                          {driver.name}
                        </p>
                        <p className="text-xs text-zinc-400">ID: {driver.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STAGE_STYLES[c.stage]}`}
                    >
                      {STAGE_LABELS[c.stage]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">{c.court}</td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    {c.hearingDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <p className="py-10 text-center text-sm text-zinc-400">
              No open cases for your drivers right now.
            </p>
          )}
        </div>
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
