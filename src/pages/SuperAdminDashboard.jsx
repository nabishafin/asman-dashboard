import Icon from '../components/Icon.jsx'
import GoogleMapView from '../components/GoogleMapView.jsx'

/* ---------------- mock dashboard data ---------------- */
const STATS = [
  { key: 'subs', label: 'Subscribers', value: '12,402', icon: 'creditCard', tone: 'zinc' },
  { key: 'drivers', label: 'Active Drivers', value: 'Active', icon: 'truck', tone: 'green' },
  { key: 'fleets', label: 'Fleets', value: '42', icon: 'clipboard', tone: 'zinc' },
  { key: 'attorneys', label: 'Attorneys', value: '156', icon: 'briefcase', tone: 'zinc' },
  { key: 'sos', label: 'SOS Today', value: '12', icon: 'sos', tone: 'red' },
]

const SOS_ALARMS = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    photo: '/driver-elena.jpg',
    detail: 'Enforcement Stop: I-10, El Paso',
    coords: { lat: 31.7619, lng: -106.485 },
  },
  {
    id: 2,
    name: 'Johnathan Vance',
    photo: '/attorney-david.jpg',
    detail: 'Check-point Check-in: Laredo',
    coords: { lat: 27.5058, lng: -99.5064 },
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

const ATTORNEY_DEPLOYMENTS = [
  { id: 1, coords: { lat: 29.4241, lng: -98.4936 } }, // San Antonio
  { id: 2, coords: { lat: 32.7767, lng: -96.797 } }, // Dallas
]

const SYSTEM_ACTIVITY = [
  {
    id: 1,
    tone: 'blue',
    title: 'Database Sync Complete',
    detail: 'Denovo server migrations updated (4 new entries)',
    time: '12:42 PM',
  },
  {
    id: 2,
    tone: 'green',
    title: 'Revenue Milestone',
    detail: 'Daily payout of $142,000 processed',
    time: '11:15 AM',
  },
  {
    id: 3,
    tone: 'red',
    title: 'Critical API Error',
    detail: 'Gateway timeout on Legal_Auth_Server',
    time: '09:02 AM',
  },
]

const TONE_RING = {
  blue: 'border-brand',
  green: 'border-green-500',
  red: 'border-red-500',
}

const TONE_ICON = {
  zinc: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

/* ---------------- small pieces ---------------- */
function StatTile({ stat }) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`grid h-8 w-8 place-items-center rounded-lg ${TONE_ICON[stat.tone]}`}>
        <Icon name={stat.icon} size={15} />
      </span>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
        {stat.label}
      </p>
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
    </div>
  )
}

function MrrTile() {
  return (
    <div className="flex flex-col rounded-xl bg-black p-4">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white">
        <Icon name="creditCard" size={15} />
      </span>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
        MRR
      </p>
      <p className="mt-0.5 text-xl font-bold text-white">$1.2M</p>
    </div>
  )
}

function IntelligenceMap() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
            Intelligence Deployment
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time geospatial asset tracking
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand" /> Drivers
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" /> SOS
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Attorneys
          </span>
        </div>
      </div>

      <GoogleMapView
        className="mt-4 h-[380px]"
        zoom={5}
        markers={[
          ...SOS_ALARMS.map((s) => ({ id: `sos-${s.id}`, ...s.coords, color: 'red' })),
          ...ENFORCEMENT_ALERTS.map((a) => ({ id: `alert-${a.id}`, ...a.coords, color: 'brand' })),
          ...ATTORNEY_DEPLOYMENTS.map((a) => ({ id: `attorney-${a.id}`, ...a.coords, color: 'green' })),
        ]}
      >
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-md">
          <span className="mr-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
            Hot Zone
          </span>
          Texas Corridor
        </span>

        <button className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-lg bg-zinc-900 text-white shadow-md">
          <Icon name="layers" size={16} />
        </button>
      </GoogleMapView>
    </div>
  )
}

function ActiveSosAlarms() {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-5 dark:border-red-500/30 dark:bg-zinc-900">
      <p className="flex items-center gap-1.5 font-semibold text-red-600 dark:text-red-400">
        <Icon name="warning" size={16} />
        Active SOS Alarms
      </p>

      <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {SOS_ALARMS.map((s) => (
          <div key={s.id} className="flex items-center gap-3 py-3">
            <img
              src={s.photo}
              alt={s.name}
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {s.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {s.detail}
              </p>
            </div>
            <button className="flex-shrink-0 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200">
              Track GPS
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function EnforcementAlerts() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
        Enforcement Alerts
      </h3>
      <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {ENFORCEMENT_ALERTS.map((a) => (
          <div key={a.id} className="flex gap-3 py-3">
            <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-brand dark:text-brand-dark">
              <Icon name="pin" size={13} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {a.title}
                </p>
                <span className="flex-shrink-0 text-[11px] text-zinc-400">
                  {a.time}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {a.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SystemActivity() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
        System Activity
      </h3>
      <div className="mt-3 flex flex-col">
        {SYSTEM_ACTIVITY.map((s, i) => (
          <div
            key={s.id}
            className={
              'flex gap-3 py-3.5 ' +
              (i < SYSTEM_ACTIVITY.length - 1
                ? 'border-b border-zinc-200 dark:border-zinc-800'
                : '')
            }
          >
            <span
              className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 bg-white dark:bg-zinc-900 ${TONE_RING[s.tone]}`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {s.title}
                </p>
                <span className="flex-shrink-0 text-[11px] text-zinc-400">
                  {s.time}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {s.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- main ---------------- */
export default function SuperAdminDashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <StatTile key={s.key} stat={s} />
        ))}
        <MrrTile />
      </div>

      {/* map + right column */}
      <div className="grid items-start gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <IntelligenceMap />
          <SystemActivity />
        </div>
        <div className="flex flex-col gap-5">
          <ActiveSosAlarms />
          <EnforcementAlerts />
        </div>
      </div>
    </div>
  )
}
