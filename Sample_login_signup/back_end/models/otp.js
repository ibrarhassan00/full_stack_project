import mongoose from "mongoose";

const optSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isUsed:{
        type:String,
        default:false
    }
},{timestamps:true})

const OTPModel = mongoose.model("otp",optSchema);

export default OTPModel;