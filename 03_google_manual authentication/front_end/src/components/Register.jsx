import React, { useState } from "react";
import { TextField, Button, InputAdornment , IconButton , Divider} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ArrowBack, Email, Login, Password } from "@mui/icons-material";
import { IoMdPersonAdd } from "react-icons/io";
import {Visibility , VisibilityOff , Google} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import httpAction from "../utils/httpAction";
import apis from "../utils/apis";
import toast from "react-hot-toast";


const Register = () => {
const navigate = useNavigate()
  const [visible , setVisible] = useState(false)

const visibleHandler = ()=>{  
  setVisible(!visible)
}

  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required").min(3, "minimum 3 characters required"),
    email: Yup.string()
      .email("must be a valid email")
      .required("email is required"),
    password: Yup.string().required("password is required"),
  });

  const submitHandler = async(values) => {
   // console.log(values);
   const data = {
    url: apis().registerUser,
    method: "POST",
    body: values,
  };

  try {
    const result = await httpAction(data);
    console.log("User registered:", result);
    toast.success("User Created")
    navigate("/login")
  } catch (err) {
    console.error("Registration failed:", err.message);
  }

  };

  return (
    <div className="auth_card">
      <Formik
        onSubmit={submitHandler}
        initialValues={initialState}
        validationSchema={validationSchema}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => {
          return (
            <Form>
              <div className="container-fluid">
                <div className="row g-3">
                  <div className="col-12 auth-header">
                    <IoMdPersonAdd />
                    <p>Register new account</p>
                    <span>sign up to continue</span>
                  </div>
                  <div className="col-12">
                    <TextField 
                    name='name'
                    label='Your name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    size="small"
                    />
                  </div>
                  <div className="col-12">
                    <TextField 
                    type="email"
                    name='email'
                    label='Create new email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    size="small"
                    />
                  </div>
                  <div className="col-12">
                     <TextField
                     name='password'
                     type={visible ? 'text' : 'password'}
                     label='Create New Password'
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={touched.password && Boolean(errors.password)}
                     helperText={touched.password && errors.password}
                     fullWidth
                     size="small"
                     InputProps={{
                      endAdornment:(<InputAdornment>
                      <IconButton onClick={visibleHandler} edge='end'>
                        {visible ? <Visibility />  : <VisibilityOff />} 
                      </IconButton>
                      </InputAdornment>)
                     }}
                     />
                  </div>
                  <div className="col-12">
                    <Button variant="contained" fullWidth type="submit">
                      Register
                    </Button>
                  </div>
                  <div className="col-12">
                    <Divider>OR</Divider>
                  </div>
                  <div className="col-12">
                    <Button endIcon={<Google />} variant="outlined" fullWidth>
                      Continue with Google
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button onClick={()=>{navigate('/login')}} startIcon={<ArrowBack/>} variant="outlined" fullWidth>Back to login</Button>
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

export default Register;
