import Session from "../../models/sessionModel.js";
import User from "../../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt
 from "bcryptjs";
export const loginuser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Unauthorized User"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            })
        }
        if(user.isVerified ===false){
            return res.status(403).json({
                success:false,
                message:"Verify your account than login"
            })
        }
        // check for existing session and delete it
        const existingSession = await Session.findOne({userId:user._id})
        if(existingSession){
            await Session.deleteOne({userId:user._id})
        }
        await Session.create({userId:user._id})
        // Generate token
        const accessToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'10d'})
        const refereshToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        user.isLoggedIn = true
        await user.save()
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.username}`,
            accessToken,
            refereshToken,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}