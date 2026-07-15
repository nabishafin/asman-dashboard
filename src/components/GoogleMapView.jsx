import { useState, useMemo, useEffect } from 'react'
import { APIProvider, Map, AdvancedMarker, useMap, ControlPosition, MapControl } from '@vis.gl/react-google-maps'
import Supercluster from 'supercluster'

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
  teal: { background: '#0d9488', borderColor: '#115e59', glyphColor: '#99f6e4' },
  pink: { background: '#db2777', borderColor: '#9d174d', glyphColor: '#fbcfe8' },
  cyan: { background: '#06b6d4', borderColor: '#0e7490', glyphColor: '#cffafe' },
  slate: { background: '#64748b', borderColor: '#334155', glyphColor: '#e2e8f0' },
}

function PointSvgMarker({ color, isSelected }) {
  return (
    <div className={`relative flex items-center justify-center transition-transform ${isSelected ? 'scale-[1.3] -translate-y-2' : 'hover:scale-[1.15] hover:-translate-y-1'}`}>
      <svg width="42" height="46" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        <path className="origin-center animate-ping opacity-25" style={{ fill: color, animationDuration: '2.5s' }} d="M15.1609 0.122986C23.1467 0.122986 29.6208 6.59742 29.6208 14.5829C29.6206 22.5683 23.1466 29.0419 15.1609 29.0419C7.17526 29.0419 0.701142 22.5683 0.700928 14.5829C0.700928 6.59745 7.17513 0.12304 15.1609 0.122986Z" />
        <circle className="opacity-33" cx="15.1608" cy="14.5822" r="12.8547" fill={color} />
        <circle className="opacity-33" cx="15.161" cy="14.5823" r="11.0482" fill={color} />
        <path d="M23.0002 14.0241C17.6669 14.0288 12.3336 14.0335 7.00025 14.0381C7.13385 14.3505 7.26746 14.6628 7.40107 14.9751C9.806 20.597 12.2109 26.2189 14.6159 31.8408C14.7495 32.1531 14.8831 32.4655 15.0167 32.7778C15.1497 32.4652 15.2828 32.1527 15.4159 31.8401C17.8109 26.214 20.206 20.5879 22.6011 14.9618C22.7341 14.6492 22.8672 14.3367 23.0002 14.0241Z" fill="white" />
        <circle cx="15.0483" cy="14.4723" r="10" fill="white" />
        <circle cx="15.0483" cy="14.4723" r="8" fill={color} />
      </svg>
    </div>
  )
}

function ClusterSvgMarker({ color, count, isSelected }) {
  return (
    <div className={`relative flex items-center justify-center transition-transform ${isSelected ? 'scale-[1.3] -translate-y-2' : 'hover:scale-[1.15] hover:-translate-y-1'}`}>
      <svg width="58" height="62" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        {/* Outer animated glow */}
        <path className="origin-center animate-ping opacity-25" style={{ fill: color, animationDuration: '2.5s' }} d="M15.583 0C24.1891 0 31.166 6.97719 31.166 15.583C31.1658 24.1887 24.189 31.165 15.583 31.165C6.97711 31.1649 0.000170906 24.1886 0 15.583C0 6.97725 6.977 9.19656e-05 15.583 0Z" />
        {/* Inner static glow */}
        <circle className="opacity-33" cx="15.5833" cy="15.5829" r="13.8531" fill={color} />
        {/* Pin body */}
        <path d="M26.8142 11.4037C27.2646 12.6651 27.51 14.0241 27.51 15.4404C27.51 16.8566 27.2646 18.2156 26.8142 19.4771C26.5344 20.2607 26.1753 21.0068 25.7468 21.7055C22.998 26.1873 18.1024 29.243 15.471 33.7947C12.892 29.2466 8.04151 26.1866 5.29359 21.7386C4.85603 21.0303 4.49007 20.2731 4.20581 19.4771C3.75537 18.2156 3.51001 16.8566 3.51001 15.4404C3.51001 14.0241 3.75537 12.6651 4.20581 11.4037C5.41284 8.02359 8.09302 5.34341 11.4731 4.13626C12.7346 3.68573 14.0938 3.44037 15.51 3.44037C16.9263 3.44037 18.2854 3.68573 19.5469 4.13626C22.927 5.34341 25.6072 8.02359 26.8142 11.4037Z" fill={color} />
        {/* Inner white circle */}
        <circle cx="15.51" cy="15.4619" r="10" fill="white" />
        {/* Number text */}
        <text x="15.51" y="19.5" fontSize="12" fontWeight="800" textAnchor="middle" fill={color}>{count}</text>
      </svg>
    </div>
  )
}

