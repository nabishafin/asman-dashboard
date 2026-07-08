import { useState } from 'react'
import Icon from './Icon.jsx'

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

export default function OnboardAttorneyModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('')
  const [firm, setFirm] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreated({
      id: `ca-new-${Date.now()}`,
      name: name.trim() || 'New Practitioner',
      photo: '/attorney-david.jpg',
      firm: firm.trim() || '—',
      winRate: 0,
      cases: 0,
      languages: ['English'],
    })
    setName('')
    setFirm('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-zinc-900"
      >
        <div className="flex items-start justify-between border-b border-zinc-100 p-6 pb-4 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Onboard New Practitioner
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Initialize credentials for the ASMAN legal network.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
              <Icon name="image" size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Profile Photo
              </p>
              <p className="text-xs text-zinc-400">
                Upload a professional headshot (JPG, PNG, max 5MB)
              </p>
              <label className="mt-1.5 inline-block cursor-pointer rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-brand/40 hover:text-brand dark:border-zinc-700 dark:text-zinc-300">
                <input type="file" accept="image/*" className="hidden" />
                Upload Image
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={fieldLabel}>Legal Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Vance"
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Institutional Email</label>
              <input
                type="email"
                placeholder="j.vance@firm.com"
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Bar License Number</label>
              <input placeholder="NY-882910" className={fieldInput} />
            </div>
            <div>
              <label className={fieldLabel}>Federal Circuit</label>
              <select className={fieldInput}>
                <option>Select Circuit</option>
                <option>2nd Circuit</option>
                <option>5th Circuit</option>
                <option>9th Circuit</option>
                <option>11th Circuit</option>
              </select>
            </div>
          </div>

          <div>
            <label className={fieldLabel}>Office Location</label>
            <input
              value={firm}
              onChange={(e) => setFirm(e.target.value)}
              placeholder="e.g. New York, NY"
              className={fieldInput}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={fieldLabel}>Total Cases Handled</label>
              <input placeholder="e.g. 150" className={fieldInput} />
            </div>
            <div>
              <label className={fieldLabel}>Years of Experience</label>
              <input placeholder="e.g. 12" className={fieldInput} />
            </div>
          </div>

          <div>
            <label className={fieldLabel}>Language Proficiencies</label>
            <input
              placeholder="e.g. English, Spanish, Mandarin"
              className={fieldInput}
            />
          </div>

          <div>
            <label className={fieldLabel}>Specialties</label>
            <input
              placeholder="e.g. Civil Rights, Immigration Law, Federal Litigation"
              className={fieldInput}
            />
          </div>

          <div>
            <label className={fieldLabel}>About / Professional Summary</label>
            <textarea
              rows={3}
              placeholder="Enter professional background, specialties, and relevant experience..."
              className={fieldInput + ' resize-none'}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-zinc-100 p-6 pt-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add to Network
          </button>
        </div>
      </form>
    </div>
  )
}
