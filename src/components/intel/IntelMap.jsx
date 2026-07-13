import { useState } from 'react'

// Data specific to the map
const FACILITIES = [
  { id:"F01", name:"Stewart Detention Center", city:"Lumpkin", state:"GA", x:72, y:62, pop:2100, cap:1752, op:"CoreCivic", circuit:"11th", status:"active", note:"Exceeded capacity." },
  { id:"F02", name:"South Texas ICE Processing (Dilley)", city:"Dilley", state:"TX", x:42, y:72, pop:2300, cap:2400, op:"CoreCivic", circuit:"5th", status:"active", note:"Largest family detention." },
  { id:"F03", name:"Adams County Detention Center", city:"Natchez", state:"MS", x:61, y:68, pop:2050, cap:2000, op:"CoreCivic", circuit:"5th", status:"active", note:"Exceeded capacity." },
  { id:"F04", name:"Adelanto ICE Processing Center", city:"Adelanto", state:"CA", x:12, y:56, pop:1800, cap:1940, op:"GEO Group", circuit:"9th", status:"active", note:"" },
  { id:"F05", name:"Winn Correctional Center", city:"Winnfield", state:"LA", x:57, y:70, pop:1450, cap:1538, op:"LaSalle Corrections", circuit:"5th", status:"active", note:"" },
  { id:"F06", name:"Northwest ICE Processing Center", city:"Tacoma", state:"WA", x:9, y:18, pop:1400, cap:1575, op:"GEO Group", circuit:"9th", status:"active", note:"" },
  { id:"F07", name:"Folkston / D. Ray James Facility", city:"Folkston", state:"GA", x:73, y:65, pop:1700, cap:1868, op:"GEO Group", circuit:"11th", status:"active", note:"Reopened 2025." },
  { id:"F08", name:"Moshannon Valley Processing Center", city:"Philipsburg", state:"PA", x:74, y:37, pop:1500, cap:1800, op:"GEO Group", circuit:"3rd", status:"active", note:"" },
  { id:"F09", name:"Florida Soft-Sided (Alligator Alcatraz)", city:"Loxahatchee", state:"FL", x:74, y:76, pop:1600, cap:3000, op:"ICE/DHS", circuit:"11th", status:"active", note:"Opened Jul 2025." },
  { id:"F10", name:"North Lake Facility", city:"Baldwin", state:"MI", x:64, y:29, pop:1200, cap:1800, op:"GEO Group", circuit:"6th", status:"active", note:"" },
  { id:"F11", name:"Denver Contract Detention", city:"Aurora", state:"CO", x:34, y:44, pop:1200, cap:1532, op:"GEO Group", circuit:"10th", status:"active", note:"" },
  { id:"PL1", name:"Pecos Valley Detention (Planned)", city:"Pecos", state:"TX", x:35, y:66, pop:0, cap:2000, op:"GEO Group", circuit:"5th", status:"planned", note:"Proposed 2026." },
  { id:"PL2", name:"Tucson Warehouse Conversion (Planned)", city:"Tucson", state:"AZ", x:23, y:65, pop:0, cap:1500, op:"ICE/DHS", circuit:"9th", status:"planned", note:"" },
  { id:"PL3", name:"Atlanta Area Expansion (Planned)", city:"Atlanta", state:"GA", x:68, y:62, pop:0, cap:2000, op:"CoreCivic", circuit:"11th", status:"planned", note:"" },
]

const CORPS = [
  { id:"C1", name:"CoreCivic", hq:"Nashville, TN", x:64, y:52, col:"#EF4444" },
  { id:"C2", name:"GEO Group", hq:"Boca Raton, FL", x:72, y:75, col:"#F59E0B" },
  { id:"C3", name:"LaSalle Corrections", hq:"Ruston, LA", x:57, y:68, col:"#8B5CF6" },
  { id:"C4", name:"Management & Training Corp", hq:"Centerville, UT", x:27, y:42, col:"#3B82F6" },
  { id:"C5", name:"Emerald Correctional Mgmt", hq:"Alvarado, TX", x:46, y:65, col:"#14B8A6" },
]

