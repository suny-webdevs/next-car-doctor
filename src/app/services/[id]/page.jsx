import Banner from "@/components/shared/Banner"
import { getService, getServices } from "@/lib/getData"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"

const Page = async ({ params }) => {
  const { services } = await getServices()
  const service = await getService(params.id)
  const { _id, img, title, price, description, facility } = service
  return (
    <div className="container mx-auto min-h-screen px-2 md:px-0 my-5 md:my-10 lg:my-14">
      <Banner
        image={img}
        title={title}
        breadcrumbs={
          <>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>{title}</li>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full mt-20">
        {/* Details */}
        <div className="col-span-2">
          <Image
            src={img}
            alt={title}
            width={1920}
            height={1080}
            className="object-cover object-center w-full h-[400px] rounded-md"
          />
          <h2 className="mt-5 text-4xl font-bold">{title}</h2>
          <p className="mt-2 text-lg">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
            {facility.map((item, index) => (
              <div
                key={index}
                className="border border-t-4 border-t-primary rounded-md p-5 bg-secondary/10"
              >
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="mt-1">{item.details}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-lg">{description}</p>
        </div>

        {/* Checkout */}
        <div>
          <div className="bg-secondary/10 p-5 rounded-lg">
            <h3 className="text-2xl font-bold">Services</h3>
            <div className="flex flex-col gap-3 mt-5">
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={`/services/${service._id}`}
                  className={`group ${
                    service.title === title
                      ? "bg-primary text-white"
                      : "bg-white"
                  } hover:bg-primary hover:text-white px-4 py-3 rounded-md flex items-center justify-between`}
                >
                  <span>{service.title}</span>
                  <span
                    className={`text-sm ${
                      service.title === title ? "text-white" : "text-black/70"
                    } group-hover:text-white`}
                  >
                    <FaArrowRightLong className="" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border p-3 rounded-lg mt-5">
            <Image
              src={img}
              alt={title}
              width={1920}
              height={1080}
              className="object-cover w-full h-52 rounded-lg"
            />
            <h3 className="text-xl font-bold text-primary mt-3">
              Price: ${price}
            </h3>
            <Link href={`/checkout/${_id}`}>
              <button className="btn btn-primary !text-white rounded-md w-full mt-5">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
