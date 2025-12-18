import { useState } from 'react'
import Login from './components/Login'
import {Routes,Route} from "react-router-dom"
import Register from './components/Register'
import './components/auth.css'
import ForgetPassword from './components/ForgetPassword'
import OtpVarify from './components/OtpVarify'
import UpdatePassword from './components/UpdatePassword'
import Profile from './components/profile'
import Super from './components/Super'
function App() {
  

  return (
   <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/password/forget' element={<ForgetPassword />}/>
    <Route path='/otp/varify' element={<OtpVarify />}/>
    

    <Route element={<Super/>}>
    <Route path='/' element={<Profile/>} />
    <Route path='/psssword/update' element={<UpdatePassword/>} />
    </Route>

   </Routes> 
  )
}

export default App
