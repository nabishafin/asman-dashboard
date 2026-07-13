import { useState } from 'react'
import {
  DW_FACILITIES,
  DW_CORPS,
  DW_JUDGES,
  DW_COLORS,
  dwFacColor,
  dwFacRadius,
  dwJudgeColor,
} from '../../data/detentionWatchData.js'

// Which layers are visible is controlled by the parent (the left panel in the
// Intelligence Hub). Falls back to everything-on when rendered standalone.
const DEFAULT_LAYERS = { detention: true, planned: true, corps: true, judges: true, attorneys: false }

export default function IntelMap({ layers = DEFAULT_LAYERS }) {
  const [hovered, setHovered] = useState(null)

  const active = DW_FACILITIES.filter((f) => f.status === 'active')
  const planned = DW_FACILITIES.filter((f) => f.status === 'planned')

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0B0E14] shadow-inner sm:aspect-[16/10]">
      <svg viewBox="0 0 100 90" className="h-full w-full">
        {/* US outline */}
        <path
          d="M10,20 L15,16 L22,14 L35,13 L50,12 L65,12 L75,14 L82,18 L85,22 L85,30 L88,35 L87,42 L84,48 L82,55 L78,62 L75,68 L72,72 L70,76 L68,80 L65,82 L60,83 L55,83 L52,80 L50,78 L47,80 L44,82 L40,83 L35,82 L30,80 L25,78 L20,74 L16,70 L12,64 L10,56 L8,48 L8,38 L9,28 Z"
          fill="none"
          stroke={DW_COLORS.border2}
          strokeWidth="0.4"
        />

        {/* Grid */}
        {[20, 30, 40, 50, 60, 70, 80].map((x) => (
          <line key={x} x1={x} y1="12" x2={x} y2="84" stroke={DW_COLORS.border} strokeWidth="0.15" strokeDasharray="1,2" opacity="0.4" />
        ))}
        {[20, 30, 40, 50, 60, 70].map((y) => (
          <line key={y} x1="8" y1={y} x2="90" y2={y} stroke={DW_COLORS.border} strokeWidth="0.15" strokeDasharray="1,2" opacity="0.4" />
        ))}

        {/* Corp → facility connection lines */}
        {layers.corps &&
          layers.detention &&
          DW_CORPS.map((corp) =>
            active
              .filter((f) => f.op === corp.name)
              .map((f) => (
                <line key={corp.id + f.id} x1={corp.x} y1={corp.y} x2={f.x} y2={f.y} stroke={corp.col} strokeWidth="0.2" opacity="0.2" strokeDasharray="1,3" />
              ))
          )}

        {/* Active detention facilities — sized & colored by population */}
        {layers.detention &&
          active.map((f) => {
            const col = dwFacColor(f.pop, f.status)
            const r = dwFacRadius(f.pop)
            return (
              <g
                key={f.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() =>
                  setHovered({
                    label: f.name,
                    sub: `${f.city}, ${f.state} · Pop ${f.pop.toLocaleString()} / ${f.cap.toLocaleString()}`,
                    col,
                    x: f.x,
                    y: f.y,
                  })
                }
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={f.x} cy={f.y} r={r + 2} fill={col} opacity="0.15" />
                <circle cx={f.x} cy={f.y} r={r} fill={col} opacity="0.85" stroke={col} strokeWidth="0.3" />
              </g>
            )
          })}

        {/* Planned facilities — dashed squares */}
        {layers.planned &&
          planned.map((f) => (
            <g
              key={f.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered({ label: f.name, sub: `PLANNED — ${f.city}, ${f.state}`, col: DW_COLORS.blue, x: f.x, y: f.y })}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={f.x - 3} y={f.y - 3} width={6} height={6} fill="none" stroke={DW_COLORS.blue} strokeWidth="0.5" strokeDasharray="1.5,1" opacity="0.8" transform={`rotate(45,${f.x},${f.y})`} />
            </g>
          ))}

        {/* Corp HQ */}
        {layers.corps &&
          DW_CORPS.map((corp) => (
            <g
              key={corp.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered({ label: corp.name, sub: `${corp.hq} · 2025 Profit ${corp.profit} (${corp.chg})`, col: corp.col, x: corp.x, y: corp.y })}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={corp.x - 4} y={corp.y - 4} width={8} height={8} fill={corp.col} opacity="0.9" rx="1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
              <text x={corp.x} y={corp.y + 1.2} textAnchor="middle" fontSize="3" fill={DW_COLORS.bg} fontWeight="bold">
                HQ
              </text>
            </g>
          ))}

        {/* Immigration judges — colored by grant rate, with % callout */}
        {layers.judges &&
          DW_JUDGES.map((j) => {
            const col = dwJudgeColor(j.approve)
            return (
              <g
                key={j.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered({ label: j.name, sub: `${j.court} · Grant ${j.approve}% / Deny ${j.deny}%`, col, x: j.x, y: j.y })}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={j.x} cy={j.y} r={3} fill={col} opacity="0.85" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
                <rect x={j.x + 3.5} y={j.y - 4} width={11} height={5} rx="1" fill="rgba(28,35,53,0.95)" stroke={col} strokeWidth="0.3" />
                <text x={j.x + 9} y={j.y - 0.8} textAnchor="middle" fontSize="2.2" fill={col} fontWeight="bold">
                  {j.approve}% ✓
                </text>
              </g>
            )
          })}

        {/* Map label */}
        <text x="50" y="88" textAnchor="middle" fontSize="2.5" fill={DW_COLORS.text3} fontFamily="monospace">
          CONTINENTAL UNITED STATES — DETENTION INTELLIGENCE MAP 2026
        </text>
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute z-10 whitespace-nowrap rounded-md border px-3 py-2 shadow-xl backdrop-blur"
          style={{ left: `${hovered.x}%`, top: `${hovered.y}%`, transform: 'translate(-50%, -120%)', borderColor: hovered.col, background: 'rgba(22,27,39,0.96)' }}
        >
          <div className="text-xs font-bold" style={{ color: hovered.col }}>
            {hovered.label}
          </div>
          <div className="mt-0.5 text-[11px] font-medium text-zinc-300">{hovered.sub}</div>
        </div>
      )}
    </div>
  )
}