const JUDGES = [
  { id:"J1", name:"Hon. Dana Leigh Marks", court:"San Francisco, CA", x:7, y:47, circuit:"9th", approve:38, deny:54 },
  { id:"J2", name:"Hon. Matthew D Angelo", court:"Boston, MA", x:82, y:26, circuit:"1st", approve:52, deny:41 },
  { id:"J3", name:"Hon. Sarah Wilson", court:"Atlanta, GA", x:68, y:63, circuit:"11th", approve:12, deny:82 },
  { id:"J4", name:"Hon. Carlos Mendez", court:"Houston, TX", x:49, y:72, circuit:"5th", approve:19, deny:74 },
  { id:"J5", name:"Hon. Patricia Chen", court:"New York, NY", x:80, y:31, circuit:"2nd", approve:51, deny:41 },
  { id:"J6", name:"Hon. Lisa Park", court:"Seattle, WA", x:9, y:17, circuit:"9th", approve:46, deny:47 },
  { id:"J8", name:"Hon. James Whitfield", court:"Dallas, TX", x:47, y:65, circuit:"5th", approve:11, deny:85 },
]

// Colors
function facColor(pop, status) {
  if (status === 'planned') return '#3B82F6' // blue-500
  if (pop >= 2000) return '#EF4444' // red-500
  if (pop >= 1000) return '#F59E0B' // amber-500
  return '#10B981' // emerald-500
}

function facR(pop) {
  if (pop >= 2000) return 9
  if (pop >= 1000) return 7
  return 5
}

function judgeColor(approve) {
  if (approve >= 45) return '#10B981'
  if (approve >= 30) return '#F59E0B'
  return '#EF4444'
}

