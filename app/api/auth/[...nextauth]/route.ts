import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              picture: user.image,
            }),
          }
        )

        const data = await res.json()

        if (!res.ok) {
          console.error("Error creando usuario en backend:", data)
          return false
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.data)
        }

        return true
      } catch (error) {
        console.error("Error en signIn callback:", error)
        return false
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name || null
        session.user.email = token.email || null
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
