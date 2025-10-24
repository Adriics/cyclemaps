"use client"

import { useState } from "react"

export default function UploadPage() {
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

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: formData,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la ruta"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Fácil</option>
        <option value="medium">Media</option>
        <option value="hard">Difícil</option>
      </select>

      {/* 🗺️ Archivo GPX */}
      <input
        type="file"
        name="gpxFile"
        accept=".gpx"
        onChange={(e) => setGpxFile(e.target.files?.[0] || null)}
      />

      {/* 🖼️ Imagen opcional */}
      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button type="submit">Subir ruta</button>
    </form>
  )
}
