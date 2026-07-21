import jwt from 'jsonwebtoken'
import User from '../models/User'

export const authValidate = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            const errorAuth = new Error("Unauthorized. Please, loggin first")
            errorAuth.statusCode = 401
            return next(errorAuth)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.uid).select('-password')

        if (!user) {
            const errorUser = new Error("User doesn't exists")
            errorUser.statusCode = 401
            return next(errorUser)
        }

        req.user = user

        next()

    } catch(error) {
        next(error)
    }
}