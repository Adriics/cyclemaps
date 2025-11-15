"use client"

import { useRouter } from "next/navigation"
import { LogoCycleMaps } from "./LogoCycleMaps"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const router = useRouter()

  const [visible, setVisible] = useState(false)

  const handleClickProfile = () => {
    router.push("/profile")
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
        <li className="hover:scale-110 hover:text-[var(--primary)] transition-all">
          <a href="/explore">Explora</a>
        </li>
        <li className="hover:scale-110 hover:text-[var(--primary)] transition-all">
          <a href="/planify">Planifica tu ruta</a>
        </li>
        <li className="hover:scale-110 hover:text-[var(--primary)] transition-all">
          <a href="/upload">Sube tu ruta</a>
        </li>
      </ul>

      <div className="flex justify-between gap-10">
        <button
          className="block md:hidden"
          onClick={() => setVisible(!visible)}
        >
          ☰
        </button>

        <Image
          alt="Profile photo"
          src="/profile-icon.jpg"
          width={40}
          height={40}
          onClick={handleClickProfile}
        />
      </div>
    </nav>
  )
}
