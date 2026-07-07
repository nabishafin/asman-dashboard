import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { fleets } from '../data/mockData.js'
import Icon from './Icon.jsx'

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

function genTempPassword() {
  return 'Asman-' + Math.random().toString(36).slice(-6)
}

export default function AddFleetOwnerModal({ open, onClose, onCreated }) {
  const { createFleetOwner } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [fleetId, setFleetId] = useState(fleets[0]?.id ?? '')
  const [tempPassword, setTempPassword] = useState(genTempPassword())
  const [error, setError] = useState('')
  const [created, setCreated] = useState(null)

  if (!open) return null

  const reset = () => {
    setName('')
    setEmail('')
    setFleetId(fleets[0]?.id ?? '')
    setTempPassword(genTempPassword())
    setError('')
    setCreated(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const res = createFleetOwner({ name, email, password: tempPassword, fleetId })
    if (!res.ok) {
      setError(res.error)
      return
    }
    const fleet = fleets.find((f) => f.id === fleetId)
    onCreated({
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      role: 'fleet_owner',
      fleet: fleet?.name ?? '—',
    })
    setCreated({ email: res.user.email, password: tempPassword })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-100 p-6 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Add Fleet Owner
          </h2>
          <button
            onClick={handleClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {created ? (
          <div className="p-6">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Icon name="check" size={18} />
              <p className="font-semibold">Fleet Owner account created</p>
            </div>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Share these one-time credentials with the new fleet owner. They
              should sign in and change their password immediately.
            </p>
            <div className="mt-4 rounded-lg bg-zinc-50 p-4 text-sm dark:bg-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">
                Email: <span className="font-semibold text-zinc-900 dark:text-zinc-50">{created.email}</span>
              </p>
              <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                Temporary password:{' '}
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-50">
                  {created.password}
                </span>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-5 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
            <div>
              <label className={fieldLabel}>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Karim Owner"
                required
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@company.com"
                required
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Assign Fleet</label>
              <select
                value={fleetId}
                onChange={(e) => setFleetId(e.target.value)}
                className={fieldInput}
              >
                {fleets.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={fieldLabel}>Temporary Password</label>
              <div className="flex gap-2">
                <input
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  className={fieldInput + ' font-mono'}
                />
                <button
                  type="button"
                  onClick={() => setTempPassword(genTempPassword())}
                  className="mt-1.5 flex-shrink-0 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 hover:border-brand/40 hover:text-brand dark:border-zinc-700 dark:text-zinc-300"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-1 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
