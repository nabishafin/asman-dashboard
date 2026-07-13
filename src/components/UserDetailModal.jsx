import Icon from './Icon.jsx'
import GoogleMapView from './GoogleMapView.jsx'

function InfoBox({ label, value }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
    </div>
  )
}

export default function UserDetailModal({ open, onClose, user, onSuspend }) {
  if (!open || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
        >
          <Icon name="close" size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.photo}
              alt={user.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-green-500 text-white dark:border-zinc-900">
              <Icon name="sync" size={9} />
            </span>
          </div>
          <div>
            <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              {user.name}
            </p>
            <p className="text-xs text-zinc-400">
              {user.title} · {user.tier}
            </p>
          </div>
        </div>

        {user.coords && (
          <GoogleMapView
            className="mt-4 h-40"
            zoom={9}
            markers={[{ id: user.id, ...user.coords, color: 'red' }]}
          >
            <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-md dark:bg-zinc-900/95 dark:text-zinc-200">
              {user.address}
            </span>
          </GoogleMapView>
        )}

        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
            Personal Information
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <InfoBox label="Phone Number" value={user.phone} />
            <InfoBox label="Email" value={user.email} />
            <InfoBox label="Address" value={user.address} />
            <InfoBox label="Nationality" value={user.nationality} />
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
            Vehicle Fleet
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <InfoBox label="VIN Number" value={user.vin} />
            <InfoBox label="License Plate" value={user.licensePlate} />
          </div>
        </div>

        <button
          onClick={() => onSuspend?.(user)}
          className="mt-6 w-full rounded-lg border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
        >
          Suspend Institutional Access
        </button>
      </div>
    </div>
  )
}
