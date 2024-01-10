import { planetColumns, errorTypes, debounceTimeMs, conditionalRowStyles } from './configData'

describe('Constants', () => {
  test('planetColumns contains the correct keys and values', () => {
    const expectedColumns = {
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

    expect(planetColumns).toEqual(expectedColumns)
  })

  test('errorTypes contains the correct keys and values', () => {
    const expectedErrorTypes = {
      ERR_CANCELED: 'ERR_CANCELED',
      ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'
    }

    expect(errorTypes).toEqual(expectedErrorTypes)
  })

  test('debounceTimeMs is a number', () => {
    expect(typeof debounceTimeMs).toBe('number')
  })

  test('conditionalRowStyles contains an array with objects having "when" and "style" properties', () => {
    expect(Array.isArray(conditionalRowStyles)).toBe(true)

    conditionalRowStyles.forEach((rowStyle) => {
      expect(typeof rowStyle).toBe('object')
      expect(rowStyle).toHaveProperty('when')
      expect(rowStyle).toHaveProperty('style')
      expect(typeof rowStyle.when).toBe('function')
      expect(typeof rowStyle.style).toBe('object')
    })
  })
})
