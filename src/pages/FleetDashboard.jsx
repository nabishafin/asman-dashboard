import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import NotificationsPanel from '../components/NotificationsPanel.jsx'
import NewDispatchModal from '../components/NewDispatchModal.jsx'
import GoogleMapView from '../components/GoogleMapView.jsx'

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
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Route Intelligence</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Live tracking of high-risk corridors
          </p>
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
        className="mt-4 h-96"
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

      {/* driver activity */}
      <DriverActivity />

      {/* route intelligence */}
      <RouteIntelligence />
    </div>
  )
}
