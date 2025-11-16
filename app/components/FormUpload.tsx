import { useState } from "react"
import { Button } from "./Button"
import { useSession } from "next-auth/react"

export default function FormUpload() {
  const { data: session, status } = useSession()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("easy")
  const [gpxFile, setGpxFile] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)

  if (status === "loading") {
    return <p className="text-white">Cargando...</p>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.backendToken) {
      alert("Tienes que iniciar sesión antes de subir una ruta.")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("difficulty", difficulty)

    if (gpxFile) formData.append("gpxFile", gpxFile)
    if (image) formData.append("imageFile", image)

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/trails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.backendToken}`,
      },
      credentials: "include",
      body: formData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* ... todo tu código igual ... */}
      <Button text="Subir ruta" classname="h-10 w-40" type="submit" />
    </form>
  )
}
