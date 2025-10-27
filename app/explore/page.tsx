"use client"

import { useEffect, useState } from "react"
import { Trail } from "./types/trail"
import "leaflet/dist/leaflet.css"
import { TrailCard } from "../components/TrailCard"

export default function ExplorePage() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [likedTrails, setLikedTrails] = useState<Set<string>>(new Set())

  const handleLike = async (trailId: string) => {
    console.log(`Trail with ID ${trailId} liked!`)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trails/${trailId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      )
      if (response.ok) {
        setLikedTrails((prev) => {
          const ns = new Set(prev)
          ns.add(trailId)
          return ns
        })
      }
      if (!response.ok) {
        const err = await response.text()
        console.error("Failed to like trail:", response.status, err)
      }
    } catch (error) {
      console.error("Error liking trail:", error)
    }
  }

  useEffect(() => {
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
              likes={trail.likeCount}
              onLike={() => handleLike(trail.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
