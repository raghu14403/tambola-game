import {Route, Routes} from 'react-router-dom'
import loadable from '@loadable/component';


import './App.css'
import HomePage from './components/HomePage'
import HostDashboard from './components/HostDashboard';
import PlayersInRoom from './components/PlayersInRoom';
// import JoinRoom from './components/JoinRoom';
const Home = loadable(() => import("./components/HomePage"));
const JoinRoom=loadable(()=>import("./components/JoinRoom"));

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/join' element={<JoinRoom/>}/>
        <Route path='/host' element={<HostDashboard/>}></Route>
        <Route path='/players' element={<PlayersInRoom/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </>
  )
}

function NoMatch(){
  return <p>No, matching route avaialble</p>
}


export default App
