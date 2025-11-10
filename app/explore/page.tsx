"use client"

import { useEffect, useState } from "react"
import { Trail } from "./types/trail"
import "leaflet/dist/leaflet.css"
import { TrailCard } from "../components/TrailCard"
import { fetchWithAuth } from "../utils/fetchWithAuth"

export default function ExplorePage() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [likedTrails, setLikedTrails] = useState<Set<string>>(new Set())

  const handleLike = async (trailId: string) => {
    console.log(`Trail with ID ${trailId} liked!`)

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/trails/${trailId}/like`,
        {
          method: "POST",
        }
      )
      if (response.ok) {
        setLikedTrails((prev) => {
          const ns = new Set(prev)

          if (ns.has(trailId)) {
            ns.delete(trailId)
          } else {
            ns.add(trailId)
          }
          return ns
        })

        await fetchTrails()
      }
      if (!response.ok) {
        const err = await response.text()
        console.error("Failed to like trail:", response.status, err)
      }
    } catch (error) {
      console.error("Error liking trail:", error)
    }
  }
  const fetchTrails = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
    const data = await res.json()
    console.log("Trails recibidos:", data.data)
    console.log(
      "IDs de trails:",
      data.data?.map((t: Trail) => t.id)
    )
    setTrails(data.data || [])
  }

  useEffect(() => {
    fetchTrails()
  }, [])

  return (
    <div className="p-6">
      <main className="pt-10 relative z-10">
        <div className="flex flex-col justify-center items-center gap-4 gap-y-20 p-16 lg:grid">
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
              likes={trail.likeCount}
              onLike={() => handleLike(trail.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
