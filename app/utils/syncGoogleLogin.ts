import { Session } from "next-auth"

export async function syncGoogleLogin(session: Session) {
  if (!session?.user?.email) return null

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        picture: session.user.image,
      }),
    }
  )

  const data = await response.json()

  if (data.ok && data.data) {
    // guardamos el token del backend (tu JWT)
    localStorage.setItem("backend_token", data.data)
    return data.data
  }

  return null
}
