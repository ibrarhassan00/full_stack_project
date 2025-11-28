import UserModel from "../models/userModel.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import OTPModel from "../models/otp.js";
import { json } from "express";

dotenv.config();

export const userRegister = async (req, res) => {
  const otp = uuidv4().slice(0, 6);
  try {
    const { name, age, email, password } = req.body;
    if (!name || !age || !email || !password) {
      return res.status(400).json({
        // 400 Bad Request Client ne required data sahi se nahi bheja.
        status: false,
        message: "Required Field Are Missing",
        data: null,
      });
    }
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        // 409 Conflict Request ki wajah se server par resource conflict ho raha hai (email already taken)
        status: false,
        message: "Email Already Exist",
        data: null,
      });
    }
    const hashPasswaord = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashPasswaord,
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hello from Nodemailer",
      html: `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Our App</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f9fafb; font-family: 'Inter', Arial, sans-serif; color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:60px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px; background-color:#ffffff; padding:80px 40px 60px; border-radius:0;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:50px;">
                <img src="https://dummyimage.com/120x40/111827/ffffff&text=Your+Logo" alt="Company Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <h1 style="font-size:32px; font-weight:700; margin:0; color:#111827;">
                  Welcome to Our App 👋
                </h1>
              </td>
            </tr>

            <!-- Subtext -->
            <tr>
              <td align="center" style="padding-bottom:40px;">
                <p style="font-size:18px; line-height:1.6; color:#374151; max-width:500px; margin:0 auto;">
                  We’re thrilled to have you here! Let’s get you started — your workspace is ready, and everything’s set for you to explore.
                </p>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td align="center" style="padding-bottom:80px;">
                <a href="#" style="background-color:#111827; color:#ffffff; text-decoration:none; padding:16px 36px; border-radius:6px; font-size:16px; font-weight:600; display:inline-block;">
                  ${otp}
                </a>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td align="center" style="border-top:1px solid #e5e7eb; padding-top:40px;">
                <p style="font-size:14px; color:#6b7280; margin:0;">
                  If you didn’t sign up for this account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:30px; font-size:13px; color:#9ca3af;">
                <p style="margin:0;">© 2025 Your Company, Inc.</p>
                <p style="margin:4px 0 0;">
                  <a href="#" style="color:#9ca3af; text-decoration:underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };

    const otpObject = {
      otp,
      email,
    };
    console.log(otpObject);

    await OTPModel.create(otpObject);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    res.status(201).json({
      // 201 Created
      status: true,
      message: "User Created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      // 500 Internal Server Error Server par unexpected error aaya
      status: false,
      message: `${error.message} y wala `,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        // 400 Bad Request Client ne required data sahi se nahi bheja.
        status: false,
        message: "Required Field Are Missing",
        data: null,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        // 401 Unauthorized Login fail hua. Authentication credentials (email/password) invalid hain.
        status: false,
        message: "Email Password Invalid",
        data: null,
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        // 401 Unauthorized
        status: false,
        message: "Your Email is not verified Please verify your email address",
        data: null,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        //401 Unauthorized
        status: false,
        message: "Email Password Invalid",
        data: null,
      });
    }
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    const loginUserId = { _id: user._id };
    // console.log(loginUserId);

    const token = jwt.sign(loginUserId, jwtPrivateKey, { expiresIn: "24h" });

    res.status(200).json({
      // 200 OK
      status: true,
      message: "User Successfully Login",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      // 500 Internal Server Error
      status: false,
      message: error.message,
    });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        // 400 Bad Request Client ne required data sahi se nahi bheja.
        message: "Required field are missing ggggg",
        status: false,
      });
    }

    const isExist = await OTPModel.findOne({ email, isUsed: false }).sort({
      createdAt: -1,
    });

    if (!isExist) {
      return res.status(401).json({
        // 401 Unauthorized
        status: false,
        message: "Invalid OTP",
      });
    }

    if (isExist.otp !== otp) {
      return res.status(401).json({
        // 401 Unauthorized
        status: false,
        message: "Invalid OTP",
      });
    }
    await OTPModel.findByIdAndUpdate(isExist._id, { isUsed: true });
    await UserModel.findOneAndUpdate({ email }, { isVerified: true });

    res.status(200).json({
      // 200 OK
      message: "Otp Verified",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      // 500 Internal Server Error
      status: false,
      message: error.message,
    });
  }
};

export const restOtpController = async (req, res) => {
  const otp = uuidv4().slice(0, 6);
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        // 400 Bad Request Client ne required data sahi se nahi bheja.
        status: false,
        message: "Required Field Are Missing",
        data: null,
      });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hello from Nodemailer",
      html: `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Our App</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f9fafb; font-family: 'Inter', Arial, sans-serif; color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:60px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px; background-color:#ffffff; padding:80px 40px 60px; border-radius:0;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:50px;">
                <img src="https://dummyimage.com/120x40/111827/ffffff&text=Your+Logo" alt="Company Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <h1 style="font-size:32px; font-weight:700; margin:0; color:#111827;">
                  Welcome to Our App 👋
                </h1>
              </td>
            </tr>

            <!-- Subtext -->
            <tr>
              <td align="center" style="padding-bottom:40px;">
                <p style="font-size:18px; line-height:1.6; color:#374151; max-width:500px; margin:0 auto;">
                  We’re thrilled to have you here! Let’s get you started — your workspace is ready, and everything’s set for you to explore.
                </p>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td align="center" style="padding-bottom:80px;">
                <a href="#" style="background-color:#111827; color:#ffffff; text-decoration:none; padding:16px 36px; border-radius:6px; font-size:16px; font-weight:600; display:inline-block;">
                  ${otp}
                </a>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td align="center" style="border-top:1px solid #e5e7eb; padding-top:40px;">
                <p style="font-size:14px; color:#6b7280; margin:0;">
                  If you didn’t sign up for this account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:30px; font-size:13px; color:#9ca3af;">
                <p style="margin:0;">© 2025 Your Company, Inc.</p>
                <p style="margin:4px 0 0;">
                  <a href="#" style="color:#9ca3af; text-decoration:underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };

    const otpObject = {
      otp,
      email,
    };
    // console.log(otpObject);

    await OTPModel.create(otpObject);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    res.status(200).json({
      // 200 OK
      message: "Rest Otp Successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      // 500 Internal Server Error
      status: false,
      message: error.message,
    });
  }
};

