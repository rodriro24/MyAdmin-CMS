"use client"
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}
const GlobalContext = ({children}: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default GlobalContext