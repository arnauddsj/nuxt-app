import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { NuxtAuthHandler } from '#auth'
import { User } from '#types/auth'

const prisma = new PrismaClient()

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  pages: {
    // Change the default behavior to use custom login page /auth/login as the path for the sign-in page
    signIn: '/auth/login'
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET
    }),
    // @ts-expect-error
    EmailProvider.default({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    // async signIn (user) {
    //   // @ts-expect-error
    //   const isAllowedToSignIn = true
    //   if (isAllowedToSignIn) {
    //     console.log(user)
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     return false
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //     // You can also Reject this callback with an Error or with a URL:
    //     // throw new Error('error message')      // Redirect to error page
    //     // throw '/path/to/redirect'        // Redirect to a URL
    //   }\
    session ({ session, token, user }: {session: any, user: User}) {
      // session.user = user
      console.log(user)
      return session
    }
  }
})
