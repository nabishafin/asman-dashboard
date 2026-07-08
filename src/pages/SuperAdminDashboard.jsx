import Icon from '../components/Icon.jsx'

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
  },
  {
    id: 2,
    name: 'Johnathan Vance',
    photo: '/attorney-david.jpg',
    detail: 'Check-point Check-in: Laredo',
  },
]

const ENFORCEMENT_ALERTS = [
  {
    id: 1,
    title: 'New ICE Checkpoint',
    detail: 'Reported by 4 drivers near San Diego',
    time: '2 mins ago',
  },
  {
    id: 2,
    title: 'CBP Increased Activity',
    detail: 'Tucson Sector; High frequency alerts',
    time: '10 mins ago',
  },
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

const TONE_DOT = {
  blue: 'bg-brand',
  green: 'bg-green-500',
  red: 'bg-red-500',
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
    <div className="flex flex-col rounded-xl bg-zinc-900 p-4 dark:bg-black">
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

      <div className="relative mt-4 min-h-[320px] flex-1 overflow-hidden rounded-xl bg-[#e9ebee]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at 50% 55%, transparent 0 44px, #d3d7dc 45px, transparent 46px), ' +
              'repeating-conic-gradient(from 0deg at 50% 55%, transparent 0deg 14.5deg, #d3d7dc 14.5deg 15deg)',
          }}
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-md">
          <span className="mr-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
            Hot Zone
          </span>
          Texas Corridor
        </span>

        <span className="absolute left-[32%] top-[38%] h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand/25" />
        <span className="absolute left-[46%] top-[48%] h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-red-500/25" />
        <span className="absolute left-[58%] top-[42%] h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-green-500/25" />
        <span className="absolute left-[40%] top-[62%] h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand/25" />

        <button className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-lg bg-zinc-900 text-white shadow-md">
          <Icon name="layers" size={16} />
        </button>
      </div>
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
      <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {SYSTEM_ACTIVITY.map((s) => (
          <div key={s.id} className="flex gap-3 py-3">
            <span
              className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${TONE_DOT[s.tone]}`}
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
