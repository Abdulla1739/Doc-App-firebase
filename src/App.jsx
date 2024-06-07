
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Dashbord from './Pages/Dashbord'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Home insideregister={true}/>}/>
        <Route path='/dashboard' element={<Dashbord />}/>
        <Route path='/*' element={<Navigate to={'/'}/> }/>
      </Routes>
     
    </>
  )
}

export default App
