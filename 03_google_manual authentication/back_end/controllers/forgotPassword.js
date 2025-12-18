// import UserModel from "../models/User.js";

// const forgotPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const findedUser = await UserModel.findOne({ email: email });
//     if (!findedUser) {
//      return res.status(400).json({
//         status: false,
//         message: "Please Insert Valid Email",
//       });
//     }
//     const userOtp = findedUser.password_otp.otp
//     if(!userOtp){
//         const timeDiff = new Date().getTime() - new Date(findedUser.password_otp.last_attmept).getTime() <=24*60*60*1000

//         if(!timeDiff){
//             findedUser.password_otp.limit=5
//             await findedUser.save()
//         }
//         const remainLimit = findedUser.password_otp.limit === 0

//         if(timeDiff && remainLimit){
//            return res.status(400).json({status:false,message:"Daily Limit Has Reached"})
//         }
//     }

//      const otp = Math.floor(Math.random()*900000)+100000;
//         findedUser.password_otp.otp = otp
//         findedUser.password_otp.limit--
//         findedUser.password_otp.last_attmept=new Date()
//         findedUser.password_otp.sent_time = new Date().getTime()+2*60*1000;
//         await findedUser.save()

//     res.status(200).json({
//         status:true,
//         message:`Otp Sent at ${email}`,
//         otp:findedUser.password_otp.otp 
//     })
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };


import UserModel from "../models/User.js";
import sentEmail from "../Utils/sendMail.js";

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
// console.log(email);

  try {
    // Step 1: User find karo
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Please Insert Valid Email",
      });
    }

    const currentTime = new Date().getTime();
    const lastAttempt = new Date(user.password_otp.last_attempt).getTime();
    const timeDiff = currentTime - lastAttempt <= 24 * 60 * 60 * 1000; // 24 hours

    // Step 2: Daily limit reset if time exceeded
    if (!timeDiff) {
      await UserModel.findOneAndUpdate(
        { email },
        { $set: { "password_otp.limit": 5 } }
      );
    }

    // Step 3: Check remaining limit
    const updatedUser = await UserModel.findOne({ email });
    const limitReached = timeDiff && updatedUser.password_otp.limit === 0;
    if (limitReached) {
      return res
        .status(400)
        .json({ status: false, message: "Daily Limit Has Reached" });
    }

    // Step 4: Generate OTP
    const otp = Math.floor(Math.random() * 900000) + 100000;

    // Step 5: Update OTP info using findOneAndUpdate
    const newOtpData = {
      "password_otp.otp": otp,
      "password_otp.limit": updatedUser.password_otp.limit - 1,
      "password_otp.last_attempt": new Date(),
      "password_otp.sent_time": new Date().getTime() + 2 * 60 * 1000, // valid 2 minutes
    };

    await UserModel.findOneAndUpdate({ email }, { $set: newOtpData });
const data ={
  email : email,
  otp:otp
}

    const emailToUser = await sentEmail(data)
    // console.log("emailSend" , emailToUser);
    
    res.status(200).json({
      status: true,
      message: `OTP sent at ${email}`,
      otp,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export default forgotPassword;
