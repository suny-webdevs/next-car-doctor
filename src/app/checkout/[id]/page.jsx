"use client"
import Banner from "@/components/shared/Banner"
import { getService } from "@/lib/getData"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

const CheckoutPage = ({ params }) => {
  const router = useRouter()

  const { data } = useSession()
  const [service, setService] = useState({})

  const loadService = async () => {
    const service = await getService(params.id)
    setService(service)
  }

  useEffect(() => {
    loadService()
  }, [params])

  const { _id, img, title, price } = service || {}

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    const form = e.target

    const name = form.name.value
    const email = form.email.value
    const phone = form.phone.value
    const message = form.message.value
    const date = format(new Date(), "PPP")

    if (phone.length < 11 || phone.length > 11) {
      toast.error("Phone number must should be 11 digits.")
      return
    }

    if (name === "" || email === "") {
      toast.error("Name and email are required.")
      return
    }

    const newBookings = {
      name,
      email,
      phone,
      message,
      date,
      service: {
        _id,
        title,
        price,
        img,
      },
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/checkout/api/new-checkout`,
        newBookings
      )
      if (data.status === 200) {
        toast.success(data.message)
        form.reset()
        router.push("/my-bookings")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to checkout. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-2 md:px-0 my-5 md:my-10 lg:my-14">
      <Banner
        image={img}
        title={"Checkout"}
        breadcrumbs={
          <>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href={`/services/${_id}`}>{title}</Link>
            </li>
            <li>Checkout</li>
          </>
        }
      />

      <div className="bg-secondary/5 mt-10 rounded-xl">
        <form
          onSubmit={handleCheckoutSubmit}
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
              placeholder="Share your demand or opinion"
              className="textarea textarea-bordered textarea-md w-full"
            ></textarea>
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn btn-primary !text-white">
              Order confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
