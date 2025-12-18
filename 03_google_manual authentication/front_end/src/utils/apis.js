
const apis = ()=>{
    const local = 'http://localhost:5050/'

    const list ={
        registerUser : `${local}user/register`,
        loginUser : `${local}user/login`, 
        userProfile:`${local}user/profile`,
        userLogout:`${local}user/logout`,
        getAccess:`${local}user/access`,
        forgotPassword:`${local}user/password/forgot`,
        verifyOtp:`${local}user/otp/verify`,
        getTime:`${local}user/otp/time`,
        updatePassword:`${local}user/password/update`
    }

    return list
}

export default apis