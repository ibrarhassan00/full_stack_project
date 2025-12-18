

import React, { useEffect, useState } from 'react'
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';
import { Navigate, Outlet} from 'react-router-dom';

const Super = () => {
    const [loading , setLoading] = useState(true)
    const [isAuth , setIsAuth] = useState(false);
 
    useEffect(
        ()=>{
const getUserAccess = async () => {
    setLoading(true);
    try {
      const data = { url: apis().getAccess };
      const response = await httpAction(data);
      if (response?.status) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.error("Access check failed:", error.message);
      setIsAuth(false); // token missing → unauthenticated
    } finally {
      setLoading(false); // loading hamesha false ho jaye
    }
  };
  getUserAccess();
        },[]
    )

  if(loading){
return <p>Loding...</p>
  }

  if(!isAuth){
 return <Navigate to='/login' />
  }else{
    return <Outlet />
  }
}

export default Super
