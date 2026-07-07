import { useNavigate, useParams } from 'react-router-dom'
import { activeUnits } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

export default function VehicleDetail() {
  const { unitId } = useParams()
  const navigate = useNavigate()
  const unit = activeUnits.find((u) => u.id === unitId)

  if (!unit) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Vehicle not found.
        </p>
        <button
          onClick={() => navigate('/my-fleet')}
          className="w-fit text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
        >
          Back to Fleet
        </button>
      </div>
    )
  }

  const { vehicle } = unit

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={() => navigate('/my-fleet')}
        className="flex w-fit items-center gap-2 text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
      >
        <Icon name="arrowLeft" size={18} />
        Back to Fleet
      </button>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        {/* driver + metrics */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
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
              {vehicle.role} · {vehicle.idNumber}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
              Driving Metrics
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] uppercase text-zinc-400">
                  Total Miles (MTD)
                </p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {vehicle.totalMilesMTD}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase text-zinc-400">
                  On-Time Rate
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {vehicle.onTimeRate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* transit + map */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand dark:text-brand-dark">
              Transit In Progress
            </span>
            <h1 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Vehicle #{unit.unitNumber}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {vehicle.model}
            </p>
          </div>

          <div className="relative h-64 overflow-hidden rounded-xl border border-zinc-200 bg-[#e9ebee] dark:border-zinc-800">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-radial-gradient(circle at 50% 55%, transparent 0 44px, #d3d7dc 45px, transparent 46px), ' +
                  'repeating-conic-gradient(from 0deg at 50% 55%, transparent 0deg 14.5deg, #d3d7dc 14.5deg 15deg)',
              }}
            />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 12 75 C 30 60, 35 40, 50 42 S 75 50, 90 20"
                fill="none"
                stroke="#4a9cc4"
                strokeWidth="2"
                strokeDasharray="6 6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="absolute left-[12%] top-[75%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/25" />
            <span className="absolute left-[90%] top-[20%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-4 ring-red-500/25" />

            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-md">
              <Icon name="pin" size={14} className="text-brand" />
              Current Location: {vehicle.currentLocation}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-brand dark:text-brand-dark">
                <Icon name="pin" size={15} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Origin
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {unit.origin}
                </p>
                <p className="text-xs text-zinc-400">{vehicle.originDep}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-red-500/10 text-red-500">
                <Icon name="flag" size={15} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Destination
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {unit.destination}
                </p>
                <p className="text-xs text-zinc-400">{vehicle.destinationEta}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