export const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        // 400 Bad Request Client ne required data sahi se nahi bheja.
        message: "Required field are missing",
        status: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        // 401 Unauthorized
        message: "This Email Address Does Not Exist",
        status: false,
      });
    }
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    const loginUserId = { _id: user._id };
    const token = jwt.sign({ _id: user._id, email: email }, jwtPrivateKey, {
      expiresIn: "10m",
    });
    const url = `${process.env.FRONT_END_URL}/changePassword?token=${token}`;

    //send verify link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Forget Password",
      html: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f3f3f3;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f3f3; padding:50px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e0e0e0;">
              <tr>
                <td style="padding:40px; text-align:center;">
                  <h1 style="color:#333333; font-size:24px; margin-bottom:20px;">Reset Your Password</h1>
                  <p style="color:#555555; font-size:16px; line-height:1.5; margin-bottom:30px;">
                    You recently requested to reset your password. Click the button below to proceed.
                  </p>
                  <a href="${url}" style="display:inline-block; padding:12px 25px; font-size:16px; color:#ffffff; background-color:#007BFF; border-radius:5px; text-decoration:none;">
                    Reset Password
                  </a>
                  <p style="color:#999999; font-size:14px; line-height:1.5; margin-top:30px;">
                    If you did not request this, please ignore this email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f3f3f3; text-align:center; padding:20px; font-size:12px; color:#999999;">
                  &copy; 2025 Your Company. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `,
    });

    res.status(200).json({
      // 200 OK
      message: "Please check your email",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      // 500 Internal Server Error
      message: error.message || "some thing went wrong",
      status: false,
    });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const tokenVarify = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    if (!tokenVarify) {
      return res.status(400).json({
        // 400 Bad Request
        message: "Token Expired",
        status: false,
      });
    }

    if (!token || !newPassword) {
      return res.status(400).json({
        // 400 Bad Request
        message: "Required field are missing",
        status: false,
      });
    }
    if (!tokenVarify.email || !tokenVarify._id) {
      return res.status(401).json({
        // 401 Unauthorized
        message: "Invalid Token",
        status: false,
      });
    }
    const hashPasswaord = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(tokenVarify._id, {
      password: hashPasswaord,
    });
    res.status(200).json({
      // 200 ok
      message: "Password has cahanged",
      status: true,
    });
  } catch (error) {
    // 4. Catch Block Handling (JWT specific errors ke liye 401)
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        // ⬅️ Change 2: Specific JWT errors ke liye 401
        message: "Invalid or Expired Token",
        status: false,
      });
    }

    // Baaki sab errors (DB, Hashing, etc.) ke liye 500 use karein.
    res.status(500).json({
      message: error.message || "Something went wrong on the server",
      status: false,
    });
  }
};
