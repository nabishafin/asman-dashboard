import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import GoogleMapView from '../components/GoogleMapView.jsx'

const SOS_QUEUE = [
  {
    id: 'as1',
    incidentCode: 'AS-4091',
    name: 'Marcus Thorne',
    cdl: 'TX-482910',
    photo: '/driver-james.jpg',
    location: 'I-10 East, Texas',
    coords: { lat: 29.7604, lng: -95.3698 },
    timeAgo: '4m ago',
    status: 'active',
    attorney: { assigned: true, name: 'Elena Rodriguez', photo: '/attorney-eleanor.jpg' },
    timeline: [
      {
        tone: 'red',
        time: '14:02',
        title: 'SOS Triggered (GPS Broadcast)',
        detail: 'Panic signal received from vehicle unit at 29.7604° N, 95.3698° W.',
      },
      {
        tone: 'gray',
        time: '14:04',
        title: 'Emergency Contact Notified',
        detail: 'SMS Sent to: Maria Thorne (+1 555-0123).',
      },
    ],
  },
  {
    id: 'as2',
    incidentCode: 'AS-4088',
    name: 'David Chen',
    cdl: 'CA-119284',
    photo: '/attorney-julian.jpg',
    location: 'San Ysidro, CA',
    coords: { lat: 32.5541, lng: -117.0281 },
    timeAgo: '12m ago',
    status: 'dispatching',
    attorney: { assigned: false },
    timeline: [
      {
        tone: 'red',
        time: '11:48',
        title: 'SOS Triggered (GPS Broadcast)',
        detail: 'Panic signal received near San Ysidro border crossing.',
      },
      {
        tone: 'gray',
        time: '11:51',
        title: 'Dispatch In Progress',
        detail: 'Awaiting nearest available attorney assignment.',
      },
    ],
  },
  {
    id: 'as3',
    incidentCode: 'AS-4071',
    name: 'Sarah Miller',
    cdl: 'TX-227731',
    photo: '/driver-sarah.jpg',
    location: 'Laredo Port, TX',
    coords: { lat: 27.5058, lng: -99.5064 },
    timeAgo: '1h ago',
    status: 'resolved',
    attorney: null,
    timeline: [
      {
        tone: 'red',
        time: '13:02',
        title: 'SOS Triggered (GPS Broadcast)',
        detail: 'Panic signal received at Laredo Port inspection lane.',
      },
      {
        tone: 'green',
        time: '13:26',
        title: 'Incident Resolved',
        detail: 'Driver confirmed safe; case closed by on-site attorney.',
      },
    ],
  },
]

const STATUS_STYLES = {
  active: 'bg-red-600 text-white',
  dispatching: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
  resolved: 'bg-green-500/15 text-green-600 dark:text-green-400',
}
const STATUS_LABELS = { active: 'Active', dispatching: 'Dispatching', resolved: 'Resolved' }

const TIME_BADGE_STYLES = {
  active: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  dispatching: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  resolved: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
}

const TIMELINE_DOT = {
  red: 'border-red-500',
  gray: 'border-zinc-300 dark:border-zinc-600',
  green: 'border-green-500',
}

function QueueCard({ incident, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        'relative w-full overflow-hidden rounded-lg border p-4 text-left transition-colors ' +
        (active
          ? 'border-zinc-200 bg-brand/5 dark:border-zinc-700'
          : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60')
      }
    >
      {incident.status === 'active' && (
        <span className="absolute inset-x-0 top-0 h-0.5 bg-red-500" />
      )}

      <div className="flex items-start justify-between gap-2">
        <p className="font-bold text-zinc-900 dark:text-zinc-50">{incident.name}</p>
        <span
          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${TIME_BADGE_STYLES[incident.status]}`}
        >
          {incident.timeAgo}
        </span>
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
        <Icon name="pin" size={12} />
        {incident.location}
      </p>

      {incident.attorney && (
        <div className="mt-3 flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Attorney Assigned
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {incident.attorney.assigned ? (
                <>
                  <img
                    src={incident.attorney.photo}
                    alt={incident.attorney.name}
                    className="h-5 w-5 flex-shrink-0 rounded-full object-cover"
                  />
                  {incident.attorney.name}
                </>
              ) : (
                <>
                  <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
                    <Icon name="user" size={11} />
                  </span>
                  Awaiting Dispatch
                </>
              )}
            </p>
          </div>
          {incident.attorney.assigned && incident.status === 'active' && (
            <Icon name="check" size={16} className="flex-shrink-0 text-brand dark:text-brand-dark" />
          )}
        </div>
      )}

      <span
        className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[incident.status]}`}
      >
        {STATUS_LABELS[incident.status]}
      </span>
    </button>
  )
}

