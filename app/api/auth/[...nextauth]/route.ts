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
      // Si viene de login Google
      if (account && profile) {
        token.googleAccessToken = account.access_token

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/auth/google`,
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

          if (data.ok && data.data) {
            token.backendToken = data.data
          }
        } catch (err) {
          console.error("Error al sincronizar usuario Google:", err)
        }
      }

      // IMPORTANTE: Mantenerlo entre refrescos
      if (!token.backendToken) {
        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem("backend_token")
            : null

        if (stored) token.backendToken = stored
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
