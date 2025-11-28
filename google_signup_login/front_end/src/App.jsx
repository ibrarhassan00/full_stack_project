import { useState } from 'react'
import './App.css'
import { BrowserRouter , Route , Routes , Navigate} from "react-router-dom"
import GoogleLogin from './pages/authaetication'
import Dashboard from './Componenets/Dashboard'
import PageNoteFound from './pages/page_not_found'
import {GoogleOAuthProvider} from '@react-oauth/google'

function App() {
  const GoogleAuthWrapper = ()=>{
return(
  <GoogleOAuthProvider clientId='723025486430-co5ek1m8aheeqcodndech7a6v2v93ndn.apps.googleusercontent.com'>
    <GoogleLogin>

    </GoogleLogin>
  </GoogleOAuthProvider>
)
  }
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<PageNoteFound/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
