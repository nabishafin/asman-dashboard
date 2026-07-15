import { Link, useNavigate, useParams } from 'react-router-dom'
import { attorneyAdmin } from '../../../data/mockData.js'
import Icon from '../../../components/common/Icon.jsx'

export default function AttorneyProfile() {
  const { attorneyId } = useParams()
  const navigate = useNavigate()
  const a = attorneyAdmin.find((x) => x.id === attorneyId)

  if (!a) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Attorney not found.
        </p>
        <button
          onClick={() => navigate('/attorneys')}
          className="w-fit text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
        >
          Back to Attorney Network
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-zinc-400">Admin</span>
        <Icon name="chevronRight" size={14} className="text-zinc-300" />
        <Link
          to="/attorneys"
          className="font-semibold text-brand hover:underline dark:text-brand-dark"
        >
          Attorney Network
        </Link>
      </div>

      {/* header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-start gap-4">
            <img
              src={a.photo}
              alt={a.name}
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {a.name}
                </h1>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  {a.contactBadge}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Icon name="mail" size={14} />
                  {a.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="phone" size={14} />
                  {a.phone}
                </span>
              </div>
            </div>
          </div>
          <button className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900">
            <Icon name="edit" size={14} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border-l-4 border-l-brand border-y border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Bar License Number
          </p>
          <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-50">
            {a.barLicenseNumber}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase text-green-600 dark:text-green-400">
            {a.licenseStatus}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Licensed In
          </p>
          <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-50">
            {a.licensedIn.join(', ')}
          </p>
          {a.multiStateCertified && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
              <Icon name="check" size={12} /> Multi-State Certified
            </p>
          )}
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Habeas Corpus Case Volume
          </p>
          <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-50">
            {a.caseVolume.total.toLocaleString()} Total
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            General: {a.caseVolume.general} | Internal: {a.caseVolume.internal}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Habeas Corpus Win Rate
          </p>
          <p className="mt-1 font-bold text-zinc-900 dark:text-zinc-50">
            {a.habeasWinRate}%
          </p>
        </div>
      </div>

      {/* details + bio */}
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 font-bold text-zinc-900 dark:text-zinc-50">
            Detailed Information
          </h3>

          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Office Location
          </p>
          <p className="mt-1 text-base text-zinc-700 dark:text-zinc-200">
            {a.officeLocation.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Language Preferences
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {a.languages.map((l) => (
              <span
                key={l}
                className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {l}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Specialties
          </p>
          <div className="mt-1.5 flex flex-col gap-2">
            {a.detailSpecialties.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200"
              >
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-md bg-brand/10 text-brand dark:text-brand-dark">
                  <Icon name={s.icon} size={13} />
                </span>
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 font-bold text-zinc-900 dark:text-zinc-50">
            Professional Summary
          </h3>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {a.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
