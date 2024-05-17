import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const dummyUser = {
  id: "test",
  password: "test",
};

const handler = NextAuth({
  pages: {
    signIn: "/SignIn",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { id, password } = credentials as any;

        if (id !== dummyUser.id || password !== dummyUser.password) {
          return null;
        }

        return dummyUser;
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
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = { ...token };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
