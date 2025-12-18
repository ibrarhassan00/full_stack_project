import UserModel from "../models/User.js";

const getTime = async (req,res,next)=>{
const {email} = req.body;
try {
    const findUser = await UserModel.findOne({email:email})
    if(!findUser){
        return res.status(400).json({
            status:false,
            message:"Something went wrong"
        })
    }
    const time = findUser.password_otp.sent_time
    res.status(200).json({
        status:true,
        message:'otp sent',
        time,
    })
} catch (error) {
    res.status(500).json({
        status:false,
        message:error.message,
    })
}
}

export default getTime;