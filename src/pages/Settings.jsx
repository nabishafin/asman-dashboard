import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Icon from '../components/Icon.jsx'

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    fullName: user.name,
    email: user.email,
    phone: '+1 (555) 902-4410',
    jobTitle: 'Regional Operations Director',
  })
  const [savedMsg, setSavedMsg] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')

  const setField = (key) => (e) =>
    setProfile((p) => ({ ...p, [key]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    setSavedMsg('Profile changes saved.')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    setPwError('')
    setPwSuccess('')
    if (pw.next.length < 12) {
      setPwError('New password must be at least 12 characters.')
      return
    }
    if (pw.next !== pw.confirm) {
      setPwError('New password and confirmation do not match.')
      return
    }
    setPw({ current: '', next: '', confirm: '' })
    setPwSuccess('Password updated successfully.')
    setTimeout(() => setPwSuccess(''), 2500)
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your personal information, security preferences, and account
          credentials.
        </p>
      </div>

      <div className="border-b border-zinc-100 pb-2 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        Profile Information
      </div>

      {/* profile information */}
      <form
        onSubmit={handleSave}
        className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-bold text-zinc-900 dark:text-zinc-50">
              Profile Information
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Update your basic details and profile visibility.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {savedMsg && (
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                {savedMsg}
              </span>
            )}
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-shrink-0 flex-col items-center gap-2">
            <div className="relative">
              <img
                src="/attorney-julian.jpg"
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-brand text-white dark:border-zinc-900"
              >
                <Icon name="edit" size={11} />
              </button>
            </div>
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              Profile Photo
            </p>
            <p className="text-center text-[11px] text-zinc-400">
              PNG, JPG up to 10MB
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={fieldLabel}>Full Name</label>
              <input
                value={profile.fullName}
                onChange={setField('fullName')}
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={setField('email')}
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={setField('phone')}
                className={fieldInput}
              />
            </div>
            <div>
              <label className={fieldLabel}>Job Title</label>
              <input
                value={profile.jobTitle}
                onChange={setField('jobTitle')}
                className={fieldInput}
              />
            </div>
          </div>
        </div>
      </form>

      {/* security & credentials */}
      <form
        onSubmit={handlePasswordUpdate}
        className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="font-bold text-zinc-900 dark:text-zinc-50">
          Security &amp; Credentials
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your password and advanced security protocols.
        </p>

        <p className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand dark:text-brand-dark">
          <Icon name="lock" size={13} />
          Update Password
        </p>

        <div className="mt-3 max-w-sm">
          <label className={fieldLabel}>Current Password</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={pw.current}
              onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))}
              className={fieldInput + ' pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute inset-y-0 right-2 mt-1.5 flex items-center text-zinc-400 hover:text-zinc-600"
            >
              <Icon name={showCurrent ? 'eyeOff' : 'eye'} size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={fieldLabel}>New Password</label>
            <input
              type="password"
              value={pw.next}
              onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))}
              placeholder="Min. 12 characters"
              className={fieldInput}
            />
          </div>
          <div>
            <label className={fieldLabel}>Confirm New Password</label>
            <input
              type="password"
              value={pw.confirm}
              onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))}
              placeholder="Repeat new password"
              className={fieldInput}
            />
          </div>
        </div>

        {pwError && (
          <p className="mt-3 text-xs font-semibold text-red-500">{pwError}</p>
        )}
        {pwSuccess && (
          <p className="mt-3 text-xs font-semibold text-green-600 dark:text-green-400">
            {pwSuccess}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
        >
          Update Password
        </button>
      </form>

      {/* danger zone */}
      <div className="flex items-center justify-between rounded-xl border border-red-200 bg-white p-5 dark:border-red-500/30 dark:bg-zinc-900">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Sign out of your account
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            You will need to sign in again to access the dashboard.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Icon name="logout" size={15} />
          Logout
        </button>
      </div>
    </div>
  )
}
