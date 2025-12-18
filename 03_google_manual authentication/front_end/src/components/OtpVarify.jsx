import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { BsPatchCheck } from "react-icons/bs";
import { ArrowBack, Spa } from "@mui/icons-material";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";
import { useState } from "react";

const OtpVarify = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(2 * 60 * 1000);
  

  const initialState = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };
  const validationSchema = Yup.object({
    otp1: Yup.number().required(""),
    otp2: Yup.number().required(""),
    otp3: Yup.number().required(""),
    otp4: Yup.number().required(""),
    otp5: Yup.number().required(""),
    otp6: Yup.number().required(""),
  });

  const submitHandler = async (values) => {
    try {
      const otp =
        values.otp1 +
        values.otp2 +
        values.otp3 +
        values.otp4 +
        values.otp5 +
        values.otp6;
      const data = {
        url: apis().verifyOtp,
        method: "POST",
        body: { otp: otp },
      };
      const result = await httpAction(data);
      console.log(result);
      if (result.status) {
        toast.success(result.message);
        navigate("/psssword/update");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const otpArray = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];

  const inputChange = (value, setFieldValue, index, item) => {
    setFieldValue(item, value);
    if (value && index <= otpArray.length - 1) {
      const nextElement = document.getElementById(otpArray[index + 1]);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const getTimer = async () => {
    const data = {
      url: apis().getTime,
      method: "POST",
      body: { email: localStorage.getItem("email") },
    };
    const result = await httpAction(data);
    if (result.status) {
      const minuts = result?.time - new Date();
      setTimer(minuts);
    }
    //console.log(result);
  };
  useEffect(() => {
    getTimer();
  }, []);


const resentOtp = async()=>{
  const data = {
    url:apis().forgotPassword,
    method : 'POST',
    body:{email:localStorage.getItem('email')}
  }
  const result = await httpAction(data)
  console.log(result);
  getTimer()
}

  return (
    <div className="auth_card">
      <Formik
        initialValues={initialState}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          setFieldValue,
        }) => {
          return (
            <Form>
              <div className="container-fluid">
                <div className="row g-3">
                  <div className="col-12 auth-header">
                    <BsPatchCheck />
                    <p>Varify OTP</p>
                    <span>
                      Enter the 6-digit OTP we just sent to your registered
                      email
                    </span>
                  </div>
                  <div className="col-12 opt_inputs">
                    {otpArray.map((item, index) => {
                      return (
                        <TextField
                          key={index}
                          id={item}
                          value={values[item]}
                          onChange={() => {
                            const value = event.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            inputChange(value, setFieldValue, index, item);
                          }}
                          inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
                          size="small"
                          fullWidth
                          type="text"
                          name={index}
                          onBlur={handleBlur}
                          error={touched[item] && Boolean(errors[item])}
                        />
                      );
                    })}
                  </div>
                  <div className="col-12">
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={Object.values(values).some((value) => {
                        return value === "";
                      })}
                    >
                      Verify
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      variant="outlined"
                      fullWidth
                      endIcon={<ArrowBack />}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Back to Login
                    </Button>
                  </div>
                  <div>
                    <Countdown
                      renderer={({ minutes, seconds, completed }) => {
                        if (completed) {
                          return (
                            <div style={{ textAlign: "left" }}>
                              <Button onClick={resentOtp} variant="text">Resent</Button>
                            </div>
                          );
                        } else {
                          return (
                            <span>
                              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                          );
                        }
                      }}
                      date={new Date().getTime() + timer}
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default OtpVarify;
