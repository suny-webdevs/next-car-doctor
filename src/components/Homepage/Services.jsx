import PropTypes from "prop-types"
import SectionTitle from "../shared/SectionTitle"
import ServiceCard from "../shared/ServiceCard"
import { getServices } from "@/lib/getData"

const Services = async ({ className }) => {
  const { services } = await getServices()
  return (
    <div className={`${className}`}>
      <SectionTitle
        tag="services"
        title="our service area"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nesciunt beatae"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-10">
        <button className="btn btn-primary btn-outline hover:!text-white text-lg rounded-md">
          More Services
        </button>
      </div>
    </div>
  )
}

Services.propTypes = {
  className: PropTypes.string,
}

export default Services
