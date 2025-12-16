import { sendOtpMail } from "../../emailVerify/sendOtpMail.js"
import User from "../../models/userModel.js"

export const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random()*900000).toString();
        const expiry = new Date(Date.now()+10*60*1000)
        user.otp = otp,
        user.otpExpiry = expiry;
        await user.save()
        await sendOtpMail(email,otp);
        return res.status(200).json({
            success:true,
            message:"OTP Send to your mail successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}