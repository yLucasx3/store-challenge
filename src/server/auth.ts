import { getServerSession, type NextAuthOptions } from "next-auth";
import { userService } from "./services/user-service";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID ?? "",
      clientSecret: GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        return userService.authenticate(
          credentials.username,
          credentials.password
        );
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        const { name, email } = user;
        return userService.validateUser(name as string, email as string);
      }
      return false;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
