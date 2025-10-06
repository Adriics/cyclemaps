import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import { InputField } from "../components/InputField"

export function RegisterPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Formulario enviado")
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
