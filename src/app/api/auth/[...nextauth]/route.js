import { connectDB } from "@/lib/connectDB"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import FacebookProvider from "next-auth/providers/facebook"

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRETE,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const { email, password } = credentials

        if (!email || !password) {
          return null
        }

        const db = await connectDB()
        const currentUser = await db.collection("users").findOne({ email })
        if (!currentUser) {
          return null
        }
        const checkPassword = bcrypt.compareSync(password, currentUser.password)
        if (!checkPassword) {
          return null
        }
        return currentUser
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (
        account.provider === "google" ||
        account.provider === "facebook" ||
        account.provider === "linkedin"
      ) {
        const { name, email, image } = user
        try {
          const db = await connectDB()
          const userCollection = db.collection("users")
          const userExist = await userCollection.findOne({ email })
          if (!userExist) {
            const res = await userCollection.insertOne({ name, email, image })
            return res
          }
          return user
        } catch (error) {
          console.log(error)
        }
      } else {
        return user
      }
    },
  },
})

export { handler as GET, handler as POST }
