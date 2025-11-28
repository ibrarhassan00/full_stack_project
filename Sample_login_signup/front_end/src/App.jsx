import { useState } from 'react'
import './App.css'
import SignInPage from './pages/auth/signIn'
import SignUpPage from './pages/auth/signUp'
import Dashboard from './pages/dashboard'
import MyNotes from './pages/myNotes'
import { Routes , Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import MyUnsaveNotes from './pages/myUnsaveNotes'
import AuthRoute from './routes/AuthRoute'
import OTPVerification from './pages/auth/otpVarify'
import ForgetPassword from './pages/auth/forgetPassword'
import ChnagePassword from './pages/auth/changePassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      
       {/* Authentication Route */}
      <Route element={<AuthRoute />}>
      <Route index element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/otpVarify" element={<OTPVerification />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/changePassword" element={<ChnagePassword />} />
      </Route>
      
       {/* Private Routes */}
      <Route element={<PrivateRoute />}>
      <Route path='/mynotes' element={<MyNotes /> } ></Route>
      <Route path='/myUnsaveNotes' element={<MyUnsaveNotes /> } ></Route>
      <Route path="/dashboard" element={<Dashboard />} />
     </Route>

     </Routes>
    </>
  )
}

export default App
