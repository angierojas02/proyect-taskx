import express from 'express'
import User from '../models/User.js'
import authController from '../controllers/authController.js'


const userRouter = express.Router()

userRouter.get('/', authController.getAllUsers)
userRouter.post('/', authController.registerUser)
userRouter.post('/', authController.loginUser)

export default userRouter


