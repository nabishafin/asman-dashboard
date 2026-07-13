import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { NAV_BY_ROLE, ROLE_LABELS, ROLES } from '../auth/roles.js'
import Icon from './Icon.jsx'
import AdminHeader from './AdminHeader.jsx'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const nav = NAV_BY_ROLE[user.role] || []
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 md:flex-row">
      <aside 
        className={`flex w-full flex-col gap-6 bg-zinc-900 p-4 shadow-xl transition-all duration-300 md:sticky md:top-0 md:h-screen md:flex-shrink-0 md:py-6 ${
          collapsed ? 'md:w-[88px]' : 'md:w-[248px]'
        }`}
      >
        {/* Brand */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between px-1'}`}>
          <div className={`flex items-center gap-2 ${collapsed ? 'hidden' : 'flex'}`}>
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-white/15 text-white backdrop-blur">
              <Icon name="shield" size={18} />
            </span>
            <div className="leading-none transition-opacity duration-300">
              <div className="text-base font-bold tracking-tight text-white">
                ASMAN
              </div>
              <div className="mt-0.5 text-[10px] font-semibold tracking-[0.15em] text-white/60">
                ENTERPRISE
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Icon name={collapsed ? "chevronRight" : "chevronLeft"} size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center rounded-lg py-2.5 transition-colors ${
                  collapsed ? 'justify-center px-0' : 'gap-3 px-3'
                } ${
                  isActive
                    ? 'bg-white font-semibold text-brand shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon name={item.icon} size={20} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Premium upsell (fleet owner) */}
        {user.role === ROLES.FLEET_OWNER && !collapsed && (
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur transition-opacity">
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
        <div className={`flex border-t border-white/15 pt-4 ${collapsed ? 'flex-col items-center gap-4' : 'flex-row items-center gap-2.5'}`}>
          <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white font-bold text-brand" title={collapsed ? user.name : undefined}>
            {user.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <strong className="truncate text-sm text-white">
                {user.name}
              </strong>
              <small className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {ROLE_LABELS[user.role]}
              </small>
            </div>
          )}
          <button
            onClick={handleLogout}
            title="Logout"
            className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white ${!collapsed && 'ml-auto'}`}
          >
            <Icon name="logout" size={16} />
          </button>
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
