import { Trail } from "../explore/types/trail"
import { RouteCard } from "./RouteCard"

interface RoutesSectionProps {
  trails: Trail[]
}

export function RoutesSection({ trails }: RoutesSectionProps) {
  return (
    <section className="flex-1 flex justify-center items-start p-10">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        {trails.map((trail, index) => (
          <RouteCard
            authorId={trail.authorId}
            difficulty={trail.difficulty}
            distance={trail.distance}
            elevationGain={trail.elevationGain}
            imageUrl={trail.imageUrl}
            title={trail.name}
            key={index}
          />
        ))}
      </div>
    </section>
  )
}
