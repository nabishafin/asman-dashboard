import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/context/AuthContext.jsx'
import { ROLE_LABELS } from '../../../features/auth/utils/roles.js'
import Icon from '../../../components/common/Icon.jsx'

const fieldLabel = 'block text-xs font-medium text-zinc-500 dark:text-zinc-400'
const fieldInput =
  'mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50'

const CHANNELS = [
  {
    key: 'email',
    icon: 'mail',
    title: 'Email Notifications',
    detail: 'Detailed reports and compliance logs',
    defaultOn: true,
  },
  {
    key: 'push',
    icon: 'phone',
    title: 'Push Alerts',
    detail: 'Real-time logistic corridor updates',
    defaultOn: true,
  },
  {
    key: 'sms',
    icon: 'message',
    title: 'SMS Critical',
    detail: 'Emergency security override alerts only',
    defaultOn: false,
  },
]

const SESSIONS = [
  {
    id: 'sess-current',
    icon: 'compass',
    device: 'Chrome · macOS',
    location: 'Austin, TX · 10.0.4.18',
    lastActive: 'Active now',
    current: true,
  },
  {
    id: 'sess-ipad',
    icon: 'layers',
    device: 'Safari · iPad',
    location: 'Dallas, TX · 172.16.9.2',
    lastActive: '3 hours ago',
    current: false,
  },
  {
    id: 'sess-mobile',
    icon: 'phone',
    device: 'ASMAN Mobile · Android',
    location: 'Houston, TX · 192.168.1.77',
    lastActive: 'Yesterday',
    current: false,
  },
]

function ToggleSwitch({ checked, onChange, accent = false }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        'relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ' +
        (checked ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-700')
      }
    >
      <span
        className={
          'absolute top-0.5 grid h-5 w-5 place-items-center rounded-full bg-white shadow transition-transform dark:bg-zinc-900 ' +
          (checked ? 'translate-x-5' : 'translate-x-0.5')
        }
      >
        {accent && checked && (
          <span className="grid h-3 w-3 place-items-center rounded-full bg-brand text-white">
            <Icon name="check" size={8} />
          </span>
        )}
      </span>
    </button>
  )
}

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} size={15} className="text-zinc-400" />
      <h2 className="font-bold text-zinc-900 dark:text-zinc-50">{children}</h2>
    </div>
  )
}

function ReadField({ icon, children }) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon name={icon} size={13} />
      {children}
    </span>
  )
}

