import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import HabeasCorpusTracker from './HabeasCorpusTracker.jsx'
import IntelMap from '../components/intel/IntelMap.jsx'
import DetentionCorporations from '../components/intel/DetentionCorporations.jsx'
import NationalAttorneys from '../components/intel/NationalAttorneys.jsx'
import {
  DW_FACILITIES,
  DW_CORPS,
  DW_JUDGES,
  DW_ATTORNEYS,
  DW_NEWS,
  DW_COLORS,
  dwTagBg,
  dwTagColor,
} from '../data/detentionWatchData.js'

const TABS = [
  { id: 'map', label: 'Intel Map', icon: 'map' },
  { id: 'hc', label: 'HC Tracker', icon: 'clipboard' },
  { id: 'attorneys', label: 'Attorneys', icon: 'briefcase' },
  { id: 'corps', label: 'Corporations', icon: 'building' },
]

const ACTIVE_COUNT = DW_FACILITIES.filter((f) => f.status === 'active').length
const PLANNED_COUNT = DW_FACILITIES.filter((f) => f.status === 'planned').length

// Map-layer toggles (drive what the map draws). `count` is the badge on the right.
const LAYER_DEFS = [
  { key: 'detention', label: 'Detention Centers', color: DW_COLORS.red, count: ACTIVE_COUNT },
  { key: 'planned', label: 'Planned 2025-26', color: DW_COLORS.blue, count: PLANNED_COUNT },
  { key: 'corps', label: 'Private Corps HQ', color: DW_COLORS.purple, count: DW_CORPS.length },
  { key: 'judges', label: 'Immigration Judges', color: DW_COLORS.accent, count: DW_JUDGES.length },
  { key: 'attorneys', label: 'HC Attorneys', color: DW_COLORS.teal, count: DW_ATTORNEYS.length },
]

// Color key — matches the map's population-based color logic (dwFacColor).
const CAPACITY_KEY = [
  { c: DW_COLORS.red, l: 'CRITICAL — 1,000+ detained' },
  { c: DW_COLORS.orange, l: 'HIGH — 500–999' },
  { c: DW_COLORS.accent, l: 'MODERATE — 150–499' },
  { c: DW_COLORS.green, l: 'LOW — under 150' },
  { c: DW_COLORS.blue, l: 'PLANNED / NEW 2025-26' },
  { c: DW_COLORS.purple, l: 'CORP HEADQUARTERS' },
]

const DATA_SOURCES = [
  'Vera Institute of Justice',
  'TRAC Immigration (Syracuse)',
  'ICE/DHS Enforcement Stats',
  'PACER Federal Docket',
  'Prison Legal News',
  'ACLU Immigrants Rights',
  'SCOTUSblog',
]

function PanelTitle({ children }) {
  return (
    <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
      {children}
    </div>
  )
}

function LeftPanel({ layers, onToggle }) {
  return (
    <aside className="flex flex-col divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
      {/* Map layers */}
      <div className="p-4">
        <PanelTitle>Map Layers</PanelTitle>
        <div className="flex flex-col">
          {LAYER_DEFS.map((ld) => (
            <button
              key={ld.key}
              onClick={() => onToggle(ld.key)}
              className="flex items-center gap-2.5 py-1.5 text-left transition-colors hover:opacity-90"
            >
              <span
                className="grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-sm border"
                style={{
                  borderColor: layers[ld.key] ? DW_COLORS.accent : DW_COLORS.border2,
                  background: layers[ld.key] ? 'rgba(232,197,71,0.13)' : 'transparent',
                }}
              >
                {layers[ld.key] && <span className="h-1.5 w-1.5 rounded-[1px] bg-amber-400" />}
              </span>
              <span
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={{ background: ld.color, boxShadow: `0 0 5px ${ld.color}` }}
              />
              <span className="flex-1 font-mono text-[11px] text-zinc-300">{ld.label}</span>
              <span className="font-mono text-[10px] text-zinc-500">{ld.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Capacity key */}
      <div className="p-4">
        <PanelTitle>Capacity Key</PanelTitle>
        <div className="flex flex-col gap-1.5">
          {CAPACITY_KEY.map((row) => (
            <div key={row.l} className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: row.c, boxShadow: `0 0 5px ${row.c}` }}
              />
              <span className="font-mono text-[11px] text-zinc-300">{row.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data sources */}
      <div className="p-4">
        <PanelTitle>Data Sources</PanelTitle>
        <div className="flex flex-col gap-1">
          {DATA_SOURCES.map((s) => (
            <div key={s} className="font-mono text-[10px] text-zinc-500">
              · {s}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function LiveIntelligenceFeed() {
  return (
    <aside className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-zinc-800 p-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-400">
          <Icon name="broadcast" size={15} />
        </span>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
            Live Intelligence Feed
          </div>
          <div className="text-[11px] text-zinc-500">National detention &amp; enforcement news</div>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-zinc-800">
        {DW_NEWS.map((n) => (
          <div key={n.head} className="px-4 py-3 transition-colors hover:bg-zinc-800/40">
            <span
              className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ background: dwTagBg(n.tag), color: dwTagColor(n.tag) }}
            >
              {n.lbl}
            </span>
            <p className="mt-1.5 text-[13px] leading-snug text-zinc-100">{n.head}</p>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-500">
              <span>{n.src}</span>
              <span>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default function IntelligenceHub() {
  const [activeTab, setActiveTab] = useState('map')
  const [layers, setLayers] = useState({
    detention: true,
    planned: true,
    corps: true,
    judges: true,
    attorneys: false,
  })

  const toggleLayer = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }))

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex overflow-x-auto rounded-lg bg-zinc-900 p-1 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              'flex shrink-0 items-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors ' +
              (activeTab === tab.id
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200')
            }
          >
            <Icon name={tab.icon} size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3-column body: controls | tab content | live feed (feed persists across tabs) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_minmax(0,1fr)_300px]">
        <LeftPanel layers={layers} onToggle={toggleLayer} />

        <div className="min-w-0">
          {activeTab === 'map' && <IntelMap layers={layers} />}
          {activeTab === 'hc' && <HabeasCorpusTracker embedded />}
          {activeTab === 'attorneys' && <NationalAttorneys />}
          {activeTab === 'corps' && <DetentionCorporations />}
        </div>

        <LiveIntelligenceFeed />
      </div>
    </div>
  )
}
