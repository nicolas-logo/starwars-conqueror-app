/* eslint-disable react/prop-types */
import { CancelRequestToken, GetRequestToken, UpdatePlanet, GetPlanetDetails } from '../../services/planetsService'
import PlanetImage from '../PlanetImage/PlanetImage'
import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

let requestToken

const PlanetDetails = ({ row }) => {
  const [loading, setLoading] = useState(true)
  const [conqueror, setConqueror] = useState(null)
  const { name } = row.data
  const general = useSelector((state) => state.general)

  // Define a memoized function to get the request token
  const getRequestToken = useMemo(() => async () => {
    requestToken = await GetRequestToken()
  }, [])

  useEffect(() => {
    try {
      const getDetail = async () => {
        await getRequestToken()
        const response = await GetPlanetDetails({ requestToken, name })

        setConqueror(response.last_modified_by)
      }
      getDetail()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [name, getRequestToken])

  // saves state for that planets along with the conqueror name
  const handleSave = async ({ conquer }) => {
    setLoading(true)

    try {
      await getRequestToken()

      const request = {
        name,
        last_modified_by: conquer ? general.CONQUEROR_NAME : ''
      }

      const response = await UpdatePlanet({ requestToken, request })
      setConqueror(response.data.last_modified_by)
    } catch (error) {
      console.log('An error occurred while saving.')
    } finally {
      setLoading(false)
      setTimeout(() => {
      }, 2000)
    }
  }

  const ownPlanet = useMemo(() => {
    if (_.toUpper(general.CONQUEROR_NAME) === _.toUpper(conqueror)) {
      return true
    } else return false
  }, [conqueror, general.CONQUEROR_NAME])

  return (
    <div className='text-center planet-details-container'>
      {loading
        ? (<span>Loading...</span>)
        : (
          <div className='col-md-3'>
            <h3><b>{name}</b></h3>
            <span>Rotation Period: <b>{row.data.rotation_period} hs.</b></span><br />
            <PlanetImage name={name} rotationSpeed={row.data.rotation_period} />
            <label><b>Current status: </b>
            {
              conqueror
                ? (<span>conquered by <b>{conqueror}</b></span>)
                : <span className='text-success'><b>AVAILABLE</b></span>
            }
            </label>
            { ownPlanet && <button className='btn btn-warning' onClick={() => handleSave({ conquer: false })}>Leave Planet</button> }
            { (conqueror === '' || conqueror === undefined) && <button className='btn btn-success' onClick={() => handleSave({ conquer: true })}>Conquer Planet</button> }
          </div>
          )}
    </div>
  )
}

export default PlanetDetails
