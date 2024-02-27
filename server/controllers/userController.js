import User from "../models/userModel.js";
import sendMailFunction from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from 'cloudinary';
import fs from 'fs';

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const avatar = req.files.avatar.tempFilePath;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exist"
            })
        }
        const otp = Math.floor(Math.random() * 10000);

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "todoMobileApp"
        });

        fs.rmSync("./tmp", { recursive: true });


        user = await User.create({
            name, email, password, avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            otp,
            otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000)
        });

        await sendMailFunction(email, "Verify your account using Otp", `Your otp is ${otp}`)

        sendToken(res, user, 200, "OTP sent to your email, please verify within 10 min else your account will be deleted")


    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "User doesn't exist"
            })
        }

        const isMatch = user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        sendToken(res, user, 200, "Login successful")


    } catch (error) {
        console.log("Error while login", error);

    }
}


export const verify = async (req, res) => {
    try {

        const otp = Number(req.body.otp);

        const user = await User.findById(req.user._id);

        if (user.otp != otp || user.otp_expiry < Date.now()) {
            return res.status(400).json({
                message: "Invalid otp or has been expired"
            })
        }

        user.verified = true
        user.otp = null
        user.otp_expiry = null

        await user.save();

        sendToken(res, user, 200, "Account Verified");


    } catch (error) {
        console.log("error while verify", error);

        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const logout = async (req, res) => {
    try {

        res.status(200).cookie("authToken", null, {
            expires: new Date(Date.now())
        }).json({
            message: "Logged out successfully"
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        })
    }
}



export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        sendToken(res, user, 200, "Welcome back ", user.name);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        })

    }
}

export const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const { name } = req.body;

        const avatar = req.files.avatar.tempFilePath;

        if (name) user.name = name;

        if (avatar) {

            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(avatar);

            fs.rmSync("./tmp", { recursive: true })

            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })

    }
}

export const updatePassword = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password doesn't match"
            })
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            message: "Password updated successfully",
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email",
            })
        }


        const otp = Math.floor(Math.random() * 10000);

        user.forgotPasswordOtp = otp;

        user.forgotPasswordOtp_expiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        const message = `Your OTP for reseting the password is ${otp}. If you didn't request for this , please ignore this email`

        await sendMailFunction(email, "Request for reseting the password", message);

        res.status(200).json({
            message: `OTP sent to ${email}`
        })



    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error",
        })

    }
}


export const resetPassword = async (req, res) => {
    try {
        const { otp, password } = req.body;

        const user = await User.findOne({ forgotPasswordOtp: otp, forgotPasswordOtp_expiry: { $gt: Date.now() } }).select("+password")

        if (!user) {
            return res.status(400).json({
                message: "Invalid OTP or has been expired"
            })
        }

        user.password = password;

        user.forgotPasswordOtp = null;
        user.forgotPasswordOtp_expiry = null;

        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })

    }
}