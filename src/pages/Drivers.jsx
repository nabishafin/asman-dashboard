import { useState } from 'react'
import { driverDirectory, caseStatusForDriver } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'
import NewDriverModal from '../components/NewDriverModal.jsx'

const CASE_STAGE_STYLES = {
  filed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  decision: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
}
const CASE_STAGE_LABELS = { filed: 'Filed', pending: 'Pending', decision: 'Decision' }

const PAGE_SIZE = 4

const LICENSE_STYLES = {
  valid: 'bg-green-500/15 text-green-600 dark:text-green-400',
  expiring: 'bg-red-500/15 text-red-600 dark:text-red-400',
  pending: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
}
const LICENSE_LABELS = {
  valid: 'Valid',
  expiring: 'Expiring Soon',
  pending: 'Pending',
}
const RISK_STYLES = {
  low: 'bg-green-500',
  high: 'bg-red-500',
  med: 'bg-zinc-400',
}
const RISK_LABELS = { low: 'Low', high: 'High', med: 'Med' }
const STATUS_TEXT_STYLES = {
  valid: 'text-green-600 dark:text-green-400',
  expiring: 'text-red-500',
  pending: 'text-indigo-500',
}

function DriverDetailPanel({ driver, onClose }) {
  const cases = caseStatusForDriver(driver.id)

  return (
    <div className="relative flex h-full flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
      >
        <Icon name="close" size={16} />
      </button>

      <img
        src={driver.photo}
        alt={driver.name}
        className="h-20 w-20 rounded-full object-cover ring-4 ring-brand/15"
      />
      <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
        {driver.name}
      </p>

      <div className="mt-3 rounded-lg bg-zinc-50 px-5 py-2 dark:bg-zinc-800">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          Status
        </p>
        <p
          className={`text-sm font-bold ${STATUS_TEXT_STYLES[driver.licenseStatus]}`}
        >
          {LICENSE_LABELS[driver.licenseStatus]}
        </p>
      </div>

      <div className="mt-6 w-full border-t border-zinc-100 pt-5 text-left dark:border-zinc-800">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
          Personal Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-zinc-400">Employee ID</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              {driver.employeeId}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Joined Date</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              {driver.joinedDate}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-zinc-400">Contact Email</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              {driver.email}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full border-t border-zinc-100 pt-5 text-left dark:border-zinc-800">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
          License Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-zinc-400">License Number</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              {driver.licenseNumber}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Expiration Date</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              {driver.licenseExpiration}
            </p>
          </div>
        </div>
      </div>

      {cases.length > 0 && (
        <div className="mt-5 w-full border-t border-zinc-100 pt-5 text-left dark:border-zinc-800">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
            Case Status
          </p>
          <div className="flex flex-col gap-2">
            {cases.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800"
              >
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  #{c.id}
                </span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${CASE_STAGE_STYLES[c.stage]}`}
                >
                  {CASE_STAGE_LABELS[c.stage]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/5 dark:border-zinc-700 dark:text-brand-dark">
        <Icon name="file" size={15} />
        View Documents
      </button>
      <button className="mt-3 w-full rounded-lg border border-zinc-200 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
        Edit Profile
      </button>
    </div>
  )
}

export default function Drivers() {
  const [selectedId, setSelectedId] = useState(driverDirectory[0]?.id ?? null)
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const selected = driverDirectory.find((d) => d.id === selectedId) ?? null

  const pageCount = Math.max(1, Math.ceil(driverDirectory.length / PAGE_SIZE))
  const pageRows = driverDirectory.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Driver Directory
          </h1>
          <p className="mt-1 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
            Manage institutional fleet personnel and onboarding compliance.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="userPlus" size={16} /> Add New Driver
        </button>
      </div>

      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Driver Name
                  </th>
                  <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    License Status
                  </th>
                  <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Risk Level
                  </th>
                  <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Total Dispatches
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedId(d.id)}
                    className={
                      'cursor-pointer border-t border-zinc-100 transition-colors dark:border-zinc-800 ' +
                      (selectedId === d.id
                        ? 'bg-brand/5'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60')
                    }
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={d.photo}
                          alt={d.name}
                          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {d.name}
                          </p>
                          <p className="text-xs text-zinc-400">
                            ID: {d.employeeId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${LICENSE_STYLES[d.licenseStatus]}`}
                      >
                        {LICENSE_LABELS[d.licenseStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200">
                        <span
                          className={`h-2 w-2 rounded-full ${RISK_STYLES[d.riskLevel]}`}
                        />
                        {RISK_LABELS[d.riskLevel]}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                      {d.dispatches.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
            <p className="text-xs text-zinc-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, driverDirectory.length)} of{' '}
              {driverDirectory.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="grid h-7 w-7 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <Icon
                  name="chevronRight"
                  size={14}
                  className="rotate-180"
                />
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={
                    'grid h-7 w-7 place-items-center rounded-lg text-xs font-semibold transition ' +
                    (p === page
                      ? 'bg-brand text-white'
                      : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800')
                  }
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="grid h-7 w-7 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <Icon name="chevronRight" size={14} />
              </button>
            </div>
          </div>
        </div>

        {selected && (
          <DriverDetailPanel
            driver={selected}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>

      <NewDriverModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
