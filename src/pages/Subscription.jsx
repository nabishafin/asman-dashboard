import Icon from '../components/Icon.jsx'

const USAGE = [
  {
    label: 'Active Drivers',
    value: '842 / 1,000',
    percent: 84,
    tone: 'brand',
    note: 'Your current fleet capacity is at 84% usage.',
  },
  {
    label: 'Case Storage',
    value: '4.2 TB / 10 TB',
    percent: 42,
    tone: 'brand',
    note: 'Secure archival storage is well within limits.',
  },
  {
    label: 'API Calls',
    value: '1.2M / Unlimited',
    percent: 100,
    tone: 'green',
    note: 'Real-time sync calls have no hard throttle limit.',
  },
]

const TIERS = [
  {
    id: 'standard',
    name: 'Standard',
    price: '$499',
    features: ['50 Active Drivers', '500GB Secure Storage', 'Standard Risk Reports'],
    action: 'Downgrade',
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$1,299',
    features: ['250 Active Drivers', '2TB Secure Storage', 'Advanced Fleet Analytics'],
    action: 'Switch Plan',
    current: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$4,999',
    features: [
      'Unlimited Drivers',
      '10TB+ Secure Storage',
      'Dedicated Attorney Portal',
      '24/7 Priority Support',
    ],
    action: 'Current Plan',
    current: true,
  },
]

export default function Subscription() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Subscription &amp; Billing
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your enterprise ecosystem access and payment cycles.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand dark:text-brand-dark">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-brand text-white">
            <Icon name="check" size={10} />
          </span>
          Enterprise Tier
        </span>
      </div>

      {/* usage */}
      <div className="grid gap-4 sm:grid-cols-3">
        {USAGE.map((u) => (
          <div
            key={u.label}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                {u.label}
              </p>
              <p
                className={
                  'text-sm font-bold ' +
                  (u.tone === 'green'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-brand dark:text-brand-dark')
                }
              >
                {u.value}
              </p>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className={
                  'h-full rounded-full ' +
                  (u.tone === 'green' ? 'bg-green-500' : 'bg-brand')
                }
                style={{ width: `${u.percent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {u.note}
            </p>
          </div>
        ))}
      </div>

      {/* tiers */}
      <div>
        <h2 className="font-bold text-zinc-900 dark:text-zinc-50">
          Available Tiers
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Select the plan that best fits your logistical scale.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={
                'relative flex flex-col rounded-xl border bg-white p-5 dark:bg-zinc-900 ' +
                (t.current
                  ? 'border-2 border-brand'
                  : 'border-zinc-200 dark:border-zinc-800')
              }
            >
              {t.current && (
                <span className="absolute -top-3 right-4 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                  Active
                </span>
              )}

              <p
                className={
                  'text-sm font-semibold ' +
                  (t.current
                    ? 'text-brand dark:text-brand-dark'
                    : 'text-zinc-900 dark:text-zinc-50')
                }
              >
                {t.name}
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {t.price}
                <span className="text-sm font-medium text-zinc-400">
                  /month
                </span>
              </p>

              <ul className="mt-4 flex flex-1 flex-col gap-2">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
                      <Icon name="check" size={10} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                disabled={t.current}
                className={
                  'mt-5 w-full rounded-lg py-2.5 text-sm font-semibold transition ' +
                  (t.current
                    ? 'cursor-default bg-brand text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700')
                }
              >
                {t.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
