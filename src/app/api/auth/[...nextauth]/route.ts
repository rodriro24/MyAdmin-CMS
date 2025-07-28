import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@domain.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
        async authorize() {
          return null;
        }
      })
  ], pages: {
    signIn: "/auth/login",
  },
})

export { handler as GET, handler as POST }