import React from 'react'
import { useNavigate} from "react-router-dom"

function PageNoteFound() 
{
    const navigate = useNavigate()
  return (
    <div>
      <h1>Page Note Found 404</h1>
      <button onClick={()=>{navigate('/login')}} >Login</button>
    </div>
  )
}

export default PageNoteFound
