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
  dark: { background: '#18181b', borderColor: '#000000', glyphColor: '#a1a1aa' },
}

function FitBoundsToMarkers({ markers }) {
  const map = useMap()

  useEffect(() => {
    if (!map || markers.length < 2) return
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
          <FitBoundsToMarkers markers={markers} />
          {markers.map((marker) => (
            <AdvancedMarker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => onMarkerClick?.(marker.id)}
            >
              {marker.icon ? (
                <span
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-white text-white shadow-md transition-transform"
                  style={{
                    background: (MARKER_COLORS[marker.color] ?? MARKER_COLORS.brand).background,
                    transform: selectedId === marker.id ? 'scale(1.25)' : undefined,
                  }}
                >
                  <Icon name={marker.icon} size={15} />
                </span>
              ) : (
                <Pin
                  {...(MARKER_COLORS[marker.color] ?? MARKER_COLORS.brand)}
                  scale={selectedId === marker.id ? 1.3 : 1}
                />
              )}
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
      {children}
    </div>
  )
}
