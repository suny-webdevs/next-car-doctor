import Link from "next/link"
import PropTypes from "prop-types"

const Banner = ({ className }) => {
  return (
    <div className={`carousel w-full border rounded-xl ${className}`}>
      {banners.map((banner, index) => (
        <div
          style={{
            backgroundImage: `linear-gradient(45deg,rgba(7,25,82,0.7), rgba(0,0,0,0.3)), url(/assets/images/banner/${
              index + 1
            }.jpg)`,
          }}
          key={index}
          id={`slide${index + 1}`}
          className="carousel-item flex-col relative w-full bg-cover bg-no-repeat bg-top"
        >
          <div className="p-10 md:w-1/2">
            <h1 className="text-5xl md:text-7xl text-white font-bold">
              {banner.title}
            </h1>
            <p className="text-lg md:text-xl md:leading-relaxed text-white mt-2">
              {banner.description}
            </p>
            <div className="flex gap-5 items-center mt-10">
              <button className="btn btn-primary !text-white">
                Discover more
              </button>
              <button className="btn btn-outline btn-base-100 !text-white hover:bg-black/70">
                Latest projects
              </button>
            </div>
          </div>
          <div className="absolute bottom-5 right-14 flex -translate-y-1/2 transform gap-5">
            <Link
              href={banner.prev}
              className="btn btn-circle bg-white/40 hover:bg-primary text-white border-none"
            >
              ❮
            </Link>
            <Link
              href={banner.next}
              className="btn btn-circle bg-white/40 hover:bg-primary text-white border-none"
            >
              ❯
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const banners = [
  {
    title: "Affordable Price For Car Servicing 1",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide2",
    prev: "#slide4",
  },
  {
    title: "Affordable Price For Car Servicing 2",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide3",
    prev: "#slide1",
  },
  {
    title: "Affordable Price For Car Servicing 3",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide4",
    prev: "#slide2",
  },
  {
    title: "Affordable Price For Car Servicing 4",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide1",
    prev: "#slide3",
  },
]

Banner.propTypes = {
  className: PropTypes.string,
}

export default Banner
