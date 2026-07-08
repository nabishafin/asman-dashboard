import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

function SectionLabel({ icon, children }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/10 text-brand dark:text-brand-dark">
        <Icon name={icon} size={13} />
      </span>
      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
        {children}
      </span>
    </div>
  )
}

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

export default function PartnerOnboarding() {
  const navigate = useNavigate()
  const [routes, setRoutes] = useState(['Midwest', 'East Coast'])
  const [routeInput, setRouteInput] = useState('')

  const addRoute = () => {
    const val = routeInput.trim()
    if (val && !routes.includes(val)) setRoutes((r) => [...r, val])
    setRouteInput('')
  }
  const removeRoute = (route) =>
    setRoutes((r) => r.filter((x) => x !== route))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/fleets')
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Partner Onboarding
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Establish institutional logistics partnership.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* company details */}
          <div>
            <SectionLabel icon="clipboard">Company Details</SectionLabel>
            <div className="flex flex-col gap-4">
              <div>
                <label className={fieldLabel}>Legal Company Name</label>
                <input
                  placeholder="e.g. Atlas Logistics Group"
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>HQ Location</label>
                <select className={fieldInput}>
                  <option>Select Region</option>
                  <option>Continental US</option>
                  <option>Canada</option>
                  <option>EU</option>
                </select>
              </div>
            </div>
          </div>

          {/* operational scope */}
          <div>
            <SectionLabel icon="compass">Operational Scope</SectionLabel>
            <div className="flex flex-col gap-4">
              <div>
                <label className={fieldLabel}>Active Fleet Size</label>
                <input placeholder="50+" className={fieldInput} />
              </div>
              <div>
                <label className={fieldLabel}>Operational Regions</label>
                <select className={fieldInput}>
                  <option>Continental US</option>
                  <option>North America</option>
                  <option>Global</option>
                </select>
              </div>
              <div>
                <label className={fieldLabel}>Primary Routes (Multiselect)</label>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-800">
                  {routes.map((r) => (
                    <span
                      key={r}
                      className="flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand dark:text-brand-dark"
                    >
                      {r}
                      <button
                        type="button"
                        onClick={() => removeRoute(r)}
                        className="text-brand/70 hover:text-brand"
                      >
                        <Icon name="close" size={11} />
                      </button>
                    </span>
                  ))}
                  <input
                    value={routeInput}
                    onChange={(e) => setRouteInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addRoute()
                      }
                    }}
                    placeholder="+ Add Route"
                    className="min-w-[100px] flex-1 bg-transparent px-1 py-1 text-xs text-zinc-700 outline-none placeholder:text-brand placeholder:font-semibold dark:text-zinc-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* primary contact */}
        <div className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
          <SectionLabel icon="image">Primary Contact</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={fieldLabel}>Full Name</label>
              <input placeholder="John Doe" className={fieldInput} />
            </div>
            <div>
              <label className={fieldLabel}>Institutional Email</label>
              <input
                type="email"
                placeholder="john.doe@company.com"
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Direct Line</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={fieldInput}
              />
            </div>
          </div>
        </div>

        {/* safety verification */}
        <div className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
          <SectionLabel icon="shield">Safety Verification</SectionLabel>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-8 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
            <input type="file" accept=".pdf,.zip" className="hidden" />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand shadow-sm dark:bg-zinc-900 dark:text-brand-dark">
              <Icon name="upload" size={16} />
            </span>
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              Upload Safety Certifications
            </p>
            <p className="max-w-xs text-xs text-zinc-400">
              Drag and drop your ISO, DOT, or institutional safety audits
              here. PDF or ZIP files accepted.
            </p>
            <span className="mt-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              Browse Files
            </span>
          </label>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs font-medium text-green-700 dark:text-green-400">
            <Icon name="check" size={14} />
            Safety documents will be auto-verified by our compliance engine.
          </div>
        </div>

        {/* footer */}
        <div className="mt-6 flex items-center justify-end gap-4 border-t border-zinc-100 pt-5 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => navigate('/fleets')}
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
          >
            Approve
          </button>
        </div>
      </form>
    </div>
  )
}
