import Icon from './common/Icon.jsx'

export default function TierCard({ tier, selected, onEdit }) {
  let cardTone = 'border-zinc-200 dark:border-zinc-800'
  if (selected) cardTone = 'border-2 border-brand ring-2 ring-brand/20'
  else if (tier.current) cardTone = 'border-2 border-red-300 bg-red-50/40 dark:border-red-500/40 dark:bg-red-500/5'

  let buttonTone = 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
  if (selected) buttonTone = 'bg-brand text-white hover:bg-brand-dark'
  else if (tier.current) buttonTone = 'bg-red-600 text-white hover:bg-red-700'

  return (
    <div
      className={'flex flex-col rounded-xl border bg-white p-5 dark:bg-zinc-900 ' + cardTone}
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full ${tier.iconClass}`}>
          <Icon name={tier.icon} size={15} />
        </span>
        {typeof tier.price === 'number' && (
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            ${tier.price}
            <span className="text-xs font-medium text-zinc-400">/mo</span>
          </p>
        )}
      </div>

      <p className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-50">{tier.name}</p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{tier.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Group Size
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">{tier.groupSize}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Mandatory Period
          </p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">{tier.period}</p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-xs italic text-zinc-400">{tier.eligibility}</p>

      <button
        type="button"
        onClick={onEdit}
        className={'mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition ' + buttonTone}
      >
        {selected ? 'Editing…' : 'Edit Tier'}
      </button>
    </div>
  )
}
