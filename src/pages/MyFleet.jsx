import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { activeUnits } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const STATUS_STYLES = {
  moving: 'text-green-600 dark:text-green-400',
  idle: 'text-indigo-500',
  delayed: 'text-red-500',
}
const STATUS_DOT = {
  moving: 'bg-green-500',
  idle: 'bg-indigo-400',
  delayed: 'bg-red-500',
}

function Sparkline({ values, tone }) {
  const max = Math.max(...values)
  return (
    <div className="flex h-5 items-end gap-0.5">
      {values.map((v, i) => (
        <span
          key={i}
          className={
            'w-1 rounded-sm ' +
            (tone === 'red' ? 'bg-red-400' : 'bg-green-400')
          }
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  )
}

function UnitRow({ unit, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={
        'cursor-pointer rounded-lg p-3 transition-colors ' +
        (active
          ? 'bg-brand/5'
          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60')
      }
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">
            Unit #{unit.unitNumber}
          </p>
          <p className="text-xs text-zinc-400">Driver: {unit.driverName}</p>
        </div>
        <span
          className={`flex items-center gap-1.5 text-xs font-bold uppercase ${STATUS_STYLES[unit.status]}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[unit.status]}`} />
          {unit.status}
        </span>
      </div>

      <div className="mt-2.5 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            {unit.metricLabel}
          </p>
          {unit.fuelLevel !== undefined ? (
            <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${unit.fuelLevel}%` }}
              />
            </div>
          ) : (
            <Sparkline
              values={unit.sparkline}
              tone={unit.status === 'delayed' ? 'red' : 'green'}
            />
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
            {unit.rightLabel}
          </p>
          <p
            className={
              'text-sm font-semibold ' +
              (unit.status === 'delayed' || unit.rightValue === 'Refuel Req'
                ? 'text-red-500'
                : 'text-zinc-800 dark:text-zinc-100')
            }
          >
            {unit.rightValue}
          </p>
        </div>
      </div>
    </div>
  )
}

function ActiveUnitsPanel({ tab, setTab, selectedId, setSelectedId }) {
  const filtered = activeUnits.filter((u) => {
    if (tab === 'Alerts') return u.status !== 'moving'
    if (tab === 'Idle') return u.status === 'idle'
    return true
  })
  const onlineCount = activeUnits.length * 14 // decorative mock count

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Active Units</h3>
        <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand dark:text-brand-dark">
          {onlineCount} ONLINE
        </span>
      </div>

      <div className="mt-3 flex gap-1 rounded-lg bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
        {['All', 'Alerts', 'Idle'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              'flex-1 rounded-md py-1.5 font-semibold transition ' +
              (tab === t
                ? 'bg-[#0f2a3d] text-white'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300')
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-2 flex-1 divide-y divide-zinc-100 overflow-y-auto dark:divide-zinc-800">
        {filtered.map((u) => (
          <UnitRow
            key={u.id}
            unit={u}
            active={selectedId === u.id}
            onClick={() => setSelectedId(u.id)}
          />
        ))}
      </div>
    </div>
  )
}

function MapPanel() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl border border-zinc-200 bg-[#e9ebee] dark:border-zinc-800">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at 50% 55%, transparent 0 44px, #d3d7dc 45px, transparent 46px), ' +
            'repeating-conic-gradient(from 0deg at 50% 55%, transparent 0deg 14.5deg, #d3d7dc 14.5deg 15deg)',
        }}
      />

      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-md">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        System Healthy: 242 API Calls/s
      </span>

      <span className="absolute right-6 top-6 text-zinc-400">
        <Icon name="drone" size={18} />
      </span>

      <div className="absolute inset-0 grid place-items-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">
          REGIONAL COMMAND GRID
        </p>
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 30 25 C 40 35, 42 50, 55 55 S 70 68, 78 62"
          fill="none"
          stroke="#4a9cc4"
          strokeWidth="2"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="absolute left-[45%] top-[45%] grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-lg ring-4 ring-brand/20">
        <Icon name="sync" size={16} />
      </span>

      <button className="absolute bottom-4 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-lg bg-zinc-900 text-white shadow-md">
        <Icon name="layers" size={16} />
      </button>

      <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white px-2 py-1.5 shadow-md">
        <button className="grid h-7 w-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100">
          <Icon name="plus" size={14} />
        </button>
        <button className="grid h-7 w-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100">
          <Icon name="minus" size={14} />
        </button>
        <button className="grid h-7 w-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100">
          <Icon name="layers" size={14} />
        </button>
        <button className="grid h-7 w-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100">
          <Icon name="compass" size={14} />
        </button>
      </div>
    </div>
  )
}

function DriverPanel({ unit }) {
  const navigate = useNavigate()

  if (!unit) {
    return (
      <div className="grid h-full place-items-center rounded-xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
        Select a unit to view driver details
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => navigate(`/my-fleet/vehicle/${unit.id}`)}
        className="flex flex-col items-center text-center"
      >
        <div className="relative">
          <img
            src={unit.photo}
            alt={unit.driverName}
            className="h-16 w-16 rounded-full object-cover ring-4 ring-brand/15"
          />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
        </div>
        <p className="mt-3 font-bold text-zinc-900 dark:text-zinc-50">
          {unit.driverName}
        </p>
        <p className="text-xs text-zinc-400">
          {unit.licenseClass} · {unit.licenseId}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-500">
          <Icon name="star" size={13} />
          {unit.rating} <span className="text-zinc-400">({unit.trips} trips)</span>
        </p>
      </button>

      <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
            Route Progress
          </p>
          <p className="text-sm font-bold text-brand dark:text-brand-dark">
            {unit.routeProgress}%
          </p>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${unit.routeProgress}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] font-medium text-zinc-400">
          <span>{unit.origin}</span>
          <span>{unit.destination}</span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
          <Icon name="clock" size={13} />
          HOS Status
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] uppercase text-zinc-400">Drive Time</p>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">
              {unit.hos.driveTime}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-zinc-400">Duty Left</p>
            <p className="font-bold text-green-600 dark:text-green-400">
              {unit.hos.dutyLeft}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyFleet() {
  const [tab, setTab] = useState('All')
  const [selectedId, setSelectedId] = useState(activeUnits[0]?.id ?? null)
  const selected = activeUnits.find((u) => u.id === selectedId) ?? null

  return (
    <div className="grid items-stretch gap-5 lg:h-[calc(100vh-6rem)] lg:grid-cols-3">
      <ActiveUnitsPanel
        tab={tab}
        setTab={setTab}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <MapPanel />
      <DriverPanel unit={selected} />
    </div>
  )
}
