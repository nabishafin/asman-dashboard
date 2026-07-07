import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import NotificationsPanel from '../components/NotificationsPanel.jsx'
import NewDispatchModal from '../components/NewDispatchModal.jsx'

/* ---------------- mock dashboard data ---------------- */
const STATS = [
  { key: 'drivers', label: 'Active Drivers', value: '1,248', icon: 'users', accent: 'blue', badge: '+12%' },
  { key: 'trips', label: 'Active Trips', value: '432', icon: 'send', accent: 'cyan', badge: 'Steady' },
  { key: 'detention', label: 'Detention Alerts', value: '18', icon: 'clock', accent: 'red', badge: 'Critical' },
  { key: 'cases', label: 'Active Cases', value: '64', icon: 'folder', accent: 'green', badge: '-5%' },
  { key: 'risks', label: 'Nearby Risks', value: '3', icon: 'warning', accent: 'gray', badge: null },
]

const ACCENTS = {
  blue: {
    border: 'border-blue-400/60 dark:border-blue-500/40',
    icon: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    badge: 'bg-green-500/15 text-green-600 dark:text-green-400',
    value: 'text-zinc-900 dark:text-zinc-50',
  },
  cyan: {
    border: 'border-cyan-300/70 dark:border-cyan-400/40',
    icon: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400',
    badge: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400',
    value: 'text-zinc-900 dark:text-zinc-50',
  },
  red: {
    border: 'border-red-300 dark:border-red-500/40',
    icon: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    badge: 'bg-red-500/15 text-red-600 dark:text-red-400',
    value: 'text-red-600 dark:text-red-400',
  },
  green: {
    border: 'border-green-300/70 dark:border-green-500/40',
    icon: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    badge: 'bg-green-500/15 text-green-600 dark:text-green-400',
    value: 'text-zinc-900 dark:text-zinc-50',
  },
  gray: {
    border: 'border-zinc-200 dark:border-zinc-700',
    icon: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
    badge: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400',
    value: 'text-zinc-900 dark:text-zinc-50',
  },
}

const CHART = [
  { day: 'Mon', safe: 42, idle: 10 },
  { day: 'Tue', safe: 55, idle: 14 },
  { day: 'Wed', safe: 38, idle: 8 },
  { day: 'Thu', safe: 72, idle: 18 },
  { day: 'Fri', safe: 60, idle: 12 },
  { day: 'Sat', safe: 48, idle: 20 },
  { day: 'Sun', safe: 35, idle: 9 },
]

const FEED = [
  { id: 1, icon: 'warning', tone: 'red', title: 'Overspeeding Alert', unit: 'Unit #802', tags: [{ t: 'REVIEW', k: 'muted' }, { t: 'HIGH', k: 'red' }], time: '10M AGO' },
  { id: 2, icon: 'pin', tone: 'blue', title: 'Geofence Departure', unit: 'Unit #119 — Port', tags: [{ t: 'AUTO-LOG', k: 'muted' }], time: '55M AGO' },
  { id: 3, icon: 'check', tone: 'green', title: 'Pre-trip Verified', unit: 'Unit #992', tags: [], time: '1H AGO' },
  { id: 4, icon: 'bell', tone: 'blue', title: 'Policy Updated', unit: 'Winter safety protocols now active.', tags: [], time: '2H AGO' },
]

const toneRing = {
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  blue: 'bg-brand/10 text-brand dark:text-brand-dark',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
}

/* ---------------- small pieces ---------------- */
function StatTile({ stat }) {
  const a = ACCENTS[stat.accent]
  return (
    <div
      className={`flex h-full flex-col rounded-xl border-2 bg-white p-4 shadow-sm dark:bg-zinc-900 ${a.border}`}
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${a.icon}`}>
          <Icon name={stat.icon} size={16} />
        </span>
        {stat.badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${a.badge}`}
          >
            {stat.badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
      <p className={`mt-1 text-2xl font-bold ${a.value}`}>{stat.value}</p>
    </div>
  )
}

