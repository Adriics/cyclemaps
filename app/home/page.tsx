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
    <main className="grid grid-cols-1 justify-center items-center md:grid-cols-2 min-h-screen p-20 gap-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#233329] via-[#0a0a0a] to-[#0a0a0a] z-0"></div>
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#63d471] rounded-full blur-[120px] opacity-20 animate-pulse z-0"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#69fff1] rounded-full blur-[120px] opacity-15 animate-pulse z-0"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="w-100 flex flex-col justify-center items-center gap-6 relative z-10">
        <div className="inline-block px-4 py-2 bg-[#63d471]/10 border border-[#63d471]/30 rounded-full">
          <span className="text-[#63d471] text-sm font-medium">
            ✨ Descubre el mundo sobre dos ruedas
          </span>
        </div>
        <h1 className="text-6xl font-bold">
          Destinos{" "}
          <span className="block bg-gradient-to-r from-[#63d471] to-[#69fff1] bg-clip-text text-transparent">
            inolvidables
          </span>{" "}
          en cada ruta
        </h1>
        <p className="text-xl text-[#f8f9f7]/70 leading-relaxed max-w-lg">
          Tus rutas y las de los demás apasionados por todo el mundo, en un solo
          sitio. Eliges el tipo de actividad y a rodar.
        </p>
        <Button
          text="Explorar ➜"
          onClick={() => handleClick("/explore")}
          classname="text-xl p-2"
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-y-4 relative z-10">
        <Image
          src="/maps-hero.png"
          alt="Maps image"
          width={2300}
          height={50}
          className="rounded-3xl"
        />
      </div>
    </main>
  )
}
