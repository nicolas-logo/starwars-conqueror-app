export const planetColumns = {
  name: 'NAME',
  diameter: 'DIAMETER',
  rotation_period: 'ROTATION PERIOD',
  orbital_period: 'ORBITAL PERIOD',
  gravity: 'GRAVITY',
  population: 'POPULATION',
  climate: 'CLIMATE',
  terrain: 'TERRAIN',
  surface_water: 'SURFACE WATER'
}

export const errorTypes = {
  ERR_CANCELED: 'ERR_CANCELED',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'
}

export const debounceTimeMs = 500

export const conditionalRowStyles = [
  {
    when: () => true,
    style: {
      backgroundColor: '#565656',
      color: 'white'
    }
  }
]
