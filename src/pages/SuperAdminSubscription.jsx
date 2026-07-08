import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import TierCard, { TIERS } from '../components/SubscriptionTierCard.jsx'

const STATS = [
  {
    key: 'mrr',
    label: 'Monthly Recurring Revenue',
    value: '$482,900',
    change: '↗ +12.4% vs last month',
    changeTone: 'text-green-600 dark:text-green-400',
    icon: 'creditCard',
  },
  {
    key: 'subs',
    label: 'Active Subscribers',
    value: '12,842',
    change: '↗ +432 new today',
    changeTone: 'text-green-600 dark:text-green-400',
    icon: 'users',
  },
  {
    key: 'churn',
    label: 'Churn Rate',
    value: '2.1%',
    change: '↘ -0.4% optimized',
    changeTone: 'text-green-600 dark:text-green-400',
    icon: 'warning',
  },
]

const SUBSCRIBERS = [
  {
    id: 's1',
    initials: 'GL',
    name: 'Global Logistics Inc.',
    email: 'billing@globallog.com',
    plan: 'Enterprise',
    status: 'active',
    cycle: 'Annual',
  },
  {
    id: 's2',
    initials: 'MS',
    name: 'Mira Systems',
    email: 'contact@mira.io',
    plan: 'Professional',
    status: 'active',
    cycle: 'Monthly',
  },
  {
    id: 's3',
    initials: 'NS',
    name: 'Nordic Safety',
    email: 'finance@nordicsafe.no',
    plan: 'Basic',
    status: 'past_due',
    cycle: 'Monthly',
  },
  {
    id: 's4',
    initials: 'TP',
    name: 'Tri-Point Logistics',
    email: 'admin@tripoint.ca',
    plan: 'Professional',
    status: 'active',
    cycle: 'Monthly',
  },
]

const STATUS_STYLES = {
  active: 'bg-green-500/15 text-green-600 dark:text-green-400',
  past_due: 'bg-red-500/15 text-red-600 dark:text-red-400',
}
const STATUS_LABELS = { active: 'Active', past_due: 'Past Due' }

function StatCard({ stat }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase leading-snug tracking-wide text-zinc-400">
          {stat.label}
        </p>
        <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-brand/10 text-brand dark:text-brand-dark">
          <Icon name={stat.icon} size={15} />
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
      <p className={`mt-1 text-xs font-semibold ${stat.changeTone}`}>{stat.change}</p>
    </div>
  )
}

export default function SuperAdminSubscription() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Subscription Management
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Real-time revenue monitoring and subscriber governance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <StatCard key={s.key} stat={s} />
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Active Tiers</h2>
          <button
            onClick={() => navigate('/subscription/plans')}
            className="text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
          >
            Configure Pricing Models
          </button>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
          Subscription Fees are billed in advance on a monthly or annual basis. Fees are
          non-refundable except as required by law.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Active Subscriptions</h3>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Subscriber
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Plan
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Status
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Cycle
                </th>
              </tr>
            </thead>
            <tbody>
              {SUBSCRIBERS.map((s) => (
                <tr key={s.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {s.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">{s.name}</p>
                        <p className="text-xs text-zinc-400">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-zinc-600 dark:text-zinc-300">{s.plan}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[s.status]}`}
                    >
                      {STATUS_LABELS[s.status]}
                    </span>
                  </td>
                  <td className="py-3 text-zinc-600 dark:text-zinc-300">{s.cycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <p className="text-xs text-zinc-400">Showing 4 of 12,842 subscribers</p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
              Previous
            </button>
            <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
