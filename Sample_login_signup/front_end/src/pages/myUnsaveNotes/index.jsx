import React from 'react'
import Navbar from '../../components/navbar'
import useAxios from "../../api/axiosInstance.js"; // path ko apne project ke hisaab se adjust karo

const  MyUnsaveNotes = () => {
    // Navbar.jsx ya jahan component hai


const axiosInstance = useAxios();

const getData = async () => {
  try {
    const jwtToken = localStorage.getItem("uid");
    const response = await axiosInstance.get("/login-user/get", {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    // setCurrentUserData(response.data.data);
    console.log("response My Unsave notes",response);
    
  } catch (error) {
    console.log("Error" , error.message);
  }

};

const test = ()=>{
  getData()
}
  return (




    <div>
      <Navbar />
      <button onClick={test}>test</button>
    </div>
  )
}

export default MyUnsaveNotes 
