import NextAuth, { Session } from 'next-auth'
import { User } from '../../../types/user'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('https://www.cognisle.shop/users/login/', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()

        if (res.status === 200 && data.data) {
          const user = data.data
          return user
        } else {
          // 로그인 처리 실패
          // throw new Error('로그인 처리 실패')
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //console.log({ ...token, ...user })

      return { ...token, ...user } // session의 token으로 내려옴
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
})
