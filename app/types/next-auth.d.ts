import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    googleAccessToken?: string
    backendToken?: string
  }

  interface JWT {
    googleAccessToken?: string
    backendToken?: string
  }
}
