import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import NotificationsPanel from '../components/NotificationsPanel.jsx'
import NewDispatchModal from '../components/NewDispatchModal.jsx'
import GoogleMapView from '../components/GoogleMapView.jsx'
import { driverDirectory, activeUnits, legalCases } from '../data/mockData.js'

/* ---------------- mock dashboard data ---------------- */
const CHART = [
  { day: 'Mon', safe: 42, idle: 10 },
  { day: 'Tue', safe: 55, idle: 14 },
  { day: 'Wed', safe: 38, idle: 8 },
  { day: 'Thu', safe: 72, idle: 18 },
  { day: 'Fri', safe: 60, idle: 12 },
  { day: 'Sat', safe: 48, idle: 20 },
  { day: 'Sun', safe: 35, idle: 9 },
]

/* ---------------- small pieces ---------------- */
function DriverActivity() {
  const [range, setRange] = useState('Week')
  const max = Math.max(...CHART.map((d) => d.safe + d.idle))
  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand/10 text-brand dark:bg-brand-dark/15 dark:text-brand-dark">
            <Icon name="barChart" size={16} />
          </span>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Driver Activity
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Aggregated performance across all territories
            </p>
          </div>
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

      <div className="mt-8 flex h-52 items-end gap-4 border-b border-zinc-100 pb-0 dark:border-zinc-800">
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

const UNIT_ALERT_TONE = {
  idle: 'text-indigo-500',
  delayed: 'text-red-500',
}
const UNIT_ALERT_DOT = {
  idle: 'bg-indigo-400',
  delayed: 'bg-red-500',
}

function FleetRouteAlerts() {
  const navigate = useNavigate()
  const alerts = activeUnits.filter((u) => u.status !== 'moving')

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
            <Icon name="warning" size={15} />
          </span>
          Fleet Route Alerts
        </p>
        <button
          type="button"
          onClick={() => navigate('/my-fleet')}
          className="text-xs font-semibold text-brand hover:underline dark:text-brand-dark"
        >
          View all
        </button>
      </div>

      {alerts.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-400">All units moving normally — no alerts.</p>
      ) : (
        <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
          {alerts.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-2 py-2.5 transition hover:pl-1">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Unit #{u.unitNumber}
                </p>
                <p className="text-xs text-zinc-400">Driver: {u.driverName}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span
                  className={`flex items-center justify-end gap-1.5 text-xs font-bold uppercase ${UNIT_ALERT_TONE[u.status]}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${UNIT_ALERT_DOT[u.status]}`} />
                  {u.status}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{u.rightValue}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ROUTE_MARKERS = [
  { id: 'sos-1', lat: 31.5493, lng: -99.3312, color: 'red', icon: 'warning' },
  { id: 'detention-1', lat: 33.5779, lng: -101.8552, color: 'dark', icon: 'building' },
  { id: 'rest-1', lat: 32.2288, lng: -100.5352, color: 'green', icon: 'pin' },
  { id: 'driver-1', lat: 31.9686, lng: -99.9018, color: 'green', icon: 'car' },
  { id: 'truckstop-1', lat: 32.6, lng: -99.4, color: 'purple', icon: 'truck' },
  { id: 'police-1', lat: 31.2, lng: -99.6, color: 'blue', icon: 'shield' },
]

const ROUTE_LEGEND = [
  { label: 'SOS', dot: 'bg-red-500' },
  { label: 'Detention centers', dot: 'bg-zinc-900' },
  { label: 'Rest areas', dot: 'bg-green-500' },
  { label: "Driver's", dot: 'bg-green-500' },
  { label: 'Truck stops', dot: 'bg-purple-600' },
  { label: 'police alert points', dot: 'bg-blue-500' },
]

function RouteIntelligence() {
  const [tab, setTab] = useState('Active Routes')
  const navigate = useNavigate()

  const handleMarkerClick = (id) => {
    if (id === 'detention-1') navigate('/facility/dc-4')
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-dark to-brand" />

      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md">
            <Icon name="compass" size={20} />
          </span>
          <div>
            <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-50">
              Route Intelligence
              <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                Live
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Live tracking of high-risk corridors
            </p>
          </div>
        </div>
        <div className="flex rounded-lg bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
          {['Active Routes', 'Traffic Heatmap'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                'rounded-md px-3 py-1.5 font-semibold transition ' +
                (tab === t
                  ? 'bg-[#0f2a3d] text-white'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <GoogleMapView
        className="mt-4 h-[560px] rounded-xl shadow-inner"
        zoom={6}
        markers={ROUTE_MARKERS}
        onMarkerClick={handleMarkerClick}
      >
        <div className="absolute left-4 top-4 rounded-xl bg-white/95 px-4 py-3 text-xs shadow-md backdrop-blur">
          <p className="font-bold text-zinc-900">Texas Corridor</p>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            Hot Zone
          </p>
          <div className="flex flex-col gap-1.5">
            {ROUTE_LEGEND.map((l) => (
              <span
                key={l.label}
                className="flex items-center gap-1.5 font-medium text-zinc-700"
              >
                <span className={`h-2 w-2 flex-shrink-0 rounded-full ${l.dot}`} />
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </GoogleMapView>
    </div>
  )
}

const FLEET_ACCENTS = {
  brand: { ring: 'from-brand/60 to-brand/10', icon: 'bg-brand/10 text-brand dark:bg-brand-dark/15 dark:text-brand-dark', value: 'text-brand dark:text-brand-dark', trend: 'bg-brand/10 text-brand dark:text-brand-dark' },
  blue: { ring: 'from-blue-500/60 to-blue-500/10', icon: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400', value: 'text-blue-600 dark:text-blue-400', trend: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  amber: { ring: 'from-amber-500/60 to-amber-500/10', icon: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', value: 'text-amber-600 dark:text-amber-400', trend: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  green: { ring: 'from-green-500/60 to-green-500/10', icon: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400', value: 'text-green-600 dark:text-green-400', trend: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
}

function FleetStatTile({ stat }) {
  const a = FLEET_ACCENTS[stat.accent]
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.ring} opacity-90 transition group-hover:h-1.5`} />
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-lg transition group-hover:scale-110 ${a.icon}`}>
          <Icon name={stat.icon} size={16} />
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${a.trend}`}>
          {stat.trend}
        </span>
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
        {stat.label}
      </p>
      <p className={`mt-0.5 text-2xl font-extrabold tracking-tight ${a.value}`}>{stat.value}</p>
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

  const openCases = legalCases.filter((c) =>
    driverDirectory.some((d) => d.id === c.driverId)
  ).length
  const weeklySafeTrips = CHART.reduce((sum, d) => sum + d.safe, 0)

  const stats = [
    { key: 'drivers', label: 'Active Drivers', value: driverDirectory.length, icon: 'users', accent: 'brand', trend: 'Live' },
    { key: 'vehicles', label: 'Fleet Vehicles', value: activeUnits.length, icon: 'truck', accent: 'blue', trend: 'Tracked' },
    { key: 'cases', label: 'Open Cases', value: openCases, icon: 'clipboard', accent: 'amber', trend: 'Legal' },
    { key: 'trips', label: 'Safe Trips (Week)', value: weeklySafeTrips, icon: 'check', accent: 'green', trend: '+' },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-dark p-6 text-white shadow-lg">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, white 0, transparent 35%), radial-gradient(circle at 85% 80%, white 0, transparent 40%)',
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Icon name="truck" size={24} />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Fleet Intelligence</h1>
              <p className="mt-0.5 text-sm text-white/80">
                Overview for {today}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
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
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-white/90"
            >
              <Icon name="plus" size={16} /> New Dispatch
            </button>
          </div>
        </div>
      </div>

      <NewDispatchModal
        open={dispatchOpen}
        onClose={() => setDispatchOpen(false)}
      />

      {/* stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <FleetStatTile key={s.key} stat={s} />
        ))}
      </div>

      {/* driver activity + fleet route alerts */}
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DriverActivity />
        </div>
        <FleetRouteAlerts />
      </div>

      {/* route intelligence */}
      <RouteIntelligence />
    </div>
  )
}
