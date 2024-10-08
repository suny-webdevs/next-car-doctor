import Image from "next/image"
import Link from "next/link"
import PropTypes from "prop-types"
import { FaArrowRightLong } from "react-icons/fa6"

const ServiceCard = ({ service }) => {
  const { _id, img, title, price } = service
  return (
    <Link
      href={`services/${_id}`}
      className="group p-3 rounded-lg border hover:border-primary transition-colors duration-300"
    >
      <Image
        src={img}
        alt="service image"
        width={1920}
        height={1080}
        className="rounded-md w-full h-[250px]"
      />
      <div className="p-2 mt-2">
        <h3 className="font-bold text-2xl">{title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-primary text-lg font-bold">Price: ${price}</p>
          <button className="btn !bg-transparent !border-none !text-primary">
            <FaArrowRightLong className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </Link>
  )
}

ServiceCard.propTypes = {
  service: PropTypes.object,
}

export default ServiceCard
