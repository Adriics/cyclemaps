"use client"

import { Button } from "../components/Button"
import { useRouter } from "next/navigation"

export function HomePage() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/register")
  }

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <Button text="Registrarse" onClick={handleClick} />
    </div>
  )
}
