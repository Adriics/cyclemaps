import Image from "next/image"
import { Button } from "./Button"
import { generateGeoapifyStaticMap } from "../utils/geoapifyStaticMap"
import { useRouter } from "next/navigation"

interface TrailCardProps {
  id: string
  title: string
  description?: string
  imageUrl: string
  elevationGain: number
  distance: number
  difficulty: string
  authorName?: string
  coordinates?: [number, number][]
}

export function TrailCard({
  id,
  title,
  description,
  imageUrl,
  elevationGain,
  distance,
  difficulty,
  authorName,
  coordinates,
}: TrailCardProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/trails/${id}`)
  }

  // Generar URL del mapa si hay coordenadas
  const mapUrl =
    coordinates && coordinates.length > 0
      ? generateGeoapifyStaticMap(coordinates, {
          width: 800,
          height: 400,
          strokeColor: "63d471",
          strokeWidth: 5,
          style: "dark-matter",
        })
      : null

  return (
    <div
      className="w-240 justify-center items-center grid grid-cols-2 h-auto text-white bg-[#233329]/30 backdrop-blur-sm border border-[#63d471]/20 rounded-2xl p-6 
         hover:border-[#63d471]/50 
        hover:bg-[#233329]/40
        hover:scale-[1.02] transition-all hover:shadow-lg hover:shadow-[#63d471]/10"
    >
      <div className="bg-transparent p-10 flex flex-col justify-center items-center gap-6">
        {/* Mostrar mapa si existe, si no la imagen */}
        <Image
          src={mapUrl || imageUrl}
          alt={mapUrl ? "Mapa de la ruta" : "Imagen de la ruta"}
          width={800}
          height={700}
          className="rounded-xl overflow-hidden"
        />
        <Button
          text="Ver ruta"
          type="button"
          onClick={handleClick}
          classname="bg-[var(--primary)] w-fit"
        />
      </div>

      <div className="w-100 p-4 flex flex-col gap-y-10">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p>{description}</p>
        <span>📏 Distancia: {distance} km</span>
        <span>📍 Desnivel: {elevationGain} m</span>
        <span>👤 Creador: {authorName}</span>
        <span>⚡ Dificultad: {difficulty}</span>
      </div>
    </div>
  )
}
