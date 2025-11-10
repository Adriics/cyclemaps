"use client"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white gap-y-20">
      <h1 className="text-3xl mb-6 font-semibold">Inicia sesión</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/profile" })}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl cursor-pointer"
      >
        Continuar con Google
      </button>
    </div>
  )
}
