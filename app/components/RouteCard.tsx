import Image from "next/image"

interface RouteCardProps {
  title: string
  imageUrl: string
  elevationGain: number
  distance: number
  difficulty: string
  authorId: string
}

export function RouteCard({
  title,
  imageUrl,
  elevationGain,
  distance,
  difficulty,
  authorId,
}: RouteCardProps) {
  return (
    <div className="w-250 grid grid-cols-2 h-full p-6">
      <div className="bg-white p-4 w-full">
        <Image src={imageUrl} alt="Image route" width={700} height={700} />

        <h3>{title}</h3>
      </div>

      <div className="bg-white w-60 p-4 flex flex-col">
        <span>Desnivel: {elevationGain}</span>
        <span>Distancia: {distance}</span>
        <span>Dificultad: {difficulty}</span>
        <span>Trailero de ruta: {authorId}</span>
      </div>
    </div>
  )
}
