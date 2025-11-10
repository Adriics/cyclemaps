"use client"

import FormUpload from "../components/FormUpload"

export default function UploadPage() {
  return (
    <main className="relative z-10 p-20 items-center justify-center flex text-white">
      <div className="max-w-2xl mx-auto border border-white/10 rounded-lg p-10 bg-white/5 backdrop-blur-md lg:grid lg:gap-y-4">
        <h1 className="text-3xl text-center font-bold text-white">
          Subir nueva ruta
        </h1>

        <FormUpload />
      </div>
    </main>
  )
}
