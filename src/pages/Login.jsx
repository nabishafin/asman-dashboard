import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Icon from '../components/Icon.jsx'
import AuthFooter from '../components/AuthFooter.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const res = login(email, password)
    if (res.ok) navigate('/', { replace: true })
    else setError(res.error)
  }

  const demo = (role, em, pw) => {
    setSelectedRole(role)
    setEmail(em)
    setPassword(pw)
    setError('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-sky-50/40 to-sky-100/50 text-zinc-800">
      <div className="h-1 w-full bg-brand" />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 py-10 lg:grid lg:grid-cols-2 lg:items-stretch lg:content-center lg:gap-16">
        {/* Left: pitch */}
        <section>
          <div className="mb-8 flex items-center gap-2 font-bold tracking-tight text-brand">
            <Icon name="shield" size={26} />
            <span className="text-xl text-zinc-900">ASMAN</span>
          </div>

          <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-xl">
            Precision in Enterprise Safety.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            Live route tracking, detention risk alerts, and attorney response for
            every driver on your network, in one view
          </p>

          <div className="relative mt-8 overflow-hidden rounded-xl border border-zinc-200 shadow-lg shadow-sky-900/5">
            <img
              src="/login.png"
              alt="ASMAN enterprise dashboard preview"
              className="h-52 w-full object-cover object-center sm:h-60"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          </div>
        </section>

        {/* Right: form */}
        <section className="flex w-full">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-md flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl shadow-sky-900/5"
          >
            <h2 className="text-xl font-bold text-zinc-900">Welcome Back</h2>

            <label className="mt-6 block text-sm font-medium text-zinc-600">
              Business Email
              <div className="relative mt-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.com"
                  autoComplete="username"
                  required
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 pr-10 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-brand/30"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  <Icon name="mail" size={18} />
                </span>
              </div>
            </label>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-zinc-600"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-brand hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-brand/30"
              />
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 accent-brand"
              />
              Remember this device
            </label>

            {error && (
              <div className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Sign In <Icon name="arrow" size={18} />
            </button>

            <div className="mt-6 flex gap-2 border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={() => demo('super_admin', 'admin@asman.com', 'admin123')}
                className={
                  'flex-1 rounded-lg border py-2 text-xs font-semibold transition ' +
                  (selectedRole === 'super_admin'
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-zinc-200 text-zinc-600 hover:border-brand/40 hover:text-brand')
                }
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => demo('fleet_owner', 'owner@asman.com', 'owner123')}
                className={
                  'flex-1 rounded-lg border py-2 text-xs font-semibold transition ' +
                  (selectedRole === 'fleet_owner'
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-zinc-200 text-zinc-600 hover:border-brand/40 hover:text-brand')
                }
              >
                Fleet Owner
              </button>
            </div>
          </form>
        </section>
      </main>

      <AuthFooter />
    </div>
  )
}
