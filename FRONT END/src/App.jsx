import {BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import {Home} from "./Pages/Home"
import { Navbar } from "./Components/Navbar"
import { Tambah } from "./Pages/Tambah"
import { Register } from "./Pages/Register"
import { Login } from "./Pages/Login"
import { Edit } from "./Pages/Edit"
const App = () => {
  return (
      
      <Router>
      <Routes>
        <Route path='/' element = {<Home/>} /> 
        <Route path='/TambahJadwal' element = {<Tambah/>} /> 
        <Route path='/Login' element = {<Login/>} />
        <Route path='/Register' element = {<Register/>} />
        <Route path='/Edit/:id' element = {<Edit/>} />
      
      </Routes>
      </Router>
   
  )
}

export default App
