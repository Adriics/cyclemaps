import { Trail } from "@/app/explore/types/trail"

export interface UserProfile {
  id: string
  name: string
  email: string
  stats: {
    trailsCreated: number
    trailsLiked: number
    totalDistance: number
    totalElevation: number
  }
  createdTrails: Trail[]
  likedTrails: Trail[]
}
