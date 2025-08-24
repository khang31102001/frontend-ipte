'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children }: any) {
    return <SessionProvider>{children}</SessionProvider>
}
