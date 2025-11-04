export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token")

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token || ""}`,
    },
  })

  if (response.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    throw new Error("Token expired")
  }

  return response
}
