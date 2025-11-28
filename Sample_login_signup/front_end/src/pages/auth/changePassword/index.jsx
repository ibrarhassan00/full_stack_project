import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ChnagePassword = () => {
  const navigate = useNavigate();
  const [newPassward, setNewPasswardEmail] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get("token");
  const [sessionValidity, setSessionValidity] = useState(false);

const checkTokenValidity = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/changePassword`);
      console.log(response);
      
      if (response.data.message === "Token Expired") {
        setSessionValidity(true);
      } else {
        setSessionValidity(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
      setSessionValidity(true); // agar request fail ho to bhi expire treat kar sakte
    }
  };

  
  // useEffect(() => {
  //   checkTokenValidity();
  // }, []);

  const changePasswordHandler = async () => {
    // console.log(newPassward,confrimPassword);

    try {
      if (!newPassward || !confrimPassword) {
        return alert("Required Field Are Missing");
      }
      if (newPassward !== confrimPassword) {
        return alert("New Passward & Confrim Password Does not Match");
      }
      const userObj = {
        token: token,
        newPassword: confrimPassword,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/changePassword`,
        userObj
      );
      if (response.data.status === false) {
        console.log(response.data.status);
        return alert(response.data.message);
      }
      alert("Password Successfully Changed");
      navigate("/");
    } catch (error) {
      console.log("Signup Failed:", error.message);
      alert("Signup Failed:", error.response.data.message);
    }
  };

  return (
    <>
      {sessionValidity ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Session Has Expired Please Regenerate Email
            </h2>
          </div>
        </div>
      ) : (
        // Main container, centering the content and setting background
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          {/* Sign-in Card/Form Container */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Reset Password
            </h2>

            {/* newPassward Input Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Passward
              </label>
              <input
                onChange={(e) => {
                  setNewPasswardEmail(e.target.value);
                }}
                value={newPassward}
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
              />
            </div>
            {/* Confrim Password Input Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confrim Password
              </label>
              <input
                onChange={(e) => {
                  setConfrimPassword(e.target.value);
                }}
                value={confrimPassword}
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter Confrim Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
              />
            </div>
            {/* Submit Button */}
            <button
              onClick={() => {
                changePasswordHandler();
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChnagePassword;
