// Small presentational helpers shared across pages (Tailwind-styled).

export function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  )
}

export function StatCard({ label, value, hint }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-800/40">
      <span className="text-[13px] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <span className="text-3xl font-semibold capitalize text-zinc-900 dark:text-zinc-50">
        {value}
      </span>
      {hint && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span>
      )}
    </div>
  )
}

const PILL_STYLES = {
  active: 'bg-green-500/15 text-green-600 dark:text-green-400',
  available: 'bg-green-500/15 text-green-600 dark:text-green-400',
  on_trip: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  idle: 'bg-slate-400/20 text-slate-600 dark:text-slate-300',
  off_duty: 'bg-slate-400/20 text-slate-600 dark:text-slate-300',
  inactive: 'bg-slate-400/20 text-slate-600 dark:text-slate-300',
  maintenance: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
}

export function StatusPill({ status }) {
  const label = String(status).replaceAll('_', ' ')
  const cls = PILL_STYLES[status] || PILL_STYLES.idle
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${cls}`}
    >
      {label}
    </span>
  )
}

export function DataTable({ columns, rows, renderCell }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/40">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="border-b border-zinc-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-7 text-center text-zinc-500 dark:text-zinc-400"
              >
                No records found
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-brand/5 last:[&>td]:border-b-0"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="whitespace-nowrap border-b border-zinc-200 px-4 py-3.5 text-zinc-800 dark:border-zinc-800 dark:text-zinc-100"
                  >
                    {renderCell ? renderCell(row, c.key) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
