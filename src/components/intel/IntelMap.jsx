import { useState, useEffect } from 'react'
import GoogleMapView from '../GoogleMapView.jsx'
import {
  DW_FACILITIES,
  DW_CORPS,
  DW_JUDGES,
  DW_ATTORNEYS,
  dwFacColor,
} from '../../data/detentionWatchData.js'

const DEFAULT_LAYERS = { detention: true, planned: true, corps: true, judges: true, attorneys: false }

export default function IntelMap({ layers = DEFAULT_LAYERS, activeCapacities, onDataLoaded }) {
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    if (onDataLoaded) {
      const activeCount = DW_FACILITIES.filter((f) => f.status === 'active').length
      onDataLoaded(activeCount)
    }
  }, [onDataLoaded])

  // Convert our data into GoogleMapView markers
  const markers = []

  if (layers.detention) {
    const activeFacilities = DW_FACILITIES.filter((f) => f.status === 'active')
    activeFacilities.forEach((f) => {
      let bucket = 'low'
      if (f.pop >= 1000) bucket = 'critical'
      else if (f.pop >= 500) bucket = 'high'
      else if (f.pop >= 150) bucket = 'moderate'
      
      if (!activeCapacities || activeCapacities[bucket]) {
        if (f.lat && f.lng) {
          markers.push({
            id: f.id,
            lat: f.lat,
            lng: f.lng,
            color: dwFacColor(f.pop, f.status),
            icon: 'building',
            iconStyle: 'glow',
            title: f.name,
            subtitle: `Pop: ${f.pop} / Cap: ${f.cap} · Op: ${f.op}`,
            pop: f.pop,
            cap: f.cap,
            op: f.op,
          })
        }
      }
    })
  }

  if (layers.planned && (!activeCapacities || activeCapacities.planned)) {
    const planned = DW_FACILITIES.filter((f) => f.status === 'planned')
    planned.forEach((f) => {
      markers.push({
        id: f.id,
        lat: f.lat,
        lng: f.lng,
        color: '#f59e0b', // Amber-500
        icon: 'clock',
        iconStyle: 'minimal',
        title: f.name,
        subtitle: `PLANNED — ${f.city}, ${f.state}`,
      })
    })
  }




  if (layers.corps && (!activeCapacities || activeCapacities.corps)) {
    // Only map corporations that have lat/lng defined (DW_CORPS currently uses x/y for SVG)
    // As a fallback for the Google Map, we can approximate HQ locations if they don't have lat/lng.
    // For this example, we'll map them using known coordinates for these cities.
    const corpLocations = {
      'C1': { lat: 36.1627, lng: -86.7816 }, // Nashville, TN
      'C2': { lat: 26.3587, lng: -80.0831 }, // Boca Raton, FL
      'C3': { lat: 32.5232, lng: -92.6379 }, // Ruston, LA
      'C4': { lat: 40.9180, lng: -111.8722 }, // Centerville, UT
      'C5': { lat: 32.4065, lng: -97.2114 }, // Alvarado, TX
    }
    DW_CORPS.forEach((corp) => {
      const loc = corpLocations[corp.id]
      if (loc) {
        markers.push({
          id: corp.id,
          lat: loc.lat,
          lng: loc.lng,
          color: '#8b5cf6', // Purple-500
          icon: 'briefcase',
          iconStyle: 'badge',
          title: corp.name,
          subtitle: `HQ: ${corp.hq} · Profit: ${corp.profit}`,
        })
      }
    })
  }

  if (layers.judges) {
    // Similar to corps, we approximate court locations if lat/lng are missing.
    const courtLocations = {
      'J1': { lat: 37.7749, lng: -122.4194 }, // SF
      'J2': { lat: 42.3601, lng: -71.0589 }, // Boston
      'J3': { lat: 33.7490, lng: -84.3880 }, // Atlanta
      'J4': { lat: 29.7604, lng: -95.3698 }, // Houston
      'J5': { lat: 40.7128, lng: -74.0060 }, // NYC
      'J6': { lat: 41.8781, lng: -87.6298 }, // Chicago
      'J7': { lat: 47.6062, lng: -122.3321 }, // Seattle
      'J8': { lat: 32.7767, lng: -96.7970 }, // Dallas
      'J9': { lat: 25.7617, lng: -80.1918 }, // Miami
      'J10': { lat: 34.0522, lng: -118.2437 }, // LA
      'J11': { lat: 39.9526, lng: -75.1652 }, // Philly
      'J12': { lat: 29.4241, lng: -98.4936 }, // San Antonio
    }
    DW_JUDGES.forEach((j) => {
      const loc = courtLocations[j.id]
      if (loc) {
        markers.push({
          id: j.id,
          lat: loc.lat,
          lng: loc.lng,
          color: '#3b82f6', // Blue-500
          icon: 'balance-scale',
          iconStyle: 'pin',
          title: j.name,
          subtitle: `${j.court} · Grant ${j.approve}% / Deny ${j.deny}%`,
        })
      }
    })
  }

  if (layers.attorneys) {
    const attorneyLocations = {
      'A1': { lat: 40.7128, lng: -74.0060 }, // NY
      'A2': { lat: 38.9072, lng: -77.0369 }, // DC
      'A3': { lat: 33.6846, lng: -117.8265 }, // Irvine, CA
      'A4': { lat: 38.8951, lng: -77.0364 }, // DC
      'A5': { lat: 42.3601, lng: -71.0589 }, // MA
      'A6': { lat: 34.0522, lng: -118.2437 }, // LA
      'A7': { lat: 41.7658, lng: -72.6734 }, // CT
      'A8': { lat: 40.0583, lng: -74.4057 }, // NJ
      'A9': { lat: 37.7749, lng: -122.4194 }, // SF
      'A10': { lat: 39.9526, lng: -75.1652 }, // PA
    }
    DW_ATTORNEYS.forEach((a) => {
      const loc = attorneyLocations[a.id]
      if (loc) {
        markers.push({
          id: a.id,
          lat: loc.lat,
          lng: loc.lng,
          color: '#ec4899', // Pink-500
          icon: 'briefcase',
          iconStyle: 'glow',
          title: a.name,
          subtitle: `${a.firm} · ${a.circuit} Circuit`,
        })
      }
    })
  }

  const activeMarkerId = hoveredId || selectedId
  const activeMarker = markers.find(m => m.id === activeMarkerId)

  return (
    <GoogleMapView
      markers={markers}
      selectedId={selectedId}
      onMarkerClick={setSelectedId}
      onMarkerHover={setHoveredId}
      className="h-full w-full"
    >
      {/* Overlay for active (hovered or selected) marker info */}
      {activeMarker && (
        <div className="absolute bottom-4 left-4 z-10 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-4 shadow-xl backdrop-blur-sm transition-opacity animate-in fade-in zoom-in-95 duration-200">
          {selectedId === activeMarker.id && (
            <button 
              onClick={() => setSelectedId(null)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
          <div className="font-semibold text-zinc-900 dark:text-white mb-2 pr-4">{activeMarker.title}</div>
          
          {activeMarker.pop !== undefined && activeMarker.cap !== undefined ? (
            <div className="mt-3 flex flex-col gap-1.5">
              <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <span>Capacity Usage</span>
                <span style={{ color: activeMarker.color }}>
                  {Math.round((activeMarker.pop / (activeMarker.cap || 1)) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 shadow-inner">
                <div 
                  className="h-full transition-all duration-500" 
                  style={{ 
                    width: `${Math.min((activeMarker.pop / (activeMarker.cap || 1)) * 100, 100)}%`,
                    backgroundColor: activeMarker.color,
                    boxShadow: `0 0 8px ${activeMarker.color}`
                  }} 
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <div>
                  Pop: <span className="font-medium text-zinc-700 dark:text-zinc-300">{activeMarker.pop}</span>
                </div>
                <div>
                  Cap: <span className="font-medium text-zinc-700 dark:text-zinc-300">{activeMarker.cap}</span>
                </div>
              </div>
              {activeMarker.op && (
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wide">
                  Operator: {activeMarker.op}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{activeMarker.subtitle}</div>
          )}
        </div>
      )}
    </GoogleMapView>
  )
}
