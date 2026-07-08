import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import Icon from './Icon.jsx'

export default function AdminHeader() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative w-full max-w-sm">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
          <Icon name="search" size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entities, personnel..."
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
        />
      </div>

      <div className="flex flex-shrink-0 items-center gap-4">
        <button className="relative grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <Icon name="bell" size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-zinc-200 font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
            {user.name.charAt(0)}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Admin Console
            </p>
            <p className="text-[11px] text-zinc-400">{user.name}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
