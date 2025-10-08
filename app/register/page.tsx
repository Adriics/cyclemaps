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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await HttpClient(
        "http://localhost:5004/cyclemaps/v1/auth/register",
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
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })

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
      console.log("Connection error:", error)
    }
    alert("Registro exitoso")
    router.push("/home")
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

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="ejemplo@gmail.com"
        />

        <InputField
          id="name"
          label="Nombre"
          type="text"
          placeholder="Juan Pérez"
        />

        <InputField id="password" label="Contraseña" type="password" />

        <InputField
          id="confirm-password"
          label="Confirmar Contraseña"
          type="password"
        />

        <FormHelperText sx={{ color: "white" }} id="my-helper-text">
          Nunca compartiremos tu email con nadie más.
        </FormHelperText>

        <div className="flex flex-col items-center gap-4 mt-4">
          <button className="cursor-pointer bg-[var(--primary)] text-[15px] md:text-[17px] w-20 h-8 rounded-sm">
            {isLoading ? "Cargando..." : "Me uno!"}
          </button>

          <span className="text-white text-[15px] md:text-[17px]">
            ¿Ya estàs en la grupeta?
          </span>

          <p className="text-white text-[15px] md:text-[17px]">
            <a href="#">Inicia sesión</a>
          </p>
        </div>
      </FormControl>
    </main>
  )
}
