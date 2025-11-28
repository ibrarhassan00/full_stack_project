import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadAvatars from './profileImage';
import axios from 'axios';

const Navbar = () => {
  // Yeh state mobile menu ko kholne ya band karne ke liye hai.
  const [isOpen, setIsOpen] = useState(false);
const [currentUserData , setCurrentUserData] = useState({})

const navigate = useNavigate()

const getData = async()=>{
try {
    const jwtToken = localStorage.getItem('uid');
const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/login-user/get`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
   
const data = response.data.data
    setCurrentUserData({...data})
    
} catch (error) {
  console.log(error.response);
  if(error.response?.status===401){
  // localStorage.removeItem("uid")
  // navigate("/");
  }
}
}

useEffect(()=>{
  getData()
},[])

// console.log(currentUserData);

  // Define navigation items (koi changes nahi)
  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'My Notes', path: '/myNotes' },
    { name: 'Unsaved Notes', path: '/myUnsaveNotes' },
    // { name: 'Logout', path: '/' },
  ];

  // Menu toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

const logoutHandler = ()=>{
localStorage.removeItem("uid")
navigate("/")
}



  return (
    <nav className="bg-blue-600 shadow-xl sticky top-0 z-50 font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center h-16">
          <UploadAvatars profileImage={currentUserData.imageUrl}/>
          {/* Logo/Welcome Text (Left side) */}
          <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0 pl-1">
            <span className="text-2xl font-extrabold text-white tracking-wider">
              {currentUserData.name}
            </span>
          </div>

          {/* Desktop Navigation Links (Large screens par dikhenge) */}
          <div className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white text-lg font-medium py-2 px-3 rounded-lg transition duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="text-white text-lg font-medium py-2 px-3 rounded-lg transition duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={logoutHandler} >Log Out</li>
            </ul>


          </div>
</div>
          {/* Mobile Menu Button (Small screens par dikhega) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {/* Hamburger or Close icon */}
              {isOpen ? (
                // Close Icon (X) - jab menu khula ho
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu Icon (Hamburger) - jab menu band ho
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (isOpen state par dikhega/hide hoga) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700/90 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              // Link par click hone ke baad menu band ho jaye
              onClick={() => setIsOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 transition duration-150 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
          <div className="text-white text-lg font-medium py-2 px-3 rounded-lg transition duration-200 ease-in-out hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={logoutHandler} >Log Out</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;