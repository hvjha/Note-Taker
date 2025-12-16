import express from 'express'
import { registerUser } from '../controller/userController/register.js'
import { verification } from '../controller/userController/verification.js'
import { loginuser } from '../controller/userController/login.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { logout } from '../controller/userController/logout.js'
import { forgotPassword } from '../controller/userController/forgotPassword.js'
import { verifyOTP } from '../controller/userController/verifyOtp.js'
import { resetPassword } from '../controller/userController/resetPassword.js'
import { userSchema, validateUser } from '../validators/userValidators.js'

const userRoute = express.Router()

userRoute.post('/register',validateUser(userSchema),registerUser)
userRoute.post('/verify',verification)
userRoute.post('/login',loginuser)
userRoute.post('/logout',isAuthenticated,logout)
userRoute.post('/forgot-password',forgotPassword)
userRoute.post('/verify-otp/:email',verifyOTP)
userRoute.post('/change-password/:email',resetPassword)
export default userRoute