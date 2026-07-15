import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../../components/common/Icon.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import GoogleMapView from '../../../components/GoogleMapView.jsx'
import { DW_FACILITIES, DW_NEWS, dwTagColor, dwTagBg } from '../../../data/detentionWatchData.js'

/* ---------------- mock dashboard data ---------------- */
const STATS = [
  { key: 'subs', label: 'Subscribers', value: '12,402', icon: 'creditCard', accent: 'brand', trend: '+8%', to: '/users' },
  { key: 'drivers', label: 'Active Drivers', value: '4,280', icon: 'truck', accent: 'green', trend: '+3%', to: '/all-drivers' },
  { key: 'fleets', label: 'Fleets', value: '42', icon: 'clipboard', accent: 'purple', trend: '+2', to: '/fleets' },
  { key: 'attorneys', label: 'Attorneys', value: '156', icon: 'briefcase', accent: 'blue', trend: '+5', to: '/attorneys' },
  { key: 'sos', label: 'SOS Today', value: '12', icon: 'sos', accent: 'red', trend: 'Live', to: '/sos-incidents' },
  { key: 'detained', label: 'In ICE Detention', value: '60,311', icon: 'building', accent: 'amber', trend: 'Nat’l', to: '/case-tracker' },
]

const ACCENTS = {
  brand: {
    ring: 'from-brand/60 to-brand/10',
    icon: 'bg-brand/10 text-brand dark:bg-brand-dark/15 dark:text-brand-dark',
    value: 'text-zinc-900 dark:text-zinc-50',
    trend: 'bg-brand/10 text-brand dark:text-brand-dark',
  },
  green: {
    ring: 'from-emerald-500/60 to-emerald-500/10',
    icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    value: 'text-emerald-600 dark:text-emerald-400',
    trend: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  purple: {
    ring: 'from-purple-500/60 to-purple-500/10',
    icon: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    value: 'text-zinc-900 dark:text-zinc-50',
    trend: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  },
  blue: {
    ring: 'from-blue-500/60 to-blue-500/10',
    icon: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    value: 'text-zinc-900 dark:text-zinc-50',
    trend: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  },
  red: {
    ring: 'from-red-500/60 to-red-500/10',
    icon: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    value: 'text-red-600 dark:text-red-400',
    trend: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 animate-pulse',
  },
  amber: {
    ring: 'from-amber-500/60 to-amber-500/10',
    icon: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    value: 'text-zinc-900 dark:text-zinc-50',
    trend: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  },
}

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

const REST_AREAS = [{ id: 1, coords: { lat: 30.6744, lng: -101.4849 } }] // I-10 rest stop, Ozona, TX

const TRUCK_STOPS = [{ id: 1, coords: { lat: 29.5738, lng: -98.2211 } }] // I-10 truck stop, Seguin, TX

// Exact marker hex values (mirror GoogleMapView's MARKER_COLORS) so the
// legend dots and the map markers are guaranteed to show the same color.
const MARKER_HEX = {
  red: '#dc2626',
  purple: '#7c3aed',
  gold: '#ca8a04',
  blue: '#2563eb',
  green: '#16a34a',
  cyan: '#06b6d4',
  slate: '#64748b',
  dark: '#18181b',
}

// Each legend row maps to a distinct marker color (`tone`), also used for the
// corresponding markers on the map. Red is the ONLY red-family color (reserved
// for SOS); every other row is a clearly separate hue so none look alike.
const MAP_LEGEND = [
  { key: 'sos', label: 'SOS', tone: 'red' },
  { key: 'critical', label: 'Detention — Critical (1,000+)', tone: 'purple' },
  { key: 'high', label: 'Detention — High (500–999)', tone: 'gold' },
  { key: 'moderate', label: 'Detention — Moderate/Planned', tone: 'blue' },
  { key: 'drivers', label: 'Drivers', tone: 'green' },
  { key: 'rest', label: 'Rest areas', tone: 'cyan' },
  { key: 'truck', label: 'Truck stops', tone: 'slate' },
  { key: 'police', label: 'Police alert points', tone: 'dark' },
]

// Facility marker color by capacity tier — red stays reserved for SOS, so
// critical detention uses purple (far from red on the color wheel).
function facTone(pop, status) {
  if (status === 'planned') return 'blue' // planned (grouped with moderate)
  if (pop >= 1000) return 'purple' // critical
  if (pop >= 500) return 'gold' // high
  return 'blue' // moderate
}

/* ---------------- small pieces ---------------- */
function StatTile({ stat, onClick }) {
  const a = ACCENTS[stat.accent]
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl glass-panel p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:border-brand/30"
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.ring} opacity-90 transition group-hover:h-1.5`}
      />
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-lg transition group-hover:scale-110 ${a.icon}`}>
          <Icon name={stat.icon} size={16} />
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${a.trend}`}>
          {stat.trend}
        </span>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {stat.label}
      </p>
      <p className={`mt-0.5 text-xl font-bold tracking-tight ${a.value}`}>{stat.value}</p>
    </button>
  )
}

function IntelligenceMap() {
  const [showLegend, setShowLegend] = useState(true)

  const mapStats = [
    { key: 'sos', label: 'SOS Active', value: SOS_ALARMS.length, tone: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' },
    { key: 'fac', label: 'Facilities', value: DW_FACILITIES.length, tone: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
    { key: 'drv', label: 'Drivers Live', value: DRIVER_POSITIONS.length, tone: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
    { key: 'alt', label: 'Alerts', value: ENFORCEMENT_ALERTS.length, tone: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  ]

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl glass-panel shadow-xl">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-dark to-brand" />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 p-5 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md">
            <Icon name="globe" size={20} />
          </span>
          <div>
            <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-50">
              Intelligence Deployment
              <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                Live
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Real-time geospatial asset tracking
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mapStats.map((s) => (
            <span
              key={s.key}
              className={`rounded-lg px-2.5 py-1.5 text-center text-xs font-semibold ${s.tone}`}
            >
              <span className="block text-sm font-bold leading-none">{s.value}</span>
              <span className="text-xs font-bold uppercase tracking-wide opacity-80">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <GoogleMapView
        className="m-4 h-[560px] rounded-xl shadow-inner"
        zoom={5}
        markers={[
          ...SOS_ALARMS.map((s) => ({ id: `sos-${s.id}`, ...s.coords, color: 'red', icon: 'warning', pulse: true })),
          ...ENFORCEMENT_ALERTS.map((a) => ({ id: `alert-${a.id}`, ...a.coords, color: 'dark', icon: 'shield' })),
          ...DRIVER_POSITIONS.map((d) => ({ id: `driver-${d.id}`, ...d.coords, color: 'green', icon: 'car' })),
          ...DW_FACILITIES.map((f) => ({
            id: `fac-${f.id}`,
            lat: f.lat,
            lng: f.lng,
            color: facTone(f.pop, f.status),
            icon: 'building',
            pulse: f.pop >= 1000,
          })),
          ...REST_AREAS.map((r) => ({ id: `rest-${r.id}`, ...r.coords, color: 'cyan', icon: 'pin' })),
          ...TRUCK_STOPS.map((t) => ({ id: `truck-${t.id}`, ...t.coords, color: 'slate', icon: 'truck' })),
        ]}
      >
        {showLegend && (
          <div className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-2.5 text-xs shadow-lg backdrop-blur dark:bg-zinc-900/95">
            <p className="font-bold text-zinc-800 dark:text-zinc-100">
              Texas Corridor
            </p>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-600">
              Hot Zone
            </p>
            <div className="flex flex-col gap-1">
              {MAP_LEGEND.map((l) => (
                <span
                  key={l.key}
                  className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300"
                >
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ background: MARKER_HEX[l.tone] }}
                  />
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
            'absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-lg shadow-lg transition ' +
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
    <div className="relative overflow-hidden rounded-xl glass-panel border-red-500/30 p-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-red-500/20" />
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-semibold text-red-600 dark:text-red-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          Active SOS Alarms
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onTrack}
        >
          View all
        </Button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SOS_ALARMS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={onTrack}
            className="flex flex-col items-start gap-2 rounded-lg border border-zinc-100 p-3 text-left transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50/50 hover:shadow-md dark:border-zinc-800 dark:hover:border-red-500/30 dark:hover:bg-red-500/5"
          >
            <div className="flex w-full items-center gap-2.5">
              <img
                src={s.photo}
                alt={s.name}
                className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-red-100 dark:ring-red-500/20"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {s.name}
                  </p>
                  <span className="flex-shrink-0 text-xs text-zinc-400">{s.time}</span>
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

function EnforcementAlerts() {
  return (
    <div className="rounded-xl glass-panel p-5 shadow-sm">
      <p className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand dark:bg-brand-dark/15 dark:text-brand-dark">
          <Icon name="pin" size={15} />
        </span>
        Enforcement Alerts
      </p>
      <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {ENFORCEMENT_ALERTS.map((a) => (
          <div key={a.id} className="py-2.5 transition hover:pl-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{a.title}</p>
              <span className="flex-shrink-0 text-xs text-zinc-400">{a.time}</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{a.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Feed items are keyed by `tag` so this panel is ready to be pointed at a
// live aggregator/API later — swapping DW_NEWS for a polled data source
// requires no change to the filtering or rendering logic below.
function LiveIntelligenceFeed() {
  const [tagFilter, setTagFilter] = useState('all')
  const [lastSynced, setLastSynced] = useState(new Date())

  const tags = ['all', ...new Set(DW_NEWS.map((n) => n.tag))]
  const visible = tagFilter === 'all' ? DW_NEWS : DW_NEWS.filter((n) => n.tag === tagFilter)

  const syncedLabel = lastSynced.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="rounded-xl glass-panel p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Icon name="broadcast" size={15} />
          </span>
          Live Intelligence Feed
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setLastSynced(new Date())}
          title="Check for new items"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
          Synced {syncedLabel}
        </Button>
      </div>
      <p className="mt-1 text-sm text-zinc-400">National detention &amp; enforcement news · Vera, TRAC, ACLU, Reuters</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTagFilter(t)}
            className={
              'rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition ' +
              (tagFilter === t
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700')
            }
          >
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      <div className="mt-3 flex max-h-72 flex-col divide-y divide-zinc-100 overflow-y-auto dark:divide-zinc-800">
        {visible.map((n) => (
          <div key={n.head} className="py-2.5 transition hover:pl-1">
            <span
              className="rounded px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide"
              style={{ background: dwTagBg(n.tag), color: dwTagColor(n.tag) }}
            >
              {n.lbl}
            </span>
            <p className="mt-1.5 text-base leading-snug text-zinc-800 dark:text-zinc-100">{n.head}</p>
            <div className="mt-1 flex justify-between text-xs text-zinc-400">
              <span>{n.src}</span>
              <span>{n.time}</span>
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <p className="py-6 text-center text-xs text-zinc-400">No items for this category.</p>
        )}
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
      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <StatTile key={s.key} stat={s} onClick={() => navigate(s.to)} />
        ))}
      </div>

      <IntelligenceMap />
      <ActiveSosAlarms onTrack={() => navigate('/sos-incidents')} />

      <div className="grid gap-5 lg:grid-cols-2">
        <EnforcementAlerts />
        <LiveIntelligenceFeed />
      </div>
    </div>
  )
}
