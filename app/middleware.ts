import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  // Si no hay token → redirige a login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Verifica token (opcional)
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

// Rutas protegidas:
export const config = {
  matcher: ["/profile", "/home"],
}