const SOS_MARKER_COLOR = {
  active: 'red',
  dispatching: 'blue',
  resolved: 'green',
}

function MapPanel({ selectedId, onSelect }) {
  const markers = SOS_QUEUE.filter((i) => i.coords).map((i) => ({
    id: i.id,
    lat: i.coords.lat,
    lng: i.coords.lng,
    color: SOS_MARKER_COLOR[i.status] ?? 'brand',
  }))

  return (
    <GoogleMapView markers={markers} zoom={5} selectedId={selectedId} onMarkerClick={onSelect}>
      {/* bottom overlay row */}
      <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-lg bg-zinc-900/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
            <Icon name="broadcast" size={13} />
            Real-time Feed
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-md">
            <Icon name="bolt" size={13} className="text-brand" />
            101.5ms <span className="font-normal text-zinc-400">Latency</span>
          </span>
        </div>

        <div className="rounded-lg bg-white px-4 py-3 text-xs shadow-md">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
            Live Unit Legend
          </p>
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between gap-6 font-semibold text-zinc-700">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" /> SOS Critical
              </span>
              03
            </span>
            <span className="flex items-center justify-between gap-6 font-semibold text-zinc-700">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Attorney En Route
              </span>
              12
            </span>
            <span className="flex items-center justify-between gap-6 font-semibold text-zinc-700">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" /> Active Drivers
              </span>
              842
            </span>
          </div>
        </div>
      </div>
    </GoogleMapView>
  )
}

function IncidentDetail({ incident, onClose }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
          Incident #{incident.incidentCode}
        </p>
        <button
          onClick={onClose}
          className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
        >
          <Icon name="close" size={15} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <img
          src={incident.photo}
          alt={incident.name}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-bold text-zinc-900 dark:text-zinc-50">
            {incident.name}
          </p>
          <p className="text-xs text-zinc-400">CDL #{incident.cdl}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
          Incident Timeline
        </p>
        <div className="flex flex-col">
          {incident.timeline.map((t, i) => (
            <div key={i} className="flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 bg-white dark:bg-zinc-900 ${TIMELINE_DOT[t.tone]}`}
                />
                {i < incident.timeline.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {t.title}
                  </p>
                  <span className="flex-shrink-0 text-[11px] text-zinc-400">{t.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SosIncidents() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = SOS_QUEUE.find((i) => i.id === selectedId) ?? null

  return (
    <div
      className={
        'grid items-stretch gap-5 lg:h-[calc(100vh-6rem)] ' +
        (selected ? 'lg:grid-cols-[320px_1fr_340px]' : 'lg:grid-cols-[320px_1fr]')
      }
    >
      <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 border-b border-zinc-100 px-1 pb-3 font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          SOS Queue
        </h3>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
          {SOS_QUEUE.map((incident) => (
            <QueueCard
              key={incident.id}
              incident={incident}
              active={selectedId === incident.id}
              onClick={() =>
                setSelectedId((id) => (id === incident.id ? null : incident.id))
              }
            />
          ))}
        </div>
      </div>

      <MapPanel
        selectedId={selectedId}
        onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
      />

      {selected && (
        <IncidentDetail incident={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}
