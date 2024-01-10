import Planets from './pages/Planets/Planets'
import { useSelector, useDispatch } from 'react-redux'
import { Lobby } from './pages/Lobby/Lobby'
import { setConquerorName } from './redux/generalSlice'

function App () {
  const dispatch = useDispatch()
  const CONQUEROR_NAME = localStorage.getItem('CONQUEROR_NAME')
  dispatch(setConquerorName(CONQUEROR_NAME))

  const general = useSelector((state) => state.general)

  return (
    <div className="App container col-md-12">
      {
        general.CONQUEROR_NAME
          ? <Planets />
          : <Lobby />
      }

    </div>
  )
}

export default App
