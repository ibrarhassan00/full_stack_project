import React from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { GrPowerReset } from "react-icons/gr";
import { ArrowBack, Send } from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";
import { useState } from "react";

const ForgetPassword = () => {
const navigate = useNavigate()
const [loading , setLoading] = useState(false)
  const initialState = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
  });

  const submitHandler = async (values) => { 
try {
  const data = {
  url:apis().forgotPassword,
  method : 'POST',
  body:{email:values.email}
}
setLoading(true)
const response = await httpAction(data)
setLoading(false)
   if(response.status){
      toast.success(response.message);
      localStorage.setItem('email',values.email)
       navigate('/otp/varify')
   }
} catch (error) {
  console.log(error.message);
  
}

  };

  
  return (
    <div className="auth_card">
      <Formik
        initialValues={initialState}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleBlur, handleChange, touched, values, errors }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="auth-header">
                  <GrPowerReset />
                  <p>Find Your Account</p>
                  <span>Enter Your Required email</span>
                </div>
                <div className="col-12">
                    <TextField
                    name='email'
                    type="email"
                    label='Enter Register Email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    size="small"
                    />
                </div>
                <div className="col-12">
                        <Button 
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={16} /> : <Send />}
                        type="submit"
                        variant="contained"
                        fullWidth
                        >
                            Sent OTP
                        </Button>
                </div>
                <div className="col-12">
                    <Button variant="outlined" fullWidth startIcon={<ArrowBack/>} onClick={()=>{navigate('/login')}}>
                    Back to Login
                    </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
