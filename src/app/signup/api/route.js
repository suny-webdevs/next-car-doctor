import { connectDB } from "@/lib/connectDB"
import bcrypt from "bcrypt"

export const POST = async (request) => {
  const newUser = await request.json()
  try {
    const db = await connectDB()
    const userCollection = db.collection("users")
    const exist = await userCollection.findOne({ email: newUser.email })
    if (exist) {
      return Response.json({
        status: 300,
        message: "User already exists!",
      })
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 14)
    const response = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    })
    return Response.json({
      status: 200,
      message: "Sign up successful!",
      res: response,
    })
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
      error,
    })
  }
}
