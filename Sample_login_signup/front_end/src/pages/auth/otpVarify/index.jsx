import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const location = useLocation();

  const navigate = useNavigate();
  const [values, setValues] = useState(Array(6).fill(""));
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.slice(0, 1);
    const newVals = [...values];
    newVals[idx] = val;
    setValues(newVals);
    if (val && idx < 5) inputsRef.current[idx + 1].focus();
  };

  const handleVerify = async () => {
    const otp = values.join("");
    if (otp.length < 6)
      return setMessage({ type: "error", text: "Enter 6 digits" });
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/verify-otp`,
        { email: location.state.email, otp }
      );
      if (response.data.status === false) {
        console.log("Error:", response.data.message);

        setValues(Array(6).fill(""))
        return alert(response.data.message);
      }
      navigate("/",{state:{}});
    } catch (error) {
      setMessage({ type: "error", text: "Server error" });
      alert(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setMessage(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/reset-otp`, {
        email: location.state.email,
      });
      console.log(response);

      if (response) {
        setValues(Array(6).fill(""));
        setMessage({ type: "info", text: "New OTP sent to your email." });
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to resend OTP." });
      alert(error.response.data.message)
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Email OTP Verification
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        <div className="flex justify-center gap-3 mb-4">
          {values.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              inputMode="numeric"
              className="w-12 h-14 text-center text-lg rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              maxLength={1}
            />
          ))}
        </div>

        {message && (
          <div
            className={`text-sm text-center mb-3 ${
              message.type === "error"
                ? "text-red-600"
                : message.type === "success"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            disabled={loading}
            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={handleResend}
            disabled={resending}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {resending ? "Sending..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
}