export default function IntelMap() {
  const [hovered, setHovered] = useState(null)
  const [layers, setLayers] = useState({ detention: true, planned: true, corps: true, judges: true })

  const toggle = (layer) => setLayers((l) => ({ ...l, [layer]: !l[layer] }))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <div className="flex flex-wrap gap-2">
          {Object.entries({
            detention: { label: 'Detention Centers', color: 'bg-red-500' },
            planned: { label: 'Planned 2025-26', color: 'bg-blue-500' },
            corps: { label: 'Private Corps HQ', color: 'bg-purple-500' },
            judges: { label: 'Immigration Judges', color: 'bg-emerald-500' }
          }).map(([key, def]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                layers[key] 
                  ? 'border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50' 
                  : 'border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
            >
              <div
                className={`grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-sm ${def.color} ${
                  layers[key] ? 'text-white' : 'opacity-20'
                }`}
              >
                {layers[key] && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="h-2 w-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              {def.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 shadow-inner sm:aspect-[16/9]">
        <svg viewBox="0 0 100 90" className="h-full w-full">
          {/* US outline */}
          <path d="M10,20 L15,16 L22,14 L35,13 L50,12 L65,12 L75,14 L82,18 L85,22 L85,30 L88,35 L87,42 L84,48 L82,55 L78,62 L75,68 L72,72 L70,76 L68,80 L65,82 L60,83 L55,83 L52,80 L50,78 L47,80 L44,82 L40,83 L35,82 L30,80 L25,78 L20,74 L16,70 L12,64 L10,56 L8,48 L8,38 L9,28 Z"
            fill="none" stroke="#27272a" strokeWidth="0.5" />

          {/* Grid */}
          {[20,40,60,80].map(x => (
            <line key={x} x1={x} y1="12" x2={x} y2="84" stroke="#27272a" strokeWidth="0.2" strokeDasharray="1,2" />
          ))}
          {[20,40,60].map(y => (
            <line key={y} x1="8" y1={y} x2="90" y2={y} stroke="#27272a" strokeWidth="0.2" strokeDasharray="1,2" />
          ))}

          {/* Corp lines */}
          {layers.corps && layers.detention && CORPS.map(corp =>
            FACILITIES.filter(f => f.op === corp.name && f.status === "active").map(f => (
              <line key={corp.id+f.id} x1={corp.x} y1={corp.y} x2={f.x} y2={f.y}
                stroke={corp.col} strokeWidth="0.2" opacity="0.4" strokeDasharray="1,2" />
            ))
          )}

          {/* Planned facilities */}
          {layers.planned && FACILITIES.filter(f => f.status === "planned").map(f => (
            <g key={f.id} 
               className="cursor-pointer transition-transform hover:scale-125 origin-center"
               style={{ transformOrigin: `${f.x}% ${f.y}%` }}
               onMouseEnter={() => setHovered({ label: f.name, sub: "PLANNED", col: '#3B82F6', x: f.x, y: f.y })}
               onMouseLeave={() => setHovered(null)}>
              <rect x={f.x-2} y={f.y-2} width={4} height={4} fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="1,1" transform={`rotate(45,${f.x},${f.y})`} />
            </g>
          ))}

          {/* Active facilities */}
          {layers.detention && FACILITIES.filter(f => f.status === "active").map(f => {
            const col = facColor(f.pop, f.status)
            const r = facR(f.pop)
            return (
              <g key={f.id} 
                 className="cursor-pointer transition-transform hover:scale-110 origin-center"
                 style={{ transformOrigin: `${f.x}px ${f.y}px` }}
                 onMouseEnter={() => setHovered({ label: f.name, sub: `Pop: ${f.pop} / ${f.cap}`, col, x: f.x, y: f.y })}
                 onMouseLeave={() => setHovered(null)}>
                <circle cx={f.x} cy={f.y} r={r+2} fill={col} opacity="0.2" />
                <circle cx={f.x} cy={f.y} r={r} fill={col} opacity="0.8" stroke="#000" strokeWidth="0.3" />
              </g>
            )
          })}

          {/* Corp HQ */}
          {layers.corps && CORPS.map(corp => (
            <g key={corp.id} 
               className="cursor-pointer transition-transform hover:scale-125 origin-center"
               style={{ transformOrigin: `${corp.x}px ${corp.y}px` }}
               onMouseEnter={() => setHovered({ label: corp.name, sub: `HQ: ${corp.hq}`, col: corp.col, x: corp.x, y: corp.y })}
               onMouseLeave={() => setHovered(null)}>
              <rect x={corp.x-3} y={corp.y-3} width={6} height={6} fill={corp.col} rx="1" stroke="#fff" strokeWidth="0.3" />
              <text x={corp.x} y={corp.y+0.8} textAnchor="middle" fontSize="2" fill="#fff" fontWeight="bold">HQ</text>
            </g>
          ))}

          {/* Judges */}
          {layers.judges && JUDGES.map(j => {
            const col = judgeColor(j.approve)
            return (
              <g key={j.id} 
                 className="cursor-pointer transition-transform hover:scale-125 origin-center"
                 style={{ transformOrigin: `${j.x}px ${j.y}px` }}
                 onMouseEnter={() => setHovered({ label: j.name, sub: `Court: ${j.court}`, col, x: j.x, y: j.y })}
                 onMouseLeave={() => setHovered(null)}>
                <circle cx={j.x} cy={j.y} r={2.5} fill={col} stroke="#fff" strokeWidth="0.4" />
                <rect x={j.x+3} y={j.y-3} width={9} height={4} rx="1" fill="#18181b" stroke={col} strokeWidth="0.2" />
                <text x={j.x+7.5} y={j.y-0.2} textAnchor="middle" fontSize="2" fill={col} fontWeight="bold">{j.approve}% ✓</text>
              </g>
            )
          })}
        </svg>

        {hovered && (
          <div 
            className="pointer-events-none absolute z-10 rounded-md border bg-zinc-900/95 px-3 py-2 shadow-xl backdrop-blur"
            style={{ 
              left: `${hovered.x}%`, 
              top: `${hovered.y}%`, 
              transform: 'translate(-50%, -120%)',
              borderColor: hovered.col
            }}
          >
            <div className="text-xs font-bold" style={{ color: hovered.col }}>{hovered.label}</div>
            <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">{hovered.sub}</div>
          </div>
        )}
      </div>
    </div>
  )
}
