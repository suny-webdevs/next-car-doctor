"use client"
import { getBookingsById } from "@/lib/getData"
import { pageStyle } from "@/lib/styles"
import axios from "axios"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import Image from "next/image"
import Banner from "@/components/shared/Banner"
import Link from "next/link"
import { useRouter } from "next/navigation"

const UpdateBookingPage = ({ params }) => {
  const { data } = useSession()
  const router = useRouter()

  const [booking, setBooking] = useState({})

  console.log("Booking: ", booking)

  const loadBooking = async () => {
    const booking = await getBookingsById(params.id)
    setBooking(booking)
  }

  useEffect(() => {
    loadBooking()
  }, [params])

  const handleUpdateBooking = async (e) => {
    e.preventDefault()
    const form = e.target

    const phone = form.phone.value
    const message = form.message.value

    const updatedData = {
      phone,
      message,
    }

    if (phone.length < 11 || phone.length > 11) {
      alert("Phone number must should be 11 digits.")
      return
    }

    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_URL}/my-bookings/api/booking/${params.id}`,
        updatedData
      )
      if (data.res.modifiedCount > 0) {
        toast.success(data.message)
        loadBooking()
        router.push("/my-bookings")
      }
      form.reset()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update booking. Please try again.")
    }
  }

  return (
    <div className={pageStyle}>
      <Banner
        image={booking?.service?.img}
        title={"Update booking"}
        breadcrumbs={
          <>
            <li>
              <Link href={"/my-bookings"}>My bookings</Link>
            </li>
            <li>Update booking</li>
            <li>{booking?.service?.title}</li>
          </>
        }
      />
      <div className="flex flex-col items-center justify-center gap-3 mt-10">
        <Image
          src={booking?.service?.img}
          alt={booking?.service?.title}
          width={1920}
          height={1080}
          className="w-[100px] h-[100px] rounded-3xl object-cover object-center"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-center">
            {booking?.service?.title}
          </h2>
          <p className="text-primary text-center">
            Price: ${booking?.service?.price}
          </p>
        </div>
      </div>
      <div className="bg-secondary/5 mt-10 rounded-xl">
        <form
          onSubmit={handleUpdateBooking}
          className="card-body grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={data?.user?.name}
              placeholder="John Doe"
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={data?.user?.email}
              placeholder="john@mail.com"
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="+88"
              defaultValue={booking?.phone}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              name="message"
              defaultValue={booking?.message}
              placeholder="Share your demand or opinion"
              className="textarea textarea-bordered textarea-md w-full"
            ></textarea>
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn btn-primary !text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateBookingPage
