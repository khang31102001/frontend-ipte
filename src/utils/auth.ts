import { NextAuthOptions, User, getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

// import prisma from './prisma'

export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
}

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig)
    if (!session) return redirect('/')
}

export function loginIsRequiredClient() {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const session = useSession()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter()
        if (!session) router.push('/')
    }
}