function CustomZoomControl() {
  const map = useMap()
  const [zoom, setZoom] = useState(4)
  const MIN_ZOOM = 3
  const MAX_ZOOM = 18

  useEffect(() => {
    if (!map) return
    setZoom(map.getZoom())
    const listener = map.addListener('zoom_changed', () => {
      setZoom(map.getZoom())
    })
    return () => google.maps.event.removeListener(listener)
  }, [map])

  if (!map) return null

  // Ensure zoom is clamped for percentage calculation to avoid >100% or <0%
  const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom))
  const percentage = Math.round(((clampedZoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100)

  return (
    <MapControl position={ControlPosition.RIGHT_BOTTOM}>
      <div className="flex items-center gap-4 bg-zinc-900 py-2.5 px-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-zinc-800 mb-6 mr-6 pointer-events-auto">
        <span className="text-sm font-medium text-zinc-300 w-8 text-right select-none">{percentage}%</span>
        <button
          onClick={() => map.setZoom(Math.max(MIN_ZOOM, zoom - 1))}
          className="text-zinc-400 hover:text-white flex items-center justify-center text-xl font-light leading-none transition-colors"
        >
          -
        </button>
        <div className="flex items-center">
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step="1"
            value={zoom}
            onChange={(e) => map.setZoom(Number(e.target.value))}
            className="w-24 h-1.5 appearance-none bg-zinc-700 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 hover:[&::-webkit-slider-thumb]:bg-cyan-300 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,211,238,0.4)] cursor-pointer transition-all"
          />
        </div>
        <button
          onClick={() => map.setZoom(Math.min(MAX_ZOOM, zoom + 1))}
          className="text-zinc-400 hover:text-white flex items-center justify-center text-xl font-light leading-none transition-colors"
        >
          +
        </button>
      </div>
    </MapControl>
  )
}

function FitBoundsToMarkers({ markers }) {
  const map = useMap()

  // Create a hash of marker IDs so we only re-fit bounds when the actual locations change
  const markerHash = markers.map(m => m.id).join(',')

  useEffect(() => {
    if (!map || markers.length < 2) return
    // eslint-disable-next-line no-undef -- `google` is injected globally by the Maps JS API script
    const bounds = new google.maps.LatLngBounds()
    markers.forEach((m) => bounds.extend({ lat: m.lat, lng: m.lng }))
    map.fitBounds(bounds, 80)
  }, [map, markerHash])

  return null
}

function ClusteredMarkers({ markers, selectedId, onMarkerClick, onMarkerHover }) {
  const map = useMap()
  const [zoom, setZoom] = useState(6)
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    if (!map) return
    const updateMapState = () => {
      setZoom(map.getZoom() || 6)
      const b = map.getBounds()
      if (b) {
        setBounds([
          b.getSouthWest().lng(),
          b.getSouthWest().lat(),
          b.getNorthEast().lng(),
          b.getNorthEast().lat()
        ])
      }
    }
    updateMapState()
    const listenerZoom = map.addListener('zoom_changed', updateMapState)
    const listenerBounds = map.addListener('bounds_changed', updateMapState)
    return () => {
      window.google.maps.event.removeListener(listenerZoom)
      window.google.maps.event.removeListener(listenerBounds)
    }
  }, [map])

  const points = useMemo(() => {
    const usedCoords = new Set()
    return markers.map((m) => {
      let lat = m.lat
      let lng = m.lng

      // Jitter overlapping markers so they don't hide each other at max zoom
      let key = `${lat},${lng}`
      let spiral = 0
      while (usedCoords.has(key)) {
        spiral += 1
        // Increase offset slightly to prevent overlapping at max zoom
        lat += 0.0003 * Math.cos(spiral)
        lng += 0.0003 * Math.sin(spiral)
        key = `${lat},${lng}`
      }
      usedCoords.add(key)

      return {
        type: 'Feature',
        properties: {
          cluster: false,
          markerId: m.id,
          tone: m.color?.startsWith('#') ? m.color : (MARKER_COLORS[m.color] ?? MARKER_COLORS.brand).background
        },
        geometry: { type: 'Point', coordinates: [lng, lat] }
      }
    })
  }, [markers])

  const supercluster = useMemo(() => {
    const sc = new Supercluster({
      radius: 120, // Moderate radius for grouping
      maxZoom: 15, // Keep clustering until deep zoom to prevent visual overlap
      map: (props) => ({ tone: props.tone })
    })
    sc.load(points)
    return sc
  }, [points])

  const clusters = useMemo(() => {
    if (!bounds || !supercluster) return points
    return supercluster.getClusters(bounds, zoom)
  }, [bounds, zoom, supercluster, points])

  return (
    <>
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count: pointCount, markerId, tone } = cluster.properties

        if (isCluster) {
          return (
            <AdvancedMarker
              key={`cluster-${cluster.id}`}
              position={{ lat, lng }}
              zIndex={5}
              onClick={() => {
                const expansionZoom = supercluster.getClusterExpansionZoom(cluster.id)
                map.setZoom(expansionZoom)
                map.panTo({ lat, lng })
              }}
            >
              <span className="relative grid place-items-center cursor-pointer hover:scale-110 transition-transform">
                <ClusterSvgMarker color="#009C94" count={pointCount} isSelected={false} />
              </span>
            </AdvancedMarker>
          )
        }

        const isSelected = selectedId === markerId
        return (
          <AdvancedMarker
            key={markerId}
            position={{ lat, lng }}
            zIndex={isSelected ? 10 : 1}
            onClick={() => onMarkerClick?.(markerId)}
          >
            <span
              className="relative grid place-items-center cursor-pointer"
              onMouseEnter={() => onMarkerHover?.(markerId)}
              onMouseLeave={() => onMarkerHover?.(null)}
            >
              <PointSvgMarker color={tone} isSelected={isSelected} />
            </span>
          </AdvancedMarker>
        )
      })}
    </>
  )
}

export default function GoogleMapView({
  markers = [],
  center,
  zoom = 6,
  fitBounds = true,
  selectedId,
  onMarkerClick,
  onMarkerHover,
  className = '',
  children,
}) {
  const hasCustomSizing = /(?:^|\s)(?:h-|min-h-)\S/.test(className)
  const sizeClasses = hasCustomSizing ? '' : 'h-full min-h-[420px]'

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div
        className={`grid place-items-center rounded-xl border border-zinc-200 bg-map-bg p-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 ${sizeClasses} ${className}`}
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
          colorScheme="DARK"
          style={{ width: '100%', height: '100%' }}
        >
          <CustomZoomControl />
          {fitBounds && <FitBoundsToMarkers markers={markers} />}
          <ClusteredMarkers
            markers={markers}
            selectedId={selectedId}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover}
          />
        </Map>
      </APIProvider>
      {children}
    </div>
  )
}
