import Icon from './Icon.jsx'

export const TIERS = [
  {
    id: 'yellow',
    badge: 'Institutional',
    badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    icon: 'star',
    iconClass: 'bg-amber-50 text-amber-500 dark:bg-amber-500/10',
    name: 'Tier One',
    description: 'Standard institutional coverage for small fleets.',
    groupSize: '10 – 30 Drivers',
    period: '12 Weeks',
    eligibility: 'Eligible for Attorney Fee Transfer after 12 uninterrupted weeks.',
    current: false,
  },
  {
    id: 'red',
    badge: 'Institutional',
    badgeClass: 'bg-red-600 text-white',
    icon: 'badge',
    iconClass: 'bg-red-50 text-red-500 dark:bg-red-500/10',
    name: 'Tier Two',
    description: 'Enhanced coverage for mid-sized operations.',
    groupSize: '31 – 50 Drivers',
    period: '10 Weeks',
    eligibility: 'Eligible for Attorney Fee Transfer after 10 uninterrupted weeks.',
    current: true,
  },
  {
    id: 'blue',
    badge: 'Institutional',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
    icon: 'check',
    iconClass: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10',
    name: 'Tier Three',
    description: 'Premium accelerated coverage for large fleets.',
    groupSize: '51+ Drivers',
    period: '8 Weeks',
    eligibility: 'Eligible for Attorney Fee Transfer after 8 uninterrupted weeks.',
    current: false,
  },
]

export default function TierCard({ tier }) {
  return (
    <div
      className={
        'flex flex-col rounded-xl border bg-white p-5 dark:bg-zinc-900 ' +
        (tier.current
          ? 'border-2 border-red-300 bg-red-50/40 dark:border-red-500/40 dark:bg-red-500/5'
          : 'border-zinc-200 dark:border-zinc-800')
      }
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tier.badgeClass}`}
        >
          {tier.badge}
        </span>
        <span className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full ${tier.iconClass}`}>
          <Icon name={tier.icon} size={15} />
        </span>
      </div>

      <p className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">{tier.name}</p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{tier.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Group Size
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">{tier.groupSize}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            Mandatory Period
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">{tier.period}</p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-[11px] italic text-zinc-400">{tier.eligibility}</p>

      <button
        className={
          'mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition ' +
          (tier.current
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800')
        }
      >
        Select Tier
      </button>
    </div>
  )
}
