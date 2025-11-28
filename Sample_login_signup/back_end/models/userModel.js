import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name:{
     type:String,
     required:true,
    },
    age:{
     type:Number,
     required:true,
    },
    email:{
     type:String,
     required:true,
     unique:true,
    },
    password:{
     type:String,
     required:true,
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
    imageUrl: {
      type: String,
      required: false,
      default: null,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})


const UserModel = mongoose.model('user',userShema)

export default UserModel;


// schema main ek object or pass hota hai { timestamps: true } agr createAt use na kare to,, 