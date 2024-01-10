import axios from 'axios'
import { errorTypes } from '../utils/configData'
import PlanetContentType from '../contentTypes/planetContentType'

const ROOT_API_URL = 'https://swapi.dev/api'
const ROOT_LOCAL_API_URL = 'http://localhost:4000/api'

const GetRequestToken = () => {
  const requestToken = axios.CancelToken.source()
  return requestToken
}

const CancelRequestToken = ({ requestToken }) => {
  try {
    requestToken.cancel()
  } catch (error) {
    console.log('CancelRequestToken error:', error)
  }
}

const GetPlanets = async ({ requestToken, filters }) => {
  try {
    let url = `${ROOT_API_URL}/planets`
    // Check if filters object is not empty
    if (filters && Object.keys(filters).length > 0) {
      url += '?' // Start of query string

      // Iterate through the filters object and add query parameters to the URL
      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          if (url.charAt(url.length - 1) !== '?') {
            // If not the first query parameter, add an "&" to separate parameters
            url += '&'
          }

          // Add the filter as a query parameter
          url += `${key}=${encodeURIComponent(filters[key])}`
        }
      }
    }
    const response = await axios.get(url, {
      cancelToken: requestToken.token
    })
    const responseMapped = PlanetContentType(response.data)
    return responseMapped
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const UpdatePlanet = async ({ requestToken, request }) => {
  try {
    const url = `${ROOT_LOCAL_API_URL}/planets`
    const response = await axios.post(url, {
      cancelToken: requestToken.token,
      ...request
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const GetPlanetDetails = async ({ requestToken, name }) => {
  try {
    const url = `${ROOT_LOCAL_API_URL}/planets/${name}`

    const response = await axios.get(url, {
      cancelToken: requestToken.token
    })
    return response.data
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const ErrorHandler = (error) => {
  switch (error.code) {
    case errorTypes.ERR_CANCELED:
      return {
        error: true,
        message: 'Request canceled'
      }
    case errorTypes.ERR_BAD_REQUEST:
      return {
        error: true,
        message: error.response.data.message
      }
    default: return { error: true, message: error }
  }
}

export { GetRequestToken, CancelRequestToken, GetPlanets, UpdatePlanet, GetPlanetDetails }
