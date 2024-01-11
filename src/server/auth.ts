import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { enviroment } from "./enviroment";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID ?? "",
      clientSecret: GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const response = await fetch(`${enviroment.apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        if (user && response.ok) return user;

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        const { name, email, image } = user;

        const response = await fetch(`${enviroment.apiUrl}/auth/validate`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            image,
            providerAccount: "github",
          }),
        });

        const validatedUser = await response.json();

        if (validatedUser && response.ok) return true;

        return false;
      }

      return false;
    },
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
