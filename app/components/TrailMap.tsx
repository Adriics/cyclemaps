"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface TrailMapProps {
  coordinates: [number, number][]
  trailName: string
}

export function TrailMap({ coordinates, trailName }: TrailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || !coordinates || coordinates.length === 0) return

    // Limpiar mapa anterior si existe
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
    }

    // Crear el mapa
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    })

    mapInstanceRef.current = map

    // Añadir capa de tiles (fondo del mapa)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map)

    // Crear la línea de la ruta
    const polyline = L.polyline(
      coordinates.map((coord) => [coord[1], coord[0]]), // Leaflet usa [lat, lng]
      {
        color: "#63d471",
        weight: 7,
        opacity: 1,
      }
    ).addTo(map)

    // Ajustar el zoom para que se vea toda la ruta
    map.fitBounds(polyline.getBounds(), { padding: [50, 50] })

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [coordinates, trailName])

  return (
    <div
      ref={mapRef}
      className="w-full h-[600px] rounded-2xl overflow-hidden border border-[#63d471]/20 shadow-2xl"
    />
  )
}
