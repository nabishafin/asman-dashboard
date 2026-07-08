import Icon from '../components/Icon.jsx'

const STATS = [
  {
    key: 'revenue',
    label: 'Gross Revenue',
    value: '$28.4M',
    badge: '+12.4%',
    hint: 'Total Invoiced',
  },
  { key: 'cases', label: 'Cases Opened (Active)', value: '1,248' },
  { key: 'growth', label: 'User Growth', value: '124.5k' },
]

const MONTHS = ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV', 'DEC']

const OPERATIONAL_TRENDS = [
  { key: 'sos', label: 'SOS Inc', pct: 62 },
  { key: 'resol', label: 'Resol', pct: 84 },
  { key: 'velocity', label: 'Velocity', pct: 46 },
]

const REVENUE_SEGMENTS = [
  { key: 'enterprise', label: 'Enterprise', pct: 60, color: '#18181b', dot: 'bg-zinc-900 dark:bg-zinc-100' },
  { key: 'pro', label: 'Pro Plan', pct: 30, color: '#0e7490', dot: 'bg-cyan-700 dark:bg-cyan-500' },
  { key: 'basic', label: 'Basic', pct: 10, color: '#38bdf8', dot: 'bg-sky-400' },
]

function InstitutionalScaleChart() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Institutional Scale</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Attorney Network Growth &amp; Detention Center Activity (12-Month Period)
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand" /> Attorneys
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" /> Center Activity
          </span>
        </div>
      </div>

      <div className="relative mt-6 h-56">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="scaleFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00668a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00668a" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M 2 34 C 15 28, 25 22, 38 16 C 46 13, 54 18, 62 16 C 74 12, 85 6, 98 3 L 98 40 L 2 40 Z"
            fill="url(#scaleFill)"
          />
          <path
            d="M 2 34 C 15 28, 25 22, 38 16 C 46 13, 54 18, 62 16 C 74 12, 85 6, 98 3"
            fill="none"
            stroke="#00668a"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 2 37 C 15 33, 25 29, 38 25 C 46 23, 54 22, 62 20 C 74 15, 85 11, 98 8"
            fill="none"
            stroke="#18181b"
            strokeWidth="1"
            strokeDasharray="2.5 2"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="62" cy="16" r="1.3" fill="#00668a" />
        </svg>
      </div>

      <div className="mt-2 flex justify-between text-[11px] font-medium text-zinc-400">
        {MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  )
}

function OperationalTrends() {
  const max = Math.max(...OPERATIONAL_TRENDS.map((t) => t.pct))
  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Operational Trends</h3>

      <div className="mt-6 flex h-32 items-end justify-around gap-6 px-2">
        {OPERATIONAL_TRENDS.map((t) => (
          <div key={t.key} className="flex h-full flex-1 flex-col items-center justify-end">
            <div
              className="w-full max-w-10 rounded-t-lg bg-brand/15"
              style={{ height: `${(t.pct / max) * 100}%` }}
            >
              <div className="h-1.5 w-full rounded-t-lg bg-brand" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around px-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
        {OPERATIONAL_TRENDS.map((t) => (
          <span key={t.key} className="flex-1 text-center">
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
        <span className="text-sm text-zinc-600 dark:text-zinc-300">
          Avg. Resolution Velocity
        </span>
        <span className="text-lg font-bold text-brand dark:text-brand-dark">4.2 min</span>
      </div>
    </div>
  )
}

function RevenueDonut() {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const gap = 5
  let cumulative = 0

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Revenue</h3>

      <div className="mt-4 flex flex-1 items-center gap-6">
        <div className="relative h-32 w-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            {REVENUE_SEGMENTS.map((seg) => {
              const length = (seg.pct / 100) * circumference - gap
              const offset = (cumulative / 100) * circumference
              cumulative += seg.pct
              return (
                <circle
                  key={seg.key}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                Total
              </p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">$2.4M</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {REVENUE_SEGMENTS.map((seg) => (
            <div key={seg.key} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 font-medium text-zinc-600 dark:text-zinc-300">
                <span className={`h-2.5 w-2.5 rounded-full ${seg.dot}`} />
                {seg.label}
              </span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Executive Analytics Center
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Institutional performance and operational scaling metrics.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <Icon name="info" size={14} className="flex-shrink-0 text-zinc-400" />
          Revenue realized after 6-mo milestone
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.key}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              {s.label}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{s.value}</p>
              {s.badge && (
                <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
                  {s.badge}
                </span>
              )}
            </div>
            {s.hint && (
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                {s.hint}
              </p>
            )}
          </div>
        ))}
      </div>

      <InstitutionalScaleChart />

      <div className="grid gap-5 sm:grid-cols-2">
        <OperationalTrends />
        <RevenueDonut />
      </div>
    </div>
  )
}
