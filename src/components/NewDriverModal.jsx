import Icon from './Icon.jsx'

function SectionLabel({ children }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/10 text-brand dark:text-brand-dark">
        <Icon name="user" size={12} />
      </span>
      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
        {children}
      </span>
    </div>
  )
}

function UploadBox({ label, hint }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-8 text-center transition hover:border-brand/40 dark:border-zinc-700 dark:bg-zinc-800/50">
      <input type="file" accept="image/png,application/pdf" className="hidden" />
      <Icon name="upload" size={20} className="text-zinc-400" />
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <p className="text-xs text-zinc-400">{hint}</p>
      </div>
    </label>
  )
}

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

export default function NewDriverModal({ open, onClose }) {
  if (!open) return null

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
        <div className="flex items-center justify-between border-b border-zinc-100 p-6 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            New Driver Registration
          </h2>
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
          {/* personal information */}
          <div>
            <SectionLabel>Personal Information</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>Full Name</label>
                <input
                  placeholder="e.g. Johnathan Smith"
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Employee ID</label>
                <input placeholder="ASM-992-X" className={fieldInput} />
              </div>
              <div>
                <label className={fieldLabel}>Contact Email</label>
                <input
                  type="email"
                  placeholder="driver@asman.io"
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={fieldInput}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={fieldLabel}>Upload Profile image</label>
              <div className="mt-1.5">
                <UploadBox label="Image" hint="PNG (Max 10MB)" />
              </div>
            </div>
          </div>

          {/* professional credentials */}
          <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
            <SectionLabel>Professional Credentials</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={fieldLabel}>License Number</label>
                <input placeholder="e.g. ABC123456" className={fieldInput} />
              </div>
              <div>
                <label className={fieldLabel}>License Expiration Date</label>
                <input type="date" className={fieldInput} />
              </div>
            </div>
          </div>

          {/* document upload */}
          <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
            <SectionLabel>Document Upload</SectionLabel>
            <UploadBox label="License Document" hint="PDF, PNG (Max 10MB)" />
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end border-t border-zinc-100 p-6 pt-4 dark:border-zinc-800">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
          >
            <Icon name="userPlus" size={16} /> Register
          </button>
        </div>
      </form>
    </div>
  )
}
