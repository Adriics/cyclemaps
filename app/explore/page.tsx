"use client"

import { useEffect, useState } from "react"
import { Trail } from "./types/trail"
import "leaflet/dist/leaflet.css"
import { TrailCard } from "../components/TrailCard"
import { fetchWithAuth } from "../utils/fetchWithAuth"

export default function ExplorePage() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLogged, setIsLogged] = useState<boolean | null>(null)
  const [likedTrails, setLikedTrails] = useState<Set<string>>(new Set())

  const handleLike = async (trailId: string) => {
    console.log(`Trail with ID ${trailId} liked!`)
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/trails/${trailId}/like`,
        { method: "POST" }
      )

      if (response.ok) {
        setLikedTrails((prev) => {
          const ns = new Set(prev)
          ns.has(trailId) ? ns.delete(trailId) : ns.add(trailId)
          return ns
        })
        await fetchTrails()
      } else {
        const err = await response.text()
        console.error("Failed to like trail:", response.status, err)
      }
    } catch (error) {
      console.error("Error liking trail:", error)
    }
  }

  const fetchTrails = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setIsLogged(false)
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/trails`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 401) {
        setIsLogged(false)
        setTrails([])
        return
      }

      const data = await res.json()
      console.log("Trails recibidos:", data.data)
      setTrails(data.data || [])
      setIsLogged(true)
    } catch (error) {
      console.error(error)
      setIsLogged(false)
      setTrails([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrails()
  }, [])

  return (
    <div className="p-6">
      <main className="pt-10 relative z-10">
        <div className="flex flex-col justify-center items-center gap-4 gap-y-20 p-16 lg:grid">

          {isLoading && (
            <p className="text-gray-400 text-lg">
              Cargando rutas...
            </p>
          )}

          {isLogged === false && !isLoading && (
            <p className="text-gray-400 text-lg">
              Inicia sesión para explorar rutas 🚴‍♂️
            </p>
          )}

          {isLogged === true && !isLoading && trails.length === 0 && (
            <p className="text-gray-400 text-lg">
              Todavía no hay rutas disponibles.
            </p>
          )}

          {!isLoading && isLogged && trails.length > 0 &&
            trails.map((trail) => (
              <TrailCard
                key={trail.id}
                id={trail.id}
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
            ))
          }

        </div>
      </main>
    </div>
  )
}
