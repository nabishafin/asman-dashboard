import { useState } from 'react'
import Icon from '../components/Icon.jsx'

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

export default function SuperAdminSettings() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [pwSaved, setPwSaved] = useState('')

  const [globalAlerts, setGlobalAlerts] = useState(true)
  const [channels, setChannels] = useState(
    Object.fromEntries(CHANNELS.map((c) => [c.key, c.defaultOn]))
  )

  const handleSavePassword = (e) => {
    e.preventDefault()
    setPw({ current: '', next: '', confirm: '' })
    setPwSaved('Password updated.')
    setTimeout(() => setPwSaved(''), 2500)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-zinc-400">Workspace</span>
        <Icon name="chevronRight" size={13} className="text-zinc-300" />
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">Account Settings</span>
      </div>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Account Settings</h1>

      {/* profile */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              src="/attorney-david.jpg"
              alt="Alexander Vanguard"
              className="h-16 w-16 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-zinc-900 text-white dark:border-zinc-900">
              <Icon name="edit" size={11} />
            </button>
          </div>
          <div>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Alexander Vanguard
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Icon name="briefcase" size={13} />
                Senior Logistics Officer
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="mail" size={13} />
                a.vanguard@asman.institutional
              </span>
            </div>
          </div>
        </div>
        <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
          Edit Profile
        </button>
      </div>

      {/* security */}
      <SectionTitle icon="lock">Security Architecture</SectionTitle>
      <form
        onSubmit={handleSavePassword}
        className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Update Password</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
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
              placeholder="Enter new passphrase"
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
          {pwSaved && (
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              {pwSaved}
            </span>
          )}
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900"
          >
            Save Password
          </button>
        </div>
      </form>

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

        <p className="mt-5 border-t border-zinc-100 pt-5 text-[11px] font-bold uppercase tracking-wide text-zinc-400 dark:border-zinc-800">
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
                checked={channels[c.key]}
                onChange={(v) => setChannels((prev) => ({ ...prev, [c.key]: v }))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
