import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import HabeasCorpusTracker from './HabeasCorpusTracker.jsx'
import IntelMap from '../components/intel/IntelMap.jsx'
import DetentionCorporations from '../components/intel/DetentionCorporations.jsx'
import NationalAttorneys from '../components/intel/NationalAttorneys.jsx'

const TABS = [
  { id: 'map', label: 'Intel Map', icon: 'map' },
  { id: 'hc', label: 'HC Tracker', icon: 'clipboard' },
  { id: 'attorneys', label: 'Attorneys', icon: 'briefcase' },
  { id: 'corps', label: 'Corporations', icon: 'building' },
]

export default function IntelligenceHub() {
  const [activeTab, setActiveTab] = useState('map')

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header & Tabs */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex overflow-x-auto rounded-lg bg-zinc-100 p-1 text-sm dark:bg-zinc-900">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                'flex shrink-0 items-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors ' +
                (activeTab === tab.id
                  ? 'bg-white text-brand shadow-sm dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-200')
              }
            >
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'map' && <IntelMap />}
        {activeTab === 'hc' && <HabeasCorpusTracker />}
        {activeTab === 'attorneys' && <NationalAttorneys />}
        {activeTab === 'corps' && <DetentionCorporations />}
      </div>
    </div>
  )
}
