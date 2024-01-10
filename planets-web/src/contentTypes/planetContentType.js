const PlanetContentType = (response) => {
  const mappedPlanets = response.results.map(planet => {
    return {
      name: planet.name ? planet.name : 'unknown',
      diameter: planet.diameter ? planet.diameter : 'unknown',
      rotation_period: planet.rotation_period ? planet.rotation_period : 'unknown',
      orbital_period: planet.orbital_period ? planet.orbital_period : 'unknown',
      gravity: planet.gravity ? planet.gravity : 'unknown',
      population: planet.population ? planet.population : 'unknown',
      climate: planet.climate ? planet.climate : 'unknown',
      terrain: planet.terrain ? planet.terrain : 'unknown',
      surface_water: planet.surface_water ? planet.surface_water : 'unknown'
    }
  })
  return { ...response, results: mappedPlanets }
}

export default PlanetContentType
