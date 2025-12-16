import User from "../../models/userModel.js"

export const verifyOTP = async(req,res)=>{
    const {otp} = req.body
    const email = req.params.email
    if(!otp){
        return res.status(400).json({
            success:false,
            message:"OTP is required"
        })
    }
    try {
        const user = await User.findOne({email})
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                succcess:false,
                message:"OTP not generated or already verified"
            })
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:"OTP has Expired. Please request a new one"
            })
        }
        if(otp !== user.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
        user.otp = null
        user.otpExpiry = null
        await user.save()
        return res.status(200).json({
            success:true,
            message:"OTP Verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}