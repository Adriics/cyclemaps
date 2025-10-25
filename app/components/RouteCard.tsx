import Image from "next/image"

interface RouteCardProps {
  title: string
  description?: string
  imageUrl: string
  elevationGain: number
  distance: number
  difficulty: string
  authorName?: string
}

export function RouteCard({
  title,
  description,
  imageUrl,
  elevationGain,
  distance,
  difficulty,
  authorName,
}: RouteCardProps) {
  return (
    <div className="w-full grid grid-cols-2 h-full p-10 text-black">
      <div className="bg-white p-10">
        <Image src={imageUrl} alt="Image route" width={800} height={700} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="bg-white w-60 p-4 flex flex-col">
        <span>Desnivel: {elevationGain}</span>
        <span>Distancia: {distance}</span>
        <span>Dificultad: {difficulty}</span>
        <span>Trailero de ruta: {authorName}</span>
      </div>
    </div>
  )
}
