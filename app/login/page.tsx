"use client"

import FormControl from "@mui/material/FormControl"
import { InputField } from "../components/InputField"
import React from "react"
import FormHelperText from "@mui/material/FormHelperText"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HttpClient } from "../libs/HttpClient"

export default function LoginPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        "POST",
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      )

      if (response.status === 200) {
        const data = await response.json()

        localStorage.setItem("token", data.token)

        setSuccess(true)

        setFormData({
          email: "",
          password: "",
        })

        router.push("/home")
      } else if (response.status === 400) {
        try {
          const errorData = await response.json()
          setError(errorData.message || "Invalid data provided")
        } catch (error) {
          setError("Invalid data provided")
          console.log("Error details: ", error)
          setIsLoading(false)
        }
      } else {
        setError("An unexpected error ocurred")
        setIsLoading(false)
        console.log("Unexpected response status:", response.status)
      }
    } catch (error) {
      setError("Failed to connect to the server")
      setIsLoading(false)
      console.log("Connection error: ", error)
    }
  }

  return (
    <div className="bg-[var(--foreground)] min-h-screen flex flex-col items-center justify-center p-10">
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        className="bg-[var(--surface-dark)] w-80 p-6 rounded-lg shadow-md flex flex-col gap-4
             sm:w-96 sm:p-8 md:w-[400px] md:p-10"
        sx={{ padding: 4, borderRadius: 2 }}
      >
        <h1 className="text-center text-white text-xl">Únete a la grupeta</h1>

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="ejemplo@gmail.com"
          onChange={(e) => handleInputChange("email", e.target.value)}
          value={formData.email}
        />

        <InputField
          id="password"
          label="Contraseña"
          type="password"
          onChange={(e) => handleInputChange("password", e.target.value)}
          value={formData.password}
        />

        <FormHelperText sx={{ color: "white" }} id="my-helper-text">
          Nunca compartiremos tu email con nadie más.
        </FormHelperText>

        <div className="flex flex-col items-center gap-4 mt-4">
          <button className="cursor-pointer  bg-[var(--primary)] w-20 h-8 rounded-sm">
            Me uno!
          </button>

          <span className="text-white">¿Ya estàs en la grupeta?</span>

          <p className="text-white">
            <a href="#">Inicia sesión</a>
          </p>
        </div>
      </FormControl>
    </div>
  )
}
