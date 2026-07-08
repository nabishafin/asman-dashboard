import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fleetPartners } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'
import FleetDetailModal from '../components/FleetDetailModal.jsx'

const ICON_TONES = {
  blue: 'bg-blue-50 text-blue-600',
  dark: 'bg-zinc-900 text-white',
  red: 'bg-red-50 text-red-500',
  amber: 'bg-amber-50 text-amber-600',
}

function PartnerCard({ fleet, onManage }) {
  const compliant = fleet.safetyStatus === 'compliant'
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl ${ICON_TONES[fleet.iconTone]}`}
          >
            <Icon name={fleet.icon} size={18} />
          </span>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {fleet.name}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Active Drivers
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {fleet.activeDrivers}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Subscription
          </p>
          <p className="font-bold text-brand dark:text-brand-dark">
            {fleet.subscription}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <p
          className={
            'flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ' +
            (compliant ? 'text-green-600 dark:text-green-400' : 'text-red-500')
          }
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${compliant ? 'bg-green-500' : 'bg-red-500'}`}
          />
          Safety Status: {compliant ? 'Compliant' : 'Non-Compliant'}
        </p>
        {fleet.safetyNote && (
          <p className="mt-0.5 text-xs text-red-500">{fleet.safetyNote}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Monthly Rev
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {fleet.monthlyRev}
          </p>
        </div>
        <button
          onClick={() => onManage(fleet)}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
        >
          Manage
        </button>
      </div>
    </div>
  )
}

export default function Fleets() {
  const navigate = useNavigate()
  const [selectedFleet, setSelectedFleet] = useState(null)

  return (
    <div className="flex flex-col gap-5">
      {/* stat tiles */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Total Fleet Partners
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
              Total Active Drivers
            </p>
            <Icon name="badge" size={16} className="text-brand dark:text-brand-dark" />
          </div>
          <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">4,280</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
            <Icon name="check" size={12} /> All units verified
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Fleet Revenue</p>
            <Icon name="creditCard" size={16} className="text-brand dark:text-brand-dark" />
          </div>
          <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">$842k</p>
          <p className="mt-1 text-xs text-zinc-400">
            Projected <span className="font-semibold text-zinc-600 dark:text-zinc-300">$1.2M</span>
          </p>
        </div>
      </div>

      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Company Directory
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage and audit institutional fleet safety compliance.
          </p>
        </div>
        <button
          onClick={() => navigate('/fleets/onboard')}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="plus" size={16} />
          Onboard New Partner
        </button>
      </div>

      {/* partner grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {fleetPartners.map((fleet) => (
          <PartnerCard key={fleet.id} fleet={fleet} onManage={setSelectedFleet} />
        ))}
      </div>

      <FleetDetailModal
        open={!!selectedFleet}
        fleet={selectedFleet}
        onClose={() => setSelectedFleet(null)}
      />
    </div>
  )
}
