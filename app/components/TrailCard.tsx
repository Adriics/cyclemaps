import Image from "next/image"
import { Button } from "./Button"
import { generateGeoapifyStaticMap } from "../utils/geoapifyStaticMap"
import { useRouter } from "next/navigation"
import { LikeButton } from "./LikeButton"

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
  likes?: number
  onLike?: () => void
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
  likes,
  onLike,
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
      className="w-80 flex flex-col justify-center items-center h-auto text-white bg-[#233329]/30 backdrop-blur-sm border border-[#63d471]/20 rounded-2xl p-6 
         hover:border-[#63d471]/50
        hover:bg-[#233329]/40
        hover:scale-[1.02] transition-all hover:shadow-lg hover:shadow-[#63d471]/10 md:grid md:w-full lg:w-220 lg:h-auto lg:grid lg:grid-cols-2 lg:gap-x-10"
    >
      <div className="bg-transparent flex flex-col justify-center items-center gap-6 mx-auto">
        {/* Mostrar mapa si existe, si no la imagen */}
        <Image
          src={mapUrl || imageUrl}
          alt={mapUrl ? "Mapa de la ruta" : "Imagen de la ruta"}
          width={400}
          height={400}
          className="rounded-xl overflow-hidden"
        />
        <Button
          text="Ver ruta"
          type="button"
          onClick={handleClick}
          classname="bg-[var(--primary)] w-fit"
        />
      </div>

      <div className="w-100 p-12 flex flex-col gap-y-10">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-lg">{description}</p>
        <span>📏 Distancia: {distance} km</span>
        <span>📍 Desnivel: {elevationGain} m</span>
        <span>👤 Creador: {authorName}</span>
        <span>⚡ Dificultad: {difficulty}</span>
        <span>♥️ {likes}</span>
        <LikeButton onClick={onLike} />
      </div>
    </div>
  )
}
