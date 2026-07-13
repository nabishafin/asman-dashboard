import { Link, useNavigate, useParams } from 'react-router-dom'
import { legalCases, driverDirectory } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const LIFECYCLE_STYLES = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  closed: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
}

const DOC_ICON_TONES = {
  pdf: 'bg-red-50 text-red-500 dark:bg-red-500/10',
  zip: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10',
  doc: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10',
}

export default function CaseDetail() {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const c = legalCases.find((x) => x.id === caseId)
  const driver = c ? driverDirectory.find((d) => d.id === c.driverId) : null

  if (!c) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Case not found.
        </p>
        <button
          onClick={() => navigate('/case-tracker')}
          className="w-fit text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
        >
          Back to Case Tracker
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 text-sm">
        <Link
          to="/case-tracker"
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          Case Tracker
        </Link>
        <Icon name="chevronRight" size={14} className="text-zinc-300" />
        <span className="font-semibold text-brand dark:text-brand-dark">
          #{c.id}
        </span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${LIFECYCLE_STYLES[c.lifecycleStatus]}`}
          >
            {c.lifecycleStatus}
          </span>
          <h1 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Case #{c.id}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Icon name="edit" size={14} />
            Edit Case
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
            <Icon name="close" size={14} />
            Close Case
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-50">
              <Icon name="info" size={16} className="text-zinc-400" />
              Case Overview
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {c.overview}
            </p>
            <div className="mt-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Court / Jurisdiction
              </p>
              <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {c.jurisdiction}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-50">
                Driver Assigned
                <Icon name="truck" size={16} className="text-zinc-400" />
              </h3>
              {driver ? (
                <Link
                  to="/drivers"
                  className="mt-3 flex items-center gap-3 rounded-lg transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {driver.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      Employee ID: {driver.employeeId}
                    </p>
                    <p className="text-xs text-zinc-400">
                      License: {driver.licenseNumber}
                    </p>
                  </div>
                </Link>
              ) : (
                <p className="mt-3 text-sm text-zinc-400">No driver linked to this case.</p>
              )}
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-50">
                Lead Attorney
                <Icon name="briefcase" size={16} className="text-zinc-400" />
              </h3>
              <p className="mt-0.5 text-xs text-zinc-400">
                Handled offline by counsel · internal reference only, not visible to fleet managers
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={c.attorney.photo}
                  alt={c.attorney.name}
                  className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {c.attorney.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    Bar License: {c.attorney.barLicenseNumber}
                  </p>
                  <a
                    href={`tel:${c.attorney.phone}`}
                    className="text-xs font-semibold text-brand hover:underline dark:text-brand-dark"
                  >
                    Direct: {c.attorney.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
              Document Vault
            </h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {c.documents.length} FILES
            </span>
          </div>
          <div className="mt-3 flex max-h-72 flex-col gap-2 overflow-y-auto">
            {c.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-lg border border-zinc-100 p-2.5 dark:border-zinc-800"
              >
                <span
                  className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-md ${DOC_ICON_TONES[doc.type]}`}
                >
                  <Icon name="file" size={14} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {doc.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {doc.date} · {doc.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
