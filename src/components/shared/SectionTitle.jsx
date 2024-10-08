import PropTypes from "prop-types"

const SectionTitle = ({ tag, title, description }) => {
  return (
    <div className="w-full flex flex-col items-center gap-1">
      <p className="text-xl text-primary font-bold capitalize">{tag}</p>
      <h1 className="text-5xl text-center font-bold capitalize">{title}</h1>
      <p className="mt-1 text-lg text-center leading-relaxed">{description}</p>
    </div>
  )
}

SectionTitle.propTypes = {
  tag: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default SectionTitle