function DriverActivity() {
  const [range, setRange] = useState('Week')
  const max = Math.max(...CHART.map((d) => d.safe + d.idle))
  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
            Driver Activity
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Aggregated performance across all territories
          </p>
        </div>
        <div className="flex rounded-full bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
          {['Week', 'Month', 'Year'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                'rounded-full px-3 py-1 font-semibold transition ' +
                (range === r
                  ? 'bg-white text-brand shadow-sm dark:bg-zinc-700 dark:text-brand-dark'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300')
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex min-h-52 flex-1 items-end gap-4 border-b border-zinc-100 pb-0 dark:border-zinc-800">
        {CHART.map((d) => {
          const total = d.safe + d.idle
          const heavy = total / max > 0.7
          return (
            <div key={d.day} className="flex h-full flex-1 flex-col justify-end">
              <div
                className={
                  'w-full rounded-t-lg ' +
                  (heavy ? 'bg-brand/40' : 'bg-brand/12')
                }
                style={{ height: `${(total / max) * 100}%` }}
                title={`${d.day}: ${total}`}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-4">
        {CHART.map((d) => (
          <span
            key={d.day}
            className="flex-1 text-center text-[11px] text-zinc-400"
          >
            {d.day}
          </span>
        ))}
      </div>
    </div>
  )
}

function SafetyFeed() {
  const tag = {
    muted: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
    red: 'bg-red-500/15 text-red-600 dark:text-red-400',
  }
  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Safety Feed</h3>
      <div className="mt-4 flex flex-col">
        {FEED.map((f, i) => (
          <div
            key={f.id}
            className={
              'flex gap-3 py-3 ' +
              (i < FEED.length - 1
                ? 'border-b border-zinc-100 dark:border-zinc-800'
                : '')
            }
          >
            <span
              className={`mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full ${toneRing[f.tone]}`}
            >
              <Icon name={f.icon} size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {f.title}
                </p>
                <span className="flex-shrink-0 text-[10px] text-zinc-400">
                  {f.time}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{f.unit}</p>
              {f.tags.length > 0 && (
                <div className="mt-1.5 flex gap-1.5">
                  {f.tags.map((t) => (
                    <span
                      key={t.t}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${tag[t.k]}`}
                    >
                      {t.t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RouteIntelligence() {
  const [tab, setTab] = useState('Active Routes')
  const navigate = useNavigate()
  return (
    <div className="relative h-96 overflow-hidden rounded-xl border border-zinc-200 bg-[#e9ebee] dark:border-zinc-800">
      {/* polar / radar grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at 50% 58%, transparent 0 44px, #d3d7dc 45px, transparent 46px), ' +
            'repeating-conic-gradient(from 0deg at 50% 58%, transparent 0deg 14.5deg, #d3d7dc 14.5deg 15deg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#e9ebee] via-transparent to-[#e9ebee]/60" />

      {/* header */}
      <div className="relative flex items-start justify-between p-5">
        <div>
          <h3 className="font-semibold text-zinc-900">Route Intelligence</h3>
          <p className="text-xs text-zinc-500">
            Live tracking of high-risk corridors
          </p>
        </div>
        <div className="flex rounded-lg bg-white/80 p-1 text-xs shadow-sm backdrop-blur">
          {['Active Routes', 'Traffic Heatmap'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                'rounded-md px-3 py-1.5 font-semibold transition ' +
                (tab === t
                  ? 'bg-[#0f2a3d] text-white'
                  : 'text-zinc-500 hover:text-zinc-800')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* route line */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 6 78 C 28 65, 38 45, 58 46 S 84 56, 94 32"
          fill="none"
          stroke="#4a9cc4"
          strokeWidth="2"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* nodes */}
      <span className="absolute left-[6%] top-[78%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/25" />
      <span className="absolute left-[94%] top-[32%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-4 ring-red-500/25" />

      <div className="absolute left-[24%] top-[38%] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md">
        <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
          <Icon name="pin" size={14} />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-bold tracking-wide text-green-600">
            HUB DELTA
          </p>
          <p className="text-[11px] font-medium text-zinc-700">Normal Op</p>
        </div>
      </div>

      <div className="absolute left-[52%] top-[52%] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md">
        <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[#0f2a3d] text-white">
          <Icon name="truck" size={14} />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-bold tracking-wide text-[#0f2a3d]">
            VESSEL #TX-9
          </p>
          <p className="text-[11px] font-medium text-zinc-700">Heading North</p>
        </div>
      </div>

      <button
        onClick={() => navigate('/facility/dc-4')}
        className="absolute left-[76%] top-[24%] flex -translate-x-1/2 flex-col items-center gap-1.5 transition hover:scale-105"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-600 text-white shadow-md">
          <Icon name="building" size={16} />
        </span>
        <span className="whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-800 shadow-md">
          Detention Center
        </span>
      </button>

      {/* legend */}
      <div className="absolute bottom-4 right-4 flex items-center gap-4 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-zinc-600 shadow-md">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" /> MOVING
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" /> STATIONARY
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" /> HAZARD
        </span>
      </div>
    </div>
  )
}

/* ---------------- main ---------------- */
export default function FleetDashboard() {
  const [notifOpen, setNotifOpen] = useState(false)
  const [dispatchOpen, setDispatchOpen] = useState(false)
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Fleet Intelligence
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Overview for {today}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:text-brand dark:border-zinc-800"
            >
              <Icon name="bell" size={18} />
            </button>
            <NotificationsPanel
              open={notifOpen}
              onClose={() => setNotifOpen(false)}
            />
          </div>
          <button
            onClick={() => setDispatchOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <Icon name="plus" size={16} /> New Dispatch
          </button>
        </div>
      </div>

      <NewDispatchModal
        open={dispatchOpen}
        onClose={() => setDispatchOpen(false)}
      />

      {/* stat tiles */}
      <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <StatTile key={s.key} stat={s} />
        ))}
      </div>

      {/* activity + feed */}
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DriverActivity />
        </div>
        <SafetyFeed />
      </div>

      {/* route intelligence */}
      <RouteIntelligence />
    </div>
  )
}
