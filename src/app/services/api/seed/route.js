import { connectDB } from "@/lib/connectDB"
import { services } from "@/lib/services"
import { NextResponse } from "next/server"

export const GET = async () => {
  const db = await connectDB()
  const serviceCollection = db.collection("services")
  try {
    await serviceCollection.deleteMany()
    const res = await serviceCollection.insertMany(services)
    return NextResponse.json({
      status: 200,
      message: "Data seeded successfully!",
    })
  } catch (error) {
    return NextResponse.json({ status: 400, message: "Something went wrong!" })
  }
}
