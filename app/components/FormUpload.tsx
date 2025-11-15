import { useState } from "react"
import { Button } from "./Button"
import { useSession } from "next-auth/react"

export default function FormUpload() {
  const session = useSession()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("easy")
  const [gpxFile, setGpxFile] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("difficulty", difficulty)

    if (gpxFile) formData.append("gpxFile", gpxFile)
    if (image) formData.append("imageFile", image)
    if (!session.data?.backendToken) {
      alert("Tienes que iniciar sesión antes de subir una ruta.")
      return
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/trails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.data?.backendToken || ""}`,
      },
      body: formData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <label htmlFor="trailName">Nombre de la ruta</label>
      <input
        name="trailName"
        id="trailName"
        type="text"
        placeholder="Ejemplo: Senderos por Andorra"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="descriptionTrail">Descripción</label>
      <textarea
        name="descriptionTrail"
        id="descriptionTrail"
        placeholder="Ruta pasando por los pirineos..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="border border-gray-300 rounded-md p-2"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option className="text-black" value="easy">
          Fácil
        </option>
        <option className="text-black" value="medium">
          Media
        </option>
        <option className="text-black" value="hard">
          Difícil
        </option>
      </select>

      <div className="flex flex-col gap-2">
        {/* 🗺️ Archivo GPX */}
        <label htmlFor="gpxFile" className="font-medium">
          Archivo de ruta
        </label>
        <input
          type="file"
          name="gpxFile"
          accept=".gpx"
          onChange={(e) => setGpxFile(e.target.files?.[0] || null)}
        />
      </div>
      <div className="flex flex-col gap-2">
        {/* 🖼️ Imagen opcional */}
        <label htmlFor="imageFile" className="font-medium">
          Imagen opcional
        </label>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <Button text="Subir ruta" classname="h-10 w-40" type="submit"></Button>
    </form>
  )
}
