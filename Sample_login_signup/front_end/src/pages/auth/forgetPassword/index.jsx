import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [checkEmail , setCheckEmail] = useState(false)

  const restPassword = async () => {
    try {
      if (!email) {
        return alert("Required Field Are Missing");
      }

      const userObj = {
        email,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/forgetPassword`,
        userObj
      );

      if (response.data.status === false) {
        console.log(response.data.status);

        return alert(response.data.message);
      }

setCheckEmail(true)

      
    } catch (error) {
      console.log("Signup Failed:", error.message);
      alert("Signup Failed:", error.response.data.message);
    }
  };

  return (<>  { checkEmail ? 
(    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Check Your Email
        </h1>
      </div>
    </div>)
      
    : (// Main container, centering the content and setting background
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Sign-in Card/Form Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Reset Email ID Password
        </h2>

        {/* Email Input Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            restPassword();
          }}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Reset Password
        </button>

        {/* Optional: Footer link/text */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Have Password{" "}
            <Link
              to="/"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default ForgetPassword;
