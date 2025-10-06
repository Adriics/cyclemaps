import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Input from "@mui/material/Input"

export function RegisterPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí puedes manejar el envío del formulario
    console.log("Formulario enviado")
  }

  return (
    <div className="bg-[var(--foreground)] min-h-screen flex flex-col items-center justify-center p-10">
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        className="bg-[var(--surface-dark)] w-80 p-6 rounded-lg shadow-md flex flex-col gap-4
             sm:w-96 sm:p-8 md:w-[400px] md:p-10"
      >
        <h1 className="text-center text-[var(--secondary)]">
          Únete a la grupeta
        </h1>
        <label
          htmlFor="my-input"
          className="text-white border-[var(--foreground)]"
        >
          Email address
        </label>
        <Input
          sx={{ color: "white" }}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <FormHelperText sx={{ color: "white" }} id="my-helper-text">
          Nunca compartiremos tu email con nadie más.
        </FormHelperText>
      </FormControl>
    </div>
  )
}
