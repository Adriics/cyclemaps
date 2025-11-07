import { getSession } from "next-auth/react"

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await getSession()
  const token = session?.backendToken

  const headers: HeadersInit = {
    ...options.headers,
    Authorization: `Bearer ${token || ""}`,
  }

  // Si hay body y no hay Content-Type, asumimos JSON
  if (
    options.body &&
    !(headers instanceof Headers) &&
    !("Content-Type" in headers)
  ) {
    ;(headers as Record<string, string>)["Content-Type"] = "application/json"
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    window.location.href = "/login"
    throw new Error("Token expirado o inválido")
  }

  return response
}
