import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN } from '@/config/envMode'

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN
export default function Map() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(74.1768)
  const [lat, setLat] = useState(31.3695)
  const [zoom, setZoom] = useState(8)

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat])
      map.current.setZoom(zoom)
    } else {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      })
    }
  }, [lng, lat, zoom])

  const mystyle = {
    backgroundColor: 'rgba(35, 55, 75, 0.9)',
    color: '#fff',
    padding: '6px 12px',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '12px',
    borderRadius: '4px',
  }

  return (
    <div className="relative">
      <div style={mystyle} className="lg:block hidden ">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="h-[200px] w-full lg:h-[400px]" />
    </div>
  )
}
