import Icon from './Icon.jsx'

function InfoRow({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {value}
        </p>
      </div>
      <Icon name={icon} size={16} className="text-brand dark:text-brand-dark" />
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
          className="absolute left-6 top-6 grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
        >
          <Icon name="close" size={18} />
        </button>

        <div className="mt-2 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={user.photo}
              alt={user.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-green-500 text-white dark:border-zinc-900">
              <Icon name="sync" size={11} />
            </span>
          </div>
          <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {user.name}
          </p>
          <p className="text-xs text-zinc-400">
            {user.title} · {user.tier}
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
            Personal Information
          </p>
          <div className="flex flex-col gap-2">
            <InfoRow label="Phone Number" value={user.phone} icon="phone" />
            <InfoRow label="Email" value={user.email} icon="mail" />
            <InfoRow label="Nationality" value={user.nationality} icon="globe" />
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
            Emergency Contacts
          </p>
          <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-brand dark:text-brand-dark">
                <Icon name="users" size={15} />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {user.emergencyContact.name}
                </p>
                <p className="text-xs text-zinc-400">
                  {user.emergencyContact.relation} · {user.emergencyContact.phone}
                </p>
              </div>
            </div>
            <Icon name="warning" size={16} className="text-green-500" />
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">
            Verified Documents
          </p>
          <div className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-zinc-200 py-5 dark:border-zinc-700">
            <Icon name="file" size={22} className="text-brand dark:text-brand-dark" />
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {user.document.name}
            </p>
            <p className="text-xs text-zinc-400">
              {user.document.type} · {user.document.size}
            </p>
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
