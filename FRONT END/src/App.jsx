import {BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import {Home} from "./Pages/Home"
import {Login} from "./Pages/Login"
import { Navbar } from "./Components/Navbar"
import { Tambah } from "./Pages/Tambah"

const App = () => {
  return (
      
      <Router>
        <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>} /> 
        <Route path='/TambahData' element = {<Tambah/>} /> 
        <Route path='/Login' element = {<Login/>} />
      </Routes>
      </Router>
   
  )
}

export default App
