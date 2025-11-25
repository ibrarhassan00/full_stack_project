import React from 'react'
import {useGoogleLogin} from "@react-oauth/google";

const GoogleLogin = () => {
  
  const responseGoogle = async (authResult)=>{
    try {
      console.log(authResult);
      
    } catch (error) {
      console.log("Error Requesting Google Code" , error.message);
      
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess : responseGoogle,
    onError : responseGoogle,
    flow:'auth-code'
  })



  return (
    <div className='App'>
      <button onClick={()=>{
        googleLogin()
      }}>Login with Google</button>
    </div>
  )
}

export default GoogleLogin




// Jab hum useGoogleLogin() call karte hain
// → Hum usko ek object dete hain jisme 3 cheezen hoti hain:JavaScript
// {
//   onSuccess: responseGoogle,    // function 1
//   onError: responseGoogle,      // function 2  
//   flow: 'auth-code'             // string (3rd property)
// }

// useGoogleLogin() humein ek chhota sa function return karta hai (googleLogin)
// Button dabane pe → googleLogin() chalta hai
// → Yeh function Google ko jagata hai
// User Google pe login karta hai
// Google decide karta hai → success ya error?
// Google humare diye hue function mein se ek ko call karta hai
// → Ya to onSuccess call karta hai
// → Ya onError call karta hai
// Aur jab call karta hai to saath ek object bhejta hai:Success hone pe:

// Success hone pe:JavaScript{
//   code: "4/0AX4XfWh...very long code...",
//   scope: "email profile openid ...",
//   authuser: "0",
//   prompt: "consent"
// }

// Error hone pe:JavaScript{ error: "popup_closed", error_description: "User closed the popup" }