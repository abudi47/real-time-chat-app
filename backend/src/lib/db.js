
import mongoose, { connect } from "mongoose";

export const connectDb = async () =>{ 
    try {
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(`Mongo Db connected successful to: ${conn.connection.host}`)
    } catch (error) {
        console.log("mongo db connection error", error)
    }

}