/* eslint-disable no-fallthrough */
import { useState, useEffect, useCallback, useMemo } from 'react'
import { GetRequestToken, CancelRequestToken, GetPlanets } from '../../services/planetsService'
import { useDispatch, useSelector } from 'react-redux'
import { InfoMessages } from '../../components/InfoMessages/InfoMessages'
import PlanetsTable from '../../components/PlanetsTable/planetsTable'
import { setConquerorName } from '../../redux/generalSlice'
import { debounceTimeMs } from '../../utils/configData'
import { getCurrentPage } from '../../utils/utilFunctions'
import _ from 'lodash'

import './Planets.scss'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

let requestToken

const Planets = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [planets, setPlanets] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const general = useSelector((state) => state.general)

  // when the component is rendered, ask for a token for the requests
  // and gets the planets
  useEffect(() => {
    const fetchData = async () => {
      await fetchPlanets()
    }

    fetchData()
    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [])

  // get planets from the api
  const fetchPlanets = useCallback(async (page) => {
    requestToken = await GetRequestToken()

    // build the filters
    const filters = {}
    page ? filters.page = page : filters.page = currentPage
    if (!_.isNil(searchText)) filters.search = searchText

    setLoading(true)
    setPlanets([])

    try {
      const response = await GetPlanets({
        requestToken,
        filters
      })
      if (!response.error) {
        setApiErrorMessage('')
        setPlanets(response.results)
        setTotalPages(response.count / response.results.length)
        setCurrentPage(getCurrentPage(response.previous))
      } else {
        setApiErrorMessage(response.message)
      }
    } catch (error) {
      setApiErrorMessage('An error occurred while fetching planets.')
    } finally {
      setLoading(false)
    }
  }, [searchText])

  // resets the saved conqueror name
  const forgetConquerorName = useCallback(() => {
    localStorage.removeItem('CONQUEROR_NAME')
    dispatch(setConquerorName(null))
  }, [dispatch])

  // Creates a debounce function for fetchPlanets
  const fetchPlanetsDebounced = useMemo(() => _.debounce(() => fetchPlanets(1), debounceTimeMs), [fetchPlanets])

  // update the search text, triggering fetchPlanets
  const handleSearchText = useCallback((text) => {
    setSearchText(text)
  }, [])

  // uses debounce to wait until the user stop typing
  useEffect(() => {
    fetchPlanetsDebounced()
    return () => fetchPlanetsDebounced.cancel()
  }, [searchText])

  return (
    <div className='col-md-11 mx-auto'>
      { <div className='table-container container'>
        <div className='table-responsive'>
          <h1>Welcome aboard: <span className='text-warning'><b>{general.CONQUEROR_NAME}</b></span></h1>
          <div>
            <button
              name='change-planet'
              className='btn btn-danger'
              onClick={() => forgetConquerorName()}>Change Conqueror</button>
          </div>
          <div>
            <input
                placeholder="Search for planet..."
                value={searchText}
                className='form-control btn-search'
                onChange={(event) => { handleSearchText(event.target.value) }} />
          </div>
          <PlanetsTable fetchPlanets={fetchPlanets} currentPage={currentPage} planets={planets} totalPages={totalPages} />
        </div>
        <InfoMessages apiErrorMessage={apiErrorMessage} loading={loading} />

          <div>
        </div>
      </div>
      }
    </div>
  )
}

export default Planets
