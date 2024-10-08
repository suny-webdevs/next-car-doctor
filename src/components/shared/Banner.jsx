import Link from "next/link"
import PropTypes from "prop-types"

const Banner = ({ image, title, breadcrumbs }) => {
  return (
    <div
      className="w-full h-[200px] p-5 relative bg-cover bg-no-repeat bg-top-right rounded-xl flex justify-center items-center selection:text-primary selection:bg-white"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${image})`,
      }}
    >
      <h3 className="text-5xl text-white font-bold capitalize">{title}</h3>
      <div className="absolute bottom-0 w-full breadcrumbs text-sm text-white flex justify-center bg-primary rounded-b-xl">
        <ul>
          <li>
            <Link href="/">Homepage</Link>
          </li>
          {breadcrumbs}
        </ul>
      </div>
    </div>
  )
}

Banner.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  breadcrumbs: PropTypes.node,
}

export default Banner
