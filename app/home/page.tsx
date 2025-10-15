"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../components/Button"

export default function HomePage() {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center gap-6">
      <h1 className="text-2xl font-bold">Bienvenido a la página de inicio</h1>
      <span>Destinos inolvidables de todo el mundo aquí.</span>
      <span>
        Tus rutas y las de los demàs apasionados por todo el mundo, en un solo
        sitio. Eliges el tipo de actividad y a rodar.
      </span>
      <Button text="Registrarse" onClick={() => handleClick("/register")} />
      <Image src="/maps-hero.png" alt="Maps image" width={1100} height={20} />
      <Button text="Explorar" onClick={() => handleClick("/explore")} />
    </main>
  )
}
