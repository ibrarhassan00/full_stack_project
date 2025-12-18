import React from 'react'
import {TextField,Button} from "@mui/material"
import * as Yup from 'yup';
import {Form , Formik} from "formik"
import { GrUpdate } from "react-icons/gr";
import { ArrowBack } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import httpAction from '../utils/httpAction';
import toast from 'react-hot-toast';
import apis from '../utils/apis';
import { useState } from 'react';

const UpdatePassword = () => {
    const [loading , setLoading] = useState(false)
 const navigate = useNavigate()
    const initialState = {
        password: ""
    }
    const validationSchema =Yup.object({
password:Yup.string().required('Password is required')
    })

    const submitHandler = async(values)=>{
        console.log(values.password);
        
        const data = {
            url:apis().updatePassword,
            method:"POST",
            body:{password:values.password,email: localStorage.getItem("email")}
        }
        setLoading(true)
        const result = await httpAction(data);
        setLoading(false)
        if(result.status){
            toast.success(result.message)
            navigate('/login')
        }
    }
  return (

    <div className='auth_card'>
        <Formik onSubmit={submitHandler} initialValues={initialState} validationSchema={validationSchema}>

{({handleChange , handleBlur , values , touched , errors})=>{return <Form>
<div className='container-fluid'>
<div className='row g-3'>
<div className='col-12 auth-header '>
<GrUpdate/>
<p>Update Your Password</p>
<span>Create New Password</span>
</div>
<div className='col-12'>
    <TextField 
    type='text'
    name='password'
    value={values.password}
    onChange={handleChange}
    onBlur={handleBlur}
    error={touched.password && Boolean(errors.password)}
    helperText={touched.password && errors.password}
    fullWidth
    size='small'
    label='New Password'
    />
</div>
<div className='col-12'>
     <Button variant='contained' fullWidth type='submit'>
        Update Password
     </Button>
</div>
<div className='col-12'>
    <Button onClick={()=>{navigate('/login')}} variant='outlined' fullWidth startIcon={<ArrowBack />}>Back To Login</Button>
</div>
</div>
</div>
</Form>}}
        </Formik>
    </div>
  )
}

export default UpdatePassword
