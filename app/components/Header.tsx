"use client"

import { useRouter } from "next/navigation"
import { Button } from "./Button"
import { LogoCycleMaps } from "./LogoCycleMaps"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const router = useRouter()

  const [visible, setVisible] = useState(false)

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <nav className="fixed flex top-0 p-3 w-full flex-col md:flex-row md:justify-between leading-10 z-50 bg-[#233329]/80 backdrop-blur-md border-b border-[#63d471]/20">
      <LogoCycleMaps />
      <ul
        className={`
  ${visible ? "flex" : "hidden"}
  md:flex
  transition-all-duration-300
   md:w-auto gap-x-20
  flex-row md:flex-row 
  gap-8 mt-0.5
`}
      >
        <li>
          <a href="/explore">Explora</a>
        </li>
        <li>
          <a href="/planify">Planifica tu ruta</a>
        </li>
        <li>
          <a href="/upload">Sube tu ruta</a>
        </li>
      </ul>

      <div className="flex justify-between">
        <button
          className="block md:hidden" // Solo visible en mobile
          onClick={() => setVisible(!visible)}
        >
          ☰
        </button>
        <Button
          classname=""
          text="Registrarse"
          onClick={() => handleClick("/register")}
        />

        <Image
          alt="Profile photo"
          src="/profile-icon.jpg"
          width={40}
          height={40}
        />
      </div>
    </nav>
  )
}
