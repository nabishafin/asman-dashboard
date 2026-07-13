import Icon from '../components/Icon.jsx'
import TierCard from '../components/SubscriptionTierCard.jsx'
import { TIERS } from '../data/subscriptionTiers.js'

export default function FleetSubscription() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand dark:text-brand-dark">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-brand text-white">
            <Icon name="check" size={10} />
          </span>
          Enterprise Tier
        </span>
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
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  )
}
