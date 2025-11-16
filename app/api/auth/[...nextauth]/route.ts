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
      if (account && profile) {
        token.googleAccessToken = account.access_token

        try {
          console.log(
            "🔵 Intentando fetch a:",
            `${process.env.NEXT_PUBLIC_API_URL}/v1/cyclemaps/auth/google`
          )

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

          console.log("🔵 Response status:", response.status)
          const data = await response.json()
          console.log("🔵 Response data:", data)

          if (data.ok && data.data) {
            token.backendToken = data.data
            console.log("✅ Token guardado:", token.backendToken)
          } else {
            console.error("❌ No se recibió token:", data)
          }
        } catch (err) {
          console.error("❌ Error en fetch:", err)
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
