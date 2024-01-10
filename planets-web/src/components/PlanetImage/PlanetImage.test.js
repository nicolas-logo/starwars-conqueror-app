import { render } from '@testing-library/react'
import PlanetImage from './PlanetImage'

test('renders PlanetImage component with default image when planet image not found', () => {
  const { getByAltText } = render(<PlanetImage name="nonExistentPlanet" rotationSpeed={50} />)
  const planetImage = getByAltText('Planet')

  expect(planetImage).toBeInTheDocument()
  expect(planetImage.src).toContain('planet-not-found.png')
})

test('renders PlanetImage component with correct planet image when found', () => {
  const { getByAltText } = render(<PlanetImage name="Tatooine" rotationSpeed={50} />)
  const planetImage = getByAltText('Planet')

  expect(planetImage).toBeInTheDocument()
  expect(planetImage.src).toContain('Tatooine.png')
})
