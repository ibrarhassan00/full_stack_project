import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { TextField, Button, InputAdornment , IconButton , Divider} from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { ArrowBack, Google, Visibility,VisibilityOff} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
  const [visible , setVisible] = useState(false)
  const visibleHandler = ()=>{
    setVisible(!visible)
  }  
  
  
  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().required("password is required"),
  });

  const submitHandler = async(values) => {
    // console.log(values);
    const data ={
      url : apis().loginUser,
      method:'POST',
      body:values,  
    }
    try {
      const result = await httpAction(data)
      console.log("result",result);
      toast.success("Successly Login")
      navigate("/")
      
    } catch (error) {
      console.error("Login failed:", err.message);
    }
  };

  const loginwithGoogle = ()=>{
    window.location.href ='http://localhost:5050/auth/google'
  }

const test=()=>{
const currentTime = new Date();
    const lastAttempt = new Date({});
    const timeDiff = currentTime - lastAttempt <= 24 * 60 * 60 * 1000; // 24 hours
console.log(timeDiff);

}

  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => (
          <Form>
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 auth-header">
                  <IoIosLogIn />
                  <p>Welcome Back</p>
                  <span>Login to continue</span>
                </div>
                <div className="col-12">
                  <TextField
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="your email"
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <TextField
                  InputProps={{
                    endAdornment:(<InputAdornment>
                    <IconButton
                    onClick={visibleHandler} edge='end'>
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>)
                  }}
                   type={visible ? 'text' : 'password' }
                    name="password"
                    label="Your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="col-12">
                  <Button variant="contained" fullWidth type="submit">
                    login
                  </Button>
                </div>
                <div className="col-12">
                   <Divider>OR</Divider>
                </div>
                <div className="col-12">
                  <Button 
                  onClick={()=>{loginwithGoogle()}}
                  variant="outlined" 
                  fullWidth
                  endIcon={<Google />}>
                    Google
                   </Button>
                </div>
                <div className="col-12"> 
                  <Button variant="outlined" fullWidth startIcon={<ArrowBack />} onClick={()=>{navigate('/register')}}>
                    create new account
                  </Button>
                </div>
                <div className="col-12">
                  <Button variant="text" color="error" fullWidth onClick={()=>{navigate('/password/forget')}}>
                   forget password
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <button onClick={test}>Test</button>
    </div>
  );
};

export default Login;
