import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
  const db = await connectDB()
  const bookingCollection = db.collection("bookings")
  try {
    const myBookings = await bookingCollection
      .find({ email: params.email })
      .toArray()
    return NextResponse.json(myBookings)
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Something went wrong" })
  }
}
