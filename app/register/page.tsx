"use client"

import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import { InputField } from "../components/InputField"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HttpClient } from "../libs/HttpClient"

export default function RegisterPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        "POST",
        JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      )

      if (response.status === 201) {
        setSuccess(true)
        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        })

        alert("Registro exitoso")

        setTimeout(() => {
          setIsLoading(false)
          router.push("/home")
        }, 1300)
      } else if (response.status === 400) {
        try {
          const errorData = await response.json()
          setError(errorData.message || "Invalid data provided")
        } catch (error) {
          setError("Invalid data provided")
          console.log("Error details:", error)
        }
        setIsLoading(false)
      } else {
        setError("An unexpected error occurred")
        setIsLoading(false)
        console.log("Unexpected response status:", response.status)
      }
    } catch (error) {
      setError("Failed to connect to the server")
      setIsLoading(false)
      console.log("Connection error:", error)
    }
  }

  return (
    <main className="bg-[var(--foreground)] min-h-screen flex flex-col items-center justify-center p-10">
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        className="bg-[var(--surface-dark)] w-80 p-6 rounded-lg shadow-md flex flex-col gap-4
        sm:w-96 sm:p-8 md:w-[400px] md:p-10"
        sx={{ padding: 4, borderRadius: 2 }}
      >
        <h1 className="text-center text-white text-[24px]">
          Únete a la grupeta
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded">{error}</div>
        )}

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="ejemplo@gmail.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <InputField
          id="name"
          label="Nombre"
          type="text"
          placeholder="Juan Pérez"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <InputField
          id="password"
          label="Contraseña"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        <InputField
          id="confirm-password"
          label="Confirmar Contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        />

        <FormHelperText sx={{ color: "white" }} id="my-helper-text">
          Nunca compartiremos tu email con nadie más.
        </FormHelperText>

        <div className="flex flex-col items-center gap-4 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-[var(--primary)] text-[15px] md:text-[17px] w-20 h-8 rounded-sm disabled:opacity-50"
          >
            {isLoading ? "Cargando..." : "Me uno!"}
          </button>

          <span className="text-white text-[15px] md:text-[17px]">
            ¿Ya estás en la grupeta?
          </span>

          <p className="text-white text-[15px] md:text-[17px]">
            <a href="/login">Inicia sesión</a>
          </p>
        </div>
      </FormControl>
    </main>
  )
}
