import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { NAV_BY_ROLE, ROLE_LABELS, ROLES } from '../auth/roles.js'
import Icon from './Icon.jsx'
import AdminHeader from './AdminHeader.jsx'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const nav = NAV_BY_ROLE[user.role] || []

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 md:flex-row">
      <aside className="flex w-full flex-col gap-6 border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:sticky md:top-0 md:h-screen md:w-[248px] md:flex-shrink-0 md:border-b-0 md:border-r md:py-6">
        {/* Brand */}
        <div className="flex items-center gap-2 px-1">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
            <Icon name="shield" size={18} />
          </span>
          <div className="leading-none">
            <div className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              ASMAN
            </div>
            <div className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-zinc-400">
              ENTERPRISE SAFETY
            </div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors ' +
                (isActive
                  ? 'bg-brand/10 font-semibold text-brand dark:text-brand-dark'
                  : 'text-zinc-600 hover:bg-brand/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100')
              }
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Premium upsell (fleet owner) */}
        {user.role === ROLES.FLEET_OWNER && (
          <div className="rounded-xl bg-gradient-to-br from-brand to-[#004a66] p-4 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Icon name="star" size={16} />
              PREMIUM PLAN
            </div>
            <button className="mt-3 w-full rounded-lg bg-white/15 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25">
              Upgrade Now
            </button>
          </div>
        )}

        {/* User + logout */}
        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="flex min-w-0 flex-col leading-tight">
              <strong className="truncate text-sm text-zinc-900 dark:text-zinc-50">
                {user.name}
              </strong>
              <small className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                {ROLE_LABELS[user.role]}
              </small>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-brand/5 hover:text-brand"
            >
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex max-w-full flex-1 flex-col overflow-x-auto">
        {user.role === ROLES.SUPER_ADMIN && <AdminHeader />}
        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
