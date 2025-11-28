import React from 'react'
import Navbar from '../../components/navbar'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
const MyNotes = () => {

const [isUserValid , setIsUserValid ] = useState(true) 

  const getProduct = async()=>{
try {
  const jwtToken = localStorage.getItem('uid');
const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/product/get`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

console.log("respoase" , response.data.status);

if(!response.data.status){
  return setIsUserValid(false)
}

} catch (error) {
  console.log("get Product error" , error.message)
  alert("get Product error" , error.response.data.message)
}
  }  

useEffect(()=>{
getProduct()
},[])


  return (
    <>
   {isUserValid ? <Navbar />  : <Navigate to={"/"} />   }
    </>
  )
}

export default MyNotes
