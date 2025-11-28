import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignIn = async () => {
    try {
      if (!email || !password) {
        return alert("Required Field Are Missing");
      }

      const userObj = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/usersignin`,
        userObj
      );
      const token = response.data.token;

      if (response.data.status === false) {
        console.log(response.data.status);
        alert(response.data.message);
        return navigate("/otpVarify", { state: { email } });
      }

      localStorage.setItem(`uid`, `${token}`);
      alert("User Login User Successfully");
      navigate("/dashboard",);
    } catch (error) {
      console.log("Signup Failed:", error.response.data.message);
      alert(`Signup Failed: ${error.response.data.message}`);
    }
  };

  return (
    // Main container, centering the content and setting background
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Sign-in Card/Form Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign In
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

        {/* Password Input Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            userSignIn();
          }}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Sign In
        </button>

        {/* Optional: Footer link/text */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </Link>
          </p>
          <p className="pt-6">
            <Link
              to="/forgetpassword"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgotten password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
