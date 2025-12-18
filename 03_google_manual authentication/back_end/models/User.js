import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    password:{
      type: String
    },
    password_otp:{
      otp: { type: String },
      sent_time: { type: String },
      limit: { type: Number, default: 5 },
      last_attempt:{type:Object},
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
