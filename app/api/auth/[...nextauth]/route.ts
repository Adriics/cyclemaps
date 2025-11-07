import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Si es el primer login, añadimos info de Google
      if (account && profile) {
        token.googleAccessToken = account.access_token

        try {
          // 🔥 Llamada a tu backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: profile.name,
                email: profile.email,
                picture: profile.image,
              }),
            }
          )

          const data = await response.json()

          // Guarda el token que devuelve tu backend (si quieres usarlo después)
          token.backendToken = data.data // o data.token según tu respuesta
        } catch (err) {
          console.error("Error al sincronizar usuario Google:", err)
        }
      }

      return token
    },
    async session({ session, token }) {
      session.googleAccessToken = token.googleAccessToken as string | undefined
      session.backendToken = token.backendToken as string | undefined
      return session
    },
  },
})

export { handler as GET, handler as POST }
