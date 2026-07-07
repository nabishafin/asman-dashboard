import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Icon from '../components/Icon.jsx'
import AuthFooter from '../components/AuthFooter.jsx'

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <span className="text-brand">
        <Icon name={icon} size={20} />
      </span>
      <h3 className="mt-2 text-sm font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">{text}</p>
    </div>
  )
}

const fieldWrap =
  'relative mt-1.5'
const inputCls =
  'w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 pl-10 text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30'
const iconCls =
  'pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400'
const labelCls = 'block text-sm font-medium text-zinc-600'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    const res = register({
      name: form.name,
      email: form.email,
      org: form.org,
      password: form.password,
    })
    if (res.ok) navigate('/', { replace: true })
    else setError(res.error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-sky-50/40 to-sky-100/50 text-zinc-800">
      {/* Top bar */}
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3.5 font-bold tracking-tight text-white">
          <span className="text-brand-dark">
            <Icon name="shield" size={22} />
          </span>
          ASMAN
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 py-10 lg:grid lg:grid-cols-2 lg:items-stretch lg:content-center lg:gap-16">
        {/* Left: pitch */}
        <section className="flex flex-col">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            Join the <span className="text-brand">Network</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
            Live route tracking, detention risk alerts, and attorney response for
            every driver on your network, in one view
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Feature
              icon="shield"
              title="Institutional Trust"
              text="Military-grade security protocols for global operations."
            />
            <Feature
              icon="bolt"
              title="Zenith Precision"
              text="Real-time data telemetry with sub-second latency."
            />
          </div>

          <div className="relative mt-6 h-56 overflow-hidden rounded-xl border border-zinc-200 shadow-lg shadow-sky-900/5 lg:h-auto lg:min-h-0 lg:max-h-72 lg:flex-1">
            <img
              src="/register.png"
              alt="Global fleet control room"
              className="h-full w-full object-cover object-center"
            />
            {/* dark tint over the image (clear, no blur) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/35" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <span className="text-[11px] font-semibold tracking-widest text-sky-300">
                ACTIVE DEPLOYMENT
              </span>
              <p className="text-sm font-semibold">Global Fleet Status: Nominal</p>
            </div>
          </div>
        </section>

        {/* Right: form */}
        <section className="w-full">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl shadow-sky-900/5"
          >
            <h2 className="text-2xl font-bold text-zinc-900">Create your account</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Access the next generation of enterprise safety.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="reg-name" className={labelCls}>
                  Full Name
                </label>
                <div className={fieldWrap}>
                  <span className={iconCls}>
                    <Icon name="user" size={18} />
                  </span>
                  <input
                    id="reg-name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-email" className={labelCls}>
                  Work Email
                </label>
                <div className={fieldWrap}>
                  <span className={iconCls}>
                    <Icon name="mail" size={18} />
                  </span>
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="name@enterprise.com"
                    autoComplete="username"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-org" className={labelCls}>
                  Organization Name
                </label>
                <div className={fieldWrap}>
                  <span className={iconCls}>
                    <Icon name="building" size={18} />
                  </span>
                  <input
                    id="reg-org"
                    value={form.org}
                    onChange={set('org')}
                    placeholder="Global Logistics Corp"
                    autoComplete="organization"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reg-pw" className={labelCls}>
                    Password
                  </label>
                  <div className={fieldWrap}>
                    <span className={iconCls}>
                      <Icon name="lock" size={18} />
                    </span>
                    <input
                      id="reg-pw"
                      type="password"
                      value={form.password}
                      onChange={set('password')}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reg-confirm" className={labelCls}>
                    Confirm Password
                  </label>
                  <div className={fieldWrap}>
                    <span className={iconCls}>
                      <Icon name="lock" size={18} />
                    </span>
                    <input
                      id="reg-confirm"
                      type="password"
                      value={form.confirm}
                      onChange={set('confirm')}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 text-[15px] font-semibold text-white transition hover:brightness-110"
            >
              Create Account <Icon name="arrow" size={18} />
            </button>

            <div className="my-5 flex items-center gap-3 text-[11px] font-semibold tracking-widest text-zinc-400">
              <span className="h-px flex-1 bg-zinc-200" />
              OR CONTINUE WITH
              <span className="h-px flex-1 bg-zinc-200" />
            </div>

            <p className="text-center text-sm text-zinc-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand hover:underline">
                Sign In
              </Link>
            </p>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-400">
              By creating an account, you agree to ASMAN&apos;s Institutional Terms
              of Service, Security Protocols, and Data Retention Policy.
            </p>
          </form>
        </section>
      </main>

      <AuthFooter />
    </div>
  )
}
