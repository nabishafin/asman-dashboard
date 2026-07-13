import { DW_ATTORNEYS } from '../../data/detentionWatchData.js'

export default function NationalAttorneys() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">Top HC Attorneys</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Ranked by Habeas Corpus win rate · PACER, AILA, CLINIC, NIP
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DW_ATTORNEYS.map((a, i) => (
          <div
            key={a.id}
            className={`group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 ${
              i < 3 ? 'border-t-2 border-t-brand dark:border-t-brand-dark' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-xl font-bold text-zinc-300 dark:text-zinc-700">
                #{i + 1}
              </div>
              <div className="flex-1 text-right">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {a.rate}%
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Win Rate
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{a.name}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{a.firm}</p>
            </div>

            <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-brand dark:text-brand-dark">{a.circuit} Circuit</span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                style={{ width: `${a.rate}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <span>Won: <span className="text-emerald-600 dark:text-emerald-400">{a.wins}</span></span>
              <span>Total: {a.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
