import express, { Express } from "express"
import { json } from "body-parser"
import { registerRoutes } from "./routes"
import { supabase } from "./config/supabaseClient"
import cors from "cors"

async function server() {
  // opcional: test mínimo de cliente (no falla por IPv4/IPv6)
  try {
    const { data, error } = await supabase.from("users").select("id").limit(1)
    // si la tabla no existe, error será no encontrado; no bloquea la app
  } catch (e) {
    // no pares la app por la DB: solo loguea si quieres
    console.warn("Supabase test error (puede ser tabla no creada):", e)
  }

  const app: Express = express()
  app.use(json())
  app.use(cors())

  const endpoints = registerRoutes(express.Router())
  app.use("/v1/cyclemaps", endpoints)

  app.listen(5004, () => console.log("Server is running on port 5004"))
}
server()
