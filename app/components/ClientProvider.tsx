"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
}

function SyncBackendToken() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.backendToken) {
      localStorage.setItem("backend_token", session.backendToken)
    }
  }, [session])

  return null
}

const ClientProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SyncBackendToken />
      {children}
    </SessionProvider>
  )
}

export default ClientProvider
