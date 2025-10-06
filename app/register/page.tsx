import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"

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
        <label
          htmlFor="email"
          className="text-white border-[var(--foreground)]"
        >
          Tu email:
        </label>
        <input type="text" id="email" className="bg-white rounded-lg" />
        <label htmlFor="name" className="text-white border-[var(--foreground)]">
          Tu nombre:
        </label>
        <input type="text" id="email" className="bg-white rounded-lg" />
        <label
          htmlFor="password"
          className="text-white border-[var(--foreground)]"
        >
          Tu contraseña:
        </label>
        <input type="password" id="password" className="bg-white rounded-lg" />

        <label
          htmlFor="confirm-password"
          className="text-white border-[var(--foreground)]"
        >
          Confirmar contraseña:
        </label>
        <input
          type="password"
          id="confirm-password"
          className="bg-white rounded-lg"
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
