import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'



function App() {
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Signup />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/user' element={<Users />}/>
    <Route path='/create' element={<CreateUser />}/>
    <Route path='/update/:id' element={<UpdateUser />}/>


   
    </Routes>
    </BrowserRouter>
  )
}

export default App
