import './App.css'
import DashBoard from './Components/DashBoard'
import { Route,Routes } from 'react-router-dom';
import Repo from './Components/Repo';


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' Component={DashBoard} />
        <Route exact path='/home' Component={Repo} />
        
      </Routes>
    </div>
  )
}

export default App