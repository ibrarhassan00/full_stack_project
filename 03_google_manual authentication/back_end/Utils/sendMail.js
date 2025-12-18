import nodemailer from "nodemailer";

const sentEmail = async (data)=>{
    try {
        const transport = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.APP_PASS
            }
        })
const stringOtp = data.otp.toString()

        const mailOption = {
            from : process.env.EMAIL,
            to:data.email,
            subject:'Password OTP',
            text:stringOtp 
        }
        const result = await transport.sendMail(mailOption);
return result;
    } catch (error) {
        console.log("SentMail.js",error.message);
        
    }
}

export default sentEmail;