/* eslint-disable react/prop-types */
import defaultImage from '../../assets/planets/planet-not-found.png'

const PlanetImage = (props) => {
  const { name, rotationSpeed } = props

  let selectedImage
  try {
    selectedImage = require(`../../assets/planets//${name}.png`)
  } catch (error) {
    selectedImage = defaultImage
  }

  const imageStyle = {
    animation: `rotate ${0.5 * rotationSpeed}s linear infinite`
  }

  return <img src={selectedImage} alt="Planet" style={imageStyle} />
}

export default PlanetImage
