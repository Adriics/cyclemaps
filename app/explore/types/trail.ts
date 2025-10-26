export interface Trail {
  id: string
  name: string
  description: string
  distance: number
  elevationGain: number
  difficulty: string
  imageUrl: string
  authorId: string
  authorName: string
  coordinates: [number, number][] // Backend ya te las envía
}
