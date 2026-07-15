import { useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { legalCases, driverDirectory } from '../../../data/mockData.js'
import Icon from '../../../components/common/Icon.jsx'
import { Button } from '../../../components/ui/Button.jsx'

const LIFECYCLE_STYLES = {
  active: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  completed: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
  failed: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  closed: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  hearing: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  cancelled: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200',
  reopened: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
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
  
  const [lifecycleStatus, setLifecycleStatus] = useState(c?.lifecycleStatus || 'active')
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [pendingStatus, setPendingStatus] = useState('')
  const [statusSummary, setStatusSummary] = useState('')
  const [docs, setDocs] = useState(c?.documents || [])
  const fileInputRef = useRef(null)

  const handleUpdateStatusClick = () => {
    setPendingStatus(lifecycleStatus)
    setStatusSummary('')
    setStatusModalOpen(true)
  }

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const ext = file.name.split('.').pop().toLowerCase()
      const newDoc = {
        id: `d-${Date.now()}`,
        name: file.name,
        type: ['pdf', 'zip', 'doc'].includes(ext) ? ext : 'pdf',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        size: (file.size / 1024).toFixed(1) + ' KB'
      }
      const updated = [newDoc, ...docs]
      setDocs(updated)
      if (c) c.documents = updated
    }
  }

  const handleRemoveDoc = (id) => {
    const updated = docs.filter(d => d.id !== id)
    setDocs(updated)
    if (c) c.documents = updated
  }

  const saveStatus = () => {
    if (c) {
      c.lifecycleStatus = pendingStatus
      if (!c.timeline) c.timeline = []
      c.timeline.unshift({
        id: `t-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: pendingStatus,
        summary: statusSummary.trim() || `Status updated to ${pendingStatus}`,
      })
    }
    setLifecycleStatus(pendingStatus)
    setStatusModalOpen(false)
  }

  if (!c) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Case not found.
        </p>
        <Button
          variant="ghost"
          onClick={() => navigate('/case-tracker')}
        >
          Back to Case Tracker
        </Button>
      </div>
    )
  }

  return (
    <>
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
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${LIFECYCLE_STYLES[lifecycleStatus]}`}
          >
            {lifecycleStatus}
          </span>
          <h1 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Case #{c.id}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon="edit">
            Edit Case
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          {/* Top Row: Driver & Attorney */}
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
                Handled offline by counsel · internal reference
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

          {/* Case Overview */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-50">
              <Icon name="info" size={16} className="text-zinc-400" />
              Case Overview
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {c.overview}
            </p>
            <div className="mt-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800 sm:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Court / Jurisdiction
              </p>
              <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {c.jurisdiction}
              </p>
            </div>
          </div>

          {/* Document Vault */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
                Document Vault
              </h3>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {docs.length} FILES
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Document
                </Button>
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleUpload} />
              </div>
            </div>
            
            <div className="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto">
              {docs.length === 0 ? (
                <p className="text-sm text-zinc-400">No documents uploaded yet.</p>
              ) : (
                docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-zinc-100 p-2.5 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-md ${DOC_ICON_TONES[doc.type] || DOC_ICON_TONES.pdf}`}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      icon="trash"
                      onClick={() => handleRemoveDoc(doc.id)}
                      className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Status History */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-50">
                <Icon name="clock" size={16} className="text-zinc-400" />
                Case History
              </h3>
              <Button 
                variant="primary"
                size="sm"
                onClick={handleUpdateStatusClick}
              >
                Update Status
              </Button>
            </div>
            <div className="mt-6 flex flex-col gap-5">
              {(c.timeline || []).map((t, index) => (
                <div key={t.id || index} className="flex gap-3">
                  <div className="mt-0.5 flex flex-col items-center">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${LIFECYCLE_STYLES[t.status] || LIFECYCLE_STYLES.closed}`}>
                      {t.status}
                    </span>
                    {index !== (c.timeline.length - 1) && (
                      <div className="mt-1 h-full w-px bg-zinc-200 dark:bg-zinc-800"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs font-semibold text-zinc-400">{t.date}</p>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{t.summary}</p>
                  </div>
                </div>
              ))}
              {!(c.timeline && c.timeline.length > 0) && (
                <p className="text-sm text-zinc-400">No updates recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Update Case Status
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Please select the new status and provide a brief summary for the case history.
            </p>
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                New Status
              </label>
              <select
                value={pendingStatus}
                onChange={(e) => setPendingStatus(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm font-semibold text-zinc-900 outline-none focus:border-brand dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              >
                <option value="active">Active</option>
                <option value="hearing">Hearing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
                <option value="reopened">Re-opened</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                Summary Note
              </label>
              <textarea
                value={statusSummary}
                onChange={(e) => setStatusSummary(e.target.value)}
                rows={4}
                placeholder="e.g. Judge requested additional documents for review..."
                className="mt-4 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setStatusModalOpen(false)
                  setPendingStatus('')
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={saveStatus}
              >
                Save Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
