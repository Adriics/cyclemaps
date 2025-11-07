"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function SignInButton() {
  const { data: session } = useSession()

  useEffect(() => {
    console.log("SESSION DESDE SIGNINBUTTON:", session)
  }, [session])

  return (
    <button
      onClick={() => signIn("google")}
      className="cursor-pointer bg-blue-500 text-white p-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  )
}
