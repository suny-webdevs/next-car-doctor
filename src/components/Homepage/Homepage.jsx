import About from "./About"
import Banner from "./Banner"
import PropTypes from "prop-types"
import Services from "./Services"

const Homepage = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Banner className="min-h-screen my-5" />
      <About className="md:min-h-screen my-5" />
      <Services className="md:min-h-screen my-5 md:py-20" />
    </div>
  )
}

Homepage.propTypes = {
  className: PropTypes.string,
}

export default Homepage
