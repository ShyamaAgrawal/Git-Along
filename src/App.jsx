import './App.css'
import DashBoard from './Components/DashBoard'
import { Route,Routes } from 'react-router-dom';
import Repo from './Components/Repo';
import Repository from './Components/Repository';


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' Component={DashBoard} />
        <Route exact path='/repo-details/:username/:id' Component={Repo} />
        <Route exact path='/repo-stats/:username/:reponame/:repoId' Component={Repository} />
      </Routes>
    </div>
  )
}

export default App