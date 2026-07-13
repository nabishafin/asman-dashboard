import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Icon from './Icon.jsx'

const ROUTE_TITLES = {
  '/': 'Dashboard',
  '/fleets': 'Fleet Network',
  '/fleets/onboard': 'Partner Onboarding',
  '/users': 'System Users',
  '/settings': 'System Settings',
  '/templates': 'Legal Templates',
  '/case-tracker': 'Habeas Corpus Tracker',
  '/intelligence': 'National Intelligence',
  '/sos-incidents': 'SOS & Critical Incidents',
  '/subscription/plans': 'Subscription Plans',
  '/my-fleet': 'Fleet Dashboard',
  '/vehicles': 'Fleet Vehicles',
  '/drivers': 'Fleet Drivers',
  '/attorneys': 'Attorney Network',
  '/case-status': 'Case Tracker',
  '/subscription': 'Subscription',
}

function getPageTitle(pathname) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname]
  
  if (pathname.startsWith('/case-tracker/')) return 'Case Details'
  if (pathname.startsWith('/attorneys/')) return 'Attorney Profile'
  if (pathname.startsWith('/my-fleet/vehicle/')) return 'Vehicle Details'
  if (pathname.startsWith('/facility/')) return 'Detention Center'
  
  return 'Dashboard'
}

export default function AdminHeader() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  
  const pageTitle = getPageTitle(location.pathname)

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          title="Go back"
        >
          <Icon name="arrowLeft" size={18} />
        </button>
        <h1 className="text-lg font-bold text-zinc-900 hidden sm:block dark:text-zinc-50 min-w-[200px]">
          {pageTitle}
        </h1>
      </div>

      <div className="flex flex-1 sm:flex-none items-center justify-end gap-4 w-full sm:w-auto">
        <div className="relative w-full max-w-xs">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            <Icon name="search" size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entities, personnel..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>

        <button className="relative flex-shrink-0 grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <Icon name="bell" size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="flex flex-shrink-0 items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-200 font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
            {user.name.charAt(0)}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Admin Console
            </p>
            <p className="text-xs text-zinc-400">{user.name}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
