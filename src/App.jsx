import './App.css'
import DashBoard from './Components/DashBoard'
import { Route,Routes } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' Component={DashBoard} />
        {/* <Route exact path='/home' Component={HomePage} /> */}
      </Routes>
    </div>
  )
}

export default App