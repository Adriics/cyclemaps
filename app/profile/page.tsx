"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading")
    return <p className="text-white p-20">Cargando...</p>
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const user = session?.user

  return (
    <div className="bg-transparent min-h-screen p-20 text-white text-xl">
      <h1 className="text-3xl mb-4">Perfil</h1>
      <img
        src={user?.image || ""}
        alt="Foto"
        className="rounded-full w-24 h-24 mb-4"
      />
      <p>Nombre: {user?.name}</p>
      <p>Email: {user?.email}</p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
