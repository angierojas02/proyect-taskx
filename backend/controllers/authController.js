import User from '../models/User.js'
import { validateUser } from '../schema/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res, next) => {
    try {

        // SE VALIDA CON ZOD SI LOS DATOS CORRESPONDEN
        const result = validateUser(req.body)
        
        //SI NO CORRESPONDEN, ES UN ERROR
        if (!result.success) {
            const errorValidationUser = new Error('Datos de registro inválidos')
            errorValidationUser.statusCode = 400
            errorValidationUser.detalles = result.error.format()
            return next(errorValidationUser)
        }

        //EXTRAEMOS LOS DATOS DEL RESULT
        const {username, email, password, role } = result.data

        //VERIFICAMOS QUE EL USUARIO YA EXISTE, SI SÍ, SE LANZA OTRO ERROR
        const userExists = await User.findOne({ $or: [{ email }, { username }] })
        if (userExists) {
            const errorDuplicated = new Error('El usuario o correo ya existen!')
            errorDuplicated.statusCode = 409
            return next(errorDuplicated)
        }

        //GENERAMOS EL SALT Y EL PASSWORD HASHEADO
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //CREAMOS EL USUARIO
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save()

        return res.status(201).json({
            ok: true,
            message: 'Usuario creado con éxito'
        })

    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({ email })
        if (!user) {
            const errorAuth = new Error('Correo o contraseña incorrectos')
            errorAuth.statusCode = 401
            return next(errorAuth)
        }

        const isMatchPass = await bcrypt.compare(password, user.password)
        if (!isMatchPass) {
            const errorAuth = new Error('Correo o contraseña incorrectos')
            errorAuth.statusCode = 401
            return next(errorAuth)
        }

        const token = jwt.sign(
            { uid: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso',
            user: {username: user.username, role: user.role }
        })

    } catch (error) {
        next(error)
    }
}

const logoutUser = (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
        })

        return res.status(200).json({
            ok: true,
            message: 'Sesión cerrada'
        })
    } catch (error) {
        next(error)
    }
}