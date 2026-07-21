import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI
        await mongoose.connect(mongoURI)
        console.log("CONECTADO CON ÉXITO")
    } catch (error) {
        console.error("ERROR AL CONECTAR LA BASE DE DATOS", error.message)
        process.exit(1)
    }
}

export default connectDB