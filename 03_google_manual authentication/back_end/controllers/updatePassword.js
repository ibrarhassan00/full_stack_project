import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'


const updatePassword = async (req,res,next)=>{
const body = req.body;
//console.log(body.password,body.email);

try {
    const hashPassword = await bcrypt.hash(body.password,10)
    const findUser = await UserModel.findOne({email:body.email})
    findUser.password = hashPassword;
    await findUser.save();

    res.clearCookie("accessToken");
    res.clearCookie("connect.sid")
    res.status(200).json({
        status:true,
        message:"Password Updated",

    })
} catch (error) {
    res.status(500).json({
        status:false,
        message:error.message 
    })
}
}

export default updatePassword;