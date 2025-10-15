import { LogoCycleMaps } from "./LogoCycleMaps"
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-[var(--surface-dark)] w-full flex justify-between text-white">
      <LogoCycleMaps />

      <nav>
        <ul className="flex gap-10">
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
      </nav>

      <Image
        alt="Profile photo"
        src="/profile-icon.jpg"
        width={40}
        height={40}
      />
    </header>
  )
}
