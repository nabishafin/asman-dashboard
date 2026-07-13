import { useState } from 'react'
import Icon from './Icon.jsx'

function SectionLabel({ icon, children }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/10 text-brand dark:text-brand-dark">
        <Icon name={icon} size={12} />
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {children}
      </span>
    </div>
  )
}

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

export default function NewDispatchModal({ open, onClose }) {
  const [waypoints, setWaypoints] = useState([''])

  if (!open) return null

  const addWaypoint = () => setWaypoints((w) => [...w, ''])

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-zinc-900"
      >
        {/* header */}
        <div className="flex items-start justify-between border-b border-zinc-100 p-6 pb-4 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              New Dispatch Assignment
            </h2>
            <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
              Initiate a secure asset transport protocol within the ASMAN
              perimeter.
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

        {/* body */}
        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
          {/* asset selection */}
          <div>
            <SectionLabel icon="box">Asset Selection</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>Vehicle Unit</label>
                <input placeholder="e.g., 109" className={fieldInput} />
              </div>
              <div>
                <label className={fieldLabel}>Assigned Driver</label>
                <select className={fieldInput + ' appearance-none'}>
                  <option>Select Driver...</option>
                  <option>Jamal Uddin</option>
                  <option>Sohel Rana</option>
                  <option>Babul Mia</option>
                </select>
              </div>
            </div>
          </div>

          {/* route information */}
          <div>
            <SectionLabel icon="map">Route Information</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>Pickup Location</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-zinc-400">
                    <Icon name="pin" size={14} />
                  </span>
                  <input
                    placeholder="e.g., Detention Center ID: DC-4"
                    className={fieldInput + ' pl-8'}
                  />
                </div>
              </div>
              <div>
                <label className={fieldLabel}>Destination</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-zinc-400">
                    <Icon name="flag" size={14} />
                  </span>
                  <input
                    placeholder="e.g., Legal Hub Alpha"
                    className={fieldInput + ' pl-8'}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className={fieldLabel}>Stops / Waypoints</label>
              {waypoints.map((_, i) => (
                <div key={i} className="relative mt-1.5">
                  <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-zinc-400">
                    <Icon name="arrow" size={14} />
                  </span>
                  <input
                    placeholder="e.g., Regional Hub Beta"
                    className={
                      'w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-8 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addWaypoint}
                className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
              >
                <Icon name="plus" size={14} /> Add Step
              </button>
            </div>
          </div>

          {/* schedule */}
          <div>
            <SectionLabel icon="calendar">Schedule</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>Departure</label>
                <input
                  type="datetime-local"
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Estimated Arrival</label>
                <input
                  type="datetime-local"
                  className={fieldInput}
                />
              </div>
            </div>
          </div>

          {/* additional instructions */}
          <div>
            <SectionLabel icon="edit">Additional Instructions</SectionLabel>
            <textarea
              rows={3}
              placeholder="Enter specific mission parameters or detainee handling notes..."
              className={fieldInput + ' resize-none'}
            />
          </div>
        </div>

        {/* footer */}
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
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Create Dispatch
          </button>
        </div>
      </form>
    </div>
  )
}
