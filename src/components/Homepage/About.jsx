import Image from "next/image"
import PropTypes from "prop-types"

const About = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10 w-full h-full py-10 md:py-20">
        <div className="relative w-full h-[450px] md:h-full">
          {/* Image */}
          <Image
            src={"/assets/images/about_us/person.jpg"}
            alt="about_image-1"
            width={1920}
            height={1080}
            className="w-[400px] h-[400px] md:w-[550px] md:h-[400px] rounded-md"
          />
          <Image
            src={"/assets/images/about_us/parts.jpg"}
            alt="about_image-1"
            width={1920}
            height={1080}
            className="w-[300px] h-[250px] md:w-[350px] md:h-[350px] absolute right-0 bottom-0 rounded-md border-t-8 border-l-8 border-white"
          />
        </div>
        <div className="px-2">
          {/* Content */}
          <p className="font-bold text-primary text-xl">About Us</p>
          <h1 className="font-bold text-6xl mt-5">
            We are qualified & of experience in this field
          </h1>
          <p className="mt-5 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
            maiores nihil expedita deserunt fugiat qui omnis reiciendis aliquid
            molestiae, quia id vero sequi perferendis natus voluptatem hic
            accusantium quam itaque doloribus atque ipsum, laboriosam explicabo
            harum perspiciatis? Praesentium temporibus laudantium velit
            veritatis! Odio, sit! Assumenda autem suscipit commodi rerum illum.
          </p>
          <p className="mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae ipsam reprehenderit, ullam architecto asperiores tempore
            ducimus qui a obcaecati cupiditate error atque recusandae. Ea
            doloremque ipsum architecto! Soluta, in veniam?
          </p>
          <button className="btn btn-primary !text-white text-lg !rounded-md mt-10">
            Get More Info
          </button>
        </div>
      </div>
    </div>
  )
}

About.propTypes = {
  className: PropTypes.string,
}

export default About
