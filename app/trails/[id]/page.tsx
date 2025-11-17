"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Trail } from "@/app/explore/types/trail"
import { Button } from "@/app/components/Button"
import { generateGeoapifyStaticMap } from "@/app/utils/geoapifyStaticMap"
import { TrailMap } from "@/app/components/TrailMap"

export default function TrailDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [trail, setTrail] = useState<Trail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrail = async () => {
      try {
        console.log("ID del trail:", params.id)
        console.log(
          "URL completa:",
          `${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/trails/${params.id}`
        )

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/trails/${params.id}`
        )

        console.log("Response status:", response.status)

        if (!response.ok) {
          const errorData = await response.text()
          console.error("Error response:", errorData)
          throw new Error("Ruta no encontrada")
        }
        const data = await response.json()
        console.log("Trail recibido:", data)

        setTrail(data)
      } catch (error) {
        console.error("Error al cargar la ruta:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrail()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Cargando ruta...</p>
      </div>
    )
  }

  if (!trail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl">Ruta no encontrada</p>
        <Button
          text="Volver al explorador"
          onClick={() => router.push("/explore")}
          classname="bg-[var(--primary)]"
        />
      </div>
    )
  }

  // Generar mapa o usar imagen de fallback
  const mapUrl =
    trail.coordinates && trail.coordinates.length > 0
      ? generateGeoapifyStaticMap(trail.coordinates, {
          width: 1200,
          height: 600,
          strokeColor: "63d471",
          strokeWidth: 5,
          style: "dark-matter",
        }) || trail.imageUrl
      : trail.imageUrl

  console.log("Coordenadas:", trail.coordinates?.length)
  console.log("Map URL:", mapUrl)
  return (
    <div className="w-full bg-gradient-to-b from-[#0a0f0d] to-[#1a2520] p-8">
      <div className="mx-auto">
        <div className="mb-8">
          <Button
            text="← Volver"
            onClick={() => router.back()}
            classname="bg-transparent border border-[#63d471]/30 hover:border-[#63d471]"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">{trail.name}</h1>
          <p className="text-xl text-gray-300 mb-2">{trail.description}</p>
          <p className="text-[#63d471]">Creado por {trail.authorName}</p>
        </div>

        <div className="mb-8 rounded-2xl overflow-hidden border border-[#63d471]/20 shadow-2xl">
          {trail.coordinates && trail.coordinates.length > 0 ? (
            <TrailMap coordinates={trail.coordinates} trailName={trail.name} />
          ) : (
            <Image
              src={trail.imageUrl}
              alt={`Imagen de ${trail.name}`}
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#233329]/30 backdrop-blur-sm border border-[#63d471]/20 rounded-xl p-6 hover:border-[#63d471]/50 transition-all">
            <p className="text-gray-400 text-sm mb-2">Distancia</p>
            <p className="text-3xl font-bold text-white">{trail.distance} km</p>
          </div>

          <div className="bg-[#233329]/30 backdrop-blur-sm border border-[#63d471]/20 rounded-xl p-6 hover:border-[#63d471]/50 transition-all">
            <p className="text-gray-400 text-sm mb-2">Desnivel</p>
            <p className="text-3xl font-bold text-white">
              {trail.elevationGain} m
            </p>
          </div>

          <div className="bg-[#233329]/30 backdrop-blur-sm border border-[#63d471]/20 rounded-xl p-6 hover:border-[#63d471]/50 transition-all">
            <p className="text-gray-400 text-sm mb-2">Dificultad</p>
            <p className="text-3xl font-bold text-white">{trail.difficulty}</p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button
            text="Descargar GPX"
            onClick={() => {
              console.log("Descargar GPX")
            }}
            classname="bg-[var(--primary)] border border-[#63d471] hover:bg-[#63d471]/10 flex-1 md:flex-none"
          />

          <Button
            text="Compartir"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copiado al portapapeles")
            }}
            classname="bg-[var(--primary)] border border-[#63d471] hover:bg-[#63d471]/10 flex-1 md:flex-none"
          />
        </div>
      </div>
    </div>
  )
}
