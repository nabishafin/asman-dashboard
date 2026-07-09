import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import GoogleMapView from '../components/GoogleMapView.jsx'

/* ---------------- mock dashboard data ---------------- */
const STATS = [
  { key: 'subs', label: 'Subscribers', value: '12,402', icon: 'creditCard', tone: 'zinc', to: '/users' },
  { key: 'drivers', label: 'Active Drivers', value: '4,280', icon: 'truck', tone: 'green', to: '/all-drivers' },
  { key: 'fleets', label: 'Fleets', value: '42', icon: 'clipboard', tone: 'zinc', to: '/fleets' },
  { key: 'attorneys', label: 'Attorneys', value: '156', icon: 'briefcase', tone: 'zinc', to: '/attorneys' },
  { key: 'sos', label: 'SOS Today', value: '12', icon: 'sos', tone: 'red', to: '/sos-incidents' },
]

const SOS_ALARMS = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    photo: '/driver-elena.jpg',
    detail: 'Enforcement Stop: I-10, El Paso',
    time: '2 min ago',
    coords: { lat: 31.7619, lng: -106.485 },
  },
  {
    id: 2,
    name: 'Johnathan Vance',
    photo: '/attorney-david.jpg',
    detail: 'Check-point Check-in: Laredo',
    time: '14 min ago',
    coords: { lat: 27.5058, lng: -99.5064 },
  },
  {
    id: 3,
    name: 'David Chen',
    photo: '/driver-james.jpg',
    detail: 'Detained: Pearsall Facility, TX',
    time: '31 min ago',
    coords: { lat: 28.8908, lng: -99.0967 },
  },
]

const ENFORCEMENT_ALERTS = [
  {
    id: 1,
    title: 'New ICE Checkpoint',
    detail: 'Reported by 4 drivers near San Diego',
    time: '2 mins ago',
    coords: { lat: 32.7157, lng: -117.1611 },
  },
  {
    id: 2,
    title: 'CBP Increased Activity',
    detail: 'Tucson Sector; High frequency alerts',
    time: '10 mins ago',
    coords: { lat: 32.2226, lng: -110.9747 },
  },
]

const DRIVER_POSITIONS = [
  { id: 1, coords: { lat: 29.4241, lng: -98.4936 } }, // San Antonio
  { id: 2, coords: { lat: 32.7767, lng: -96.797 } }, // Dallas
]

const DETENTION_CENTERS = [{ id: 1, coords: { lat: 28.8908, lng: -99.0967 } }] // Pearsall, TX

const REST_AREAS = [{ id: 1, coords: { lat: 30.6744, lng: -101.4849 } }] // I-10 rest stop, Ozona, TX

const TRUCK_STOPS = [{ id: 1, coords: { lat: 29.5738, lng: -98.2211 } }] // I-10 truck stop, Seguin, TX

const MAP_LEGEND = [
  { key: 'sos', label: 'SOS', color: 'bg-red-500' },
  { key: 'detention', label: 'Detention centers', color: 'bg-zinc-900 dark:bg-zinc-100' },
  { key: 'rest', label: 'Rest areas', color: 'bg-green-500' },
  { key: 'drivers', label: "Driver's", color: 'bg-green-500' },
  { key: 'truck', label: 'Truck stops', color: 'bg-purple-500' },
  { key: 'police', label: 'Police alert points', color: 'bg-blue-500' },
]

const TONE_ICON = {
  zinc: 'text-brand dark:text-brand-dark',
  green: 'text-green-500 dark:text-green-400',
  red: 'text-red-500',
}

/* ---------------- small pieces ---------------- */
function StatTile({ stat, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-dark"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          {stat.label}
        </p>
        <Icon name={stat.icon} size={15} className={TONE_ICON[stat.tone]} />
      </div>
      <p
        className={
          'mt-0.5 text-xl font-bold ' +
          (stat.tone === 'red'
            ? 'text-red-500'
            : stat.tone === 'green'
              ? 'text-green-600 dark:text-green-400'
              : 'text-zinc-900 dark:text-zinc-50')
        }
      >
        {stat.value}
      </p>
    </button>
  )
}

function IntelligenceMap() {
  const [showLegend, setShowLegend] = useState(true)

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
          Intelligence Deployment
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Real-time geospatial asset tracking
        </p>
      </div>

      <GoogleMapView
        className="mt-4 h-[380px]"
        zoom={5}
        markers={[
          ...SOS_ALARMS.map((s) => ({ id: `sos-${s.id}`, ...s.coords, color: 'red' })),
          ...ENFORCEMENT_ALERTS.map((a) => ({ id: `alert-${a.id}`, ...a.coords, color: 'blue' })),
          ...DRIVER_POSITIONS.map((d) => ({ id: `driver-${d.id}`, ...d.coords, color: 'green' })),
          ...DETENTION_CENTERS.map((d) => ({ id: `detention-${d.id}`, ...d.coords, color: 'black' })),
          ...REST_AREAS.map((r) => ({ id: `rest-${r.id}`, ...r.coords, color: 'green' })),
          ...TRUCK_STOPS.map((t) => ({ id: `truck-${t.id}`, ...t.coords, color: 'purple' })),
        ]}
      >
        {showLegend && (
          <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2.5 text-xs shadow-md dark:bg-zinc-900">
            <p className="font-bold text-zinc-800 dark:text-zinc-100">
              Texas Corridor
            </p>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-amber-600">
              Hot Zone
            </p>
            <div className="flex flex-col gap-1">
              {MAP_LEGEND.map((l) => (
                <span
                  key={l.key}
                  className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300"
                >
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${l.color}`} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowLegend((v) => !v)}
          title={showLegend ? 'Hide legend' : 'Show legend'}
          className={
            'absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-lg shadow-md transition ' +
            (showLegend
              ? 'bg-zinc-900 text-white'
              : 'bg-white text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300')
          }
        >
          <Icon name="layers" size={16} />
        </button>
      </GoogleMapView>
    </div>
  )
}

function ActiveSosAlarms({ onTrack }) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-5 dark:border-red-500/30 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 font-semibold text-red-600 dark:text-red-400">
          <Icon name="warning" size={16} />
          Active SOS Alarms
        </p>
        <button
          type="button"
          onClick={onTrack}
          className="text-xs font-semibold text-brand hover:underline dark:text-brand-dark"
        >
          View all
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SOS_ALARMS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={onTrack}
            className="flex flex-col items-start gap-2 rounded-lg border border-zinc-100 p-3 text-left transition hover:border-red-200 hover:bg-red-50/50 dark:border-zinc-800 dark:hover:border-red-500/30 dark:hover:bg-red-500/5"
          >
            <div className="flex w-full items-center gap-2.5">
              <img
                src={s.photo}
                alt={s.name}
                className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {s.name}
                  </p>
                  <span className="flex-shrink-0 text-[10px] text-zinc-400">{s.time}</span>
                </div>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {s.detail}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              Track GPS
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- main ---------------- */
export default function SuperAdminDashboard() {
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-5">
      {/* page header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Command Center
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Platform-wide operational overview · {today}
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Live · Systems operational
        </span>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <StatTile key={s.key} stat={s} onClick={() => navigate(s.to)} />
        ))}
      </div>

      <IntelligenceMap />
      <ActiveSosAlarms onTrack={() => navigate('/sos-incidents')} />
    </div>
  )
}
