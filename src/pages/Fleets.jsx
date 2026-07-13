import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFleets } from '../data/FleetsContext.jsx'
import Icon from '../components/Icon.jsx'
import FleetDetailModal from '../components/FleetDetailModal.jsx'

const ICON_TONES = {
  blue: 'bg-blue-50 text-blue-600',
  dark: 'bg-zinc-900 text-white',
  red: 'bg-red-50 text-red-500',
  amber: 'bg-amber-50 text-amber-600',
}

const SAFETY_ACCENT = {
  compliant: 'from-green-400 to-green-500',
  non_compliant: 'from-red-400 to-red-500',
}
const SAFETY_BADGE = {
  compliant: 'bg-green-500/15 text-green-600 dark:text-green-400',
  non_compliant: 'bg-red-500/15 text-red-600 dark:text-red-400',
}
const SAFETY_LABEL = { compliant: 'Compliant', non_compliant: 'Non-Compliant' }

function PartnerCard({ fleet, onManage, onSubscription, onView }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${SAFETY_ACCENT[fleet.safetyStatus]}`} />

      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl ring-4 ring-black/[0.02] transition group-hover:scale-110 ${ICON_TONES[fleet.iconTone]}`}
            >
              <Icon name={fleet.icon} size={18} />
            </span>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">
              {fleet.name}
            </p>
          </div>
          <span
            className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${SAFETY_BADGE[fleet.safetyStatus]}`}
          >
            {SAFETY_LABEL[fleet.safetyStatus]}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Active Drivers
            </p>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">
              {fleet.activeDrivers}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Subscription
            </p>
            <button
              onClick={onSubscription}
              className="font-bold text-brand hover:underline dark:text-brand-dark"
            >
              {fleet.subscription}
            </button>
          </div>
        </div>

      </div>

      <div className="mt-auto grid grid-cols-2 border-t border-zinc-100 dark:border-zinc-800">
        <button
          onClick={() => onView(fleet)}
          className="flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Icon name="eye" size={14} />
          View
        </button>
        <button
          onClick={() => onManage(fleet)}
          className="flex items-center justify-center gap-1.5 border-l border-zinc-100 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Icon name="edit" size={14} />
          Manage
        </button>
      </div>
    </div>
  )
}

export default function Fleets() {
  const navigate = useNavigate()
  const { partners } = useFleets()
  const [detailFleet, setDetailFleet] = useState(null)

  return (
    <div className="flex flex-col gap-5">
      {/* stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Total Fleets
            </p>
            <Icon name="clipboard" size={16} className="text-brand dark:text-brand-dark" />
          </div>
          <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">156</p>
          <p className="mt-1 text-xs font-semibold text-green-600 dark:text-green-400">
            ↗ +8 this month
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Total Drivers
            </p>
            <Icon name="badge" size={16} className="text-brand dark:text-brand-dark" />
          </div>
          <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">4,280</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
            <Icon name="check" size={12} /> All units verified
          </p>
        </div>
      </div>

      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <button
          onClick={() => navigate('/fleets/onboard')}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="plus" size={16} />
          Onboard New Company
        </button>
      </div>

      {/* company grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners
          .filter((fleet) => !fleet.parentOrgId)
          .map((fleet) => (
            <PartnerCard
              key={fleet.id}
              fleet={fleet}
              onManage={(f) => navigate(`/fleets/onboard?id=${f.id}`)}
              onSubscription={() => navigate('/subscription')}
              onView={(f) => setDetailFleet(f)}
            />
          ))}
      </div>

      <FleetDetailModal
        open={!!detailFleet}
        fleet={detailFleet}
        onClose={() => setDetailFleet(null)}
      />
    </div>
  )
}