export default function SuperAdminSettings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [editingProfile, setEditingProfile] = useState(false)
  const [profile, setProfile] = useState({
    fullName: user.name,
    email: user.email,
    phone: '+1 (555) 118-2200',
    jobTitle: 'Senior Logistics Officer',
  })
  const [draft, setDraft] = useState(profile)
  const [profileSaved, setProfileSaved] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')

  const [twoFactor, setTwoFactor] = useState(true)
  const [globalAlerts, setGlobalAlerts] = useState(true)
  const [channels, setChannels] = useState(
    Object.fromEntries(CHANNELS.map((c) => [c.key, c.defaultOn]))
  )
  const [sessions, setSessions] = useState(SESSIONS)

  const startEdit = () => {
    setDraft(profile)
    setEditingProfile(true)
  }

  const cancelEdit = () => {
    setDraft(profile)
    setEditingProfile(false)
  }

  const setDraftField = (key) => (e) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }))

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setProfile(draft)
    setEditingProfile(false)
    setProfileSaved('Profile updated.')
    setTimeout(() => setProfileSaved(''), 2500)
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    setPwError('')
    setPwSuccess('')
    if (!pw.current) {
      setPwError('Enter your current password to continue.')
      return
    }
    if (pw.next.length < 12) {
      setPwError('New password must be at least 12 characters.')
      return
    }
    if (pw.next !== pw.confirm) {
      setPwError('New password and confirmation do not match.')
      return
    }
    setPw({ current: '', next: '', confirm: '' })
    setPwSuccess('Password updated.')
    setTimeout(() => setPwSuccess(''), 2500)
  }

  const revokeSession = (id) =>
    setSessions((prev) => prev.filter((s) => s.id !== id))

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const initial = profile.fullName.trim().charAt(0).toUpperCase() || 'A'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-zinc-400">Workspace</span>
        <Icon name="chevronRight" size={13} className="text-zinc-300" />
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">Account Settings</span>
      </div>


      {/* profile */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-xl font-bold text-white">
                {initial}
              </span>
              <button
                type="button"
                onClick={startEdit}
                className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-zinc-900 text-white dark:border-zinc-900"
              >
                <Icon name="edit" size={11} />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                  {profile.fullName}
                </p>
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand">
                  {ROLE_LABELS[user.role]}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                <ReadField icon="briefcase">{profile.jobTitle}</ReadField>
                <ReadField icon="mail">{profile.email}</ReadField>
                <ReadField icon="phone">{profile.phone}</ReadField>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {profileSaved && (
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                {profileSaved}
              </span>
            )}
            {!editingProfile && (
              <button
                type="button"
                onClick={startEdit}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {editingProfile && (
          <form
            onSubmit={handleSaveProfile}
            className="mt-5 border-t border-zinc-100 pt-5 dark:border-zinc-800"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={fieldLabel}>Full Name</label>
                <input
                  value={draft.fullName}
                  onChange={setDraftField('fullName')}
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Job Title</label>
                <input
                  value={draft.jobTitle}
                  onChange={setDraftField('jobTitle')}
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Email Address</label>
                <input
                  type="email"
                  value={draft.email}
                  onChange={setDraftField('email')}
                  className={fieldInput}
                />
              </div>
              <div>
                <label className={fieldLabel}>Phone Number</label>
                <input
                  type="tel"
                  value={draft.phone}
                  onChange={setDraftField('phone')}
                  className={fieldInput}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* security */}
      <SectionTitle icon="lock">Security Architecture</SectionTitle>
      <form
        onSubmit={handleSavePassword}
        className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Update Password</h3>
        <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
          Ensure your account remains institutional-grade secure by using a complex, rotated
          passphrase.
        </p>

        <div className="mt-4 max-w-sm">
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
              placeholder="Re-enter new passphrase"
              className={fieldInput}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          {pwError && (
            <span className="text-xs font-semibold text-red-500">{pwError}</span>
          )}
          {pwSuccess && (
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              {pwSuccess}
            </span>
          )}
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Save Password
          </button>
        </div>
      </form>

      {/* two-factor authentication */}
      <SectionTitle icon="shield">Two-Factor Authentication</SectionTitle>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <Icon name="shield" size={18} />
            </span>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                Authenticator App
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Require a time-based one-time code at sign-in.
              </p>
            </div>
          </div>
          <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} accent />
        </div>

        <div
          className={
            'mt-4 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold ' +
            (twoFactor
              ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400'
              : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400')
          }
        >
          <Icon name={twoFactor ? 'check' : 'warning'} size={14} />
          {twoFactor
            ? 'Two-factor authentication is active on this account.'
            : 'Your account is not protected by two-factor authentication.'}
        </div>
      </div>

      {/* notifications */}
      <SectionTitle icon="bell">System Notifications</SectionTitle>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">Global Alerts</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Enable or disable all automated platform notifications.
            </p>
          </div>
          <ToggleSwitch checked={globalAlerts} onChange={setGlobalAlerts} accent />
        </div>

        <p className="mt-5 border-t border-zinc-100 pt-5 text-xs font-bold uppercase tracking-wide text-zinc-400 dark:border-zinc-800">
          Delivery Channels
        </p>

        <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
          {CHANNELS.map((c) => (
            <div key={c.key} className="flex items-center justify-between gap-3 py-3.5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <Icon name={c.icon} size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {c.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.detail}</p>
                </div>
              </div>
              <ToggleSwitch
                checked={globalAlerts && channels[c.key]}
                onChange={(v) => setChannels((prev) => ({ ...prev, [c.key]: v }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* active sessions */}
      <SectionTitle icon="globe">Active Sessions</SectionTitle>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Devices currently signed in to this account. Revoke any you don&apos;t recognize.
        </p>
        <div className="mt-3 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 py-3.5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <Icon name={s.icon} size={15} />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {s.device}
                    {s.current && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-green-700 dark:bg-green-500/15 dark:text-green-400">
                        This device
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {s.location} · {s.lastActive}
                  </p>
                </div>
              </div>
              {!s.current && (
                <button
                  type="button"
                  onClick={() => revokeSession(s.id)}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* danger zone */}
      <div className="flex items-center justify-between rounded-xl border border-red-200 bg-white p-5 dark:border-red-500/30 dark:bg-zinc-900">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Sign out of your account
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            You will need to sign in again to access the console.
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
