import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const DELETE = async (request, { params }) => {
  const db = await connectDB()
  const bookingCollection = db.collection("bookings")
  try {
    const res = await bookingCollection.deleteOne({
      _id: new ObjectId(params.id),
    })
    return NextResponse.json({ status: 200, message: "Booking deleted", res })
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong!",
      error,
    })
  }
}

export const PATCH = async (request, { params }) => {
  const db = await connectDB()
  const bookingCollection = db.collection("bookings")
  const { phone, message } = await request.json()
  try {
    const res = await bookingCollection.updateOne(
      {
        _id: new ObjectId(params.id),
      },
      {
        $set: {
          phone,
          message,
        },
      },
      { upsert: true }
    )
    return NextResponse.json({ status: 200, message: "Booking updated", res })
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong!",
      error,
    })
  }
}

export const GET = async (request, { params }) => {
  const db = await connectDB()
  const bookingCollection = db.collection("bookings")
  try {
    const res = await bookingCollection.findOne({
      _id: new ObjectId(params.id),
    })
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong!",
      error,
    })
  }
}
