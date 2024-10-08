import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async () => {
  const db = await connectDB()
  const bookingCollection = db.collection("bookings")
  try {
    const bookings = await bookingCollection.find().toArray()
    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Something went wrong" })
  }
}
