"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserProfile } from "./types/user"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [backendUser, setBackendUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (status === "authenticated" && session?.backendToken) {
      const fetchUser = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/users/me`,
            {
              headers: { Authorization: `Bearer ${session.backendToken}` },
            }
          )
          const data = await res.json()
          if (data.ok) setBackendUser(data.data)
          else
            console.error("Error obteniendo usuario del backend:", data.message)
        } catch (err) {
          console.error("Error al llamar /users/me:", err)
        }
      }
      fetchUser()
    }
  }, [status, session])

  if (status === "loading")
    return <p className="text-white p-20">Cargando...</p>
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const user = session?.user

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.image || backendUser?.picture || ""}
            alt="Foto de perfil"
            className="rounded-full w-32 h-32 mb-4 border-4 border-white/20 shadow-md object-cover"
          />
          <h1 className="text-3xl font-bold">
            {backendUser?.name || user?.name}
          </h1>
          <p className="text-gray-300">{backendUser?.email || user?.email}</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-6 text-center mb-8">
          <div className="bg-white/10 p-4 rounded-xl shadow-inner">
            <p className="text-2xl font-semibold">
              {backendUser?.stats?.totalDistance ?? 0}
            </p>
            <p className="text-gray-400 text-sm">Distancia</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl shadow-inner">
            <p className="text-2xl font-semibold">
              {backendUser?.stats.trailsCreated}
            </p>
            <p className="text-gray-400 text-sm">Rutas subidas</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl shadow-inner">
            <p className="text-2xl font-semibold">
              {backendUser?.stats.trailsLiked}
            </p>
            <p className="text-gray-400 text-sm">Likes</p>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="flex justify-center">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-medium shadow-md transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
