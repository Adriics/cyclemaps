import { parseCookies } from "nookies"

export const HttpClient = async (
  url: string,
  method: string,
  body?: string
) => {
  try {
    console.log(`HttpClient: Enviando ${method} a ${url}`)
    if (body) console.log(`HttpClient: Body:`, body)

    // Obtener el token de las cookies usando nookies
    const cookies = parseCookies()
    const token = cookies.token // Asumiendo que la cookie se llama "token"

    // Preparar los headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // Añadir el token de autenticación si existe
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
      console.log("Token recuperado:", token)
      console.log("Headers enviados:", headers)
    } else {
      console.log("No se encontró token para incluir en headers")
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    })

    console.log(`HttpClient: Respuesta recibida, status: ${response.status}`)
    return response
  } catch (error) {
    console.error("HttpClient error:", error)
    throw error
  }
}
