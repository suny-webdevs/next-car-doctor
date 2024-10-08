"use client"
import Banner from "@/components/shared/Banner"
import { getBookingsByEmail } from "@/lib/getData"
import { pageStyle } from "@/lib/styles"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { FaPen, FaTrash } from "react-icons/fa6"

const MyBookingsPage = () => {
  const { data } = useSession()
  const router = useRouter()

  const [myBookings, setMyBookings] = useState([])

  const loadMyBookings = async () => {
    const myBookings = await getBookingsByEmail(data?.user?.email)
    setMyBookings(myBookings)
  }

  useEffect(() => {
    loadMyBookings()
  }, [data])

  const handleDeleteBooking = async (id) => {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_APP_URL}/my-bookings/api/booking/${id}`
    )
    console.log(data)
    if (data.res.deletedCount > 0) {
      toast.success(data.message)
      loadMyBookings()
    }
    if (data.res.deletedCount < 1) {
      toast.error("Not delete")
    }
  }

  return (
    <div className={pageStyle}>
      <Banner
        title={"My Bookings"}
        image={"/assets/images/banner/6.jpg"}
        breadcrumbs={
          <>
            <li>My Bookings</li>
          </>
        }
      />

      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Date</th>
              <th>Phone</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map(({ _id, message, date, phone, service }) => (
              <tr key={_id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={service.img}
                          alt="Avatar Tailwind CSS Component"
                          width={100}
                          height={100}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.title}</div>
                      <div className="text-sm opacity-50">{message}</div>
                    </div>
                  </div>
                </td>
                <td>${service.price}</td>
                <td>{date}</td>
                <td>+88 {phone}</td>
                <th className="flex flex-col gap-2">
                  <button
                    onClick={() => router.push(`/my-bookings/update/${_id}`)}
                    className="btn btn-ghost btn-xs !text-secondary"
                  >
                    <FaPen /> Update
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(_id)}
                    className="btn btn-ghost btn-xs !text-red-500"
                  >
                    <FaTrash /> Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBookingsPage
