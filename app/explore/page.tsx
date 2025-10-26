"use client"

import { useEffect, useState } from "react"
import { Trail } from "./types/trail"
import "leaflet/dist/leaflet.css"
import { TrailCard } from "../components/TrailCard"

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
      console.log("Trails recibidos:", data.data) // ← Añade esto
      console.log("Trails recibidos:", data.data)
      console.log(
        "IDs de trails:",
        data.data?.map((t: Trail) => t.id)
      )
      setTrails(data.data || [])
    }

    fetchTrails()
  }, [])

  return (
    <div className="p-6">
      <main className="pt-10 relative z-10">
        <div className="flex flex-col justify-center items-center gap-4">
          {trails.map((trail) => (
            <TrailCard
              id={trail.id}
              key={trail.id}
              title={trail.name}
              description={trail.description}
              authorName={trail.authorName}
              difficulty={trail.difficulty}
              distance={trail.distance}
              elevationGain={trail.elevationGain}
              imageUrl={trail.imageUrl}
              coordinates={trail.coordinates}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
