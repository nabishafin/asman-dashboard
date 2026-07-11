import { useEffect } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps'
import Icon from './Icon.jsx'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MARKER_COLORS = {
  red: { background: '#dc2626', borderColor: '#991b1b', glyphColor: '#fecaca' },
  blue: { background: '#2563eb', borderColor: '#1e40af', glyphColor: '#bfdbfe' },
  green: { background: '#16a34a', borderColor: '#166534', glyphColor: '#bbf7d0' },
  brand: { background: '#0f2a3d', borderColor: '#0a1c29', glyphColor: '#9fd7ff' },
  purple: { background: '#7c3aed', borderColor: '#5b21b6', glyphColor: '#ddd6fe' },
  black: { background: '#18181b', borderColor: '#000000', glyphColor: '#a1a1aa' },
  dark: { background: '#18181b', borderColor: '#000000', glyphColor: '#a1a1aa' },
  orange: { background: '#ea580c', borderColor: '#9a3412', glyphColor: '#fed7aa' },
  gold: { background: '#ca8a04', borderColor: '#854d0e', glyphColor: '#fef08a' },
}

// Filled car glyph used for badge-style map markers (reads clearly at small
// sizes, unlike the thin stroke icon). Inherits color via currentColor.
function CarGlyph({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  )
}

function FitBoundsToMarkers({ markers }) {
  const map = useMap()

  useEffect(() => {
    if (!map || markers.length < 2) return
    // eslint-disable-next-line no-undef -- `google` is injected globally by the Maps JS API script
    const bounds = new google.maps.LatLngBounds()
    markers.forEach((m) => bounds.extend({ lat: m.lat, lng: m.lng }))
    map.fitBounds(bounds, 80)
  }, [map, markers])

  return null
}

export default function GoogleMapView({
  markers = [],
  center,
  zoom = 6,
  fitBounds = true,
  selectedId,
  onMarkerClick,
  className = '',
  children,
}) {
  // Caller-supplied height utilities must fully replace the default —
  // mixing h-full/min-h-[420px] with e.g. an explicit h-[380px] leaves two
  // same-specificity utility classes fighting over `height`, and whichever
  // wins is decided by stylesheet order, not by className order, so the map
  // can silently render at 0px.
  const hasCustomSizing = /(?:^|\s)(?:h-|min-h-)\S/.test(className)
  const sizeClasses = hasCustomSizing ? '' : 'h-full min-h-[420px]'

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div
        className={`grid place-items-center rounded-xl border border-zinc-200 bg-[#e9ebee] p-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 ${sizeClasses} ${className}`}
      >
        Missing VITE_GOOGLE_MAPS_API_KEY — add it to .env.local to enable the live map.
      </div>
    )
  }

  const fallbackCenter =
    center ?? (markers[0] ? { lat: markers[0].lat, lng: markers[0].lng } : { lat: 31.9686, lng: -99.9018 })

  return (
    <div className={`relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 ${sizeClasses} ${className}`}>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          mapId="asman-live-map"
          defaultCenter={fallbackCenter}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI
          style={{ width: '100%', height: '100%' }}
        >
          {fitBounds && <FitBoundsToMarkers markers={markers} />}
          {markers.map((marker) => {
            const tone = (MARKER_COLORS[marker.color] ?? MARKER_COLORS.brand).background
            const isSelected = selectedId === marker.id
            return (
              <AdvancedMarker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => onMarkerClick?.(marker.id)}
              >
                <span className="relative grid place-items-center">
                  {marker.pulse && (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ background: tone }}
                    />
                  )}
                  {marker.icon ? (
                    // "badge" style: light rounded-square background with a
                    // colored icon (matches the app-icon look). Default style is a
                    // solid colored circle with a white icon.
                    marker.iconStyle === 'badge' ? (
                      <span
                        className="relative grid h-9 w-9 place-items-center rounded-2xl border-2 bg-white shadow-md transition-transform dark:bg-white"
                        style={{
                          color: tone,
                          borderColor: tone,
                          transform: isSelected ? 'scale(1.25)' : undefined,
                        }}
                      >
                        {marker.icon === 'car' ? <CarGlyph size={20} /> : <Icon name={marker.icon} size={18} />}
                      </span>
                    ) : (
                      <span
                        className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-white text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-transform"
                        style={{
                          background: tone,
                          transform: isSelected ? 'scale(1.25)' : undefined,
                        }}
                      >
                        <Icon name={marker.icon} size={15} />
                        <span
                          className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                          style={{ background: tone }}
                        />
                      </span>
                    )
                  ) : (
                    <Pin {...(MARKER_COLORS[marker.color] ?? MARKER_COLORS.brand)} scale={isSelected ? 1.3 : 1} />
                  )}
                </span>
              </AdvancedMarker>
            )
          })}
        </Map>
      </APIProvider>
      {children}
    </div>
  )
}
