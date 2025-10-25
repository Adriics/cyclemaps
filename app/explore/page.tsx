"use client"

import { useEffect, useState } from "react"
import { Trail } from "./types/trail"
import { RouteCard } from "../components/RouteCard"

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
      <main className="relative z-10">
        <h1 className="text-2xl font-bold mb-4">Explora rutas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trails.map((trail) => (
            <RouteCard
              title={trail.name}
              authorId={trail.authorId}
              difficulty={trail.difficulty}
              distance={trail.distance}
              elevationGain={trail.elevationGain}
              imageUrl={trail.imageUrl}
              key={trail.id}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
