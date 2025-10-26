export function generateGeoapifyStaticMap(
  coordinates: [number, number][],
  options: {
    width?: number
    height?: number
    strokeColor?: string
    strokeWidth?: number
    style?: string
  } = {}
): string | null {
  if (!coordinates || coordinates.length === 0) return null

  // ⭐ Simplificar coordenadas: tomar 1 de cada N puntos
  const simplifyFactor = Math.max(1, Math.floor(coordinates.length / 100))
  const simplifiedCoords = coordinates.filter(
    (_, index) => index % simplifyFactor === 0
  )

  console.log("API Key:", process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY)

  const {
    width = 600,
    height = 400,
    strokeColor = "red",
    strokeWidth = 3,
    style = "osm-bright",
  } = options

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: simplifiedCoords, // ⭐ Usar coordenadas simplificadas
        },
      },
    ],
  }

  const geometryParam = encodeURIComponent(JSON.stringify(geojson))

  return `https://maps.geoapify.com/v1/staticmap?style=${style}&width=${width}&height=${height}&geometry=${geometryParam}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
}
