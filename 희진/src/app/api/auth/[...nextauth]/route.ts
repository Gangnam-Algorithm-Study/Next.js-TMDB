import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  pages: {
    signIn: "/SignIn",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { user } = credentials as any;

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }: { session: any; token: JWT }) {
      session.user = { ...token };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
