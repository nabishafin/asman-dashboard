import Icon from '../../../components/common/Icon.jsx'
import { Button } from '../../../components/ui/Button.jsx'

const ICON_TONES = {
  blue: 'bg-blue-50 text-blue-600',
  dark: 'bg-zinc-900 text-white',
  red: 'bg-red-50 text-red-500',
  amber: 'bg-amber-50 text-amber-600',
}

export default function FleetDetailModal({ open, onClose, fleet }) {
  if (!open || !fleet) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl ${ICON_TONES[fleet.iconTone]}`}
            >
              <Icon name={fleet.icon} size={18} />
            </span>
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-50">
                {fleet.name}
              </p>
              <p className="text-xs text-zinc-400">
                Fleet ID: {fleet.fleetIdCode}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Fleet Size
            </p>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">
              {fleet.fleetSize}
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Active Routes
            </p>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">
              {fleet.activeRoutes}
            </p>
          </div>
          <div className="col-span-2 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Managers
            </p>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">
              {fleet.managers}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-50">
            Administrative Actions
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" icon="check">
              Approve
            </Button>
            <Button variant="danger" icon="ban">
              Suspend Partner
            </Button>
          </div>
        </div>

        <Button variant="primary" className="mt-4 w-full" icon="arrowUp">
          Upgrade Subscription Plan
        </Button>
      </div>
    </div>
  )
}
