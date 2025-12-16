import bcrypt from "bcryptjs"
import User from "../../models/userModel.js"

export const resetPassword = async(req,res)=>{
    const {newPassword,confirmPassword} = req.body
    const email = req.params.email
    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password don't match"
        })
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const hashPassword = await bcrypt.hash(newPassword,10)
        user.password = hashPassword
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Password change successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}