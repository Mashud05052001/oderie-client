import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import envConfig from "@/src/config/envConfig";
import { loginUserService } from "@/src/hook_with_service/auth/auth.mutate.service";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: envConfig.google_client_id as string,
      clientSecret: envConfig.google_client_secret as string,
    }),
    GitHubProvider({
      clientId: envConfig.github_client_id as string,
      clientSecret: envConfig.github_client_secret as string,
    }),
  ],
  callbacks: {
    signIn: async ({ profile, account, user }) => {
      if (!profile || !account || !user) return false;
      if (account?.provider === "google") {
        const loginData = {
          email: user?.email,
          authLoginData: {
            provider: account?.provider,
            name: user?.name,
            img: user?.image,
          },
        };
        const response = await loginUserService(loginData);
        console.log(response);
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };
