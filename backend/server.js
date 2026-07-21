import express from 'express'
import crypto from 'crypto'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { title } from 'process'
import taskRoutes from './routes/taskRoutes.js'
import connectDB from './config/db.js'
import { errorHandler } from './middlewares/errorHandler.js'


connectDB()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT ?? 1234


app.use('/tasks', taskRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`SERVER LISTENING PORT http://localhost:${PORT}`)
})