"use client"

import { useEffect, useState } from "react"
import { UserProfile } from "./types/user"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        )

        const data = await response.json()
        console.log("Datos recibidos: ", data)

        setProfile(data)
      } catch (error) {
        console.log("Error en /profile: ", error)
      }
    }
    fetchProfile()
  }, [])
  return (
    <div className="bg-transparent min-h-screen p-20 text-white text-xl">
      <p>Nombre: {profile?.name}</p>
      <p>Email: {profile?.email}</p>
      <p>Distancia total: {profile?.stats.totalDistance} km</p>
      <p>Me han gustado {profile?.stats.trailsLiked} rutas</p>
      <p>Elevación total: {profile?.stats.totalElevation} m</p>
    </div>
  )
}
