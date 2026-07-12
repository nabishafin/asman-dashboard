import { useState } from 'react'
import Icon from '../components/Icon.jsx'

const LETTER_TEMPLATES = [
  {
    id: 'tpl1',
    name: 'Notice to Appear — Response Letter',
    category: 'Immigration Court',
    updated: 'Jun 18, 2026',
  },
  {
    id: 'tpl2',
    name: 'I-589 Asylum Application Cover Letter',
    category: 'Asylum',
    updated: 'May 30, 2026',
  },
  {
    id: 'tpl3',
    name: 'Employer Support Letter (EAD Sponsorship)',
    category: 'Employment Authorization',
    updated: 'May 2, 2026',
  },
  {
    id: 'tpl4',
    name: 'Habeas Corpus Petition Draft',
    category: 'Federal Court',
    updated: 'Apr 21, 2026',
  },
  {
    id: 'tpl5',
    name: 'Bond Hearing Request Letter',
    category: 'Detention',
    updated: 'Apr 9, 2026',
  },
]

function TemplateCard({ tpl }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-dark" />

      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand ring-4 ring-brand/10 transition group-hover:scale-110 dark:text-brand-dark">
        <Icon name="file" size={16} />
      </span>
      <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-50">{tpl.name}</p>
      <span className="mt-1 w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        {tpl.category}
      </span>
      <p className="mt-3 flex-1 text-xs text-zinc-400">Last updated {tpl.updated}</p>
      <div className="mt-4 flex items-center gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <Icon name="eye" size={13} />
          Preview
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <Icon name="edit" size={13} />
          Edit
        </button>
      </div>
    </div>
  )
}

export default function Templates() {
  const [search, setSearch] = useState('')

  const visible = LETTER_TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Templates
          </h1>
          <p className="mt-1 max-w-lg text-sm text-zinc-500 dark:text-zinc-400">
            Letter and document templates used by legal counsel for case
            filings and correspondence.
          </p>
        </div>
        <div className="relative">
          <Icon
            name="search"
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-56 rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tpl) => (
          <TemplateCard key={tpl.id} tpl={tpl} />
        ))}

        <button className="flex min-h-[190px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 text-zinc-400 transition hover:border-brand/40 hover:text-brand dark:border-zinc-700 dark:hover:text-brand-dark">
          <Icon name="plus" size={20} />
          <span className="text-sm font-semibold">Add New Template</span>
        </button>

        {visible.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-zinc-400">
            No templates match your search.
          </p>
        )}
      </div>
    </div>
  )
}
