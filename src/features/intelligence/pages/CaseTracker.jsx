import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { legalCases, driverDirectory } from '../../../data/mockData.js'

import Icon from '../../../components/common/Icon.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { FilterSelect } from '../../../components/ui/FilterSelect.jsx'
import { FilterCard } from '../../../components/ui/FilterCard.jsx'
import InitiateCaseModal from '../../../components/InitiateCaseModal.jsx'

const STATUS_FILTERS = ['All', 'Active', 'Failed', 'Completed']

// Case lifecycle status (drives the filter tabs and the Status column badge).
const STATUS_STYLES = {
  active: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  failed: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
}
const STATUS_LABELS = { active: 'Active', failed: 'Failed', completed: 'Completed' }

function StatTile({ icon, tone, label, value }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <span className={`grid h-9 w-9 place-items-center rounded-lg ${tone}`}>
        <Icon name={icon} size={16} />
      </span>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <p className="mt-0.5 text-xl font-bold text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
    </div>
  )
}

export default function CaseTracker() {
  const navigate = useNavigate()
  const [cases, setCases] = useState(legalCases)
  const [modalOpen, setModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 50

  const handleCreated = (newCase) => setCases((prev) => [newCase, ...prev])

  const visibleCases = cases.filter((c) => {
    const matchesStatus = statusFilter === 'All' || STATUS_LABELS[c.lifecycleStatus || 'active'] === statusFilter;
    const matchesSearch = !searchQuery || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.court.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  })

  const totalPages = Math.ceil(visibleCases.length / ITEMS_PER_PAGE)
  const paginatedCases = visibleCases.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset page when filter changes
  const handleFilterChange = (val) => {
    setStatusFilter(val || 'All')
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <StatTile
          icon="clipboard"
          tone="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          label="Active Cases"
          value="150"
        />
        <StatTile
          icon="check"
          tone="bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
          label="Completed Cases"
          value="2,045"
        />
        <StatTile
          icon="ban"
          tone="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
          label="Failed Cases"
          value="50"
        />
        <StatTile
          icon="folder"
          tone="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          label="Total Cases"
          value="2,245"
        />
        <StatTile
          icon="calendar"
          tone="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
          label="Upcoming Hearings"
          value="122"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* left side: filters */}
        <FilterCard 
          hasActiveFilters={statusFilter !== 'All' || searchQuery !== ''}
          onClear={() => { handleFilterChange('All'); setSearchQuery(''); }}
        >
          <div className="relative flex items-center">
            <Icon name="search" size={14} className="absolute left-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search ID or Court..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-900 outline-none transition focus:border-brand focus:ring-1 focus:ring-brand dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-brand-dark dark:focus:ring-brand-dark sm:w-64"
            />
          </div>
          <FilterSelect
            label="All Statuses"
            value={statusFilter === 'All' ? '' : statusFilter}
            options={STATUS_FILTERS.filter(s => s !== 'All')}
            onChange={handleFilterChange}
          />
        </FilterCard>

        {/* right side: action */}
        <Button
          variant="primary"
          icon="plus"
          onClick={() => setModalOpen(true)}
        >
          Add Case
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 p-5 pb-4 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
            Active Case Directory
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Case ID
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Driver
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Attorney <span className="normal-case text-zinc-300">(internal)</span>
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Status
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Court
                </th>
                <th className="px-5 pb-3 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Hearing Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCases.map((c) => {
                const driver = driverDirectory.find((d) => d.id === c.driverId)
                return (
                <tr key={c.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => navigate(`/case-tracker/${c.id}`)}
                      className="font-semibold text-brand hover:underline dark:text-brand-dark"
                    >
                      #{c.id}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={driver?.photo}
                        alt={driver?.name}
                        className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                      />
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {driver?.name ?? 'Unknown driver'}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    <span title="Handled offline by legal counsel — internal reference only">
                      {c.attorney.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.lifecycleStatus || 'active']}`}
                    >
                      {STATUS_LABELS[c.lifecycleStatus || 'active']}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    {c.court}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                    {c.hearingDate}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>

          {visibleCases.length === 0 && (
            <p className="py-10 text-center text-sm text-zinc-400">
              No active cases.
            </p>
          )}
          
          {visibleCases.length > 0 && (
            <div className="flex items-center justify-between border-t border-zinc-100 p-4 px-5 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <span>
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, visibleCases.length)} of{' '}
                {visibleCases.length} entries
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-md px-3 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 disabled:hover:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-800 dark:disabled:text-zinc-500"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-md bg-zinc-100 px-3 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-200 disabled:text-zinc-400 disabled:opacity-50 disabled:hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>



      <InitiateCaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  )
}
