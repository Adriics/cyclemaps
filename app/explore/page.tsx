"use client"

import { useEffect, useState } from "react"
import { Trail } from "./types/trail"

export default function ExplorePage() {
  const [trails, setTrails] = useState<Trail[]>([])

  useEffect(() => {
    const fetchTrails = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      const data = await res.json()
      setTrails(data.data || [])
    }

    fetchTrails()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explora rutas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trails.map((trail) => (
          <div key={trail.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{trail.name}</h2>
            <p className="text-gray-500">{trail.description}</p>

            {trail.imageUrl && (
              <img
                src={trail.imageUrl}
                alt={trail.name}
                className="w-full h-64 object-cover mt-2 rounded-lg"
              />
            )}

            <p className="font-bold text-lg">Distancia: {trail.distance} km</p>
            <p className="font-bold text-lg">
              Desnivel positivo: {trail.elevationGain} m
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
