import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const POST = async (request) => {
  const booking = await request.json()
  const db = await connectDB()
  const bookingCollection = db.collection("bookings")
  try {
    const newBooking = await bookingCollection.insertOne(booking)
    return NextResponse.json({
      status: 200,
      message: "New booking added",
      newBooking,
    })
  } catch (error) {
    return NextResponse.json({
      status: 401,
      message: "Something went wrong",
      error,
    })
  }
}
