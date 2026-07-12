import { useNavigate } from 'react-router-dom'
import { useFleets } from '../data/FleetsContext.jsx'
import Icon from '../components/Icon.jsx'
import { DW_CORPS } from '../data/detentionWatchData.js'

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

function PartnerCard({ fleet, onManage, subFleets = [] }) {
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
            className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${SAFETY_BADGE[fleet.safetyStatus]}`}
          >
            {SAFETY_LABEL[fleet.safetyStatus]}
          </span>
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

        {subFleets.length > 0 && (
          <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Sub-Fleets · Shared Subscription
            </p>
            <div className="flex flex-col gap-1.5">
              {subFleets.map((sf) => (
                <button
                  key={sf.id}
                  onClick={() => onManage(sf)}
                  className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 text-left transition hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                    {sf.name}
                  </span>
                  <span className="text-[10px] text-zinc-400">{sf.activeDrivers}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onManage(fleet)}
        className="mt-auto flex items-center justify-center gap-1.5 border-t border-zinc-100 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <Icon name="edit" size={14} />
        Manage
      </button>
    </div>
  )
}

function OperatorCard({ corp }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: corp.col }} />

      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">{corp.name}</p>
          <p className="text-xs text-zinc-400">
            {corp.hq} · Est. {corp.founded}
            {corp.ticker !== 'Private' ? ` · NYSE: ${corp.ticker}` : ''}
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{corp.rev}</p>
          <p className="text-[10px] text-zinc-400">2025 REV</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 rounded-lg bg-zinc-50 p-2.5 dark:bg-zinc-800">
        {[
          { v: corp.profit, l: 'Profit' },
          { v: corp.chg, l: 'YoY' },
          { v: corp.fac, l: 'Facilities' },
          { v: corp.beds.toLocaleString(), l: 'ICE Beds' },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{s.v}</p>
            <p className="text-[9px] uppercase text-zinc-400">{s.l}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{corp.desc}</p>
    </div>
  )
}

export default function Fleets() {
  const navigate = useNavigate()
  const { partners } = useFleets()

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

      {/* partner grid — sub-fleets nest under the parent org that owns the subscription */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners
          .filter((fleet) => !fleet.parentOrgId)
          .map((fleet) => (
            <PartnerCard
              key={fleet.id}
              fleet={fleet}
              subFleets={partners.filter((p) => p.parentOrgId === fleet.id)}
              onManage={(f) => navigate(`/fleets/onboard?id=${f.id}`)}
            />
          ))}
      </div>

      {/* ICE facility operators (real, publicly reported) */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          ICE Facility Operators
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          For-profit companies operating ICE detention facilities · 2025-2026 financials · SEC filings, Reuters, Prison Legal News
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DW_CORPS.map((corp) => (
            <OperatorCard key={corp.id} corp={corp} />
          ))}
        </div>
      </div>
    </div>
  )
}
